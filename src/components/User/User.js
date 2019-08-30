import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Link } from 'react-router-dom'

import "./User.scss"
import { restoreSession, logIn, logOut } from "../../actions/User"

class User extends Component {

    constructor(props) {
        super(props)
        this.props.restoreSession()
        this.state = { buttonClassName: "disabled" }
    }

    login = () => {
        let username = document.getElementById("userName").value,
            password = document.getElementById("userPassword").value
        if (username && password) {
            this.props.logIn(username, password)
        }
    }

    logOut = () => {
        this.setState({ buttonClassName: "disabled" } )
        this.props.logOut()
    }

    onKeyUp = (e) => {
        this.setState({
            buttonClassName: !document.getElementById("userName").value || !document.getElementById("userPassword").value ? "disabled" : ""
        })
        // ENTER-key
        if (e.keyCode === 13) {
            this.login()
        }
    }

    render () {
        const i18n = this.props.t

        let title = this.props.user.session_id ? this.props.user.username : i18n("login")

        return (
            <div className="user">
                <span className="title">{title}</span>

                { !this.props.user.session_id && <div className="profile loginForm">
                    <input type="text" placeholder={i18n("username")} id="userName" onKeyUp={ (e) => this.onKeyUp(e) }/>
                    <input type="password" placeholder={i18n("password")} id="userPassword" onKeyUp={ (e) => this.onKeyUp(e) }/>
                    <button onClick={() => ( this.login() )} className={ this.state.buttonClassName }>{i18n("login")}</button>
                </div> }

                { this.props.user.session_id && <div className="profile userActions">
                    <Link to="/watchlist" className="action"> {i18n("watchlist")} </Link>
                    <Link to="/favorites" className="action"> {i18n("favorites")} </Link>
                    <span className="action" onClick={() => ( this.logOut() )}>{ i18n("logout") }</span>
                </div> }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(stateToProps, { restoreSession, logIn, logOut })(withTranslation()(User))