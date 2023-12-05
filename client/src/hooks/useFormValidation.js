import { useState } from "react"

// In this hook are stored the errors for form

export const useFormValidation = (fields, arrWithValidationAndMessages) => {
    const [errorMessages, setErrorMessages] = useState(() => {
        // Takes initial fields (object), get the keys, pars them to array with objects with structure {field: null}
        const arrWithObjects = Object.keys(fields).map(field => ({ [field]: null }));
        // Parse the array to object
        return Object.assign({}, ...arrWithObjects)
    });

    function checkFieldForError(field, value) {
        // Run the validation and return error message for every one that did not pass
        const arrWithErrors = arrWithValidationAndMessages[field]
            .map(errCheckerFn => errCheckerFn(value))
            .filter(error => error !== null)

        // Take only the first err or if there are not return null
        const errMsg = arrWithErrors.length > 0 ? arrWithErrors[0] : null;


        if (errMsg == null && Object.values(errorMessages).every(x => x == null)) { 
            // This way if we don't have a new Error to show and currently don't have error 
            // just return so react wont rerender
            return;
        }

        // Change the state
        setErrorMessages(errMsgs => ({ ...errMsgs, [field]: errMsg }));
    }


    function setManualError(field, errorMessage) {
        setErrorMessages(errMsgs => ({ ...errMsgs, [field]: errorMessage }));
    }

    return {
        errorMessages,
        checkFieldForError,
        setManualError
    }
}