import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "./App"
import searchBoxReducer from "./reducers/SearchBox"
import configurationReducer from "./reducers/Configuration"
import userReducer from "./reducers/User"

import "./index.css"

const store = createStore( combineReducers({
    configuration: configurationReducer,
    searchBox: searchBoxReducer,
    user: userReducer
}), {}, applyMiddleware(reduxThunk))
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
