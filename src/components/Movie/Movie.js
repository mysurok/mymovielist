import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

import "./Movie.scss"
import {search} from "../../actions/SearchBox"
/*
adult: false
backdrop_path: "/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg"
belongs_to_collection: {id: 8945, name: "Безумный Макс (Коллекция)", poster_path: "/dhp7PoxYtf72LXFqOFRsWLmD0br.jpg", backdrop_path: "/zI0q2ENcQOLECbe0gAEGlncVh2j.jpg"}
homepage: "http://www.madmaxmovie.com"
id: 76341
imdb_id: "tt1392190"
original_language: "en"
popularity: 22.122
spoken_languages: [{…}]
status: "Released"
video: false
vote_average: 7.4
vote_count: 14815
 */

class Movie extends Component {
    render () {
        let movie = this.props.movie
        if (!movie) {
            return null
        }

        const i18n = this.props.t

        return (
            <div className="movie">
                <img src={ this.props.config.images.base_url + "w185" + movie.poster_path } className="poster"/>
                <h1>{ movie.title }</h1>
                <h2>{ movie.original_title }</h2>
                { i18n("production_countries") }: { movie.production_countries.map(item => (<span key={item.iso_3166_1}> {item.name} </span>))}
                { i18n("production_companies") }: { movie.production_companies.map(item => (<span key={item.id}> {item.name} </span>))}
                { i18n("tagline") }: { movie.tagline }
                { i18n("genres") }: { movie.genres.map(item => (<span key={item.id}> {item.name} </span>))}
                { i18n("budget") }: { movie.budget }
                { i18n("revenue") }: { movie.revenue }
                { i18n("release_date") }: { movie.release_date }
                { i18n("runtime") }: { movie.runtime }
                { i18n("overview") }: { movie.overview }
            </div>
        )
    }
}

const stateToProps = (state) => {
    console.log("State: ", state)
    return {
        movie: state.searchBox.searchResult,
        config: state.configuration,
        query: state.query
    }
}

export default connect(stateToProps, { search })(withTranslation()(Movie))