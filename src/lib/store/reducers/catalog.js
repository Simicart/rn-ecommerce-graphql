import {handleActions} from 'redux-actions';
import {flattenNestedStruct} from '../../util/flattenNestedStruct.js';

import actions from '../actions/catalog';

export const name = 'catalog';

const initialState = {
  categories: {},
  currentPage: 1,
  pageSize: 6,
  prevPageTotal: null,
  rootCategoryId: 2,
};

const reducerMap = {

  //Flatten children
  [actions.updateCategories]: (state, {payload}) => {
    // console.log(JSON.stringify(payload, null, 2));

    const {id} = payload;
    const currentCategory = state.categories[id] || {};
    const currentId = currentCategory.id
                      ?? payload.rootCategoryId
                      ?? state.rootCategoryId
                      ?? 2;

    // if category has already been fetched, do nothing
    if (currentCategory.children) {
      return state;
    }

    // merge in the fetched child last
    return {
      ...state,
      categories: {
        ...state.categories,
        ...flattenNestedStruct(
            {
              id: currentId,
              children: payload.children,
            },
            'children',
            'id',
            currentId,
        ),
        [currentId]: {
          id: currentId,
          level: currentCategory.level ?? 1,
          name: 'Root category',
          children: payload.children
                           .map(x => x ? x.id : null)
                           .filter(x => !!x),
        },
      },
    };
  },

  [actions.setRootCategory]: (state, {payload}) => {
    return {
      ...state,
      rootCategoryId: payload,
    };
  },
  [actions.setCurrentPage.receive]: (state, {payload, error}) => {
    if (error) {
      return state;
    }

    return {
      ...state,
      currentPage: payload,
    };
  },
  [actions.setPrevPageTotal.receive]: (state, {payload, error}) => {
    if (error) {
      return state;
    }

    return {
      ...state,
      prevPageTotal: payload,
    };
  },
};

export default handleActions(reducerMap, initialState);
