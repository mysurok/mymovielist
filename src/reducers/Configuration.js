import { CONFIGURATION_RECEIVED, LOCALE_CHANGED } from "../actions/Configuration"

const INITIAL_STATE = {
    images: {},
    locale: {
        "language": "en",
        "region": "EN"
    }
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CONFIGURATION_RECEIVED:
            return {
                ...state,
                ...action.payload.configuration
            }
        case LOCALE_CHANGED:
            return {
                ...state,
                locale: action.payload.locale
            }
        default:
            return state;
    }
}