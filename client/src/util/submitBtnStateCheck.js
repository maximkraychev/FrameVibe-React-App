//TODO... to maybe make it better make it a hook, save the SubmitBtn state here and on init accept a third parameter(option)
// that will include a input names that can be excluded from the check for empty string(that will be the valid fields that can be empty)

export const submitBtnStateCheck = (inputValues, errorValues) => {
    const isInputValuesEmpty = Object.values(inputValues).some(value => value == '');
    const isThereAnErrorInInputs = Object.values(errorValues).some(value => value !== null);

    if (isInputValuesEmpty == false && isThereAnErrorInInputs == false) {
        // If we don't have an empty string and we don't have error activate submit button 
        return true;
    } else {
        return false;
    }
};