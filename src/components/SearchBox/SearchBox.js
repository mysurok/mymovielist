import React, { Component } from "react"
import { withTranslation } from "react-i18next"

import "./SearchBox.scss"

class SearchBox extends Component {
    onSearch = () => {
        console.log("Do search")
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    render () {
        const i18n = this.props.t
        return (
            <div className="SearchBox">
                <input type="text" onKeyDown={ (e) => this.onKeyDown(e) }/><button onClick={ () => this.onSearch() }>{i18n("search")}</button>
            </div>
        )
    }
}

export default withTranslation()(SearchBox)