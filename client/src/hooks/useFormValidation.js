import { useState } from "react"

// In this hook is storing the errors for form

export const useFormValidation = (fields, arrWithValidationAndMessages) => {

    const [errorMessages, setErrorMessages] = useState(() => {
        // Takes initial fields (object), get the keys, pars them to array with objects with structure {field: null}
        const arrWithObjects = Object.keys(fields).map(field => ({ [field]: null }));
        // Parse the array to object
        return Object.assign({}, ...arrWithObjects);
    });

    const [errorVisibility, setErrorVisibility] = useState(() => {
        const arrWithObjects = Object.keys(fields).map(field => ({ [field]: false }));
        return Object.assign({}, ...arrWithObjects);
    });

    function checkFieldForError(field, value, options = {}) {


        if (options.async && options.error) {
            // In case of async checks to server

            // Run base validation
            const errMsg = checkForErrorBaseCase(field, value);

            // If we have an error on client don't make request for async validation from server;
            if (errMsg) {
                return;
            }

            return setTimeout(async () => {
                let user = null;

                if (value !== '') {
                    user = await options.async(value);
                }

                if (user) {
                    setErrorMessages(errMsgs => ({ ...errMsgs, [field]: options.error }));
                }
            }, 1000)

        } else if (options.passwordRef) {
            // In case of Repass check

            const arrWithErrors = arrWithValidationAndMessages[field]
                .map(errCheckerFn => errCheckerFn(value, options.passwordRef))
                .filter(error => error !== null)

            const errMsg = arrWithErrors.length > 0 ? arrWithErrors[0] : null;

            if (errMsg == null && Object.values(errorMessages).every(x => x == null)) {
                return;
            }

            setErrorMessages(errMsgs => ({ ...errMsgs, [field]: errMsg }));

        } else {
            // Base case
            checkForErrorBaseCase(field, value);
        }
    }


    function checkForErrorBaseCase(field, value) {

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
        return errMsg;
    }

    function changeErrorVisibility(field) {

        if (errorVisibility[field] == false) {
            setErrorVisibility(oldState => ({ ...oldState, [field]: true }));
        }
    }

    return {
        errorMessages,
        errorVisibility,
        checkFieldForError,
        changeErrorVisibility
    }
}