import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const ProductContext = createContext();

const { Provider } = ProductContext;


const ProductProvider = ({ value = [], ...props }) => {

  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    currentCategoryName: '',
    vendorStatus: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};


const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
