import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import { getConfiguration, changeLocale } from "../../actions/Configuration"

import "./LocaleSwitch.scss"

const LOCALES = {
    "en": {"language": "en", "region": "EN"},
    "se": {"language": "sv", "region": "SE"},
    "ru": {"language": "ru", "region": "RU"}
}

class LocaleSwitch extends Component {
    constructor(props) {
        super(props)
        this.props.getConfiguration()
    }

    changeLocale = (e) => {
        if (e.target.getAttribute("value")) {
            this.props.i18n.changeLanguage(e.target.getAttribute("value"));
            this.props.changeLocale(LOCALES[e.target.getAttribute("value")] || LOCALES.en)
        }
    }

    render () {
        return (
            <div className="localeSwitch" onClick={ (e) => this.changeLocale(e) }>
                <span className="flag-icon flag-icon-gb" value="en" />
                <span className="flag-icon flag-icon-se" value="se" />
                <span className="flag-icon flag-icon-ru" value="ru" />
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        config: state.configuration,
    }
}

export default connect(stateToProps, { getConfiguration, changeLocale })(withTranslation()(LocaleSwitch))

