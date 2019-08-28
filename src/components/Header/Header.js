import React, { Component } from "react"
import { withTranslation } from "react-i18next"

import SearchBox from "../SearchBox/SearchBox"
import User from "../User/User"
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch"

import logo from "../../img/logo.png"
import "./Header.scss"

class Header extends Component {
    render () {
        const i18n = this.props.t
        return (
            <header>
                <img src={logo} alt="logo" className="logo" />

                <h1>{i18n("header")}</h1>

                <SearchBox />
                <User />
                <LocaleSwitch />
            </header>
        )
    }
}

export default withTranslation()(Header)