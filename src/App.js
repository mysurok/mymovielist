import React, { Suspense } from "react"
import "./App.scss"
import './i18n'

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
    return (
    <div className="App">
        <Suspense fallback={ <h1>Loading...</h1> }>
            <Header />

            <div className="content">
                Empty app.
            </div>

            <Footer />
        </Suspense>
    </div>
  )
}

export default App
