import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import { search } from "../../actions/SearchBox"
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        console.log("Do search")
        this.props.search(this.props.config.locale)
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.config.locale.region !== this.props.config.locale.region) {
            this.props.search(this.props.config.locale)
        }
    }

    render () {
        const i18n = this.props.t
        return (
            <div className="SearchBox">
                <input type="text" onKeyDown={ (e) => this.onKeyDown(e) }/><button onClick={ () => this.onSearch() }>{i18n("search")}</button>

                <LocaleSwitch />
            </div>
        )
    }
}

const stateToProps = (state) => {
    console.log("State: ", state)
    return {
        config: state.configuration,
        searchResult: state.searchResult,
        query: state.query
    }
}

export default connect(stateToProps, { search })(withTranslation()(SearchBox))