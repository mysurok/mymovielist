import { API_URL, API_KEY } from "./constants"
import Cookies from "js-cookie"

export const USER_LOGGED_IN = "USER_LOGGED_IN"
export const USER_LOGGED_OUT = "USER_LOGGED_OUT"
export const RESTORE_SESSION = "RESTORE_SESSION"

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
                                dispatch(userLoggedIn({ session_id: response.session_id, username: username }))
                                Cookies.set("session_id", response.session_id)
                                Cookies.set("username", username)
                            })
                    })
            })
    }
}
export const restoreSession = () => {
    return dispatch => {
        let session_id = Cookies.get("session_id"),
            username = Cookies.get("username")
        dispatch({
            type: RESTORE_SESSION,
            payload: { user: {session_id, username } }
        })
    }
}

export const logOut = () => {
    Cookies.remove("session_id")
    Cookies.remove("username")
    return dispatch => {
        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}
