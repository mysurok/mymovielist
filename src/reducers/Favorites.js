import {FAVORITES_GETTING_COMPLETED, MARK_AS_FAVORITE} from "../actions/Favorites"

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MARK_AS_FAVORITE:
            state.shortList[action.payload.id] = action.payload.isFavorite
            return {
                ...state,
                searchError: null
            }
        case FAVORITES_GETTING_COMPLETED:
            let shortList = {}
            action.payload.searchResult.results.forEach(movie => { shortList[movie.id] = true })

            return {
                ...state,
                ...action.payload.searchResult,
                shortList: shortList,
                searchError: null
            }
        default:
            return state;
    }
}