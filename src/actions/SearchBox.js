export const SEARCH_COMPLETED = "SEARCH_COMPLETED"
export const SEARCH_BY_ID_COMPLETED = "SEARCH_BY_ID_COMPLETED"
export const SEARCH_COMPLETED_WITH_ERROR = "SEARCH_COMPLETED_WITH_ERROR"

export const completeSearch = (searchResult, query) => {
    return {
        type: SEARCH_COMPLETED,
        payload: {
            searchResult,
            query
        }
    }
}

export const completeSearchById = (searchResult, query) => {
    return {
        type: SEARCH_BY_ID_COMPLETED,
        payload: {
            searchResult,
            query
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
        return fetch("https://api.themoviedb.org/3/search/movie?api_key=4baa15f53c4ddd8ee8af5521d2d82f9a&language=" + locale.language + "&region=" + locale.region + "&query=" + query)
            .then(response => response.json())
            .then(response => {
                dispatch(completeSearch(response, query))
            })
    }
}

export const searchById = (locale, query = 76341) => {
    return dispatch => {
        return fetch("https://api.themoviedb.org/3/movie/" + query + "?api_key=4baa15f53c4ddd8ee8af5521d2d82f9a&language=" + locale.language + "&region=" + locale.region)
            .then(response => response.json())
            .then(response => {
                if (response.id) {
                    dispatch(completeSearch(response, query))
                } else {
                    dispatch(completeSearchWithError(response, query))
                }
            })
    }
}