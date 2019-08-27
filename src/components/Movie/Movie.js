import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./Movie.scss"
import { Rating } from "../Rating/Rating"

class Movie extends Component {

    drawItem = (name, prefix = "", postfix = "") => {
        let movie = this.props.movie
        const i18n = this.props.t
        if (!movie[name]) {
            return null
        }
        if (Array.isArray(movie[name])) {
            return (
                <span className="item">
                    <span className="name">{ i18n(name) }:</span>
                    <span className="list">
                        { movie[name].map(item => (<span key={item.id || item.iso_3166_1}> {item.name} </span>))}
                    </span>
                </span>
            )
        }
        return (
            <span className="item">
                <span className="name">{ i18n(name) }:</span>
                <span className="value">{ prefix + movie[name] + postfix }</span>
            </span>
        )
    }

    drawUrl = (name) => {
        let movie = this.props.movie
        const i18n = this.props.t
        if (!movie[name]) {
            return null
        }
        return (
            <span className="item">
                <span className="name">{ i18n(name) }:</span>
                <span className="value"><a href={movie[name]} target="_blank">{ movie[name] }</a></span>
            </span>
        )
    }

    render () {
        let movie = this.props.movie
        if (!movie) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="movie">
                <div className="leftSection">
                    <img src={ this.props.config.images.base_url + "w185" + movie.poster_path } className="poster"/>
                    <Rating rating={ movie.vote_average } count={ movie.vote_count } popularity={{name: i18n("popularity"), count: movie.popularity}} />
                </div>
                <div className="info">
                    <h1>{ movie.title }</h1>
                    <h2>{ movie.original_title }</h2>
                    { this.drawItem("tagline") }
                    { this.drawUrl("homepage") }
                    { this.drawItem("production_countries") }
                    { this.drawItem("production_companies") }
                    { this.drawItem("genres") }
                    { this.drawItem("budget", "$") }
                    { this.drawItem("revenue", "$") }
                    { this.drawItem("release_date") }
                    { this.drawItem("runtime", null, i18n("min")) }
                    <span className="overview">{ movie.overview }</span>
                </div>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        movie: state.searchBox.searchResult,
        config: state.configuration,
        query: state.query
    }
}

export default connect(stateToProps)(withTranslation()(Movie))