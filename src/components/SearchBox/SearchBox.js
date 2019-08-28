import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import {search, searchById} from "../../actions/SearchBox"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        let value = document.getElementById("searchField").value
        if (value) {
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
            if (this.props.movie) {
                this.props.searchById(this.props.config.locale, this.props.movie.id)
            } else {
                if (this.props.query) {
                    this.props.search(this.props.config.locale, this.props.query)
                }
            }
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
        movie: state.searchBox.movie,
        config: state.configuration,
        query: state.searchBox.query
    }
}

export default connect(stateToProps, { search, searchById })(withTranslation()(SearchBox))