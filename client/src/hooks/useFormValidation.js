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

        // Change the state
        if (errMsg) {
            // Change the state only if we have an error that way we wont force react to rerender
            setErrorMessages(errMsgs => ({ ...errMsgs, [field]: errMsg }))
        }
    }

    return {
        errorMessages,
        checkFieldForError
    }
}