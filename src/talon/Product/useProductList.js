import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react'

export const GET_PRODUCT_LIST = gql`
  query(
    $category_id: String!,
    $pageSize: Int,
    $priceDir: SortEnum, 
    $nameDir: SortEnum,
    $positionDir: SortEnum,
    $color: [String],
    $climate: [String],
    $eco_collection: [String],
    $erin_recommends: [String],
    $sale: [String],
    $size: [String],
    $style_general: [String]
  ){
    products(
      filter: {
        category_id: {eq: $category_id},
        climate: {in: $climate}
        color: {in: $color},
        eco_collection: {in: $eco_collection},
        erin_recommends: {in: $erin_recommends},
        sale: {in: $sale},
        size: {in: $size},
        style_general: {in: $style_general}
      }, 
      pageSize: $pageSize,
      currentPage: 1,
      sort: {
        price: $priceDir,
        name: $nameDir,
        position: $positionDir
      }
    ){
      aggregations {
        label
        attribute_code
        options {
          count
          label
          value
        }
      }
      items {
        uid
        name
        thumbnail {
          disabled
          position
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
          }
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
      sort_fields {
        default
        options {
          label
          value
        }
      }
      page_info {
        current_page
        total_pages
      }
      total_count
    }
  }
`

const pageSizeStep = 12

export const useProductList = id => {
  const [productList, setProductList] = useState([])
  const [sortFields, setSortFields] = useState([])
  const [filterFields, setFilterFields] = useState([])
  const [canLoadMore, setCanLoadMore] = useState(true)

  const {
    data: initialData,
    loading: initialLoading,
    error: initialError,
  } = useQuery(GET_PRODUCT_LIST, {
    variables: { category_id: `${id}`, pageSize: pageSizeStep }
  })

  const [
    sortAndFilterProducts,
    {
      data: filteredData, 
      loading: filteredLoading,
      error: filteredError
    }
  ] = useLazyQuery(GET_PRODUCT_LIST)

  const loading = initialLoading || filteredLoading

  useEffect(() => {
    let _productList = []
    let _sortFields = []
    let _filterFields = []
    let _canLoadMore = true
    if(initialData && initialData.products) {
      _productList = initialData.products.items
      _sortFields = initialData.products.sort_fields.options
      _filterFields = initialData.products.aggregations
      if(initialData.products.page_info.total_pages === 1) _canLoadMore = false
    }
    setProductList(_productList)
    setSortFields(_sortFields)
    setFilterFields(_filterFields)
    setCanLoadMore(_canLoadMore)
  }, [initialData, id])

  useEffect(() => {
    let _productList = []
    let _canLoadMore = true
    if(filteredData && filteredData.products) {
      _productList = filteredData.products.items
      if(filteredData.products.page_info.total_pages === 1) _canLoadMore = false
    }
    setProductList(_productList)
    setCanLoadMore(_canLoadMore)
  }, [filteredData])

  let derivedErrorMessage;
  if (initialError || filteredError) {
     const errorTarget = initialError || filteredError;
     if (errorTarget.graphQLErrors) {
         // Apollo prepends "GraphQL Error:" onto the message,
         // which we don't want to show to an end user.
         // Build up the error message manually without the prepended text.
         derivedErrorMessage = errorTarget.graphQLErrors
             .map(({ message }) => message)
             .join(', ');
     } else {
         // A non-GraphQL error occurred.
         derivedErrorMessage = errorTarget.message;
     }
  }

  return {
    sortAndFilterProducts,
    productList,
    sortFields,
    filterFields,
    canLoadMore,
    pageSizeStep,
    loading,
    derivedErrorMessage
  }
}