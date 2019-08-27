import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import "./i18n"
import {applyMiddleware, combineReducers, createStore} from "redux"
import configurationReducer from "./reducers/Configuration"
import searchBoxReducer from "./reducers/SearchBox"
import reduxThunk from "redux-thunk"

it("renders without crashing", () => {

  const store = createStore( combineReducers({
    configuration: configurationReducer,
    searchBox: searchBoxReducer
  }), {}, applyMiddleware(reduxThunk))

  const div = document.createElement("div")
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
  )
  ReactDOM.unmountComponentAtNode(div)
})
