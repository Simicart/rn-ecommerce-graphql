import { gql } from '@apollo/client';

function categoryQuery(props) {
  // 2 is default root category in Magento
  const { categoryId = 2 } = props;

  return gql`
    {
      category(id: ${categoryId}) {
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
