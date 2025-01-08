//const baseApiUrl = 'http://localhost:3000/checklistapi/';

const SESSION_TIMEOUT = 30 * 60 * 1000; // Set session timeout (30 minutes in milliseconds)
let sessionTimestamp = localStorage.getItem('sessionTimestamp');
function showFlashMessage(message) {
    const flashMessage = document.getElementById('flashMessage');
    if (flashMessage) {
        flashMessage.querySelector('p').textContent = message;
        flashMessage.classList.remove('hidden');
    }
}

// Check if session is valid
function isSessionExpired() {
    const currentTime = Date.now();
    if (!sessionTimestamp || currentTime - parseInt(sessionTimestamp, 10) > SESSION_TIMEOUT) {
        return true;
    }
    return false;
}

// Handle session expiry
function handleSession() {
    if (isSessionExpired()) {
        // Clear localStorage and show flash message
        localStorage.removeItem('formData');
        localStorage.removeItem('currentSection');
        localStorage.removeItem('sessionTimestamp');
        showFlashMessage("Session got expired");
        return false;
    }

    // Update session timestamp
    localStorage.setItem('sessionTimestamp', Date.now().toString());
    return true;
}

// Ensure session is valid on page load
if (!handleSession()) {
    // Optionally redirect to the start page or show an expired state
    console.warn("Session expired");
    // Redirect or disable form interactions if needed
    // window.location.href = "index.html";
}
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
if (!sessionTimestamp) {
    localStorage.setItem('sessionTimestamp', Date.now().toString());
    console.log("New session started");
}


// function saveSectionData(section) {
//     const sectionElement = document.getElementById(`section${section}`);
//     const inputs = sectionElement.querySelectorAll('input, select, textarea');

//     if (!formData.id) {
//         formData.id = generateUniqueId();
//         formData.apiUrl = `${baseApiUrl}${formData.id}`; // Create the API link dynamically
//     }

//     formData[`section${section}`] = formData[`section${section}`] || {};

//     inputs.forEach(input => {
//         if (input.type === 'checkbox') {
//             formData[`section${section}`][input.id] = input.checked;
//         } else {
//             formData[`section${section}`][input.id] = input.value;
//         }
//     });

