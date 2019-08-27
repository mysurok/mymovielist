import React, { Component } from "react"
import { withTranslation } from "react-i18next"

import "./Header.scss"
import logo from "../../img/logo.png"

class Header extends Component {
    render () {
        const i18n = this.props.t
        return (
            <header>
                <img src={logo} alt="logo" className="logo" />

                <h1>{i18n("header")}</h1>

                <div className="searchField">
                    <input type="text" /><button>{i18n("search")}</button>
                </div>
            </header>
        )
    }
}

export default withTranslation()(Header)