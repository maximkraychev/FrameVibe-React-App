import { useReducer } from "react";
import { formReducer } from "../reducers/formReducer";

export const useFormReducer = (initialValues, onSubmitHandler) => {
    const [values, dispatch] = useReducer(formReducer, initialValues);

    const changeHandler = (e, type) => {
        dispatch({ e, type });
        // setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        onSubmitHandler(values)
    }

    return {
        values,
        changeHandler,
        onSubmit
    }
}