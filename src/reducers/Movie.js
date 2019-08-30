import { MOVIE_SEARCH_COMPLETED, MOVIE_SEARCH_COMPLETED_WITH_ERROR } from "../actions/Movie"

const INITIAL_STATE = {
    searchError: null,
    movie: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MOVIE_SEARCH_COMPLETED:
            return {
                ...state,
                ...action.payload.searchResult,
                searchError: null
            }
        case MOVIE_SEARCH_COMPLETED_WITH_ERROR:
            return {
                ...state,
                movie: null,
                searchError: action.payload.searchError
            }
        default:
            return state;
    }
}
