// searchCatalogActions.js
export const setSearchValue = (searchValue) => ({
    type: 'SET_SEARCH_VALUE',
    payload: searchValue,
});

export const setPriceValue = (priceValue) => ({
    type: 'SET_PRICE_VALUE',
    payload: priceValue,
});

export const setSearchParams = (searchParams) => ({
    type: 'SET_SEARCH_PARAMS',
    payload: searchParams,
});