//     // Save updated formData to localStorage
//     localStorage.setItem('formData', JSON.stringify(formData));
//     console.log(`Section ${section} data saved:`, formData[`section${section}`]);
// }
const validations = {
    section1: () => {
        let isValid = true;

        // List of fields to validate
        const fieldsToValidate = [
            { id: 'dateOfVisit', errorMessage: 'Date of Visit is required.' },
            { id: 'state', errorMessage: 'State selection is required.' },
            { id: 'district', errorMessage: 'District selection is required.' },
            { id: 'block', errorMessage: 'Block selection is required.' },
            { id: 'villageWard', errorMessage: 'Village/Ward selection is required.' },
            { id: 'vhndSession', errorMessage: 'VHND Session selection is required.' }
        ];

        const vhndSection = document.getElementById('vhndSection');
        if (vhndSection && !vhndSection.classList.contains('hidden')) {
            const vhndFields = [
                { id: 'dueList', errorMessage: 'Due list selection is required.' },
                { id: 'riMicroPlan', errorMessage: 'RI Microplan selection is required.' },
                { id: 'bpInstrument', errorMessage: 'BP Instrument selection is required.' },
                { id: 'stethoscope', errorMessage: 'Stethoscope selection is required.' },
                { id: 'albendazole', errorMessage: 'Albendazole selection is required.' },
                { id: 'familyPlanning', errorMessage: 'Family planning services selection is required.' },
                { id: 'riProvided', errorMessage: 'RI provided selection is required.' },
                { id: 'weighingScale', errorMessage: 'Weighing scale availability is required.' },
                { id: 'vitaminASyrup', errorMessage: 'Vitamin A Syrup availability is required.' },
                { id: 'ancProvided', errorMessage: 'ANC provided selection is required.' },
                { id: 'growthMonitoring', errorMessage: 'Growth monitoring selection is required.' },
                { id: 'hemoglobinometer', errorMessage: 'Hemoglobinometer selection is required.' },
                { id: 'ifaTablets', errorMessage: 'IFA Tablets selection is required.' },
                { id: 'calciumTablets', errorMessage: 'Calcium Tablets selection is required.' },
                { id: 'pncProvided', errorMessage: 'PNC provided selection is required.' },
                { id: 'nutritionHealth', errorMessage: 'Nutrition and health promotion is required.' },
                { id: 'vaccinesCarrier', errorMessage: 'Vaccine carrier availability is required.' },
                {id:'mcpCards', errorMessage: 'MCP Cards availability is required.'},
            ];
            fieldsToValidate.push(...vhndFields);
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
        if (!isValid) {
            alert('Please fill out all required fields correctly before proceeding.');
        }

        return isValid;
    },
    section2: () => {
        let isValid = true;

        // Validation for Text Inputs
        const textInputs = [
            { id: 'ashaName', minLength: 2, maxLength: 30, errorMessage: 'ASHA Name must be between 2 and 30 characters.' }
        ];

        textInputs.forEach(input => {
            const inputElement = document.getElementById(input.id);
            const errorElement = document.getElementById(`error-${input.id}`);
            if (!inputElement.value.trim() || inputElement.value.length < input.minLength || inputElement.value.length > input.maxLength) {
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

        // Validation for Number Inputs
        const numberInputs = [
            { id: 'highRiskPregnancies', min: 0, max: 80, errorMessage: 'Value must be between 0 and 80.' },
            { id: 'newbornsHBYC', min: 0, max: 80, errorMessage: 'Value must be between 0 and 80.' },
            { id: 'sickNewbornIdentified', min: 0, max: 80, errorMessage: 'Value must be between 0 and 80.' },
            { id: 'sickNewbornReferred', min: 0, max: 80, errorMessage: 'Value must be between 0 and 80.' },
            { id: 'tbCases', min: 0, max: 500, errorMessage: 'Value must be between 0 and 500.' },
            { id: 'ncdScreening', min: 0, max: 1000, errorMessage: 'Value must be between 0 and 1000.' }
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

        // Validation for Dropdown Inputs
        const dropdownInputs = [
            { id: 'dangerSigns', errorMessage: 'Selection is required.' },
            { id: 'trainedHBYC', errorMessage: 'Selection is required.' },
            { id: 'ecSurvey', errorMessage: 'Selection is required.' },
            { id: 'ncdTraining', errorMessage: 'Selection is required.' },
            { id: 'contraceptiveAwareness', errorMessage: 'Selection is required.' },
            { id: 'dotProvider', errorMessage: 'Selection is required.' },
            { id: 'module6And7', errorMessage: 'Selection is required.' },
            { id: 'fpIndenting', errorMessage: 'Selection is required.' },
            { id: 'delayPayments', errorMessage: 'Selection is required.' }
        ];

        dropdownInputs.forEach(input => {
            const inputElement = document.getElementById(input.id);
            const errorElement = document.getElementById(`error-${input.id}`);
            if (!inputElement.value.trim()) {
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
    section3: () => {
        let isValid = true;

        // Validation for Section 3 Fields
        const fieldsToValidate = [
            { id: 'pregnancyKit', errorMessage: 'Pregnancy Testing Kit selection is required.' },
            { id: 'condoms', errorMessage: 'Condoms selection is required.' },
            { id: 'hbncKit', errorMessage: 'HBNC Kit selection is required.' },
            { id: 'mbiKit', errorMessage: 'MBI Kit selection is required.' },
            { id: 'cocs', errorMessage: 'COCs (Mala N) selection is required.' },
            { id: 'emergencyPills', errorMessage: 'Emergency Contraceptive Pills selection is required.' },
            { id: 'centchroman', errorMessage: 'Centchroman (Chhaya Pills) selection is required.' },
            { id: 'amoxycillin', errorMessage: 'Syrup Amoxycillin selection is required.' },
            { id: 'pinkIFA', errorMessage: 'Pink IFA Tablets selection is required.' },
            { id: 'redIFATablets', errorMessage: 'Red IFA Tablets selection is required.' },
            { id: 'blueIFATablets', errorMessage: 'Blue IFA Tablets selection is required.' },
            { id: 'ifaSyrup', errorMessage: 'IFA Syrup selection is required.' },
            { id: 'cotrimoxazoleSyrup', errorMessage: 'Cotrimoxazole Syrup selection is required.' },
            { id: 'cotrimoxazoleTablets', errorMessage: 'Cotrimoxazole Tablets selection is required.' },
            { id: 'ors', errorMessage: 'ORS selection is required.' },
            { id: 'calciumTablets1', errorMessage: 'Calcium Tablets selection is required.' },
            { id: 'zinc', errorMessage: 'Zinc selection is required.' },
            { id: 'paracetamol', errorMessage: 'Paracetamol selection is required.' },

        ];

        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);

            if (!inputElement || !inputElement.value.trim()) {
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
    section4: () => {
        let isValid = true;

        // Fields to validate
        const fieldsToValidate = [
            {
                id: 'pregnantWomen',
                minLength: 2,
                maxLength: 250,
                errorMessage: 'Please provide a valid summary for Pregnant Women (2-250 characters).'
            },
            {
                id: 'lactatingMothers',
                minLength: 2,
                maxLength: 250,
                errorMessage: 'Please provide a valid summary for Lactating Mothers (2-250 characters).'
            },
            {
                id: 'newbornChildren',
                minLength: 2,
                maxLength: 250,
                errorMessage: 'Please provide a valid summary for New-born/children (2-250 characters).'
            },
            {
                id: 'tbPatients',
                minLength: 2,
                maxLength: 250,
                errorMessage: 'Please provide a valid summary for TB patients (2-250 characters).'
            },
            {
                id: 'ncdIndividuals',
                minLength: 2,
                maxLength: 250,
                errorMessage: 'Please provide a valid summary for Individuals over 30 years (2-250 characters).'
            }
        ];

        // Validate all fields at once
        fieldsToValidate.forEach(field => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(`error-${field.id}`);
            const inputValue = inputElement?.value.trim();

            if (!inputValue || inputValue.length < field.minLength || inputValue.length > field.maxLength) {
                if (errorElement) errorElement.textContent = field.errorMessage;
                inputElement?.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement?.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                isValid = false;
            } else {
                if (errorElement) errorElement.textContent = '';
                inputElement?.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                inputElement?.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields in Section 4 correctly before proceeding.');
        }

        return isValid;
    },
    section5: () => {
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
                { id: "knowledge", issueId: "knowledgeIssue", actionId: "knowledgeAction", name: "Knowledge" },
                { id: "attitude", issueId: "attitudeIssue", actionId: "attitudeAction", name: "Attitude" },
                { id: "practice", issueId: "practiceIssue", actionId: "practiceAction", name: "Practice" },
                { id: "other", issueId: "otherIssue", actionId: "otherAction", name: "Other (Specify)" }
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
// // Save & Next button handler
// function validateAndNext(section) {
//     if (validations[`section${section}`]()) {
//         saveSectionData(section);
//         document.getElementById(`section${section}`).classList.add('hidden');
//         const nextSection = document.getElementById(`section${section + 1}`);
//         if (nextSection) {
//             nextSection.classList.remove('hidden');
//         }
//     }
// }

document.querySelectorAll('select, input, textarea').forEach(element => {
    // Listen for both `input` and `change` events
    element.addEventListener('input', event => {
        const errorElement = document.getElementById(`error-${event.target.id}`);

        // Handle number inputs dynamically
        if (event.target.type === 'number') {
            const inputConfig = {
                highRiskPregnancies: { min: 0, max: 80 },
                newbornsHBYC: { min: 0, max: 80 },
                newbornsHBNC: { min: 0, max: 80 },
                sickNewbornIdentified: { min: 0, max: 80 },
                sickNewbornReferred: { min: 0, max: 80 },
                tbCases: { min: 0, max: 500 },
                ncdScreening: { min: 0, max: 1000 }
            }[event.target.id];
            const value = parseInt(event.target.value, 10);
            if (!event.target.value.trim() || isNaN(value) || value < inputConfig.min || value > inputConfig.max) {
                errorElement.textContent = `Value must be between ${inputConfig.min} and ${inputConfig.max}.`;
                event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else {
                errorElement.textContent = "";
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        }
        // Handle text and textarea inputs dynamically
        else if (event.target.tagName === 'TEXTAREA' || event.target.type === 'text') {
            const inputConfig = {
                ashaName: { minLength: 2, maxLength: 30 },
                pregnantWomen: { minLength: 2, maxLength: 250 },
                lactatingMothers: { minLength: 2, maxLength: 250 },
                newbornChildren: { minLength: 2, maxLength: 250 },
                tbPatients: { minLength: 2, maxLength: 250 },
                ncdIndividuals: { minLength: 2, maxLength: 250 },
                knowledgeIssue: { minLength: 2, maxLength: 200 },
                knowledgeAction: { minLength: 2, maxLength: 200 },
                attitudeIssue: { minLength: 2, maxLength: 200 },
                attitudeAction: { minLength: 2, maxLength: 200 },
                practiceIssue: { minLength: 2, maxLength: 200 },
                practiceAction: { minLength: 2, maxLength: 200 },
                otherIssue: { minLength: 2, maxLength: 200 },
                otherAction: { minLength: 2, maxLength: 200 }
            }[event.target.id];
            const value = event.target.value.trim();
            if (!value || value.length < inputConfig.minLength || value.length > inputConfig.maxLength) {
                errorElement.textContent = `Please provide a text between (${inputConfig.minLength}-${inputConfig.maxLength} ).`;
                event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else {
                errorElement.textContent = "";
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        }
        // Handle select inputs dynamically
        else if (event.target.tagName === 'SELECT') {
            if (!event.target.value.trim()) {
                errorElement.textContent = "Selection is required.";
                event.target.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.remove('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            } else {
                errorElement.textContent = "";
                event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
                event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
            }
        }
    });

    element.addEventListener('change', event => {
        const errorElement = document.getElementById(`error-${event.target.id}`);

        // Validate on change for all inputs
        if (errorElement && event.target.value.trim() !== "") {
            errorElement.textContent = "";
            event.target.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            event.target.classList.add('border-gray-300', 'focus:ring-indigo-500', 'focus:border-gray-300');
        }

        // Toggle VHND Section for specific input
        if (event.target.id === 'vhndSession') {
            toggleVHNDSection(event.target.value);
        }
    });
});




// Toggle VHND Section Visibility

// document.querySelector('.submit').addEventListener('click', event => {
//     event.preventDefault();

//     // Validate the last section (Section 5 in this case)
//     if (validations.section5()) {
//         // Save data for the last section
//         saveSectionData(5);

//         // Collect all the saved data from localStorage
//         const savedData = JSON.parse(localStorage.getItem('formData')) || {};

//         // Simulate submission by printing all data to the console
//         console.log("Submitting the following data:", savedData);

//         console.log('API Link:', savedData.apiUrl);



//         // Optionally send data to the backend
//         fetch(savedData.apiUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(savedData),
//         })
//             .then(response => {
//                 if (response.ok) {
//                     console.log('Form submitted successfully:', savedData);
//                     // Hide the form and show the success message
//                     document.getElementById('communityCheckList').classList.add('hidden');
//                     document.getElementById('successMessage').classList.remove('hidden');


//                     const apiLinkElement = document.getElementById('apiLink');
//                     apiLinkElement.textContent = savedData.apiUrl;
//                     apiLinkElement.href = savedData.apiUrl;
//                     // Clear the localStorage after submission
//                     localStorage.removeItem('formData');
//                 } else {
//                     throw new Error('Submission failed');
//                     alert('Failed to submit the form. Please try again.');
//                 }
//             })
//             .catch(error => console.error('Error submitting form:', error));
//     }

//         // // Hide the form and show the success message
//         // document.getElementById('communityCheckList').classList.add('hidden');
//         // document.getElementById('successMessage').classList.remove('hidden');

//         // // Clear the localStorage after submission
//         // localStorage.removeItem('formData');
//         // console.log("Local storage cleared for testing.");
//     }

// );

// Simulate form submission
document.querySelector('.submit').addEventListener('click', event => {
    event.preventDefault();

    if (validations.section5()) {
        saveSectionData(5);


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
        // const apiLink = document.getElementById('apiLink');
        // apiLink.textContent = formData.apiUrl;
        // apiLink.href = formData.apiUrl;

        // Show success message and reset the form
        document.getElementById('communityCheckList').classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Clear localStorage after submission
        localStorage.removeItem('formData');
        localStorage.removeItem('currentSection');
        console.log("Local storage cleared after testing.");
    }
});

// document.querySelector('.submit').addEventListener('click', event => {
//     event.preventDefault();

//     // Validate the last section (Section 5 in this case)
//     if (validations.section5()) {
//         // Save data for the last section
//         saveSectionData(5);

//         // Collect all the saved data from localStorage
//         const savedData = JSON.parse(localStorage.getItem('formData')) || {};

//         // Simulate submission by storing the data in local storage
//         console.log("Simulated submission:", savedData);

//         // Generate a fake API URL for testing
//         const fakeApiUrl = `http://localhost:3000/checklistapi/${savedData.id}`;
//         console.log("Simulated API URL:", fakeApiUrl);

//         // Update the success message with the fake API URL
//         const successMessage = document.getElementById('successMessage');
//         const apiLink = document.getElementById('apiLink');
//         apiLink.textContent = fakeApiUrl;
//         apiLink.href = fakeApiUrl;

//         // Show the success message
//         document.getElementById('communityCheckList').classList.add('hidden');
//         successMessage.classList.remove('hidden');

//         // Clear the localStorage after submission
//         localStorage.removeItem('formData');
//         console.log("Local storage cleared after testing.");
//     }
// });



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

// document.querySelector('.submit').addEventListener('click', event => {
//     event.preventDefault();

//     // Validate the last section (Section 5 in this case)
//     if (validations.section5()) {
//         // Collect all the saved data from localStorage
//         const savedData = JSON.parse(localStorage.getItem('formData')) || {};

//         // Simulate submission by printing all data to the console
//         console.log("Submitting the following data:", savedData);

//         // Show an alert to the user for confirmation
//         alert("Form submission simulated successfully. Check the console for submitted data.");

//         // Optionally, clear the localStorage for the next test run
//         localStorage.removeItem('formData');
//         console.log("Local storage cleared for testing.");
//     }
// });
  // Restart form functionality
//   function restartForm() {
//     document.getElementById('successMessage').classList.add('hidden');
//     document.getElementById('communityCheckList').reset();
//     document.getElementById('communityCheckList').classList.remove('hidden');

//     document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
//     document.getElementById('section1').classList.remove('hidden');
// }


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