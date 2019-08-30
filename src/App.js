import React, { Suspense } from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import "./App.scss"
import "./i18n"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import MoviesList from "./components/MoviesList/MoviesList"
import Favorites from "./components/Favorites/Favorites"
import Movie from "./components/Movie/Movie"
import Error from "./components/Error/Error"

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Suspense fallback={ <h1>Loading...</h1> }>
                    <Header />

                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={ MoviesList } />
                            <Route exact path="/movies/:query" component={ MoviesList } />
                            <Route exact path="/movie/:id" component={ Movie } />
                            <Route exact path="/watchlist" component={ Favorites } />
                            <Route exact path="/favorites" component={ Favorites } />
                        </Switch>
                        <Error />
                    </div>

                    <Footer />
                </Suspense>
            </div>
        </BrowserRouter>
    )
}

export default App
