import React, { Component } from "react"
import { withTranslation } from "react-i18next"

import "./Footer.scss"

class Footer extends Component {
    render () {
        const i18n = this.props.t
        return (
            <footer>
                {i18n("footer")}
            </footer>
        )
    }
}

export default withTranslation()(Footer)