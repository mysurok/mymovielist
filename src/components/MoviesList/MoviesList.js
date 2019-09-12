import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./MoviesList.scss"
import { search, setQuery, searchFavorites, markAsFavorite } from "../../actions/MoviesList"
import { Rating } from "../Rating/Rating"
import { setLastAction } from "../../actions/User"
import { Link } from "react-router-dom"

class Movie extends Component {

    constructor(props) {
        super(props)
        if (this.props.match.params.query) {
            this.props.setQuery( this.props.match.params.query )
            this.props.setLastAction("/movies/" + this.props.match.params.query)
        }
        if (this.props.user.session_id) {
            this.props.searchFavorites(this.props.config.locale, this.props.user.session_id)
        }
    }

    componentDidUpdate = (prevProps) => {
        if ((prevProps.config.locale.region !== this.props.config.locale.region) ||
            (prevProps.movies.query !== this.props.match.params.query)) {
            if (this.props.match.params.query) {
                this.props.search(this.props.config.locale, this.props.match.params.query)
            }
        }
    }

    onFavoriteClick = (e, id, isFavorite) => {
        e.stopPropagation()
        e.preventDefault()
        if (this.props.user.session_id) {
            this.props.markAsFavorite(this.props.user.session_id, id, isFavorite)
        }
    }

    drawMovie = (movie) => {
        let isFavorite = this.props.movies.shortFavorList && !!this.props.movies.shortFavorList[movie.id]

        return (
            <Link to={"/movie/" + movie.id} className="item" key={ movie.id }>
                <div className="info">
                    <h1>{ movie.title }</h1>
                    <span className="ratingAndControl">
                        <span className={ "favorite " + ( isFavorite ? "yes" : "no" ) } onClick={ (e) => { this.onFavoriteClick(e, movie.id, isFavorite) } }>♥</span>
                        <Rating rating={ movie.vote_average } count={ movie.vote_count } />
                    </span>
                    <span className="overview">{ movie.overview }</span>
                </div>
                <img src={ this.props.config.images.base_url + "w154" + movie.poster_path } className="poster" alt={ movie.title }/>
            </Link>
        )
    }

    render () {
        if (!this.props.movies.list || !this.props.movies.list.results) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="moviesList">
                { this.props.movies.list.results.map(movie => ( this.drawMovie( movie ) ))}
                <div className="paging">
                    &lt;&lt; {i18n("pages", { num: this.props.movies.list.page, total: this.props.movies.list.total_pages})} &gt;&gt;
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

export default connect(stateToProps, { search, markAsFavorite, setLastAction, searchFavorites, setQuery })(withTranslation()(Movie))