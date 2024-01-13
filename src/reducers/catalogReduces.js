// searchCatalogReducer.js
const initialState = {
    searchValue: '',
    priceValue: '',
};

const searchCatalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_VALUE':
            return {
                ...state,
                searchValue: action.payload,
            };
        case 'SET_PRICE_VALUE':
            return {
                ...state,
                priceValue: action.payload,
            };
        default:
            return state;
    }
};

export default searchCatalogReducer;
