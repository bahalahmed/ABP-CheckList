document.addEventListener("DOMContentLoaded", () => {
    const updateTotalHealthFacilities = (totalFieldId, fieldIds) => {
        const totalField = document.getElementById(totalFieldId);
        const total = fieldIds.reduce((sum, id) => {
            const value = parseInt(document.getElementById(id)?.value || 0, 10);
            return sum + value;
        }, 0);
        if (totalField) {
            totalField.value = total; // Update the total field
        }
    };

    const addEventListenersForTotal = (totalFieldId, fieldIds) => {
        fieldIds.forEach((id) => {
            const inputField = document.getElementById(id);
            if (inputField) {
                inputField.addEventListener("input", () => updateTotalHealthFacilities(totalFieldId, fieldIds));
            }
        });
    };


    addEventListenersForTotal("totalHealthFacilities", ["totalPHC", "totalCHC", "totalSubCenter"]);


    addEventListenersForTotal("totalHealthFacilities1", ["totalPHC1", "totalCHC1", "totalSubCenter1"]);

    
});
function validateNumberRange(id, min, max) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    const value = parseInt(input.value);
    if (value < min || value > max || isNaN(value)) {
        errorElement.textContent = `Value should be between ${min} and ${max}.`;
    } else {
        errorElement.textContent = "";
    }
    
}
function updateFields(section) {
    const sanctionedField = document.getElementById(`${section}-sanctioned`);
    const functionalField = document.getElementById(`${section}-functional`);
    const nonFunctionalField = document.getElementById(`${section}-non-functional-count`);
    const nonFunctionalContainer = document.getElementById(`${section}-non-functional-container`);

    const sanctioned = parseInt(sanctionedField.value, 10) || 0;
    const functional = parseInt(functionalField.value, 10) || 0;

    // Validate Sanctioned field
    if (!validateInput(`${section}-sanctioned`, 0, parseInt(sanctionedField.max, 10))) {
        return;
    }

    // Enable or disable Functional field
    functionalField.disabled = sanctioned === 0;
    functionalField.setAttribute("max", sanctioned);

    // Validate Functional field
    if (sanctioned > 0 && functional > sanctioned) {
        functionalField.value = sanctioned;
    }

    // Calculate Non-Functional value
    const nonFunctional = Math.max(sanctioned - functional, 0);
    if (sanctioned > 0) {
        nonFunctionalContainer.style.display = "block";
        nonFunctionalField.textContent = nonFunctional;
    } else {
        nonFunctionalContainer.style.display = "none";
        nonFunctionalField.textContent = "0";
    }
}
const validateFields = (fields, sectionName) => {
    let isValid = true;

    fields.forEach((field) => {
        const { id, min = null, max = null, errorMessage = null } = field;
        const sanctionedInput = document.getElementById(`${id}-sanctioned`);
        const functionalOrAvailableInput =
            document.getElementById(`${id}-functional`) || document.getElementById(`${id}-available`);
        const errorSanctioned = document.getElementById(`error-${id}-sanctioned`);
        const errorFunctionalOrAvailable = functionalOrAvailableInput
            ? document.getElementById(`error-${functionalOrAvailableInput.id}`)
            : null;

        // Validate sanctioned field
        const sanctionedValue = parseInt(sanctionedInput?.value, 10);
        if (isNaN(sanctionedValue) || sanctionedValue <= 0) {
            isValid = false;
            if (errorSanctioned) errorSanctioned.textContent = "Sanctioned value must be greater than 0.";
            if (sanctionedInput) {
                sanctionedInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
            }
            if (functionalOrAvailableInput) functionalOrAvailableInput.setAttribute('disabled', true);
        } else {
            if (errorSanctioned) errorSanctioned.textContent = "";
            if (sanctionedInput) {
                sanctionedInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
            }
            if (functionalOrAvailableInput) functionalOrAvailableInput.removeAttribute('disabled');
        }

        // Validate functional/available field
        if (sanctionedValue > 0 && functionalOrAvailableInput) {
            const functionalOrAvailableValue = parseInt(functionalOrAvailableInput.value, 10);
            if (
                isNaN(functionalOrAvailableValue) ||
                functionalOrAvailableValue <= 0 ||
                functionalOrAvailableValue > sanctionedValue
            ) {
                isValid = false;
                if (errorFunctionalOrAvailable) {
                    errorFunctionalOrAvailable.textContent = `Value must be between 1 and ${sanctionedValue}.`;
                }
                functionalOrAvailableInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                functionalOrAvailableInput.classList.remove(
                    'border-gray-300',
                    'focus:ring-indigo-500',
                    'focus:border-indigo-500'
                );
            } else {
                if (errorFunctionalOrAvailable) errorFunctionalOrAvailable.textContent = "";
                functionalOrAvailableInput.classList.remove(
                    'border-red-500',
                    'focus:ring-red-500',
                    'focus:border-red-500'
                );
                functionalOrAvailableInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
            }
        }
    });

    if (!isValid) {
        alert(`Please correct errors in ${sectionName} before proceeding.`);
    }

    return isValid;
};


