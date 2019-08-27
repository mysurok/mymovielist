import reducer, { initialState } from './reducers/SearchBox'
import {SEARCH_COMPLETED, SEARCH_COMPLETED_WITH_ERROR} from "./actions/SearchBox"

//SEARCH_COMPLETED, SEARCH_COMPLETED_WITH_ERROR

describe('search reducer', () => {

    it('SEARCH_COMPLETED', () => {
        const action = {
            type: SEARCH_COMPLETED,
            payload: { searchResult: {id: "76341", original_title: "Mad Max: Fury Road"}, query: "76341" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchError: null,
            searchResult: action.payload.searchResult,
            query: action.payload.query
        })
    })

    it('SEARCH_COMPLETED_WITH_ERROR', () => {
        const action = {
            type: SEARCH_COMPLETED_WITH_ERROR,
            payload: { searchError: {status_code: 34, status_message: "Error 404"}, query: "7634" },
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            searchResult: null,
            query: action.payload.query,
            searchError: action.payload.searchError
        })
    })

})