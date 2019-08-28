import { API_URL, API_KEY } from "./constants"
export const FAVORITES_GETTING_COMPLETED = "FAVORITES_GETTING_COMPLETED"
export const MARK_AS_FAVORITE = "MARK_AS_FAVORITE"

export const completeSearch = (searchResult) => {
    return {
        type: FAVORITES_GETTING_COMPLETED,
        payload: {
            searchResult
        }
    }
}

export const completeMarkAsFavorite = (id, isFavorite) => {
    return {
        type: MARK_AS_FAVORITE,
        payload: {
            id, isFavorite
        }
    }
}

export const searchFavorites = (locale, session_id) => {
    return dispatch => {
        return fetch(API_URL + "/account/{account_id}/favorite/movies?" + API_KEY + "&session_id=" + session_id + "&language=" + locale.language + "&region=" + locale.region + "&page=1")
            .then(response => response.json())
            .then(response => {
                dispatch(completeSearch(response))
            })
    }
}

export const markAsFavorite = (session_id, id, isFavorite) => {
    return dispatch => {
        fetch(API_URL + "/account/{account_id}/favorite?" + API_KEY + "&session_id=" + session_id,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    media_type: "movie",
                    media_id: id,
                    favorite: !isFavorite
                })
            })
            .then( response => response.json())
            .then( response => {
                if (response.status_code === 1 || response.status_code === 13) {
                    dispatch(completeMarkAsFavorite(id, !isFavorite))
                }
            })
    }
}
