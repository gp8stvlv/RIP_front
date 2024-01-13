// reducers/applicationReducer.js
const initialState = {
    searchResults: [],
    filterValues: {
        status: '',
        formationDateFrom: '',
        formationDateTo: '',
    },
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload,
            };

        case 'SET_FILTER_VALUES':
            return {
                ...state,
                filterValues: action.payload,
            };

        default:
            return state;
    }
};

export default applicationReducer;