const validations = {
    section1: () => {
        let isValid = true;

        // General Details Validation
        const fieldsToValidate = [
            { id: 'dateOfVisit', errorMessage: 'Date of Visit is required.' },
            { id: 'district', errorMessage: 'District selection is required.' },
            { id: 'block', errorMessage: 'Block selection is required.' },
            { id: 'bmoname', errorMessage: 'Name selection is required.' },
            { id: 'bmocontact', errorMessage: 'Contact is required.' },
            { id: 'bmoemail', errorMessage: 'Email is required.' },
            { id: 'areaType', errorMessage: 'Area Type is required.' },
            { id: 'villagesCovered', errorMessage: 'Villages Covered is required.' },
            { id: 'totalPHC', errorMessage: 'Total PHC is required.', },
            { id: 'totalCHC', errorMessage: 'Total CHC is required.', },
            { id: 'totalSubCenter', errorMessage: 'Total SubCenter is required.', },
            { id: 'anganwadiCentres', errorMessage: 'Anganwadi Centers is required.', },
            { id: 'populationCovered', errorMessage: 'Population Covered is required.', },
            { id: 'totalEligibleCouple', errorMessage: 'Total Eligible Couple is required.', },
            { id: 'totalPregnantWomen', errorMessage: "Total Pregnant women is required" },
            { id: 'totalLiveBirth', errorMessage: "Total Live Births is required" },
            { id: 'children0to1', errorMessage: "Children 0-1 is required" },
            { id: 'populationAbove30', errorMessage: "Population above 30 is required" },
            { id: 'pmjayCardIssued', errorMessage: "PMJAY Card Issued is required" },
            { id: 'abhaCardGenerated', errorMessage: "ABHA Card Generated is required" },
        ];
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (inputElement && (!inputElement.value || !inputElement.value.trim())) {

                if (errorElement) errorElement.textContent = field.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                isValid = false;
            } else if (inputElement) {
                if (errorElement) errorElement.textContent = '';
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        });

        // Phone Number Validation
        const phoneFields = ["bmocontact"];
        phoneFields.forEach((id) => {
            const phoneInput = document.getElementById(id);
            const errorElement = document.getElementById(`error-${id}`);
            const phonePattern = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits

            if (!phonePattern.test(phoneInput.value)) {
                errorElement.textContent =
                    "Phone number must start with 6-9 and be exactly 10 digits.";
                phoneInput.classList.add(
                    "border-red-500",
                    "focus:ring-red-500",
                    "focus:border-red-500"
                );
                phoneInput.classList.remove(
                    "border-gray-300",
                    "focus:ring-indigo-500",
                    "focus:border-gray-500"
                );
                isValid = false;
            } else {
                errorElement.textContent = "";
                phoneInput.classList.remove(
                    "border-red-500",
                    "focus:ring-red-500",
                    "focus:border-red-500"
                );
                phoneInput.classList.add(
                    "border-gray-300",
                    "focus:ring-indigo-500",
                    "focus:border-gray-500"
                );
            }
        });

        // Email Validation
        const emailFields = ["bmoemail"];
        emailFields.forEach((id) => {
            const emailInput = document.getElementById(id);
            const errorElement = document.getElementById(`error-${id}`);
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailPattern.test(emailInput.value)) {
                errorElement.textContent = "Please enter a valid email address.";
                emailInput.classList.add(
                    "border-red-500",
                    "focus:ring-red-500",
                    "focus:border-red-500"
                );
                emailInput.classList.remove(
                    "border-gray-300",
                    "focus:ring-indigo-500",
                    "focus:border-gray-500"
                );
                isValid = false;
            } else {
                errorElement.textContent = "";
                emailInput.classList.remove(
                    "border-red-500",
                    "focus:ring-red-500",
                    "focus:border-red-500"
                );
                emailInput.classList.add(
                    "border-gray-300",
                    "focus:ring-indigo-500",
                    "focus:border-gray-500"
                );
            }
        });




        const numberInputs = [

            { id: 'villagesCovered', min: 0, max: 150, errorMessage: 'Number of Villages/Wards Covered must be between 0 and 150.' },
            { id: 'totalPHC', min: 0, max: 50, errorMessage: 'Total PHC must be between 0 and 50.' },
            { id: 'totalCHC', min: 0, max: 20, errorMessage: 'Total CHC must be between 0 and 20.' },
            { id: 'totalSubCenter', min: 0, max: 100, errorMessage: 'Total SubCenter must be between 0 and 100.' },
            { id: 'anganwadiCentres', min: 0, max: 150, errorMessage: 'Anganwadi Centers must be between 0 and 150.' },
            { id: 'populationCovered', min: 50000, max: 1000000, errorMessage: 'Population Covered must be between 500000 and 1000000.' },
            { id: 'totalEligibleCouple', min: 0, max: 100000, errorMessage: 'Total Eligible Couple must be between 0 and 100000.' },
            { id: 'totalPregnantWomen', min: 0, max: 99999, errorMessage: 'Total Pregnant women must be between 0 and 99999.' },
            { id: 'totalLiveBirth', min: 0, max: 99999, errorMessage: 'Total Live Births must be between 0 and 99999.' },
            { id: 'children0to1', min: 0, max: 99999, errorMessage: 'Children 0-1 must be between 0 and 99999.' },
            { id: 'populationAbove30', min: 0, max: 99999, errorMessage: 'Population above 30 must be between 0 and 99999.' },
            { id: 'pmjayCardIssued', min: 0, max: 99999, errorMessage: 'PMJAY Card Issued must be between 0 and 99999.' },
            { id: 'abhaCardGenerated', min: 0, max: 99999, errorMessage: 'ABHA Card Generated must be between 0 and 99999.' },
        ];
        numberInputs.forEach(input => {
            const inputElement = document.getElementById(input.id);
            const errorElement = document.getElementById(`error-${input.id}`);
            if (!inputElement.value.trim() || inputElement.value < input.min || inputElement.value > input.max) {
                errorElement.textContent = input.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                isValid = false;
            } else {
                errorElement.textContent = "";
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
            }
        });


        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }




        return isValid;
    },
    section2: () => {
        let isValid = true;

        // Fields to validate
        const fieldsToValidate = [
            { id: 'orientationCompleted', errorMessage: 'Orientation Completed is required.' },
            { id: 'healthActionPlan', errorMessage: 'Health Action Plan is required.' },
            { id: 'mchnPlan', errorMessage: 'MCHN Plan is required.' },
            { id: 'blockMap', errorMessage: 'Block Map is required.' },

            { id: 'keyFocusAreas', errorMessage: 'Key Focus Areas is required.' },
            { id: 'healthActionPlanDisseminated', errorMessage: 'Health Action Plan Disseminated is required.' },
            { id: 'dhsMeeting', errorMessage: 'DHS Meeting is required.' },
            { id: 'nqasCertification', errorMessage: 'NQAS Certification is required.' },

            { id: 'referralMechanism', errorMessage: 'Referral Mechanism is required.', },
        ];

        const nqasDetails = document.getElementById('nqasDetails');
        if (nqasDetails && !nqasDetails.classList.contains('hidden')) {
            const nqasFields = [
                { id: 'totalPHC1', errorMessage: 'Total PHC is required.', },
                { id: 'totalCHC1', errorMessage: 'Total CHC is required.', },
                { id: 'totalSubCenter1', errorMessage: 'Total SubCenter is required.', },
            ];
            fieldsToValidate.push(...nqasFields);
        }
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (inputElement && (!inputElement.value || !inputElement.value.trim())) {
                if (errorElement) errorElement.textContent = field.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                isValid = false;
            } else if (inputElement) {
                if (errorElement) errorElement.textContent = '';
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        });

        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (!inputElement) return;

            if (inputElement.type === 'number') {
                const value = parseInt(inputElement.value, 10);
                if (isNaN(value) || value < field.min || value > field.max) {
                    errorElement.textContent = field.errorMessage;
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                }
            } else if (!inputElement.value.trim()) {
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                isValid = false;
            } else {
                errorElement.textContent = '';
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
  
    section3: () => {
        let isValid = true;
    
        // General Fields to Validate
        const fieldsToValidate = [
            { id: 'bphuSetup', errorMessage: 'BPHU Setup is required.' },
            { id: 'blockQualityCell', errorMessage: 'Block Quality Cell is required.' },
            { id: 'additionalFundsNHM', errorMessage: 'Additional Funds NHM is required.' },
            { id: 'additionalFundsCSR', errorMessage: 'Additional Funds CSR is required.' },
            { id: 'dbtDoneTimely', errorMessage: 'DBT is required.' },
            { id: 'ashaPaymentTimely', errorMessage: 'ASHA Payment Timely is required.' },
            { id: 'referralMechanism1', errorMessage: 'Referral Mechanism is required.' },
            { id: 'janAarogya', errorMessage: 'Jan Aarogya Samiti is required.' },
        ];
    
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (inputElement && (!inputElement.value || !inputElement.value.trim())) {

                if (errorElement) errorElement.textContent = field.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                isValid = false;
            } else if (inputElement) {
                if (errorElement) errorElement.textContent = '';
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        });
        // Add Additional Validations for Hidden Fields
        const dbtBeneficiaries = document.getElementById('dbtBeneficiaries');
        if (dbtBeneficiaries && !dbtBeneficiaries.classList.contains('hidden')) {
            const dbtFields = [
                { id: 'jsskBeneficiary', errorMessage: 'JSSK Beneficiary is required.', min: 0, max: 15000 },
                { id: 'jsyBeneficiary', errorMessage: 'JSY Beneficiary is required.', min: 0, max: 15000 },
                { id: 'ntepBeneficiary', errorMessage: 'NTEP Beneficiary is required.', min: 0, max: 15000 },
            ];
            fieldsToValidate.push(...dbtFields);
        }
    
        const janAarogyaVerification = document.getElementById('verificationSection');
        if (janAarogyaVerification && !janAarogyaVerification.classList.contains('hidden')) {
            const janFields = [
                { id: 'verification', errorMessage: 'Verification is required.' },
            ];
            fieldsToValidate.push(...janFields);
        }
    
        const nhmActivities = document.getElementById('activitiesNHM');
        if (nhmActivities && !nhmActivities.classList.contains('hidden')) {
            const nhmFields = [
                { id: 'activitiesProposedNHM', errorMessage: 'NHM Proposed Activities are required.', maxLength: 150 },
            ];
            fieldsToValidate.push(...nhmFields);
        }
    
        const csrActivities = document.getElementById('activityDetailsCSR');
        if (csrActivities && !csrActivities.classList.contains('hidden')) {
            const csrFields = [
                { id: 'activityProposedCSR', errorMessage: 'CSR Proposed Activities are required.', maxLength: 150 },
            ];
            fieldsToValidate.push(...csrFields);
        }
    
        // Validate Each Field
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);
    
            if (!inputElement) return;
    
            if (inputElement.type === 'number') {
                const value = parseInt(inputElement.value, 10);
                if (isNaN(value) || value < (field.min || 0) || value > (field.max || Infinity)) {
                    errorElement.textContent = field.errorMessage;
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                }
            } else if (inputElement.type === 'text' || inputElement.tagName === 'TEXTAREA') {
                const value = inputElement.value.trim();
                if (!value || (field.maxLength && value.length > field.maxLength)) {
                    errorElement.textContent = field.errorMessage;
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                }
            } else if (inputElement.type === 'radio' || inputElement.type === 'checkbox') {
                const isChecked = document.querySelector(`input[name="${inputElement.name}"]:checked`);
                if (!isChecked) {
                    errorElement.textContent = field.errorMessage;
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                }
            }
        });
    
        
    
        // Validate Block Programme Management Unit
        const bpmuOptions = ['bpmu_a', 'bpmu_b', 'bpmu_c', 'bpmu_d', 'bpmu_e'];
        const isAnyBPMUChecked = bpmuOptions.some(option => document.getElementById(option).checked);
        const errorBPMU = document.getElementById('error-bpmu');
    
        if (!isAnyBPMUChecked) {
            errorBPMU.textContent = 'At least one option must be selected.';
            isValid = false;
        } else {
            errorBPMU.textContent = '';
        }
    
        const anyOtherCheckbox = document.getElementById('bpmu_e');
        const anyOtherText = document.getElementById('anyOtherText');
        const errorAnyOtherText = document.getElementById('error-anyOtherText');
    
        // Validate "Any Other" text field if "Any Other" checkbox is selected
        if (anyOtherCheckbox.checked) {
            if (!anyOtherText.value.trim() || anyOtherText.value.length > 30) {
                errorAnyOtherText.textContent = 'Please specify (max 30 characters).';
                anyOtherText.classList.add('border-red-500');
                isValid = false;
            } else {
                errorAnyOtherText.textContent = '';
                anyOtherText.classList.remove('border-red-500');
            }
        } else {
            errorAnyOtherText.textContent = '';
            anyOtherText.classList.remove('border-red-500');
        }
    
        if (!isValid) {
            alert('Please correct the errors in Section 3 before proceeding.');
        }
    
        return isValid;
    },
    section4: ()=>{
                        let isValid = true;
                // General Fields to Validate
                    const fieldsToValidate = [
                        { id: 'medical-college', errorMessage: 'Medical College data is required.' },
                        { id: 'district-hospital', errorMessage: 'District Hospital data is required.' },
                        { id: 'sub-district-hospital', errorMessage: 'Sub-District Hospital data is required.' },
                        { id: 'community-health-centre', errorMessage: 'Community Health Centre data is required.' },
                        { id: 'phc', errorMessage: 'PHC data is required.' },
                        { id: 'twenty-four-seven-phc', errorMessage: '24/7 PHC data is required.' },
                        { id: 'aam-phc', errorMessage: 'AAM-PHC data is required.' },
                        { id: 'urban-primary-health-centre', errorMessage: 'Urban Primary Health Centre data is required.' },
                        { id: 'urban-primary-health-centre-aam', errorMessage: 'Urban Primary Health Centre-AAM data is required.' },
                        { id: 'sub-centre', errorMessage: 'Sub-Centre data is required.' },
                        { id: 'aam-sub-centre', errorMessage: 'AAM Sub-Centre data is required.' },
                        { id: 'aam-urban-health-centre', errorMessage: 'AAM Urban Health Centre data is required.' },
                        { id: 'mch-wings', errorMessage: 'MCH Wings data is required.' },
                        { id: 'sncus', errorMessage: 'SNCUs data is required.' },
                        { id: 'nbsus', errorMessage: 'NBSUs data is required.' },
                        { id: 'nutritional-rehabilitation-centres', errorMessage: 'Nutritional Rehabilitation Centres data is required.' },
                        { id: 'afhcs', errorMessage: 'AFHCs data is required.' },
                        { id: 'bsu-bb', errorMessage: 'Blood Storage Unit (BSU) / Blood Bank (BB) data is required.' }
                    ];
                    if (!validateFields(fieldsToValidate, "Section 4")) {
                        isValid = false;
                    }



                // Additional Fields Validation
                const additionalFields = [
                    { id: "deliverypoints", min: 0, max: 50, errorMessage: "Delivery Points must be between 0 and 50." },
                    { id: "ambulancecount", min: 0, max: 50, errorMessage: "Ambulance Count must be between 0 and 50." },
                    { id: "bedscount", min: 0, max: 250, errorMessage: "Beds Count must be between 0 and 250." },
                    { id: "coldchainpoints", min: 0, max: 100, errorMessage: "Cold Chain Points must be between 0 and 100." }
                ];


                additionalFields.forEach(input => {
                    const inputElement = document.getElementById(input.id);
                    const errorElement = document.getElementById(`error-${input.id}`);
                    if (!inputElement.value.trim() || inputElement.value < input.min || inputElement.value > input.max) {
                        errorElement.textContent = input.errorMessage;
                        inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                        inputElement.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                        isValid = false;
                    } else {
                        errorElement.textContent = "";
                        inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                        inputElement.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                    }
                });



                // Display Alert if Validation Fails
                if (!isValid) {
                    alert("Please fix errors in Section 4 before proceeding.");
                }

                return isValid;

                },
    section5: () => {
        let isValid = true;

        const section5Fields = [
                { id: 'regular-Gynaecologist', errorMessage: 'Regular Gynaecologist data is required.' },
                { id: 'contractual-Gynaecologist', errorMessage: 'Contractual Gynaecologist data is required.' },
                { id: 'regular-Anaesthetist', errorMessage: 'Regular Anaesthetist data is required.' },
                { id: 'contractual-Anaesthetist', errorMessage: 'Contractual Anaesthetist data is required.' },
                { id: 'regular-Paediatricians', errorMessage: 'Regular Paediatricians data is required.' },
                { id: 'contractual-Paediatricians', errorMessage: 'Contractual Paediatricians data is required.' },
                { id: 'regular-GeneralSurgeon', errorMessage: 'Regular General Surgeon data is required.' },
                { id: 'contractual-GeneralSurgeon', errorMessage: 'Contractual General Surgeon data is required.' },
                { id: 'regular-generalmedicine', errorMessage: 'Regular General Medicine data is required.' },
                { id: 'contractual-generalmedicine', errorMessage: 'Contractual General Medicine data is required.' },
                { id: 'regular-MO', errorMessage: 'Regular MO data is required.' },
                { id: 'contractual-MO', errorMessage: 'Contractual MO data is required.' },
                { id: 'regular-CHO', errorMessage: 'Regular CHO data is required.' },
                { id: 'contractual-CHO', errorMessage: 'Contractual CHO data is required.' },
                { id: 'regular-Pharmacists', errorMessage: 'Regular Pharmacists data is required.' },
                { id: 'contractual-Pharmacists', errorMessage: 'Contractual Pharmacists data is required.' },
                { id: 'regular-LabTechnician', errorMessage: 'Regular Lab Technician data is required.' },
                { id: 'contractual-LabTechnician', errorMessage: 'Contractual Lab Technician data is required.' },
                { id: 'regular-ANM', errorMessage: 'Regular ANM data is required.' },
                { id: 'contractual-ANM', errorMessage: 'Contractual ANM data is required.' },
                { id: 'regular-dataentryoperators', errorMessage: 'Regular Data Entry Operators data is required.' },
                { id: 'contractual-dataentryoperators', errorMessage: 'Contractual Data Entry Operators data is required.' },
                { id: 'regular-netp', errorMessage: 'Regular NETP STS / Block In-Charge data is required.' },
                { id: 'contractual-netp', errorMessage: 'Contractual NETP STS / Block In-Charge data is required.' },
                { id: 'regular-netps', errorMessage: 'Regular NETP STLS / Block In-Charge data is required.' },
                { id: 'contractual-netps', errorMessage: 'Contractual NETP STLS / Block In-Charge data is required.' },
                { id: 'regular-StaffNurse', errorMessage: 'Regular Staff Nurse data is required.' },
                { id: 'contractual-StaffNurse', errorMessage: 'Contractual Staff Nurse data is required.' },
                { id: 'regular-ASHA', errorMessage: 'Regular ASHA data is required.' },
                { id: 'contractual-ASHA', errorMessage: 'Contractual ASHA data is required.' }
            ];
            
            // Add other fields as necessary for section 5
        
    
        return validateFields(section5Fields, "Section 5");
        // Get all sanctioned and available fields
        // const sanctionedFields = document.querySelectorAll('input[id$="-sanctioned"]');
        // const availableFields = document.querySelectorAll('input[id$="-available"]');

        // sanctionedFields.forEach((sanctionedInput) => {
        //     // Validate sanctionedInput ID format
        //     const idParts = sanctionedInput.id.split('-');
        //     // if (idParts.length < 3) {
        //     //     console.error("Invalid ID format for sanctioned input:", sanctionedInput.id);
        //     //     return;
        //     // }

        //     const type = idParts[0]; // e.g., "regular" or "contractual"
        //     const role = idParts[1]; // e.g., "MO", "DentalMO", etc.
        //     const availableInput = document.getElementById(`${type}-${role}-available`);
        //     const errorSanctioned = document.getElementById(`error-${sanctionedInput.id}`);
        //     const errorAvailable = availableInput ? document.getElementById(`error-${availableInput.id}`) : null;


        //             // Logs for debugging
        //     console.log("Sanctioned Value:", sanctionedInput.value);
        //     console.log("Available Input:", availableInput ? availableInput.value : "No available input");
        //     console.log("ErrorSanctioned Element:", errorSanctioned);
        //     console.log("ErrorAvailable Element:", errorAvailable);

        //     // if (!availableInput) {
        //     //     console.error(`Available input not found for ID: ${type}-${role}-available`);
        //     //     return;
        //     // }

        //     // if (!errorSanctioned) {
        //     //     console.error(`Error element not found for sanctioned input: error-${sanctionedInput.id}`);
        //     // }

        //     // if (!errorAvailable) {
        //     //     console.error(`Error element not found for available input: error-${availableInput.id}`);
        //     // }

        //     // Validation for sanctioned field
        //     const sanctionedValue = parseInt(sanctionedInput.value, 10);
        //     if (isNaN(sanctionedValue) || sanctionedValue <= 0) {
        //         isValid = false;
        //         if (errorSanctioned) errorSanctioned.textContent = 'Sanctioned value must be greater than 0.';
        //         sanctionedInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        //         sanctionedInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
        //         if (availableInput) {
        //             availableInput.setAttribute('disabled', true);
        //             availableInput.value = ''; // Clear the available field
        //         }
        //     } else {
        //         if (errorSanctioned) errorSanctioned.textContent = '';
        //         sanctionedInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        //         sanctionedInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
        //         if (availableInput) availableInput.removeAttribute('disabled'); // Enable the available input
        //     }

        //     // Validation for available field
        //     if (!isNaN(sanctionedValue) && sanctionedValue > 0) {
        //         const availableValue = parseInt(availableInput.value, 10);
        //         if (!availableValue || isNaN(availableValue) || availableValue <= 0 || availableValue > sanctionedValue) {
        //             isValid = false;
        //             if (errorAvailable) errorAvailable.textContent = `Available value must be between 1 and ${sanctionedValue}.`;
        //             availableInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        //             availableInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
        //         } else {
        //             if (errorAvailable) errorAvailable.textContent = '';
        //             availableInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        //             availableInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
        //         }
        //     }
        // });

        if (!isValid) {
            alert('Please correct the errors in Section 5 before proceeding.');
        }

        return isValid;
},


}

