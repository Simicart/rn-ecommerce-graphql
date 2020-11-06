import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useCatalogContext } from '../..';

export const useCategory = (props) => {
  const { categoryId, query, updateCategories, forced = false } = props;

  const [catalogState] = useCatalogContext();
  const { categories } = catalogState;

  // Avoid repeating request
  const [skip, setSkip] = useState(false);

  // if data already in redux ---> end
  setSkip(!skip && categories.hasOwnProperty(categoryId) && !forced);

  const { loading, error, data } = useQuery(query, { skip: skip });

  if (data && data.category) {
    updateCategories(data.category);
    // TODO: update currentPage, rootCategoryPage?
  }

  return {
    error: error,
    loading: loading,
  };
};
