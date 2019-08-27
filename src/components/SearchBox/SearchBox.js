import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import { search } from "../../actions/SearchBox"
import LocaleSwitch from "../LocaleSwitch/LocaleSwitch"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        let value = document.getElementById("searchField").value
        if (value) {
            console.log("Do search", value)
            this.props.search(this.props.config.locale, value)
        }
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.config.locale.region !== this.props.config.locale.region) {
            this.props.search(this.props.config.locale, this.props.query)
        }
    }

    render () {
        const i18n = this.props.t
        return (
            <div className="SearchBox">
                <input type="text" id="searchField" onKeyDown={ (e) => this.onKeyDown(e) }/><button onClick={ () => this.onSearch() }>{i18n("search")}</button>

                <LocaleSwitch />
            </div>
        )
    }
}

const stateToProps = (state) => {
    console.log("State: ", state)
    return {
        config: state.configuration,
        query: state.searchBox.query
    }
}

export default connect(stateToProps, { search })(withTranslation()(SearchBox))