import reducer, { initialState } from './reducers/SearchBox'
import {
    SEARCH_COMPLETED,
    SEARCH_BY_ID_COMPLETED,
    SEARCH_COMPLETED_WITH_ERROR,
    completeSearch
} from "./actions/SearchBox"

describe('search reducer', () => {

    it('SEARCH_COMPLETED', () => {
        const action = {
            type: SEARCH_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}, query: "Mad Max" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            movie: null,
            list: action.payload.searchResult,
            query: action.payload.query
        })
    })

    it('SEARCH_BY_ID_COMPLETED', () => {
        const initialState = {
            list: {results: []},
            searchError: null,
            movie: null
        }
        const action = {
            type: SEARCH_BY_ID_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}},
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            movie: action.payload.searchResult
        })
    })

    it('SEARCH_COMPLETED_WITH_ERROR', () => {
        const initialState = {
            list: {results: []},
            searchError: null,
            movie: {id: "76341", original_title: "Mad Max: Fury Road"}
        }
        const action = {
            type: SEARCH_COMPLETED_WITH_ERROR,
            payload: { searchError: {status_code: 34, status_message: "Error 404"}, query: "7634" }
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            list: null,
            movie: null,
            query: action.payload.query,
            searchError: action.payload.searchError
        })
    })

    it('SEARCH_COMPLETED', () => {
        const initialState = {
            list: null,
            movie: null,
            searchError: "404 Movie not found"
        }
        const action = {
            type: SEARCH_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}, query: "Mad Max" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            movie: null,
            list: action.payload.searchResult,
            query: action.payload.query
        })
    })

    it('SEARCH_BY_ID_COMPLETED', () => {
        const initialState = {
            list: null,
            movie: null,
            searchError: "404 Movie not found"
        }
        const action = {
            type: SEARCH_BY_ID_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}},
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            movie: action.payload.searchResult
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
})