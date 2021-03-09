import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCatalogContext } from '../..';

// TODO: make error, loading state to stop too many request :)
export const useCategory = (props) => {
  const { categoryId, query, updateCategories, forced = false } = props;
  console.info('useCategory rendered ' + (categoryId || 'nothing'));

  const [catalogState] = useCatalogContext();
  const { categories } = catalogState;

  // Avoid repeating request
  const [skip, setSkip] = useState(false);

  // if data already in redux ---> end
  if (!skip && categories.hasOwnProperty(categoryId) && !forced) {
    setSkip(true);
  }

  const { loading, error, data } = useQuery(query, { skip: skip });

  if (data && data.category) {
    setSkip(true);
    updateCategories(data.category);
    console.log('smtt');
    console.log(JSON.stringify(data.category, null, 2));
    // TODO: update currentPage, rootCategoryPage?
  }

  return {
    error: error,
    loading: loading,
  };
};
