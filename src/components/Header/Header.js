import React, { Component } from "react"
import { withTranslation } from "react-i18next"

import SearchBox from "../SearchBox/SearchBox"
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch"
import "./Header.scss"
import logo from "../../img/logo.png"

class Header extends Component {
    render () {
        const i18n = this.props.t
        return (
            <header>
                <img src={logo} alt="logo" className="logo" />

                <h1>{i18n("header")}</h1>

                <SearchBox />

                <LocaleSwitch />
            </header>
        )
    }
}

export default withTranslation()(Header)