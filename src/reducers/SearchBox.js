import { SEARCH_COMPLETED, SEARCH_BY_ID_COMPLETED, SEARCH_COMPLETED_WITH_ERROR, GO_BACK_TO_SEARCH_RESULT_LIST } from "../actions/SearchBox"

const INITIAL_STATE = {
    searchError: null,
    movie: null,
    list: null,
    query: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SEARCH_COMPLETED:
            return {
                ...state,
                movie: null,
                searchError: null,
                list: action.payload.searchResult,
                query: action.payload.query
            }
        case SEARCH_BY_ID_COMPLETED:
            return {
                ...state,
                searchError: null,
                movie: action.payload.searchResult
            }
        case SEARCH_COMPLETED_WITH_ERROR:
            return {
                ...state,
                list: null,
                movie: null,
                searchError: action.payload.searchError,
                query: action.payload.query
            }
        case GO_BACK_TO_SEARCH_RESULT_LIST:
            return {
                ...state,
                movie: null
            }
        default:
            return state;
    }
}