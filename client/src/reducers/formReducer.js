export const formReducer = (currentState, action) => {
    switch (action?.type) {
        case 'IMAGE_FORM': 
            return {...currentState, [action.e.target.name]: action.e.target.files[0]}
        default:
            return {...currentState, [action.e.target.name]: action.e.target.value} 
    }   
}