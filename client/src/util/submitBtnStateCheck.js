export const submitBtnStateCheck = (inputValues, errorValues) => {
    const isInputValuesEmpty = Object.values(inputValues).some(value => value == '');
    const isThereAnErrorInInputs = Object.values(errorValues).some(value => value !== null);

    if (isInputValuesEmpty == false && isThereAnErrorInInputs == false) {
        // If we don't have an empty string and we don't have error activate submit button 
        console.log(true);
        return true;
    } else {
        console.log(false);
        return false;
    }
};