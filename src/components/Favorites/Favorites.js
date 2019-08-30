import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./Favorites.scss"
import { search, searchFavorites } from "../../actions/MoviesList"
import { Rating } from "../Rating/Rating"
import { setLastAction } from "../../actions/User"
import { Link } from "react-router-dom"

class Favorites extends Component {

    constructor(props) {
        super(props)
        this.props.setLastAction("/favorites")
        this.props.searchFavorites(this.props.config.locale, this.props.user.session_id)
    }

    componentDidUpdate = (prevProps) => {
        if ((prevProps.config.locale.region !== this.props.config.locale.region) ||
            (prevProps.user.session_id !== this.props.user.session_id)) {
            this.props.searchFavorites(this.props.config.locale, this.props.user.session_id)
        }
    }

    drawMovie = (movie) => {
        return (
            <Link to={"/movie/" + movie.id} className="item" key={ movie.id }>
                <div className="info">
                    <h1>{ movie.title }</h1>
                    <span className="ratingAndControl">
                    <span className="favorite yes">♥</span>
                    <Rating rating={ movie.vote_average } count={ movie.vote_count } />
                </span>
                    <span className="overview">{ movie.overview }</span>
                </div>
                <img src={ this.props.config.images.base_url + "w154" + movie.poster_path } className="poster" alt={ movie.title }/>
            </Link>
        )
    }

    render () {
        if (!this.props.movies.favorites || !this.props.movies.favorites.results) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="moviesList">
                { this.props.movies.favorites.results.map(movie => ( this.drawMovie( movie ) ))}
                <div className="paging">
                    &lt;&lt; {i18n("pages", { num: this.props.movies.favorites.page, total: this.props.movies.favorites.total_pages})} &gt;&gt;
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user,
        config: state.configuration
    }
}

export default connect(stateToProps, { search, searchFavorites, setLastAction })(withTranslation()(Favorites))