import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
// import {useApolloClient, useMutation} from '@apollo/client';
// import gql from 'graphql-tag';

// import {useAwaitQuery} from '../hooks/useAwaitQuery';
import actions from '../store/actions/cart/actions';
import * as asyncActions from '../store/actions/cart/asyncActions';
import bindActionCreators from '../util/bindActionCreators';

import {fetchCartId} from '../../temporaryMocks/Network/fetchCartId.js';
import {fetchCartDetails} from '../../temporaryMocks/Network/fetchCartDetails.js';

const CartContext = createContext();

const isCartEmpty = (cart): boolean =>
    !cart || !cart.details.items || cart.details.items.length === 0;

const getTotalQuantity = (items): number =>
    items.reduce((total, item) => total + item.quantity, 0);

const CartContextProvider = props => {
  const {actions, asyncActions, cartState, children} = props;
  // console.log(`HEllo: ${JSON.stringify(Object.keys(asyncActions), null, 2)}`);
  // console.log(`HEllo: ${JSON.stringify(Object.keys(actions), null, 2)}`);

  // Make deeply nested details easier to retrieve and provide empty defaults
  const derivedDetails = useMemo(() => {
    if (isCartEmpty(cartState)) {
      return {
        currencyCode: 'USD',
        numItems: 0,
        subtotal: 0,
      };
    }
    else {
      return {
        currencyCode: cartState.details.prices.grand_total.currency,
        numItems: getTotalQuantity(cartState.details.items),
        subtotal: cartState.details.prices.grand_total.value,
      };
    }
  }, [cartState]);

  const derivedCartState = {
    ...cartState,
    isEmpty: isCartEmpty(cartState),
    derivedDetails,
  };

  const cartApi = useMemo(
      () => ({
        actions,
        ...asyncActions,
      }),
      [actions, asyncActions],
  );

  //note: if you want to see what actions are available, use Object.entries().
  // Not JSON.stringify()
  const contextValue = useMemo(() => [derivedCartState, cartApi], [
    cartApi,
    derivedCartState,
  ]);

  // const apolloClient = useApolloClient();
  // const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
  // const fetchCartDetails = useAwaitQuery(CART_DETAILS_QUERY);

  const apolloClient = null;
  const fetchCartId = fetchCartId;
  const fetchCartDetails = fetchCartDetails;
  //
  // useEffect(() => {
  //     // cartApi.getCartDetails initializes the cart if there isn't one. Also, we pass
  //     // apolloClient to wipe the store in event of auth token expiry which
  //     // will only happen if the user refreshes.
  //     cartApi.getCartDetails({
  //         apolloClient,
  //         fetchCartId,
  //         fetchCartDetails
  //     });
  // }, [apolloClient, cartApi, fetchCartDetails, fetchCartId]);

  return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
  );
};

const mapStateToProps = ({cart}) => ({cartState: cart});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CartContextProvider);

export const useCartContext = () => useContext(CartContext);

/**
 * We normally do not keep GQL queries in Peregrine. All components should pass
 * queries to talons/hooks. This is an exception to the rule because it would
 * be unnecessarily complex to pass these queries to the context provider.
 */

// const CREATE_CART_MUTATION = gql`
//     mutation createCart {
//         cartId: createEmptyCart
//     }
// `;
//
// const CART_DETAILS_QUERY = gql`
//     query checkUserIsAuthed($cartId: String!) {
//         cart(cart_id: $cartId) {
//             # The purpose of this query is to check that the user is authorized
//             # to query on the current cart. Just fetch "id" to keep it small.
//             id
//         }
//     }
// `;
