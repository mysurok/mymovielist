import reducer, { initialState } from '../reducers/MoviesList'
import {
    SEARCH_COMPLETED,
    SEARCH_COMPLETED_WITH_ERROR,
    FAVORITES_GETTING_COMPLETED,
    completeSearch,
    completeFavoriteSearch
} from "../actions/MoviesList"

describe('search reducer', () => {

    it('SEARCH_COMPLETED', () => {
        const action = {
            type: SEARCH_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}, query: "Mad Max" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            favorites: null,
            list: action.payload.searchResult,
            query: action.payload.query
        })
    })

    it('SEARCH_COMPLETED_WITH_ERROR', () => {
        const initialState = {
            list: {results: []},
            searchError: null
        }
        const action = {
            type: SEARCH_COMPLETED_WITH_ERROR,
            payload: { searchError: {status_code: 34, status_message: "Error 404"}, query: "7634" }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            list: null,
            query: action.payload.query,
            searchError: action.payload.searchError
        })
    })

    it('SEARCH_COMPLETED', () => {
        const initialState = {
            list: null,
            searchError: "404 Movie not found"
        }
        const action = {
            type: SEARCH_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}, query: "Mad Max" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            list: action.payload.searchResult,
            query: action.payload.query
        })
    })

    it('FAVORITES_GETTING_COMPLETED', () => {
        const initialState = {
            list: [],
            searchError: null
        }
        const action = {
            type: FAVORITES_GETTING_COMPLETED,
            payload: { searchResult: {
                    results: [{id: "76341", original_title: "Mad Max: Fury Road"}],
                    page: 1,
                    total_pages: 2,
                    total_results: 16
                }},
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            shortFavorList: { "76341": true},
            favorites: action.payload.searchResult
        })
    })

    it('completeSearch: should create an action to set SEARCH_COMPLETED', () => {
        const expectedAction = {
            type: SEARCH_COMPLETED,
            payload: {
                searchResult: {id: "76341", original_title: "Mad Max: Fury Road"},
                query: "Mad Max"
            }
        }
        expect(completeSearch({id: "76341", original_title: "Mad Max: Fury Road"}, "Mad Max")).toEqual(expectedAction)
    })

    it('completeSearch: should create an action to set FAVORITES_GETTING_COMPLETED', () => {
        const expectedAction = {
            type: FAVORITES_GETTING_COMPLETED,
            payload: {
                searchResult: { searchResult: {
                        results: [{id: "76341", original_title: "Mad Max: Fury Road"}],
                        page: 1,
                        total_pages: 2,
                        total_results: 16
                    }}
            }
        }
        expect(completeFavoriteSearch({ searchResult: {
                results: [{id: "76341", original_title: "Mad Max: Fury Road"}],
                page: 1,
                total_pages: 2,
                total_results: 16
            }}, "Mad Max")).toEqual(expectedAction)
    })
})