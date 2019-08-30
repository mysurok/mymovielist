import { SEARCH_COMPLETED, SEARCH_COMPLETED_WITH_ERROR, SET_QUERY, FAVORITES_GETTING_COMPLETED, MARK_AS_FAVORITE } from "../actions/MoviesList"

const INITIAL_STATE = {
    searchError: null,
    list: null,
    favorites: null,
    query: ""
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SEARCH_COMPLETED:
            return {
                ...state,
                searchError: null,
                list: action.payload.searchResult,
                query: action.payload.query
            }
        case SEARCH_COMPLETED_WITH_ERROR:
            return {
                ...state,
                list: null,
                searchError: action.payload.searchError,
                query: action.payload.query
            }
        case FAVORITES_GETTING_COMPLETED:
            let shortList = {}
            if ( action.payload.searchResult.results ) action.payload.searchResult.results.forEach(movie => { shortList[movie.id] = true })

            return {
                ...state,
                favorites: action.payload.searchResult,
                shortFavorList: shortList,
                searchError: null
            }
        case MARK_AS_FAVORITE:
            state.shortFavorList[action.payload.id] = action.payload.isFavorite
            return {
                ...state,
                searchError: null
            }
        case SET_QUERY:
            return {
                ...state,
                query: action.payload.query
            }
        default:
            return state;
    }
}
