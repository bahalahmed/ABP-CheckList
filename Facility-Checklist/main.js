// Function to generate a unique ID
function generateUniqueId() {
    return crypto.randomUUID(); // Using modern UUID generation
}

// Initialize or retrieve form data from localStorage
let formData = JSON.parse(localStorage.getItem('formData')) || {};

// Ensure UUID exists in localStorage
if (!formData.id) {
    formData.id = generateUniqueId();
    formData.apiUrl = `http://localhost:3000/checklistapi/${formData.id}`; // Simulated API link
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Retrieve current section from localStorage or default to Section 1
let currentSection = parseInt(localStorage.getItem('currentSection') || '1', 10);
showSection(currentSection);

// Save data for the current section in localStorage
function saveSectionData(section) {
    const sectionElement = document.getElementById(`section${section}`);
    const inputs = sectionElement.querySelectorAll('input, select, textarea');

    formData[`section${section}`] = formData[`section${section}`] || {};

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[`section${section}`][input.id] = input.checked;
        } else {
            formData[`section${section}`][input.id] = input.value;
        }
    });

    // Save updated formData to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log(`Section ${section} data saved:`, formData[`section${section}`]);
}


const validations = {
    section1: () => {
        let isValid = true;

        // General Details Validation
        const fieldsToValidate = [
            {id: 'dateOfVisit', errorMessage: 'Date of Visit is required.' },
            {id: 'district', errorMessage: 'District selection is required.' },
            {id: 'block', errorMessage: 'Block selection is required.' },
            {id: 'facilityType', errorMessage: 'Facility Type is required.' },
            {id: 'facilityName', errorMessage: 'Facility Name is required.' },
            {id:'facilityLevel', errorMessage: 'Facility Level is required.'},
            {id: 'facilityInCharge', errorMessage: 'Facility In-charge is required.'},
            {id: 'designation', errorMessage: 'Facility In-charge Designation is required.'},
            {id: 'populationCovered', errorMessage: 'Population Covered must be between 50,000 and 1,000,000.'},
            {id:'nqasCommittee', errorMessage: 'NQAS Committee is required.'},
            {id:'teleconsultation', errorMessage: 'Teleconsultation is required.'},
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
        const numberInputs = [
                { id: 'populationCovered', min: 4000, max: 500000, errorMessage: 'Population Covered must be between 50000 and 100000.' },
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
            { id: 'building', errorMessage: 'Building selection is required.' },
            {id: 'waterFacility', errorMessage: 'Water Facility selection is required.' },
            { id: 'roadAccessibility', errorMessage: 'Road Accessibility selection is required.' },
            { id: 'powerBackup', errorMessage: '24X7 Power Backup selection is required.' },
            { id: 'waitingArea', errorMessage: 'Patient Waiting Area selection is required.' },
            { id: 'separateToilets', errorMessage: 'Separate Toilets selection is required.' },
            { id: 'totalBeds', min: 15, max: 500, errorMessage: 'Total Number of Beds must be between 15 and 500.' },
            { id: 'totalLaborTables', min: 0, max: 50, errorMessage: 'Total Number of Labor Tables must be between 0 and 50.' },
            { id: 'laborRoom', errorMessage: 'Functional Labor Room selection is required.' },
            { id: 'internetConnectivity', errorMessage: 'Internet Connectivity selection is required.' },
            { id: 'runningWater', errorMessage: '24X7 Running Water Facility selection is required.' },
            { id: 'yogaSpace', errorMessage: 'Space for Yoga/Health Promotion selection is required.' },
            { id: 'radiantWarmer', errorMessage: 'Functional Radiant Warmer selection is required.' },
            { id: 'rchPortal', errorMessage: 'Operational RCH Portal selection is required.' },
            { id: 'anmolApp', errorMessage: 'Operational ANMOL App selection is required.' },
            { id: 'brandingCompleted', errorMessage: 'Branding Completed selection is required.' },
            { id: 'residentialFacility', errorMessage: 'Residential Facility selection is required.' },
            { id: 'privacyDuringExamination', errorMessage: 'Privacy During Patient Examination selection is required.' },
            { id: 'desktopAvailable', errorMessage: 'Desktop/Laptop/Tablet availability selection is required.' },
            { id: 'linkagesFacilities', errorMessage: 'Linkages with Higher Facilities selection is required.' },
            { id: 'afhcAvailable', errorMessage: 'AFHC Availability selection is required.' },
            { id: 'biomedicalWaste', errorMessage: 'Biomedical Waste Management selection is required.' },
            { id: 'drugStorage', errorMessage: 'Space for Drug Storage selection is required.' },
            { id: 'dotsCenter', errorMessage: 'DOTS Center selection is required.' },
            {id:'mchBeds', errorMessage: 'MCH Beds selection is required.' },
            {id:'bloodBank', errorMessage: 'Blood Bank selection is required.' },
            {id:'sncuNbsuAvailable', errorMessage: 'SNCU/NBSU Available selection is required.' },
            {id:'totalBedsSncuNbsu', errorMessage: 'Total Beds in SNCU/NBSU must be between 0 and 50.' },
            {id:'nrcMtcCentre', errorMessage: 'NRC/MTC Centre selection is required.' },
            {id:'nrcMtcBeds', errorMessage: 'Total Beds in NRC/MTC Centre must be between 0 and 100.' },
            {id:'functionalLab', errorMessage: 'Functional Lab selection is required.' },
        ];

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

        // Get all sanctioned and available fields
        const sanctionedFields = document.querySelectorAll('input[id$="-sanctioned"]');
        const availableFields = document.querySelectorAll('input[id$="-available"]');
        
        sanctionedFields.forEach((sanctionedInput) => {
            const idParts = sanctionedInput.id.split('-'); // Extract type and role
            const type = idParts[0]; // e.g., "regular" or "contractual"
            const role = idParts[1]; // e.g., "MO", "DentalMO", etc.
            const availableInput = document.getElementById(`${type}-${role}-available`);
            const trainingContainer = document.getElementById(`${role.toLowerCase()}TrainingsContainer`);
            const errorSanctioned = document.getElementById(`error-${sanctionedInput.id}`);
            const errorAvailable = document.getElementById(`error-${availableInput.id}`);
        
            // Validation for sanctioned field
            const sanctionedValue = parseInt(sanctionedInput.value, 10);
            const availableValue = parseInt(availableInput.value, 10);
        
            let hasValidSanctioned = false;
            let hasValidAvailable = false;
        
            if (sanctionedValue > 0) {
                errorSanctioned.textContent = '';
                sanctionedInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                availableInput.removeAttribute('disabled'); // Enable the available input
                hasValidSanctioned = true;
            } else {
                errorSanctioned.textContent = 'Sanctioned value must be greater than 0.';
                sanctionedInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                availableInput.setAttribute('disabled', true);
                availableInput.value = ''; // Clear the available field
            }
        
            // Validation for available field
            if (availableValue > 0 && availableValue <= sanctionedValue) {
                errorAvailable.textContent = '';
                availableInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                availableInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                hasValidAvailable = true;
        
                // Show training container if available > 0
                if (trainingContainer) {
                    trainingContainer.style.display = 'block';
                }
            } else if (sanctionedValue > 0) {
                errorAvailable.textContent = `Available value must be greater than 0 and less than or equal to ${sanctionedValue}.`;
                availableInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                availableInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                if (trainingContainer) {
                    trainingContainer.style.display = 'none'; // Hide the training container
                }
            }
        
            // If neither field is valid, mark the form as invalid
            if (!hasValidSanctioned && !hasValidAvailable) {
                isValid = false;
                if (trainingContainer) {
                    trainingContainer.style.display = 'none'; // Hide the training container
                }
            }
        });
        
        if (!isValid) {
            alert('Please correct the errors in Section 3 before proceeding.');
        }
        
        return isValid;
        
    },
    section4: () => {
        let isValid = true;

        // List of fields to validate
        const fieldsToValidate = [
            // OPD and IPD load
            { id: 'opdLoad', min: 10, max: 1000, errorMessage: 'OPD Load must be between 10 and 10000.' },
            { id: 'ipdLoad', min: 10, max: 5000, errorMessage: 'IPD Load must be between 10 and 5000.' },
            { id: 'teleConsultations', min: 0, max: 50000, errorMessage: 'Tele Consultations must be between 0 and 50000.' },

            // Maternal Child Health
            { id: 'pregnantFirstTrimester', min: 0, max: 500, errorMessage: 'Pregnant Women Registered in First Trimester must be between 0 and 1000.' },
            { id: 'pregnant4ANC', min: 0, max: 1000, errorMessage: 'Pregnant Women Received 4 ANC Check-ups must be between 0 and 1000.' },
            { id: 'ifaTablets', min: 0, max: 1000, errorMessage: 'Pregnant Women Given IFA Tablets must be between 0 and 1000.' },
            { id: 'calciumTablets', min: 0, max: 1000, errorMessage: 'Pregnant Women Given Calcium Tablets must be between 0 and 1000.' },
            { id: 'albendazoleTablets', min: 0, max: 1000, errorMessage: 'Pregnant Women Given Albendazole Tablets must be between 0 and 1000.' },
            { id: 'highRiskPregnancies', min: 0, max: 1000, errorMessage: 'High Risk Pregnancies Identified must be between 0 and 1000.' },
            { id: 'cSection', min: 0, max: 500, errorMessage: 'C section must be between 0 and 500.' },
            { id: 'highRiskReferred', min: 0, max: 1000, errorMessage: 'High Risk Pregnancies Referred Out must be between 0 and 500.' },
            { id: 'deliveriesConducted', min: 0, max: 1000, errorMessage: 'Deliveries Conducted must be between 0 and 1000.' },
            { id: 'liveBirths', min: 0, max: 300, errorMessage: 'Live Births must be between 0 and 300.' },
            { id: 'stillBirths', min: 0, max: 300, errorMessage: 'Still Births must be between 0 and 300.' },
            { id: 'lowBirthWeightBabies', min: 0, max: 250, errorMessage: 'Low Birth Weight Babies must be between 0 and 250.' },
            { id: 'sickNewbornsReferred', min: 0, max: 500, errorMessage: 'Newborns Provided must be between 0 and 500.' },
            { id: 'iucdInsertions', min: 0, max: 250, errorMessage: 'Inborn Admission must be between 0 and 250.' },
            { id: 'ppiucdInsertions', min: 0, max: 500, errorMessage: 'Outburn Admission must be between 0 and 500.' },
            { id: 'adolescentsCounseled', min: 0, max: 1000, errorMessage: 'Deaths in out must be between 0 and 1000.' },
            { id: 'hepatitisVaccines', min: 0, max: 1000, errorMessage: 'Abortions  must be between 0 and 1000.' },

            { id: 'postAbortionFamilyPlanning', min: 0, max: 1000, errorMessage: 'Post Abortion must be between 0 and 1000.' },
            { id: 'injectableContraceptiveAntara', min: 0, max: 1000, errorMessage: 'Injectable Contraceptive (Antara) must be between 0 and 1000.' },
            { id: 'ppiucd', min: 0, max: 500, errorMessage: 'PPIUCD must be between 0 and 500.' },
            { id: 'childrenARI', min: 0, max: 500, errorMessage: 'Under 5 Children Diagnosed with ARI must be between 0 and 500.' },
            { id: 'treatedDiarrhea', min: 0, max: 500, errorMessage: 'Under 5 Children Treated for Diarrhoea with ORS and Zinc must be between 0 and 500.' },

            // NCDs 
            { id: 'targetPopulationNCD', min: 0, max: 2000, errorMessage: 'Target for population must be between 0 and 2000.' },
            { id: 'ncdScreeningCompleted', min: 0, max: 2000, errorMessage: 'OPD must be between 0 and 2000.' },
            { id: 'cbacFilled', min: 0, max: 2000, errorMessage: 'value must be between 0 and 2000.' },
            { id: 'ncdScreenedPositive', min: 0, max: 2000, errorMessage: 'Patients on NCD(Screened Positive) must be between 0 and 2000.' },
            { id: 'ncdDiagnosedHypertension', min: 0, max: 2000, errorMessage: ' Value must be between 0 and 2000.' },
            { id: 'ncdDiagnosedDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdDiagnosedCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentHypertension', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id : 'ncdReferredHypertension', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdReferredDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' }, 
            { id: 'ncdReferredCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            {id:'highRiskManaged', min: 0, max: 1000, errorMessage: 'Value must be between 0 and 2000.' },
            {id:'highRiskLaborReferred', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
          //  {id:'deliveriesConducted', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            {id:'postPartumSterilization', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            {id:'childrenAdmittedNRC', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            {id:'adolescentsCounseledAFHC', min: 0, max: 1000, errorMessage: 'Value must be between 0 and 2000'},

            //NTEP
            {id:'cbnaatTests', min: 0, max: 2000, errorMessage: 'CBNAAT Tests must be between 0 and 2000.'},
            {id:'sputumMicroscopy', min: 0, max: 2000, errorMessage: 'Sputum Microscopy must be between 0 and 2000.'},
            {id:'tbDiagnosedPatients', min: 0, max: 2000, errorMessage: 'TB Diagnosed must be between 0 and 2000.'},
            {id:'tbDrugRegimePatients', min: 0, max: 2000, errorMessage: 'TB Drug Regime Patients must be between 0 and 2000.'},
        ];

        // Validate each field
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (inputElement && (!inputElement.value || isNaN(inputElement.value) || inputElement.value < field.min || inputElement.value > field.max)) {
                errorElement.textContent = field.errorMessage;
                inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                isValid = false;
            } else if (inputElement) {
                errorElement.textContent = '';
                inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section5: () => {
        let isValid = true;

        // List all field IDs in Section 5
        const fieldsToValidate = [
            { id: 'diagnosticsTestConducted', min: 0, max: 250, errorMessage: 'Diagnostics test conducted in facility must be between 0 and 250.' },
            {id: 'injTd',errorMessage: 'Inj. TD selection is required.'},
            {id: 'injMgSulph', errorMessage: 'Inj. Mg Sulphate selection is required.'},
            {id: 'injectableMPA', errorMessage: 'Inj. Labetalol selection is required.'},
            {id:'injOxytocin', errorMessage: 'Inj. Oxytocin selection is required.'},
            {id: 'injIronSucrose', errorMessage: 'Inj. Iron Sucrose selection is required.'},
            {id: 'injDexamethasone', errorMessage: 'Inj. Dexamethasone selection is required.'},
            {id: 'tabCalcium', errorMessage: ' Tab. Alpha Methyldopa selection is required.'},
            {id: 'tabIFA', errorMessage: 'Tab. IFA selection is required.'},
            {id: 'antihistamines', errorMessage: 'Syp. Nevirapine selection is required.'},
            {id:  'vitaminK1', errorMessage: 'Vitamin K1 selection is required.'},
            {id: 'antiseptics', errorMessage: 'Dual testing kit for HIV/syphilis selection is required.'},
            {id: 'antihypertensives', errorMessage: 'Antihypertensives selection is required.'},
            {id: 'antidiabetics', errorMessage: 'Antidiabetics selection is required.'},
            {id :'ecPills', errorMessage: 'Adrenaline selection is required.'},
            {id :'tabMisoprostol', errorMessage: 'Tab. Misoprostol selection is required.'},
            {id :'antiTbDrugs', errorMessage: 'Dual testing kit for HIV/syphilis selection is required.'},
            {id: 'zincTablets', errorMessage: ' Are drugs available under Mukhyamantri nishulk Dava yojana? selection is required.'},
            {id: 'paracetamol', errorMessage: 'Injectable Contraceptive (Antara Programme selection is required).'},
            {id: 'tabAlbendazole', errorMessage: 'Tab. Nifedipine selection is required.'},
           // {id: 'antibiotics', errorMessage: 'Antibiotics selection is required.'},
           // {id: 'orsSachets', errorMessage: 'ORS Sachets selection is required.'},
            {id: 'ipv',  errorMessage: 'IPV selection is required.'},
           // {id: 'rotaVirus', errorMessage: 'Rota Virus selection is required.'},
            {id: 'bcg', errorMessage: 'BCG selection is required.'},
            {id: 'pentavalent', errorMessage: 'Pentavalent selection is required.'},
            //{id: 'japaneseEncephalitis', errorMessage: 'Japanese Encephalitis selection is required.'},
            {id: 'hepatitisB', errorMessage: 'Hepatitis B selection is required.'},
            {id:'opv', errorMessage: 'OPV selection is required.'},
           // {id: 'dpt', errorMessage: 'DPT selection is required.'},
            {id: 'measlesRubella', errorMessage: 'Measles Rubella selection is required.'},
           // {id: 'antiRabiesVaccine', errorMessage: 'Anti Rabies Vaccine selection is required.'},
            {id: 'vitaminA', errorMessage: 'Vitamin A selection is required.'},
            {id: 'combinedOralContraceptives', errorMessage: 'Any stock outs selection is required.'},
            {id :'centchromanPills', errorMessage: 'Centchroman Pills selection is required.'},
            {id: 'iucd', errorMessage: 'IUCD selection is required.'},
            {id: 'mmaKit', errorMessage: 'MMA Kit selection is required.'},
            {id: 'stockOutMedicines', errorMessage: 'Stock Out Medicines selection is required.'},
          //  {id: 'maleCondoms', errorMessage:'Male Condoms selection is required.'},
          //  {id: 'sanitaryNapkins', errorMessage: 'Sanitary Napkins selection is required.'},
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
        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section6: () => {
        let isValid = true;

        // List of fields to validate
        const diagnosticFields = [
            { id: 'diagnosticsTestConducted1', min: 0, max: 250, errorMessage: 'Diagnostics test conducted in facility must be between 0 and 250.' },
            { id: 'nonFunctionalTests', min: 0, max: 250, errorMessage: 'Non-functional / Missing diagnostic tests must be between 0 and 250.' },
            { id: 'haemoglobin', errorMessage: 'Haemoglobin selection is required.' },
            { id: 'bloodSugar', errorMessage: 'Blood Sugar selection is required.' },
            { id: 'malariaSmear', errorMessage: 'VDRL selection is required.' },
            { id: 'urinePregnancyTest', errorMessage: 'Urine Pregnancy Test selection is required.' },
            { id: 'ogtt', errorMessage: 'OGTT selection is required.' },
            { id: 'urineAlbuminSugar', errorMessage: 'Urine Albumin & Sugar selection is required.' },
            { id: 'hivTesting', errorMessage: 'HIV Testing (WBFPT) selection is required.' },
            { id: 'microscopicSputumExamination', errorMessage: 'Microscopic Sputum Examination selection is required.' },
            { id: 'rapidSyphilisTest', errorMessage: 'CBNAAT Machine Test selection is required.' },
            { id: 'bloodGrouping', errorMessage: 'Blood Grouping selection is required.' },
            { id: 'stoolOvaCyst', errorMessage: ' Ultrasound selection is required.' },
           // { id: 'waterQualityTesting', errorMessage: 'Water Quality Testing selection is required.' },
          //  { id: 'wetMount', errorMessage: 'Wet mount- Direct Microscopy selection is required.' },
            //{ id: 'typhoidSerology', errorMessage: 'Typhoid serology selection is required.' },
          //  { id: 'serologyDengue', errorMessage: 'Serology for Dengue selection is required.' },
         //   { id: 'esr', errorMessage: 'ESR selection is required.' },
           // { id: 'sickleCellTesting', errorMessage: 'Sickle Cell testing selection is required.' },
            //{ id: 'tlcDlc', errorMessage: 'TLC, DLC selection is required.' },
            { id: 'serumBilirubin', errorMessage: 'X-Ray selection is required.' }
        ];

        diagnosticFields.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (!inputElement) return;

            if (inputElement.type === 'number') {
                const value = parseInt(inputElement.value, 10);
                if (isNaN(value) || value < field.min || value > field.max) {
                    errorElement.textContent = field.errorMessage;
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
            } else if (inputElement.tagName === 'SELECT') {
                if (!inputElement.value.trim()) {
                    errorElement.textContent = field.errorMessage;
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section7: () => {
        let isValid = true;
        const section7Fields = [
            { id: 'deliveryRegister', errorMessage: 'Delivery register selection is required.' },
            { id: 'referralRegister', errorMessage: 'Referral Register selection is required.' },
            { id: 'ancRegister', errorMessage: 'ANC register selection is required.' },
            { id: 'highRiskPregnancyRegister', errorMessage: 'High Risk Pregnancy register selection is required.' },
            {id: 'rchRegister', errorMessage: 'RCH register selection is required.' },
            { id: 'eligibleCoupleRegister', errorMessage: 'Eligible couple/ RCH register selection is required.' },
            { id: 'iucdServiceRegister', errorMessage: 'IUCD service delivery register selection is required.' },
            { id: 'injectableMPARegister', errorMessage: 'Laboratory register selection is required.' },
            { id: 'ncdRegisters', errorMessage: 'NCD registers selection is required.' },
            {id:  'mtpRegister', errorMessage: 'MTP register selection is required.' },
            {id:'ncuNbsuRegister', errorMessage: 'NCU/NBSU register selection is required.' },
            { id: 'telemedicineRegister', errorMessage: 'CBNAAT register selection is required.' },
            {id:'tbReferralSlips', errorMessage: 'TB referral slips selection is required.' },
            { id: 'notificationRegister', errorMessage: 'OPD register selection is required.' },
            { id: 'stockRegister', errorMessage: 'Stock register selection is required.' },
            { id: 'dueList', errorMessage: 'Due list (from MCTS portal or manual) selection is required.' },
            { id: 'vhndMicroPlans', errorMessage: 'VHND micro plans selection is required.' },
            { id: 'heightChart', errorMessage: 'Height chart selection is required.' },
            { id: 'iucdTray', errorMessage: 'MVA Kit selection is required.' },
            { id: 'sterilizedTrays', errorMessage: 'Sterilized trays selection is required.' },
            { id: 'ambuBag', errorMessage: 'Ambu Bag with mask selection is required.' },
            { id: 'bpApparatus', errorMessage: 'BP apparatus selection is required.' },
            { id: 'stethoscope', errorMessage: 'Stethoscope selection is required.' },
            { id: 'weighingScale', errorMessage: 'Weighing machine selection is required.' },
            { id: 'babyWeighingMachine', errorMessage: 'Baby Weighing machine selection is required.' },
            { id: 'fetoscope', errorMessage: 'Fetoscope selection is required.' },
            { id: 'thermometer', errorMessage: 'Thermometer selection is required.' },
            { id: 'mucusExtractor', errorMessage: 'Mucus Extractor selection is required.' },
            { id: 'ppiucdForceps', errorMessage: 'PC selection is required.' },
            { id: 'oxygenCylinder', errorMessage: 'Functional Oxygen Cylinder selection is required.' },
            { id: 'bmwBins', errorMessage: 'BMW Colour coded bins selection is required.' },
            {id:'partograph', errorMessage: 'Partograph selection is required.' },
            {id:'sterilizedTraysMH', errorMessage: 'Sterilized trays for MH selection is required.' },
            {id:'functionalRadiantWarmer', errorMessage: 'Functional Radiant Warmer selection is required.' },
            {id:'mchnMicroPlans', errorMessage: 'MCHN micro plans selection is required.' },
            {id:'mchnMicroPlans1', errorMessage: 'MCHN micro plans selection is required.' },
            {id:'nqasDepartments', errorMessage: 'NQAS Departments selection is required.' },
        ];

        // Validate each field dynamically
        section7Fields.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (!inputElement || inputElement.value.trim() === "") {
                if (errorElement) errorElement.textContent = field.errorMessage;
                if (inputElement) {
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
                isValid = false;
            } else {
                if (errorElement) errorElement.textContent = '';
                if (inputElement) {
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
            }
        });

        // Validate the checkboxes for Certification Available
        const certifications = ['kayakalp', 'laqshya', 'nqas', 'musqan', 'suman'];
        const isAnyCertificationChecked = certifications.some(cert => document.getElementById(cert).checked);
        const errorCertification = document.getElementById('error-certificationAvailable');

        if (!isAnyCertificationChecked) {
            errorCertification.textContent = 'At least one certification must be selected.';
            isValid = false;
        } else {
            errorCertification.textContent = '';
            isValid = true;
        }

        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section8: () => {
        let isValid = true;
        const section8Fields = [
            {id: 'anmAwarenessRCH', errorMessage: 'ANM Awareness on RCH selection is required.'},
            {id: 'anmAwarenessHighRisk', errorMessage: 'ANM Awareness on High Risk Pregnancy selection is required.'},
            {id: 'anmMeetingLbwBabies', errorMessage: 'ANM Meeting with LBW Babies selection is required.'},
            {id: 'staffAwarenessTBSchemes', errorMessage: 'Staff Awareness on TB Schemes selection is required.'},
            {id: 'orientationNQAS', errorMessage: 'Orientation on NQAS selection is required.'},
            {id:'nqasAssessments', errorMessage: 'NQAS Assessments selection is required.'},
            {id:'serviceProvidersQualityTools', errorMessage: 'Service Providers Quality Tools selection is required.'},
            {id:'qualityImprovementMeetings', errorMessage: 'Quality Improvement Meetings selection is required.'},
            {id:'staffAwarenessEmergency', errorMessage: 'Staff Awareness on Emergency Care selection is required.'},
            {id:'staffAwarenessNCD', errorMessage: 'Staff Awareness on NCD selection is required.'},
            {id:'serviceProvidersAwareness', errorMessage: 'Service Providers Awareness on NQAS selection is required.'},
            {id:'reviewMeeting', errorMessage: 'Review Meeting selection is required.'},            
        ];

        // Validate each field dynamically
        section8Fields.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (!inputElement || inputElement.value.trim() === "") {
                if (errorElement) errorElement.textContent = field.errorMessage;
                if (inputElement) {
                    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.remove('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
                isValid = false;
            } else {
                if (errorElement) errorElement.textContent = '';
                if (inputElement) {
                    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                    inputElement.classList.add('border-gray-300', 'focus:ring-blue-500', 'focus:border-blue-500');
                }
            }
        });
        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section9: () => {
        let isValid = true;

        // Validate that at least one checkbox is selected
        const checkboxes = document.querySelectorAll('input[name="areasOfIssue"]');
        const noneCheckbox = document.getElementById("none");
        const errorMessages = [];

        if (noneCheckbox.checked) {
            // Ensure no other checkboxes are selected
            checkboxes.forEach((checkbox) => {
                if (checkbox !== noneCheckbox && checkbox.checked) {
                    errorMessages.push("You cannot select 'None' and other options simultaneously.");
                    isValid = false;
                }
            });
        } else {
            // Ensure at least one checkbox is selected
            const atLeastOneSelected = Array.from(checkboxes).some((checkbox) => checkbox.checked);
            if (!atLeastOneSelected) {
                errorMessages.push("Please select at least one area of issue.");
                isValid = false;
            }

            // Validate Issue and Action Plan fields for each selected checkbox
            const fieldValidation = [
                { id: "serviceDelivery", issueId: "serviceDeliveryIssue", actionId: "serviceDeliveryAction", name: "Service Delivery" },
                { id: "opd", issueId: "opdIssue", actionId: "opActiond", name: "OPD" },
                { id: "laborRoomOT", issueId: "laborRoomOTIssue", actionId: "laborRoomOTAction", name: "Labor Room & OT" },
                { id: "sncuNbsu", issueId: "sncuNbsuIssue", actionId: "sncuNbsuAction", name: "SNCU/NBSU" },
                { id: "ancIncPncWard", issueId: "ancIncPncWardIssue", actionId: "ancIncPncWardAction", name: "ANC & PNC Ward" },
                { id: "medicinesSupplies", issueId: "medicinesSuppliesIssue", actionId: "medicinesSuppliesAction", name: "Medicines & Supplies" },
                { id: "laboratory", issueId: "laboratoryIssue", actionId: "laboratoryAction", name: "Laboratory" },
                { id: "nrcSamChildren", issueId: "nrcSamChildrenIssue", actionId: "nrcSamChildrenAction", name: "NRC SAM Children" },
                { id: "referralFollowUp", issueId: "referralFollowUpIssue", actionId: "referralFollowUpAction", name: "Referral Follow-Up" },
                {id:'other', issueId: 'otherIssue', actionId: 'otherAction', name: 'Other (Specify)'}
            ];

            fieldValidation.forEach((field) => {
                if (document.getElementById(field.id).checked) {
                    const issueValue = document.getElementById(field.issueId).value.trim();
                    const actionValue = document.getElementById(field.actionId).value.trim();

                    if (!issueValue) {
                        errorMessages.push(`Please provide an issue for ${field.name}.`);
                        isValid = false;
                    }
                    if (!actionValue) {
                        errorMessages.push(`Please provide an action plan for ${field.name}.`);
                        isValid = false;
                    }
                }
            });
        }

        // Display error messages
        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
        }

        return isValid;
    }
 };

 function validateAndNext(section) {
    if (validations[`section${section}`]()) {
        saveSectionData(section);

         // Uncomment below to enable API calls
        // fetch(formData.apiUrl, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData[`section${section}`]),
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log(`Section ${section} data successfully sent to the API`);
        //     } else {
        //         console.error(`Failed to save Section ${section} data`);
        //     }
        // })
        // .catch(error => console.error('Error while saving section data:', error));

        // Simulate saving to "server" (localStorage in this case)
        console.log(`Simulated API call: Section ${section} data saved to localStorage.`);

        // Move to the next section
        document.getElementById(`section${section}`).classList.add('hidden');
        const nextSection = document.getElementById(`section${section + 1}`);
        if (nextSection) {
            nextSection.classList.remove('hidden');
            currentSection = section + 1;
            localStorage.setItem('currentSection', currentSection); // Save current section
        } else {
            alert('No more sections!');
        }
    }
}

// Show a specific section based on the current state
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    const sectionElement = document.getElementById(`section${section}`);
    if (sectionElement) {
        sectionElement.classList.remove('hidden');
    }
}


document.querySelectorAll('input, select, textarea, checkbox').forEach(element => {
    element.addEventListener('input', event => {

        
        const errorElement = document.getElementById(`error-${event.target.id}`);
        if (!errorElement) return;

        // Handle number inputs dynamically
        if (event.target.type === 'number') {
            const inputConfig = {
                populationCovered: { min: 50000, max: 100000 },  
                diagnosticsTestConducted1: { min: 0, max: 250 },
                nonFunctionalTests:{ min: 0, max: 250 },
                diagnosticsTestConducted: { min: 0, max: 250 },
                totalBeds: { min: 15, max: 500 },
                totalLaborTables: { min: 0, max: 50 },
                "regular-MO-sanctioned": {min: 0, max: 5},
                "regular-MO-available": {min: 0, max: 5},
                "contractual-MO-sanctioned": {min: 0, max: 5},
                "contractual-MO-available": {min: 0, max: 5},
                "regular-ANM-sanctioned": {min: 0, max: 5},
                "regular-ANM-available": {min: 0, max: 5},
                "contractual-ANM-sanctioned": {min: 0, max: 5},
                "contractual-ANM-available": {min: 0, max: 5},
                "regular-StaffNurse-sanctioned": {min: 0, max: 5},
                "regular-StaffNurse-available": {min: 0, max: 5},
                "contractual-StaffNurse-sanctioned": {min: 0, max: 5},
                "contractual-StaffNurse-available": {min: 0, max: 5},
                "regular-GeneralSurgeon-sanctioned": {min: 0, max: 5},
                "regular-GeneralSurgeon-available": {min: 0, max: 5},
                "contractual-GeneralSurgeon-sanctioned": {min: 0, max: 5},
                "contractual-GeneralSurgeon-available": {min: 0, max: 5},
                "regular-LabTechnician-sanctioned": {min: 0, max: 5},
                "regular-LabTechnician-available": {min: 0, max: 5},
                "contractual-LabTechnician-sanctioned": {min: 0, max: 5},
                "contractual-LabTechnician-available": {min: 0, max: 5},
                "regular-Gynaecologist-sanctioned": {min: 0, max: 5},
                "regular-Gynaecologist-available": {min: 0, max: 5},
                "contractual-Gynaecologist-sanctioned": {min: 0, max: 5},
                "contractual-Gynaecologist-available": {min: 0, max: 5},
                "regular-Anaesthetist-sanctioned": {min: 0, max: 5},
                "regular-Anaesthetist-available": {min: 0, max: 5},
                "contractual-Anaesthetist-sanctioned": {min: 0, max: 5},
                "contractual-Anaesthetist-available": {min: 0, max: 5},
                "regular-Paediatricians-sanctioned": {min: 0, max: 5},
                "regular-Paediatricians-available": {min: 0, max: 5},
                "contractual-Paediatricians-sanctioned": {min: 0, max: 5},
                "contractual-Paediatricians-vailable": {min: 0, max: 5},
                "regular-DOTSProvider-sanctioned": {min: 0, max: 5},
                "regular-DOTSProvider-available": {min: 0, max: 5},
                "contractual-DOTSProvider-sanctioned": {min: 0, max: 5},
                "contractual-DOTSProvider-available": {min: 0, max: 5},
                "regular-ASHA-sanctioned": {min: 0, max: 5},
                "regular-ASHA-available": {min: 0, max: 5},
                "contractual-ASHA-sanctioned": {min: 0, max: 5},
                "contractual-ASHA-available": {min: 0, max: 5},
                "rchTraining-MO" : {min: 0, max: 10},
                "tbTraining-MO" : {min: 0, max: 10},
                "nqasTraining-MO" : {min: 0, max: 10},
                "ncdTraining-MO" : {min: 0, max: 10},
                "rchTraining-ANM" : {min: 0, max: 10},
                "tbTraining-ANM" : {min: 0, max: 10},
                "nqasTraining-ANM" : {min: 0, max: 10},
                "ncdTraining-ANM" : {min: 0, max: 10},
                "rchTraining-StaffNurse" : {min: 0, max: 10},
                "tbTraining-StaffNurse" : {min: 0, max: 10},
                "nqasTraining-StaffNurse" : {min: 0, max: 10},
                "ncdTraining-StaffNurse" : {min: 0, max: 10},
                "rchTraining-GeneralSurgeon": { min: 0, max: 10 },
                "tbTraining-GeneralSurgeon": { min: 0, max: 10 },
                "nqasTraining-GeneralSurgeon": { min: 0, max: 10 },
                "ncdTraining-GeneralSurgeon": { min: 0, max: 10 },
                "rchTraining-LabTechnician": { min: 0, max: 10 },
                "tbTraining-LabTechnician": { min: 0, max: 10 },
                "nqasTraining-LabTechnician": { min: 0, max: 10 },
                "ncdTraining-LabTechnician": { min: 0, max: 10 },
                "rchTraining-Gynaecologist": { min: 0, max: 10 },
                "tbTraining-Gynaecologist": { min: 0, max: 10 },
                "nqasTraining-Gynaecologist": { min: 0, max: 10 },
                "ncdTraining-Gynaecologist": { min: 0, max: 10 },
                "rchTraining-Anaesthetist": { min: 0, max: 10 },
                "tbTraining-Anaesthetist": { min: 0, max: 10 },
                "nqasTraining-Anaesthetist": { min: 0, max: 10 },
                "ncdTraining-Anaesthetist": { min: 0, max: 10 },
                "rchTraining-Paediatricians": { min: 0, max: 10 },
                "tbTraining-Paediatricians": { min: 0, max: 10 },
                "nqasTraining-Paediatricians": { min: 0, max: 10 },
                "ncdTraining-Paediatricians": { min: 0, max: 10 },
                "rchTraining-DOTSProvider": { min: 0, max: 10 },
                "tbTraining-DOTSProvider": { min: 0, max: 10 },
                "nqasTraining-DOTSProvider": { min: 0, max: 10 },
                "ncdTraining-DOTSProvider": { min: 0, max: 10 },
                opdLoad: { min: 10, max: 1000 },
                ipdLoad: { min: 10, max: 5000 },
                teleConsultations: { min: 0, max: 50000 },
                pregnantFirstTrimester: { min: 0, max: 500 },
                pregnant4ANC: { min: 0, max: 1000 },
                ifaTablets: { min: 0, max: 1000 },
                calciumTablets: { min: 0, max: 1000 },
                albendazoleTablets: { min: 0, max: 1000 },
                highRiskPregnancies: { min: 0, max: 1000 },
                cSection: { min: 0, max: 500 },
                highRiskReferred: { min: 0, max: 1000 },
                deliveriesConducted: { min: 0, max: 1000 },
                liveBirths: { min: 0, max: 300 },
                stillBirths: { min: 0, max: 300 },
                lowBirthWeightBabies: { min: 0, max: 250 },
                sickNewbornsReferred: { min: 0, max: 500 },
                iucdInsertions: { min: 0, max: 250 },
                ppiucdInsertions: { min: 0, max: 500 },
                adolescentsCounseled: { min: 0, max: 1000 },
                hepatitisVaccines: { min: 0, max: 1000 },
                postAbortionFamilyPlanning: { min: 0, max: 1000 },
                injectableContraceptive: { min: 0, max: 1000 },
                ppiucd: { min: 0, max: 500 },
                childrenARI: { min: 0, max: 500 },
                treatedDiarrhea: { min: 0, max: 500 },
                targetPopulationNCD: { min: 0, max: 2000 },
                ncdScreeningCompleted: { min: 0, max: 2000 },
                cbacFilled: { min: 0, max: 2000 },
                ncdDiagnosedHypertension: { min: 0, max: 2000 },
                ncdDiagnosedDiabetes: { min: 0, max: 2000 },
                ncdDiagnosedCancer: { min: 0, max: 2000 },
                ncdTreatmentHypertension   : { min: 0, max: 2000 },
                ncdTreatmentDiabetes: { min: 0, max: 2000 },
                ncdTreatmentCancer: { min: 0, max: 2000 },
                ncdReferredHypertension: { min: 0, max: 2000 },
                ncdReferredDiabetes: { min: 0, max: 2000 },
                ncdReferredCancer: { min: 0, max: 2000 },
                cbnaatTests: { min: 0, max: 2000 },
                sputumMicroscopy: { min: 0, max: 2000 },
                tbDiagnosedPatients: { min: 0, max: 2000 },
                tbDrugRegimePatients: { min: 0, max: 2000 },
                ncdScreenedPositive: { min: 0, max: 2000 },
                nqasDepartments: { min: 0, max: 50 },
                mchBeds: { min: 0, max: 150 },
                totalBedsSncuNbsu: { min: 0, max: 100 },
                nrcMtcBeds: { min: 0, max: 100 },
               // deliveriesConducted: { min: 0, max: 1000 },
                highRiskManaged: { min: 0, max: 1000 },
                postPartumSterilization: {min: 0,max:2000},
                childrenAdmittedNRC:{min: 0,max:2000},
                injectableContraceptiveAntara:{min:0, max:1000},
                adolescentsCounseledAFHC:{min:0,max:2000}
               

            }[event.target.id];

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
                facilityInCharge: { minLength: 2, maxLength: 40 },
                stockOutMedicines: { minLength: 2, maxLength: 250 },
                designation: { minLength: 2, maxLength: 40 },
                dotsProviderOtherTrainings: { minLength: 2, maxLength: 100 },
                paediatriciansOtherTrainings: { minLength: 2, maxLength: 100 },
                moOtherTrainings : { minLength: 2, maxLength: 100 },
                anaesthetistOtherTrainings: { minLength: 2, maxLength: 100 },
                gynaecologistOtherTrainings: { minLength: 2, maxLength: 100 },
                labTechnicianOtherTrainings: { minLength: 2, maxLength: 100 },
                pharmacistOtherTrainings: { minLength: 2, maxLength: 100 },
                staffNurseOtherTrainings: { minLength: 2, maxLength: 100 },
                anmOtherTrainings: { minLength: 2, maxLength: 100 },
                generalSurgeonOtherTrainings: { minLength: 2, maxLength: 100 },
                knowledgeIssue: { minLength: 2, maxLength: 200 },
                serviceDeliveryIssue: { minLength: 2, maxLength: 200 },
                serviceDeliveryAction: { minLength: 2, maxLength: 200 },
                opdIssue: { minLength: 2, maxLength: 200 },
                opdAction: { minLength: 2, maxLength: 200 },
                laborRoomOTIssue: { minLength: 2, maxLength: 200 },
                laborRoomOTAction: { minLength: 2, maxLength: 200 },
                sncuNbsuIssue: { minLength: 2, maxLength: 200 },
                sncuNbsuAction: { minLength: 2, maxLength: 200 },
                ancIncPncWardIssue: { minLength: 2, maxLength: 200 },
                ancIncPncWardAction: { minLength: 2, maxLength: 200 },
                medicinesSuppliesIssue: { minLength: 2, maxLength: 200 },
                medicinesSuppliesAction: { minLength: 2, maxLength: 200 },
                laboratoryIssue: { minLength: 2, maxLength: 200 },
                laboratoryAction: { minLength: 2, maxLength: 200 },
                nrcSamChildrenIssue: { minLength: 2, maxLength: 200 },
                nrcSamChildrenAction: { minLength: 2, maxLength: 200 },
                referralFollowUpIssue: { minLength: 2, maxLength: 200 },
                referralFollowUpAction: { minLength: 2, maxLength: 200 },
                otherIssue: { minLength: 2, maxLength: 200 },
                otherAction: { minLength: 2, maxLength: 200 },



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
        else if ( event.target.type === 'checkbox' || event.target.tagName === 'SELECT' ) {
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
        // Dynamic handling for sanctioned and available inputs
        const sanctionedFieldMatch = event.target.id.match(/(regular|contractual)-(.*?)-(sanctioned|available)/);
        if (sanctionedFieldMatch) {
            const [_, type, role, fieldType] = sanctionedFieldMatch;
            const sanctionedInput = document.getElementById(`${type}-${role}-sanctioned`);
            const availableInput = document.getElementById(`${type}-${role}-available`);
            //const trainingContainer = document.getElementById(`trainingsContainer-${role}`);
            const trainingContainer = document.getElementById(`trainingsContainer-${role}`);


            if (fieldType === 'sanctioned') {
                const sanctionedValue = parseInt(event.target.value, 10);
                if (isNaN(sanctionedValue) || sanctionedValue <= 0) {
                    availableInput.setAttribute('disabled', true);
                    availableInput.value = ''; // Clear available field
                    errorElement.textContent = 'Sanctioned value must be greater than 0.';
                    if (trainingContainer) trainingContainer.style.display = 'none'; // Hide training container
                } else {
                    availableInput.removeAttribute('disabled'); // Enable available input
                    //errorElement.textContent = '';
                }
            } else if (fieldType === 'available') {
                const sanctionedValue = parseInt(sanctionedInput?.value || 0, 10);
                const availableValue = parseInt(event.target.value, 10);
                if (isNaN(availableValue) || availableValue <= 0 || availableValue > sanctionedValue) {
                    errorElement.textContent = `Count should not exceed the ${sanctionedValue} count`;
                    if (trainingContainer) trainingContainer.style.display = 'none'; // Hide training container
                } else {
                    errorElement.textContent = '';
                    if (trainingContainer) trainingContainer.style.display = 'block'; // Show training container
                }
            }
        }
    });
});

// document.querySelector('.submit').addEventListener('click', event => {
//     event.preventDefault();
//     if (validations.section9()) {
//         const formData = {
//             areasOfIssue: [],
//             details: {
//                 serviceDeliveryIssue: document.getElementById('serviceDeliveryIssue')?.value || "",
//                 serviceDeliveryAction: document.getElementById('serviceDeliveryAction')?.value || "",
//             }
//         };
//         fetch('https://your-backend-api.com/submit', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         })
//             .then(response => response.json())
//             .then(data => alert("Submission Successful"))
//             .catch(error => alert("Submission Failed"));
//     }
// });


// Simulate form submission
document.querySelector('.submit').addEventListener('click', event => {
    event.preventDefault();

    if (validations.section9()) {
        saveSectionData(9);


        // Uncomment below to enable API calls
        // fetch(formData.apiUrl, {
        //     method: 'POST', 
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log('Form successfully submitted to the API');
        //         // Clear localStorage and show success message
        //         localStorage.removeItem('formData');
        //         localStorage.removeItem('currentSection');
        //         document.getElementById('communityCheckList').classList.add('hidden');
        //         document.getElementById('successMessage').classList.remove('hidden');
        //     } else {
        //         console.error('Failed to submit form data');
        //     }
        // })
        // .catch(error => console.error('Error while submitting form data:', error));


        // Simulate saving the full form data locally
        console.log("Simulated form submission:", formData);

        // Update the success message
        const successMessage = document.getElementById('successMessage');
        const apiLink = document.getElementById('apiLink');
        apiLink.textContent = formData.apiUrl;
        apiLink.href = formData.apiUrl;

        // Show success message and reset the form
        document.getElementById('checklistForm').classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Clear localStorage after submission
        localStorage.removeItem('formData');
        localStorage.removeItem('currentSection');
        console.log("Local storage cleared after testing.");
    }
});


// function validateAndNext(section) {
//     if (validations[`section${section}`]()) {
//         document.getElementById(`section${section}`).classList.add('hidden');
//         const nextSection = document.getElementById(`section${section + 1}`);
//         if (nextSection) {
//             nextSection.classList.remove('hidden');
//         }
//     }
// }
// Toggle VHND Section Visibility
function toggleVHNDSection(value) {
    const vhndSection = document.getElementById('vhndSection');
    if (vhndSection) {
        if (value === 'Yes') {
            vhndSection.classList.remove('hidden');
        } else {
            vhndSection.classList.add('hidden');
        }
    }
}
// Function to toggle None Checkbox Behavior
function toggleNone(noneCheckbox) {
    const checkboxes = document.querySelectorAll('input[name="areasOfIssue"]:not(#none)');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        const section = document.getElementById(`${checkbox.id}Fields`);
        if (section) {
            section.classList.add("hidden");
        }
    });
}

// Function to toggle fields for each checkbox
function toggleFields(sectionId, checkbox) {
    const section = document.getElementById(sectionId);
    if (checkbox.checked) {
        section.classList.remove("hidden");
    } else {
        section.classList.add("hidden");
    }
}

function restartForm() {
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('communityCheckList').reset();
    document.getElementById('communityCheckList').classList.remove('hidden');
    document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
    document.getElementById('section1').classList.remove('hidden');

    // Reset localStorage
    localStorage.removeItem('formData');
    localStorage.removeItem('currentSection');
    formData = { id: generateUniqueId(), apiUrl: `http://localhost:3000/checklistapi/${formData.id}` };
    localStorage.setItem('formData', JSON.stringify(formData));
    currentSection = 1;
}