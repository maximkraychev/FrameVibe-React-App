import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {

        if (e.target.files) {
            setValues(state => ({ ...state, [e.target.name]: e.target.files[0] }));
        } else {
            setValues(state => ({ ...state, [e.target.name]: e.target.value }));
        }

    }

    const onSubmit = (e) => {
        e.preventDefault()

        onSubmitHandler(values)
    }

    const changeValueByField = (field, value) => {
        setValues(state => ({ ...state, [field]: value }));
    }

    return {
        values,
        changeHandler,
        onSubmit,
        changeValueByField
    }
}