export const SEARCH_COMPLETED = "SEARCH_COMPLETED"

export const completeSearch = (searchResult, query) => {
    return {
        type: SEARCH_COMPLETED,
        payload: {
            searchResult,
            query
        }
    }
}

export const search = (locale, query = 76341) => {
    return dispatch => {
        return fetch("https://api.themoviedb.org/3/movie/" + query + "?api_key=4baa15f53c4ddd8ee8af5521d2d82f9a&language=" + locale.language + "&region=" + locale.region)
            .then(response => response.json())
            .then(response => {
                dispatch(completeSearch(response, query))
            })
    }
}