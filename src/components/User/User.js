import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./User.scss"
import { logIn, logOut } from "../../actions/User"

class User extends Component {

    login = () => {
        let username = document.getElementById("userName").value,
            password = document.getElementById("userPassword").value
        if (username && password) {
            this.props.logIn(username, password)
        }
    }

    getWatchlist = () => {
        console.log(">>>>>>>>>>>>>> getWatchlist")
    }

    getFavorites = () => {
        console.log(">>>>>>>>>>>>>> getFavorites")
    }

    logOut = () => {
        console.log(">>>>>>>>>>>>>> logOut")
        this.props.logOut()
    }

    onKeyDown = (e) => {
        // ENTER-key
        if (e.keyCode === 13) {
            this.login()
        }
    }

    render () {
        const i18n = this.props.t

        let title = this.props.user.username || i18n("login")

        return (
            <div className="user">
                <span className="title">{title}</span>

                { !this.props.user.session_id && <div className="profile loginForm">
                    <input type="text" placeholder={i18n("username")} id="userName" onKeyDown={ (e) => this.onKeyDown(e) }/>
                    <input type="password" placeholder={i18n("password")} id="userPassword" onKeyDown={ (e) => this.onKeyDown(e) }/>
                    <button onClick={() => ( this.login() )}>{i18n("login")}</button>
                </div> }

                { this.props.user.session_id && <div className="profile userActions">
                    <span className="action" onClick={() => ( this.getWatchlist() )}>{ i18n("watchlist") }</span>
                    <span className="action" onClick={() => ( this.getFavorites() )}>{ i18n("favorites") }</span>
                    <span className="action" onClick={() => ( this.logOut() )}>{ i18n("logout") }</span>
                </div> }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        movie: state.searchBox.movie,
        config: state.configuration,
        user: state.user
    }
}

export default connect(stateToProps, { logIn, logOut })(withTranslation()(User))