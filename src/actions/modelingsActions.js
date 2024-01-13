// modelingsActions.js
import axios from 'axios';
import {
  setSearchValue,
  setModelings,
  setLoading,
  setMinPrice,
  setMaxPrice,
} from '../slices/modelingsSlice';

import { setDraftId } from '../slices/bucketSlice';

const filterModelings = (data, queryParams) => {
  const { searchValue, minPrice, maxPrice } = queryParams;
  const filteredData = data.filter((model) => {
    const modelNameMatches = model.type.toLowerCase().includes(searchValue.toLowerCase());
    const priceInRange =
      parseFloat(model.price) >= parseFloat(minPrice) && parseFloat(model.price) <= parseFloat(maxPrice);
    return modelNameMatches && priceInRange;
  });

  return filteredData;
};

export const setModelingAction = (queryParams) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`http://localhost:8000/equipment/`);
    const { user_request_id, equipment } = response.data;

    const draft_id = user_request_id;
    const data = equipment;

    if (data[0].image_url_after_serializer === '/mock.jpg' && data[0].type === 'Станция Щёлковская') {
      const filteredData = filterModelings(data, queryParams);
      dispatch(setModelings(filteredData));
    } else {
      dispatch(setModelings(data));
    }

    dispatch(setLoading(false));

    if (draft_id) {
      dispatch(setDraftId(draft_id));
    }
  } catch (error) {
    console.error('Error fetching modeling objects:', error);
    dispatch(setLoading(false));
  }
};
