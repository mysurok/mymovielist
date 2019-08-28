import { API_URL, API_KEY } from "./constants"

export const USER_LOGGED_IN = "USER_LOGGED_IN"
export const USER_LOGGED_OUT = "USER_LOGGED_OUT"

export const userLoggedIn = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: {
            user
        }
    }
}

export const logIn = ( username, password ) => {
    return dispatch => {
        return fetch(API_URL + "/authentication/token/new?" + API_KEY)
            .then(response => response.json())
            .then(response => {
                fetch(API_URL + "/authentication/token/validate_with_login?" + API_KEY,
                    {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                            "username": username,
                            "password": password,
                            "request_token": response.request_token
                        })
                    })
                    .then( response => response.json())
                    .then( response => {
                        fetch(API_URL + "/authentication/session/new?" + API_KEY,
                            {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify({ "request_token": response.request_token })
                            })
                            .then( response => response.json())
                            .then( response => {
                                dispatch(userLoggedIn(response))
                                fetch(API_URL + "/account?" + API_KEY + "&session_id=" + response.session_id)
                                    .then( response => response.json())
                                    .then( response => {
                                        dispatch(userLoggedIn(response))
                                    })
                            })
                    })
            })
    }
}

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}
