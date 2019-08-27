import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import { search } from "../../actions/SearchBox"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        console.log("Do search")
        this.props.search()
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    render () {
        console.log("Props: ", this.props)
        const i18n = this.props.t
        return (
            <div className="SearchBox">
                <input type="text" onKeyDown={ (e) => this.onKeyDown(e) }/><button onClick={ () => this.onSearch() }>{i18n("search")}</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    console.log("State: ", state)
    return {
        searchResult: state.searchResult,
        query: state.query
    }
}

export default connect(stateToProps, {search})(withTranslation()(SearchBox))