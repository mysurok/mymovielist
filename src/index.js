import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "./App"
import configurationReducer from "./reducers/Configuration"
import userReducer from "./reducers/User"
import moviesListReducer from "./reducers/MoviesList"
import movieReducer from "./reducers/Movie"

import "./index.css"

const store = createStore( combineReducers({
    configuration: configurationReducer,
    user: userReducer,
    movies: moviesListReducer,
    movie: movieReducer
}), {}, applyMiddleware(reduxThunk))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
