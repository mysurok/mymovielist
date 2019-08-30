import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { withRouter } from "react-router-dom"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        let value = document.getElementById("searchField").value
        if (value) {
            this.props.history.push( "/movies/" + value )
        }
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.query !== this.props.query) {
            document.getElementById("searchField").value = this.props.query || ""
        }
    }

    render () {
        const i18n = this.props.t
        return (
            <div className="SearchBox">
                <input type="text" id="searchField" onKeyDown={ (e) => this.onKeyDown(e) }/><button onClick={ () => this.onSearch() }>{i18n("search")}</button>
            </div>
        )
    }
}

const stateToProps = (state) => {
    console.log("State: ", state)
    return {
        config: state.configuration,
        user: state.user,
        query: state.movies.query
    }
}

    export default withRouter(connect(stateToProps)(withTranslation()(SearchBox)))