function validateAndNext(section) {
    if (validations[`section${section}`]()) {
        document.getElementById(`section${section}`).classList.add('hidden');
        const nextSection = document.getElementById(`section${section + 1}`);
        if (nextSection) {
            nextSection.classList.remove('hidden');
        }
    }
}



document.querySelectorAll('input, select, textarea, checkbox').forEach(element => {
    element.addEventListener('input', event => {


        const errorElement = document.getElementById(`error-${event.target.id}`);
        if (!errorElement) return;
        // Email Validation
        if (event.target.type === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(event.target.value)) {
                errorElement.textContent = "Please enter a valid email address.";
            } else {
                errorElement.textContent = "";
            }
        }
        // Phone Number Validation
        if (event.target.type === "tel") {
            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(event.target.value)) {
                errorElement.textContent =
                    "Phone number must start with 6-9 and be exactly 10 digits.";
            } else {
                errorElement.textContent = "";
            }
            if (event.target.value.length > 10) {
                event.target.value = event.target.value.slice(0, 10);
            }
        }



        // Handle number inputs dynamically
        if (event.target.type === 'number') {
            const inputConfig = {
                villagesCovered: { min: 0, max: 150 },
                totalPHC: { min: 0, max: 50 },
                totalCHC: { min: 0, max: 20 },
                totalSubCenter: { min: 0, max: 100 },
                totalPHC1: { min: 0, max: 50 },
                totalCHC1: { min: 0, max: 20 },
                totalSubCenter1: { min: 0, max: 100 },
                anganwadiCentres: { min: 0, max: 150 },
                populationCovered: { min: 50000, max: 1000000 },
                totalEligibleCouple: { min: 0, max: 100000 },
                totalPregnantWomen: { min: 0, max: 99999 },
                totalLiveBirth: { min: 0, max: 99999 },
                children0to1: { min: 0, max: 99999 },
                populationAbove30: { min: 0, max: 99999 },
                pmjayCardIssued: { min: 0, max: 99999 },
                abhaCardGenerated: { min: 0, max: 99999 },
                jsskBeneficiary: { min: 0, max: 15000 },
                jsyBeneficiary: { min: 0, max: 15000 },
                ntepBeneficiary: { min: 0, max: 15000 },
                deliverypoints: {min: 0, max: 50},
                ambulancecount:{ min: 0, max: 50}, 
                bedscount: {min: 0, max: 250}, 
                coldchainpoints: {min : 0 ,max:100},
                "medical-college-sanctioned":{min:0,max:20},
                "medical-college-functional":{min:0,max:20},
                "district-hospital-sanctioned" :{min:0,max:5},
                "district-hospital-functional" :{min:0,max:5},
                
                "sub-district-hospital-sanctioned":{min:0,max:5},
                "sub-district-hospital-functional":{min:0,max:5},
            
                "community-health-centre-sanctioned": { min: 0, max: 25 },
                "community-health-centre-functional": { min: 0, max: 25 },
                "fru-community-health-centre-sanctioned": { min: 0, max: 25 },
                "fru-community-health-centre-functional": { min: 0, max: 25 },
                "phc-sanctioned": { min: 0, max: 50 },
                "phc-functional": { min: 0, max: 50 },
                "twenty-four-seven-phc-sanctioned": { min: 0, max: 50 },
                "twenty-four-seven-phc-functional": { min: 0, max: 50 },
                "aam-phc-sanctioned": { min: 0, max: 50 },
                "aam-phc-functional": { min: 0, max: 50 },
                "twenty-four-seven-aam-phc-sanctioned" :  { min: 0, max: 50 },
                "twenty-four-seven-aam-phc-functional" :  { min: 0, max: 50 },
                "urban-primary-health-centre-sanctioned": { min: 0, max: 50 },
                "urban-primary-health-centre-functional": { min: 0, max: 50 },
                "urban-primary-health-centre-aam-sanctioned": { min: 0, max: 50 },
                "urban-primary-health-centre-aam-functional": { min: 0, max: 50 },
                "sub-centre-sanctioned": { min: 0, max: 100 },
                "sub-centre-functional": { min: 0, max: 100 },
                "aam-sub-centre-sanctioned": { min: 0, max: 100 },
                "aam-sub-centre-functional": { min: 0, max: 100 },
                "aam-urban-health-centre-sanctioned": { min: 0, max: 100 },
                "aam-urban-health-centre-functional": { min: 0, max: 100 },
                "mch-wings-sanctioned": { min: 0, max: 50 },
                "mch-wings-functional": { min: 0, max: 50 },
                "sncus-sanctioned": { min: 0, max: 50 },
                "sncus-functional": { min: 0, max: 50 },
                "nbsus-sanctioned": { min: 0, max: 50 },
                "nbsus-functional": { min: 0, max: 50 },
                "nutritional-rehabilitation-centres-sanctioned": { min: 0, max: 100 },
                "nutritional-rehabilitation-centres-functional": { min: 0, max: 100 },
                "afhcs-sanctioned": { min: 0, max: 100 },
                "afhcs-functional": { min: 0, max: 100 },
                "bsu-bb-sanctioned": { min: 0, max: 100 },
                "bsu-bb-functional": { min: 0, max: 100 },



                "regular-Gynaecologist-sanctioned" : {min:0,max:5},
                "regular-Gynaecologist-available" :  {min:0,max:5},
                "contractual-Gynaecologist-sanctioned" : {min:0,max:5},
                "contractual-Gynaecologist-available" :  {min:0,max:5},
                "regular-Anaesthetist-sanctioned" : {min:0, max:5},
                "regular-Anaesthetist-available" : {min:0, max:5},
                "contractual-Anaesthetist-sanctioned" : {min:0, max:5},
                "contractual-Anaesthetist-available" : {min:0, max:5},
                "regular-Paediatricians-sanctioned" : {min:0, max:5},
                "regular-Paediatricians-available" : {min:0, max:5},
                "contractual-Paediatricians-sanctioned" : {min:0, max:5},
                "contractual-Paediatricians-available" : {min:0, max:5},
                "regular-GeneralSurgeon-sanctioned" : {min:0, max:5},
                "regular-GeneralSurgeon-available" : {min:0, max:5},
                "contractual-GeneralSurgeon-sanctioned" : {min:0, max:5},
                "contractual-GeneralSurgeon-available" : {min:0, max:5},
                "regular-MO-sanctioned" : {min:0, max:10},
                "regular-MO-available" : {min:0, max:10},
                "contractual-MO-sanctioned" : {min:0, max:10},
                "contractual-MO-available" : {min:0, max:10},
                "regular-generalmedicine-sanctioned": {min: 0, max: 10},
                "regular-generalmedicine-available": {min: 0, max: 10},
                "contractual-generalmedicine-sanctioned": {min: 0, max: 10},
                "contractual-generalmedicine-available": {min: 0, max: 10},

                "regular-CHO-sanctioned" : {min:0, max:10},
                "regular-CHO-available" : {min:0, max:10},
                "contractual-CHO-sanctioned" : {min:0, max:10},
                "contractual-CHO-available" : {min:0, max:10},
                "regular-Pharmacists-sanctioned" : {min:0, max:10},
                "regular-Pharmacists-available" : {min:0, max:10},
                "contractual-Pharmacists-sanctioned" : {min:0, max:10},
                "contractual-Pharmacists-available" : {min:0, max:10},
                "regular-LabTechnician-sanctioned" : {min:0, max:10},
                "regular-LabTechnician-available" : {min:0, max:10},
                "contractual-LabTechnician-sanctioned" : {min:0, max:10},
                "contractual-LabTechnician-available" : {min:0, max:10},
                "regular-ANM-sanctioned" : {min:0, max:5},
                "regular-ANM-available" : {min:0, max:5},
                "contractual-ANM-sanctioned" : {min:0, max:5},
                "contractual-ANM-available" : {min:0, max:5},
                "regular-dataentryoperators-sanctioned": {min: 0, max: 5},
                "regular-dataentryoperators-available": {min: 0, max: 5},
                "contractual-dataentryoperators-sanctioned": {min: 0, max: 5},
                "contractual-dataentryoperators-available": {min: 0, max: 5},
                "regular-netp-sanctioned": {min: 0, max: 5},
                "regular-netp-available": {min: 0, max: 5},
                "contractual-netp-sanctioned": {min: 0, max: 5},
                "contractual-netp-available": {min: 0, max: 5},
                "regular-netps-sanctioned": {min: 0, max: 5},
                "regular-netps-available": {min: 0, max: 5},
                "contractual-netps-sanctioned": {min: 0, max: 5},
                "contractual-netps-available": {min: 0, max: 5},
                "regular-StaffNurse-sanctioned": {min: 0, max: 50},
                "regular-StaffNurse-available": {min: 0, max: 50},
                "contractual-StaffNurse-sanctioned": {min: 0, max: 50},
                "contractual-StaffNurse-available": {min: 0, max: 50},
                "regular-ASHA-sanctioned": {min: 0, max: 100},
                "regular-ASHA-available": {min: 0, max: 100},
                "contractual-ASHA-sanctioned": {min: 0, max: 100},
                "contractual-ASHA-available": {min: 0, max: 100},

















                                        


            }
            [event.target.id];
        
            const value = parseInt(event.target.value, 10);
            if (!event.target.value.trim() || isNaN(value) || value < inputConfig.min || value > inputConfig.max) {
                errorElement.textContent = `Value must be between ${inputConfig.min} and ${inputConfig.max}.`;
                event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else {
                errorElement.textContent = '';
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        
        }
        // Handle text inputs dynamically
        else if (event.target.type === 'text' || event.target.tagName === 'TEXTAREA') {
            const textConfig = {
                bmoname: { minLength: 2, maxLength: 30 },
                // anyOtherText ; {},

            }[event.target.id];

            if (textConfig) {
                const value = event.target.value.trim();
                if (!value || value.length < textConfig.minLength || value.length > textConfig.maxLength) {
                    errorElement.textContent = `Text must be between ${textConfig.minLength} and ${textConfig.maxLength} characters.`;
                    event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                } else {
                    errorElement.textContent = '';
                    event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                }
            }
        }

        // Handle select inputs dynamically
        else if (event.target.type === 'checkbox' || event.target.tagName === 'SELECT') {
            const isCheckbox = event.target.type === 'checkbox';
            if (isCheckbox && event.target.checked) {
                errorElement.textContent = '';
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else if (!isCheckbox && event.target.value.trim()) {
                errorElement.textContent = '';
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else {
                errorElement.textContent = 'This field is required.';
                event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
            }
            const sanctionedFieldMatch = event.target.id.match(/(regular|contractual)-(.*?)-(sanctioned|available)/);
            if (sanctionedFieldMatch) {
                const [_, type, role, fieldType] = sanctionedFieldMatch;
                const sanctionedInput = document.getElementById(`${type}-${role}-sanctioned`);
                const availableInput = document.getElementById(`${type}-${role}-available`);
                //const trainingContainer = document.getElementById(`trainingsContainer-${role}`);
               // const trainingContainer = document.getElementById(`trainingsContainer-${role}`);
              //  console.log('Training Container:', trainingContainer);
    
    
    
                if (fieldType === 'sanctioned') {
                    const sanctionedValue = parseInt(event.target.value, 10);
                    if (isNaN(sanctionedValue) || sanctionedValue <= 0) {
                        availableInput.setAttribute('disabled', true);
                        availableInput.value = ''; // Clear available field
                        errorElement.textContent = 'Sanctioned value must be greater than 0.';
                    } else {
                        availableInput.removeAttribute('disabled'); // Enable available input
                        //errorElement.textContent = '';
                    }
                } else if (fieldType === 'available') {
                    const sanctionedValue = parseInt(sanctionedInput?.value || 0, 10);
                    const availableValue = parseInt(event.target.value, 10);
                    if (isNaN(availableValue) || availableValue <= 0 || availableValue > sanctionedValue) {
                        errorElement.textContent = `Count should not exceed the ${sanctionedValue} count`;
                    } else {
                        errorElement.textContent = '';
                    }
                }
            }
    
        });

     
    
        element.addEventListener('change', event => {
            const errorElement = document.getElementById(`error-${event.target.id}`);
            const { id, value } = event.target;

            // Validate on change for all inputs
            if (errorElement && event.target.value.trim() !== "") {
                errorElement.textContent = "";
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }

            // Toggle VHND Section for specific input
            if (id === 'nqasCertification') {
                toggleVisibility('nqasDetails', value === 'Yes');
            }

            // Handle BPHU Setup toggle
            if (id === 'bphuSetup') {
                toggleVisibility('functionalComponentsSection', value === 'Yes');
            }
           

        });
    });



function toggleVisibility(elementId, shouldShow) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden', !shouldShow);
    }
}




function toggleAnyOtherField() {
    const anyOtherCheckbox = document.getElementById("bpmu_e");
    const anyOtherField = document.getElementById("anyOtherField");
    const anyOtherText = document.getElementById("anyOtherText");

    if (anyOtherCheckbox.checked) {
        anyOtherField.classList.remove("hidden");
        anyOtherText.required = true;
    } else {
        anyOtherField.classList.add("hidden");
        anyOtherText.value = ""; // Clear input field
        anyOtherText.required = false;
        document.getElementById("error-anyOtherText").textContent = ""; // Clear error message
    }
}
function validateInput(id, min, max) {
    const field = document.getElementById(id);
    const errorField = document.getElementById(`error-${id}`);
    const value = parseInt(field.value, 10);

    if (isNaN(value) || value < min || value > max) {
        errorField.textContent = `Value must be between ${min} and ${max}.`;
        field.classList.add("border-red-500");
        return false;
    } else {
        errorField.textContent = "";
        field.classList.remove("border-red-500");
        return true;
    }
}




