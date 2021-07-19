let defaultState = {
    hasSearched: false,
    result: {
        searchResult: [],
        forecastResult: [],
    },
    searchStatus: '',
    query: '',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS':
            return {
                result: action.payload,
                searchStatus: action.type,
                hasSearched: true,
                query: action.payload.query,
            }
        case 'SEARCH_FAILED':
            return {
                result: {
                    searchResult: [],
                    forecastResult: [],
                },
                searchStatus: action.type,
                hasSearched: true,
                query: action.payload.query,
            }
        default:
            return state
    }
}