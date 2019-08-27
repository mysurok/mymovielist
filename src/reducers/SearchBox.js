import {SEARCH_COMPLETED, SEARCH_BY_ID_COMPLETED, SEARCH_COMPLETED_WITH_ERROR} from "../actions/SearchBox"

const INITIAL_STATE = {
    searchError: null,
    searchResult: null,
    query: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SEARCH_COMPLETED:
            return {
                ...state,
                searchError: null,
                searchResult: action.payload.searchResult,
                query: action.payload.query
            }
        case SEARCH_BY_ID_COMPLETED:
            return {
                ...state,
                searchError: null,
                searchResult: action.payload.searchResult,
                query: action.payload.query
            }
        case SEARCH_COMPLETED_WITH_ERROR:
            return {
                ...state,
                searchResult: null,
                searchError: action.payload.searchError,
                query: action.payload.query
            }
        default:
            return state;
    }
}