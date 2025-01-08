//const baseApiUrl = 'http://localhost:3000/checklistapi/';

// Function to generate a unique ID
function generateUniqueId() {
    return crypto.randomUUID(); // Using modern UUID generation
}

// Initialize or retrieve form data from localStorage
let formData = JSON.parse(localStorage.getItem('formData')) || {};

// Save data for the current section in localStorage

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
    console.log(`Section ${section} data saved. UID: ${formData.id}`);
}

const validations = {
    section1: () => {
        let isValid = true;

        // General Details Validation
        const fieldsToValidate = [
            { id: 'dateOfVisit', errorMessage: 'Date of Visit is required.' },
            { id: 'district', errorMessage: 'District selection is required.' },
            { id: 'block', errorMessage: 'Block selection is required.' },
            { id: 'facilityType', errorMessage: 'Facility Type selection is required.' },
            { id: 'facilityName', errorMessage: 'Facility Name is required.' },
            { id: 'facilityInCharge', errorMessage: 'Name of Facility In-Charge is required.' },
            { id: 'designation', errorMessage: 'Designation of Facility In-Charge is required.' },
            { id: 'villagesCovered', errorMessage: 'No. of Villages/Wards Covered is required.' },
            { id: 'populationCovered', errorMessage: 'Population Covered is required.' },
            { id: 'qualityCommittee', errorMessage: 'Quality Committee selection is required.' }
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

                { id: 'villagesCovered', min: 0, max: 150, errorMessage: 'Number of Villages/Wards Covered must be between 0 and 150.' },
                { id: 'populationCovered', min: 4000, max: 500000, errorMessage: 'Population Covered must be between 4000 and 500000.' },
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
            { id: 'roadAccessibility', errorMessage: 'Road Accessibility selection is required.' },
            { id: 'powerBackup', errorMessage: '24X7 Power Backup selection is required.' },
            { id: 'waitingArea', errorMessage: 'Patient Waiting Area selection is required.' },
            { id: 'separateToilets', errorMessage: 'Separate Toilets selection is required.' },
            { id: 'totalBeds', min: 0, max: 50, errorMessage: 'Total Number of Beds must be between 0 and 50.' },
            { id: 'totalLaborTables', min: 0, max: 10, errorMessage: 'Total Number of Labor Tables must be between 0 and 10.' },
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
            { id: 'dotsCenter', errorMessage: 'DOTS Center selection is required.' }
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
        //console.log('sanctionedFields:', sanctionedFields);

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
            if (isNaN(sanctionedValue) || sanctionedValue <= 0) {
                isValid = false;
                errorSanctioned.textContent = 'Sanctioned value must be greater than 0.';
                sanctionedInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                availableInput.setAttribute('disabled', true);
                availableInput.value = ''; // Clear the available field
                if (trainingContainer) {
                    trainingContainer.style.display = 'none'; // Hide the training container
                } // Hide the training container
            } else {
                errorSanctioned.textContent = '';
                sanctionedInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                sanctionedInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                availableInput.removeAttribute('disabled'); // Enable the available input
            }

            // // Validation for available field
            const availableValue = parseInt(availableInput.value, 10);
            if (
                sanctionedValue > 0 &&
                (!availableValue || isNaN(availableValue) || availableValue <= 0 || availableValue > sanctionedValue)
            ) {
                isValid = false;
                errorAvailable.textContent = `Available value must be between 1 and ${sanctionedValue}.`;
                availableInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                availableInput.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                if (trainingContainer) {
                    trainingContainer.style.display = 'none'; // Hide the training container
                } // Hide the training container
            } else if (sanctionedValue > 0) {
                errorAvailable.textContent = '';
                availableInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                availableInput.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
                if (trainingContainer) {
                    trainingContainer.style.display = 'block'; // Show the training container
                }// Show the training container
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
            { id: 'opdLoad', min: 0, max: 500, errorMessage: 'OPD Load must be between 0 and 500.' },
            { id: 'ipdLoad', min: 0, max: 500, errorMessage: 'IPD Load must be between 0 and 500.' },
            { id: 'teleConsultations', min: 0, max: 2000, errorMessage: 'Tele Consultations must be between 0 and 2000.' },

            // Maternal Child Health
            { id: 'pregnantFirstTrimester', min: 0, max: 1000, errorMessage: 'Pregnant Women Registered in First Trimester must be between 0 and 1000.' },
            { id: 'pregnant4ANC', min: 0, max: 1000, errorMessage: 'Pregnant Women Received 4 ANC Check-ups must be between 0 and 1000.' },
            { id: 'ifaTablets', min: 0, max: 500, errorMessage: 'Pregnant Women Given IFA Tablets must be between 0 and 500.' },
            { id: 'calciumTablets', min: 0, max: 500, errorMessage: 'Pregnant Women Given Calcium Tablets must be between 0 and 500.' },
            { id: 'albendazoleTablets', min: 0, max: 500, errorMessage: 'Pregnant Women Given Albendazole Tablets must be between 0 and 500.' },
            { id: 'highRiskPregnancies', min: 0, max: 250, errorMessage: 'High Risk Pregnancies Identified must be between 0 and 250.' },
            { id: 'totalANCRegistered', min: 0, max: 500, errorMessage: 'Total ANC Registered must be between 0 and 500.' },
            { id: 'highRiskReferred', min: 0, max: 500, errorMessage: 'High Risk Pregnancies Referred Out must be between 0 and 500.' },
            { id: 'deliveriesConducted', min: 0, max: 1000, errorMessage: 'Deliveries Conducted must be between 0 and 1000.' },
            { id: 'liveBirths', min: 0, max: 300, errorMessage: 'Live Births must be between 0 and 300.' },
            { id: 'stillBirths', min: 0, max: 300, errorMessage: 'Still Births must be between 0 and 300.' },
            { id: 'lowBirthWeightBabies', min: 0, max: 250, errorMessage: 'Low Birth Weight Babies must be between 0 and 250.' },
            { id: 'sickNewbornsReferred', min: 0, max: 500, errorMessage: 'Sick Newborns Referred must be between 0 and 500.' },
            { id: 'iucdInsertions', min: 0, max: 250, errorMessage: 'IUCD Insertions must be between 0 and 250.' },
            { id: 'ppiucdInsertions', min: 0, max: 500, errorMessage: 'PPIUCD Insertions must be between 0 and 500.' },
            { id: 'adolescentsCounseled', min: 0, max: 1000, errorMessage: 'Adolescents Counseled/Treated must be between 0 and 1000.' },
            { id: 'hepatitisVaccines', min: 0, max: 1000, errorMessage: 'Hepatitis B, OPV, BCG  must be between 0 and 1000.' },

            { id: 'childrenDiarrhea', min: 0, max: 1000, errorMessage: 'Under 5 Children Diagnosed with Diarrhoea must be between 0 and 1000.' },
            { id: 'injectableContraceptive', min: 0, max: 1000, errorMessage: 'Injectable Contraceptive (Antara) must be between 0 and 1000.' },
            { id: 'earlyBreastfeeding', min: 0, max: 500, errorMessage: 'Neonates Received Early Breastfeeding must be between 0 and 500.' },
            { id: 'childrenARI', min: 0, max: 500, errorMessage: 'Under 5 Children Diagnosed with ARI must be between 0 and 500.' },
            { id: 'treatedDiarrhea', min: 0, max: 500, errorMessage: 'Under 5 Children Treated for Diarrhoea with ORS and Zinc must be between 0 and 500.' },

            // NCDs 
            { id: 'targetPopulationNCD', min: 0, max: 2000, errorMessage: 'People Diagnosed with NCD (Hypertension) must be between 0 and 2000.' },
            { id: 'ncdScreeningCompleted', min: 0, max: 2000, errorMessage: 'People Diagnosed with NCD (Diabetes) must be between 0 and 2000.' },
            { id: 'cbacFilled', min: 0, max: 2000, errorMessage: 'People Diagnosed with CBAC must be between 0 and 2000.' },
             {id:'ncdScreenedPositive', min: 0, max: 2000, errorMessage: 'People Screened Positive for NCD must be between 0 and 2000.' },
            { id: 'ncdDiagnosedHypertension', min: 0, max: 2000, errorMessage: ' Value must be between 0 and 2000.' },
            { id: 'ncdDiagnosedDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdDiagnosedCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentHypertension', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdTreatmentCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id : 'ncdReferredHypertension', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
            { id: 'ncdReferredDiabetes', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' }, 
            { id: 'ncdReferredCancer', min: 0, max: 2000, errorMessage: 'Value must be between 0 and 2000.' },
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
            {id: 'injTd',errorMessage: 'Inj. TD selection is required.'},
            {id: 'injMgSulph', errorMessage: 'Inj. Mg Sulphate selection is required.'},
            {id: 'injectableMPA', errorMessage: 'Injectable MPA selection is required.'},
            {id:'injOxytocin', errorMessage: 'Inj. Oxytocin selection is required.'},
            {id: 'injIronSucrose', errorMessage: 'Inj. Iron Sucrose selection is required.'},
            {id: 'injDexamethasone', errorMessage: 'Inj. Dexamethasone selection is required.'},
            {id: 'tabCalcium', errorMessage: 'Tab. Calcium selection is required.'},
            {id: 'tabIFA', errorMessage: 'Tab. IFA selection is required.'},
            {id: 'antihistamines', errorMessage: 'Antihistamines selection is required.'},
            {id:  'vitaminK1', errorMessage: 'Vitamin K1 selection is required.'},
            {id: 'antiseptics', errorMessage: 'Antiseptics selection is required.'},
            {id: 'antihypertensives', errorMessage: 'Antihypertensives selection is required.'},
            {id: 'antidiabetics', errorMessage: 'Antidiabetics selection is required.'},
            {id :'ecPills', errorMessage: 'EC Pills selection is required.'},
            {id :'tabMisoprostol', errorMessage: 'Tab. Misoprostol selection is required.'},
            {id :'antiTbDrugs', errorMessage: 'Anti-TB Drugs selection is required.'},
            {id: 'zincTablets', errorMessage: 'Zinc Tablets selection is required.'},
            {id: 'paracetamol', errorMessage: 'Paracetamol selection is required.'},
            {id: 'tabAlbendazole', errorMessage: 'Tab. Albendazole selection is required.'},
            {id: 'antibiotics', errorMessage: 'Antibiotics selection is required.'},
            {id: 'orsSachets', errorMessage: 'ORS Sachets selection is required.'},
            {id: 'ipv',  errorMessage: 'IPV selection is required.'},
            {id: 'rotaVirus', errorMessage: 'Rota Virus selection is required.'},
            {id: 'bcg', errorMessage: 'BCG selection is required.'},
            {id: 'pentavalent', errorMessage: 'Pentavalent selection is required.'},
            {id: 'japaneseEncephalitis', errorMessage: 'Japanese Encephalitis selection is required.'},
            {id: 'hepatitisB', errorMessage: 'Hepatitis B selection is required.'},
            {id:'opv', errorMessage: 'OPV selection is required.'},
            {id: 'dpt', errorMessage: 'DPT selection is required.'},
            {id: 'measlesRubella', errorMessage: 'Measles Rubella selection is required.'},
            {id: 'antiRabiesVaccine', errorMessage: 'Anti Rabies Vaccine selection is required.'},
            {id: 'vitaminA', errorMessage: 'Vitamin A selection is required.'},
            {id: 'combinedOralContraceptives', errorMessage: 'Combined Oral Contraceptives selection is required.'},
            {id :'centchromanPills', errorMessage: 'Centchroman Pills selection is required.'},
            {id: 'iucd', errorMessage: 'IUCD selection is required.'},
            {id: 'mmaKit', errorMessage: 'MMA Kit selection is required.'},
            {id: 'maleCondoms', errorMessage:'Male Condoms selection is required.'},
            {id: 'sanitaryNapkins', errorMessage: 'Sanitary Napkins selection is required.'},
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
            { id: 'diagnosticsTestConducted', min: 0, max: 250, errorMessage: 'Diagnostics test conducted in facility must be between 0 and 250.' },
            { id: 'nonFunctionalTests', min: 0, max: 250, errorMessage: 'Non-functional / Missing diagnostic tests must be between 0 and 250.' },
            { id: 'haemoglobin', errorMessage: 'Haemoglobin selection is required.' },
            { id: 'bloodSugar', errorMessage: 'Blood Sugar selection is required.' },
            { id: 'malariaSmear', errorMessage: 'Malaria Smear (RDK) selection is required.' },
            { id: 'urinePregnancyTest', errorMessage: 'Urine Pregnancy Test selection is required.' },
            { id: 'ogtt', errorMessage: 'OGTT selection is required.' },
            { id: 'urineAlbuminSugar', errorMessage: 'Urine Albumin & Sugar selection is required.' },
            { id: 'hivTesting', errorMessage: 'HIV Testing (WBFPT) selection is required.' },
            { id: 'microscopicSputumExamination', errorMessage: 'Microscopic Sputum Examination selection is required.' },
            { id: 'rapidSyphilisTest', errorMessage: 'Rapid Syphilis Test selection is required.' },
            { id: 'bloodGrouping', errorMessage: 'Blood Grouping selection is required.' },
            { id: 'stoolOvaCyst', errorMessage: 'Stool for OVA and cyst selection is required.' },
            { id: 'waterQualityTesting', errorMessage: 'Water Quality Testing selection is required.' },
            { id: 'wetMount', errorMessage: 'Wet mount- Direct Microscopy selection is required.' },
            { id: 'typhoidSerology', errorMessage: 'Typhoid serology selection is required.' },
            { id: 'serologyDengue', errorMessage: 'Serology for Dengue selection is required.' },
            { id: 'esr', errorMessage: 'ESR selection is required.' },
            { id: 'sickleCellTesting', errorMessage: 'Sickle Cell testing selection is required.' },
            { id: 'tlcDlc', errorMessage: 'TLC, DLC selection is required.' },
            { id: 'serumBilirubin', errorMessage: 'Serum Bilirubin selection is required.' }
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
            { id: 'injectableMPARegister', errorMessage: 'Injectable MPA register and cards selection is required.' },
            { id: 'ncdRegisters', errorMessage: 'NCD registers selection is required.' },
            { id: 'telemedicineRegister', errorMessage: 'Telemedicine register selection is required.' },
            { id: 'notificationRegister', errorMessage: 'Notification register selection is required.' },
            { id: 'stockRegister', errorMessage: 'Stock register selection is required.' },
            { id: 'dueList', errorMessage: 'Due list (from MCTS portal or manual) selection is required.' },
            { id: 'vhndMicroPlans', errorMessage: 'VHND micro plans selection is required.' },
            { id: 'heightChart', errorMessage: 'Height chart selection is required.' },
            { id: 'iucdTray', errorMessage: 'IUCD tray selection is required.' },
            { id: 'sterilizedTrays', errorMessage: 'Sterilized trays selection is required.' },
            { id: 'ambuBag', errorMessage: 'Ambu Bag with mask selection is required.' },
            { id: 'bpApparatus', errorMessage: 'BP apparatus selection is required.' },
            { id: 'stethoscope', errorMessage: 'Stethoscope selection is required.' },
            { id: 'weighingScale', errorMessage: 'Weighing machine selection is required.' },
            { id: 'babyWeighingMachine', errorMessage: 'Baby Weighing machine selection is required.' },
            { id: 'fetoscope', errorMessage: 'Fetoscope selection is required.' },
            { id: 'thermometer', errorMessage: 'Thermometer selection is required.' },
            { id: 'mucusExtractor', errorMessage: 'Mucus Extractor selection is required.' },
            { id: 'ppiucdForceps', errorMessage: 'PPIUCD forceps selection is required.' },
            { id: 'oxygenCylinder', errorMessage: 'Functional Oxygen Cylinder selection is required.' },
            { id: 'bmwBins', errorMessage: 'BMW Colour coded bins selection is required.' }
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
    section8:()=>{
        let isValid = true;
        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    }
    };


document.querySelectorAll('input, select, textarea, checkbox').forEach(element => {
    element.addEventListener('input', event => {

        
        const errorElement = document.getElementById(`error-${event.target.id}`);
        if (!errorElement) return;

        // Handle number inputs dynamically
        if (event.target.type === 'number') {
            const inputConfig = {
                villagesCovered: { min: 0, max: 150 },
                populationCovered: { min: 4000, max: 500000 },
                totalBeds: { min: 0, max: 50 },
                totalLaborTables: { min: 0, max: 10 },
                regularDentalMOSanctioned: { min: 0, max: 5 },
                opdLoad: { min: 0, max: 500 },
                ipdLoad: { min: 0, max: 500 },
                teleConsultations: { min: 0, max: 2000 },
                pregnantFirstTrimester: { min: 0, max: 1000 },
                pregnant4ANC: { min: 0, max: 1000 },
                ifaTablets: { min: 0, max: 500 },
                calciumTablets: { min: 0, max: 500 },
                albendazoleTablets: { min: 0, max: 500 },
                highRiskPregnancies: { min: 0, max: 250 },
                totalANCRegistered: { min: 0, max: 500 },
                highRiskReferred: { min: 0, max: 500 },
                deliveriesConducted: { min: 0, max: 1000 },
                liveBirths: { min: 0, max: 300 },
                stillBirths: { min: 0, max: 300 },
                lowBirthWeightBabies: { min: 0, max: 250 },
                sickNewbornsReferred: { min: 0, max: 500 },
                iucdInsertions: { min: 0, max: 250 },
                ppiucdInsertions: { min: 0, max: 500 },
                adolescentsCounseled: { min: 0, max: 1000 },
                hepatitisVaccines: { min: 0, max: 1000 },
                childrenDiarrhea: { min: 0, max: 1000 },
                injectableContraceptive: { min: 0, max: 1000 },
                earlyBreastfeeding: { min: 0, max: 500 },
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
                diagnosticsTestConducted: { min: 0, max: 250 },
                nonFunctionalTests: { min: 0, max: 250 },
                "regular-MO-sanctioned": {min: 0, max: 5},
                "regular-MO-available": {min: 0, max: 5},
                "contractual-MO-sanctioned": {min: 0, max: 5},
                "contractual-MO-available": {min: 0, max: 5},
                "regular-DentalMO-sanctioned": {min: 0, max: 5},
                "regular-DentalMO-available": {min: 0, max: 5},
                "contractual-DentalMO-sanctioned": {min: 0, max: 5},
                "contractual-DentalMO-available": {min: 0, max: 5},
                "regular-StaffNurse-sanctioned": {min: 0, max: 5},
                "regular-StaffNurse-available": {min: 0, max: 5},
                "contractual-StaffNurse-sanctioned": {min: 0, max: 5},
                "contractual-StaffNurse-available": {min: 0, max: 5},
                "regular-Pharmacists-sanctioned": {min: 0, max: 5},
                "regular-Pharmacists-available": {min: 0, max: 5},
                "contractual-Pharmacists-sanctioned": {min: 0, max: 5},
                "contractual-Pharmacists-available": {min: 0, max: 5},
                "regular-LabTechnician-sanctioned": {min: 0, max: 5},
                "regular-LabTechnician-available": {min: 0, max: 5},
                "contractual-LabTechnician-sanctioned": {min: 0, max: 5},
                "contractual-LabTechnician-available": {min: 0, max: 5},
                "regular-LHV-sanctioned": {min: 0, max: 5},
                "regular-LHV-available": {min: 0, max: 5},
                "contractual-LHV-sanctioned": {min: 0, max: 5},
                "contractual-LHV-available": {min: 0, max: 5},
                "regular-CHO-sanctioned": {min: 0, max: 5},
                "regular-CHO-available": {min: 0, max: 5},
                "contractual-CHO-sanctioned": {min: 0, max: 5},
                "contractual-CHO-available": {min: 0, max: 5},
                "regular-MPWMale-sanctioned": {min: 0, max: 5},
                "regular-MPWMale-available": {min: 0, max: 5},
                "contractual-MPWMale-sanctioned": {min: 0, max: 5},
                "contractual-MPWMale-available": {min: 0, max: 5},
                "regular-MPWFemale-sanctioned": {min: 0, max: 5},
                "regular-MPWFemale-available": {min: 0, max: 5},
                "contractual-MPWFemale-sanctioned": {min: 0, max: 5},
                "contractual-MPWFemale-available": {min: 0, max: 5},
                "regular-ASHA-sanctioned": {min: 0, max: 5},
                "regular-ASHA-available": {min: 0, max: 5},
                "contractual-ASHA-sanctioned": {min: 0, max: 5},
                "contractual-ASHA-available": {min: 0, max: 5},
                "rchTraining-MO" : {min: 0, max: 10},
                "tbTraining-MO" : {min: 0, max: 10},
                "nqasTraining-MO" : {min: 0, max: 10},
                "ncdTraining-MO" : {min: 0, max: 10},
                "rchTraining-DentalMO" : {min: 0, max: 10},
                "tbTraining-DentalMO" : {min: 0, max: 10},
                "nqasTraining-DentalMO" : {min: 0, max: 10},
                "ncdTraining-DentalMO" : {min: 0, max: 10},
                "rchTraining-StaffNurse" : {min: 0, max: 10},
                "tbTraining-StaffNurse" : {min: 0, max: 10},
                "nqasTraining-StaffNurse" : {min: 0, max: 10},
                "ncdTraining-StaffNurse" : {min: 0, max: 10},
                "rchTraining-Pharmacists": { min: 0, max: 10 },
                "tbTraining-Pharmacists": { min: 0, max: 10 },
                "nqasTraining-Pharmacists": { min: 0, max: 10 },
                "ncdTraining-Pharmacists": { min: 0, max: 10 },
                "rchTraining-LabTechnician": { min: 0, max: 10 },
                "tbTraining-LabTechnician": { min: 0, max: 10 },
                "nqasTraining-LabTechnician": { min: 0, max: 10 },
                "ncdTraining-LabTechnician": { min: 0, max: 10 },
                "rchTraining-LHV": { min: 0, max: 10 },
                "tbTraining-LHV": { min: 0, max: 10 },
                "nqasTraining-LHV": { min: 0, max: 10 },
                "ncdTraining-LHV": { min: 0, max: 10 },
                "rchTraining-CHO": { min: 0, max: 10 },
                "tbTraining-CHO": { min: 0, max: 10 },
                "nqasTraining-CHO": { min: 0, max: 10 },
                "ncdTraining-CHO": { min: 0, max: 10 },
                "rchTraining-MPWMale": { min: 0, max: 10 },
                "tbTraining-MPWMale": { min: 0, max: 10 },
                "nqasTraining-MPWMale": { min: 0, max: 10 },
                "ncdTraining-MPWMale": { min: 0, max: 10 },
                "rchTraining-MPWFemale": { min: 0, max: 10 },
                "tbTraining-MPWFemale": { min: 0, max: 10 },
                "nqasTraining-MPWFemale": { min: 0, max: 10 },
                "ncdTraining-MPWFemale": { min: 0, max: 10 },
                "rchTraining-ASHA": { min: 0, max: 10 },
                "tbTraining-ASHA": { min: 0, max: 10 },
                "nqasTraining-ASHA": { min: 0, max: 10 },
                "ncdTraining-ASHA": { min: 0, max: 10 },  
                ncdScreenedPositive: { min: 0, max: 2000 },              
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
                facilityName: { minLength: 2, maxLength: 30 },
                facilityInCharge: { minLength: 2, maxLength: 40 },
                designation: { minLength: 2, maxLength: 30 },
                ashaOtherTrainings: { minLength: 2, maxLength: 100 },
                mpwFemaleOtherTrainings: { minLength: 2, maxLength: 100 },
                mpwMaleOtherTrainings: { minLength: 2, maxLength: 100 },
                moOtherTrainings : { minLength: 2, maxLength: 100 },
                choOtherTrainings: { minLength: 2, maxLength: 100 },
                lhvOtherTrainings: { minLength: 2, maxLength: 100 },
                labTechnicianOtherTrainings: { minLength: 2, maxLength: 100 },
                pharmacistOtherTrainings: { minLength: 2, maxLength: 100 },
                staffNurseOtherTrainings: { minLength: 2, maxLength: 100 },
                dentalOtherTrainings: { minLength: 2, maxLength: 100 },
                pharmacistsOtherTrainings: { minLength: 2, maxLength: 100 },
                "major-findings": { minLength: 2, maxLength: 200 },
                "interventions": { minLength: 2, maxLength: 200 },
                "intervention-level": { minLength: 2, maxLength: 200 },
                "responsibility": { minLength: 2, maxLength: 200 },
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
          //  console.log('Training Container:', trainingContainer);



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

// function validateAndNext(section) {
//     if (validations[`section${section}`]()) {
//         document.getElementById(`section${section}`).classList.add('hidden');
//         const nextSection = document.getElementById(`section${section + 1}`);
//         if (nextSection) {
//             nextSection.classList.remove('hidden');
//         }
//     }
// }
