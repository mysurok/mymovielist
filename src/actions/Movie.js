import { API_URL, API_KEY } from "./constants"
export const MOVIE_SEARCH_COMPLETED = "MOVIE_SEARCH_COMPLETED"
export const MOVIE_SEARCH_COMPLETED_WITH_ERROR = "MOVIE_SEARCH_COMPLETED_WITH_ERROR"

export const completeSearch = (searchResult) => {
    return {
        type: MOVIE_SEARCH_COMPLETED,
        payload: {
            searchResult
        }
    }
}

export const completeSearchWithError = (searchError) => {
    return {
        type: MOVIE_SEARCH_COMPLETED_WITH_ERROR,
        payload: {
            searchError
        }
    }
}

export const search = (locale, id) => {
    return dispatch => {
        return fetch(API_URL + "/movie/" + id + "?" + API_KEY + "&language=" + locale.language + "&region=" + locale.region)
            .then(response => response.json())
            .then(response => {
                if (response.id) {
                    dispatch(completeSearch(response))
                } else {
                    dispatch(completeSearchWithError(response))
                }
            })
    }
}
