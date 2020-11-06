import { useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';

export const useCategory = (props) => {
  const { categoryId, query, updateCategories } = props;

  // Avoid repeating request
  const [skip, setSkip] = useState(false);

  const { loading, error, data } = useQuery(query, { skip: skip });

  if (data && data.category) {
    updateCategories(data.category);
    // Note: update currentPage, rootCategoryPage?
  }

  return {
    error: error,
    loading: loading,
  };
};
