import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./Error.scss"

class Error extends Component {

    render () {
        if (!this.props.error) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="error">
                {i18n("error_title")}
                { this.props.error.status_message }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        error: state.searchBox.searchError
    }
}

export default connect(stateToProps)(withTranslation()(Error))