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

                {i18n("header")}
            </header>
        )
    }
}

export default withTranslation()(Header)