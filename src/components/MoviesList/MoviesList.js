import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./MoviesList.scss"
import { search, searchById } from "../../actions/SearchBox"
import { markAsFavorite } from "../../actions/Favorites"
import { Rating } from "../Rating/Rating"

class Movie extends Component {

    constructor(props) {
        super(props)
    }

    openMovie = (id) => {
        this.props.searchById(this.props.config.locale, id)
    }

    onFavoriteClick = (e, id, isFavorite) => {
        e.stopPropagation()
        this.props.markAsFavorite(this.props.user.session_id, id, isFavorite)
    }

    drawMovie = (movie) => {
        let isFavorite = this.props.favorites.shortList && !!this.props.favorites.shortList[movie.id]

        return (
            <div className="item" key={ movie.id } onClick={ () => { this.openMovie(movie.id) } }>
                <div className="info">
                    <h1>{ movie.title }</h1>
                    <span className="ratingAndControl">
                        <span className={ "favorite " + ( isFavorite ? "yes" : "no" ) } onClick={ (e) => { this.onFavoriteClick(e, movie.id, isFavorite) } }>♥</span>
                        <Rating rating={ movie.vote_average } count={ movie.vote_count } />
                    </span>
                    <span className="overview">{ movie.overview }</span>
                </div>
                <img src={ this.props.config.images.base_url + "w154" + movie.poster_path } className="poster" alt={ movie.title }/>
            </div>
        )
    }

    render () {
        if (this.props.user.lastAction !== "search" || !this.props.searchResult || !this.props.searchResult.results || !!this.props.movie) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="moviesList">
                { this.props.searchResult.results.map(movie => ( this.drawMovie( movie ) ))}
                <div className="paging">
                    &lt;&lt; {i18n("pages", { num: this.props.searchResult.page, total: this.props.searchResult.total_pages})} &gt;&gt;
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        searchResult: state.searchBox.list,
        favorites: state.favorites,
        movie: state.searchBox.movie,
        user: state.user,
        config: state.configuration
    }
}

export default connect(stateToProps, { search, searchById, markAsFavorite })(withTranslation()(Movie))