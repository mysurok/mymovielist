export const CONFIGURATION_RECEIVED = "CONFIGURATION_RECEIVED"
export const LOCALE_CHANGED = "LOCALE_CHANGED"

export const completeConfigurationReceiving = (configuration) => {
    return {
        type: CONFIGURATION_RECEIVED,
        payload: {
            configuration: configuration
        }
    }
}

export const completeLocaleChanging = (locale) => {
    return {
        type: LOCALE_CHANGED,
        payload: {
            locale: locale
        }
    }
}

export const getConfiguration = () => {
    return dispatch => {
        return fetch("https://api.themoviedb.org/3/configuration?api_key=4baa15f53c4ddd8ee8af5521d2d82f9a")
            .then(response => response.json())
            .then(response => {
                dispatch(completeConfigurationReceiving(response))
            })
    }
}

export const changeLocale = (locale) => {
    return dispatch => {
        dispatch(completeLocaleChanging(locale))
    }
}