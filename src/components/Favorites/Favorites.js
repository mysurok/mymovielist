import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./Favorites.scss"
import { search, searchById } from "../../actions/SearchBox"
import { Rating } from "../Rating/Rating"

class Favorites extends Component {

    openMovie = (id) => {
        this.props.searchById(this.props.config.locale, id)
    }

    drawMovie = (movie) => {
        return (
            <div className="item" key={ movie.id } onClick={ () => { this.openMovie(movie.id) } }>
                <div className="info">
                    <h1>{ movie.title }</h1>
                    <span className="ratingAndControl">
                        <span className="favorite yes">♥</span>
                        <Rating rating={ movie.vote_average } count={ movie.vote_count } />
                    </span>
                    <span className="overview">{ movie.overview }</span>
                </div>
                <img src={ this.props.config.images.base_url + "w154" + movie.poster_path } className="poster" alt={ movie.title }/>
            </div>
        )
    }

    render () {
        if (this.props.user.lastAction !== "favorites" || !this.props.favorites.results || !!this.props.movie) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="moviesList">
                { this.props.favorites.results.map(movie => ( this.drawMovie( movie ) ))}
                <div className="paging">
                    &lt;&lt; {i18n("pages", { num: this.props.favorites.page, total: this.props.favorites.total_pages})} &gt;&gt;
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        favorites: state.favorites,
        movie: state.searchBox.movie,
        user: state.user,
        config: state.configuration
    }
}

export default connect(stateToProps, { search, searchById })(withTranslation()(Favorites))