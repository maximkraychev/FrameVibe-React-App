import { STATE_FIELDS } from '../constants/stateFieldsConstants';

export const stateReducer = (currentState, action) => {

    switch (action?.type) {
        case STATE_FIELDS.POSTS:
            return { ...currentState, [action.type]: action.value }
        case STATE_FIELDS.DETAILS_VISIBILITY:
            return { ...currentState, [action.type]: action.value }
        case STATE_FIELDS.DETAIL_POST:
            return { ...currentState, [action.type]: action.value }
        default:
            return { ...currentState }
    }
};