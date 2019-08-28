import { API_URL, API_KEY } from "./constants"
export const SEARCH_COMPLETED = "SEARCH_COMPLETED"
export const SEARCH_BY_ID_COMPLETED = "SEARCH_BY_ID_COMPLETED"
export const SEARCH_COMPLETED_WITH_ERROR = "SEARCH_COMPLETED_WITH_ERROR"
export const GO_BACK_TO_SEARCH_RESULT_LIST = "GO_BACK_TO_SEARCH_RESULT_LIST"

export const completeSearch = (searchResult, query) => {
    return {
        type: SEARCH_COMPLETED,
        payload: {
            searchResult,
            query
        }
    }
}

export const completeSearchById = (searchResult) => {
    return {
        type: SEARCH_BY_ID_COMPLETED,
        payload: {
            searchResult
        }
    }
}

export const completeSearchWithError = (searchError, query) => {
    return {
        type: SEARCH_COMPLETED_WITH_ERROR,
        payload: {
            searchError,
            query
        }
    }
}

export const search = (locale, query) => {
    return dispatch => {
        return fetch(API_URL + "/search/movie?" + API_KEY + "a&language=" + locale.language + "&region=" + locale.region + "&query=" + query)
            .then(response => response.json())
            .then(response => {
                dispatch(completeSearch(response, query))
            })
    }
}

export const searchById = (locale, id) => {
    return dispatch => {
        return fetch(API_URL + "/movie/" + id + "?" + API_KEY + "&language=" + locale.language + "&region=" + locale.region)
            .then(response => response.json())
            .then(response => {
                if (response.id) {
                    dispatch(completeSearchById(response))
                } else {
                    dispatch(completeSearchWithError(response))
                }
            })
    }
}

export const goBackToSearchResultList = () => {
    return dispatch => {
        dispatch({
            type: GO_BACK_TO_SEARCH_RESULT_LIST
        })
    }
}
