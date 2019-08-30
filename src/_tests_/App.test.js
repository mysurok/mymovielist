import React from "react"
import ReactDOM from "react-dom"
import App from "../App"
import { Provider } from "react-redux"
import "../i18n"
import {applyMiddleware, combineReducers, createStore} from "redux"
import configurationReducer from "../reducers/Configuration"
import userReducer from "../reducers/User"
import moviesListReducer from "../reducers/MoviesList"
import movieReducer from "../reducers/Movie"
import reduxThunk from "redux-thunk"

it("renders without crashing", () => {

    const store = createStore( combineReducers({
        configuration: configurationReducer,
        user: userReducer,
        movies: moviesListReducer,
        movie: movieReducer
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
