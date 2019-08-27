import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "./App"
import searchBoxReducer from "./reducers/SearchBox"

import "./index.css"

const store = createStore(searchBoxReducer, {}, applyMiddleware(reduxThunk))
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
