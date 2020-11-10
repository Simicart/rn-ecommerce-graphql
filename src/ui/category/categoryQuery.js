import { gql } from '@apollo/client';
import { useCatalogContext } from '../..';

function categoryQuery(props) {
  // if not specified, query with id 2, which is default root catalog of megento
  const { categoryId } = props || {};

  return gql`
    {
      category(id: ${categoryId ?? 2}) {
        products {
          total_count
          page_info {
            current_page
            page_size
          }
        }
        children_count
        children {
          id
          level
          name
          path
          children {
            id
            level
            name
            path
            children {
              id
              level
              name
              path
              children {
                id
                level
                name
                path
              }
            }
          }
        }
      }
    }
  `;
}

export default categoryQuery;
