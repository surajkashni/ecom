import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

  export const saveUserAddress = async (authtoken,mobile,pin,address) =>
  await axios.post(`${process.env.REACT_APP_API}/user/address`,{mobile,pin,address}, {
    headers: {
      authtoken,
    },
  });

  export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

  export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const createOrder = async (authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    //{ stripeResponse },
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

  export const getOrder = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/order`, {
    headers: {
      authtoken,
    },
  });

  export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );


  export const createCashOrderUser= async(authtoken,COD,coupon1)=>{

    await axios.post(`${process.env.REACT_APP_API}/user/cash-order`,{COD,coupon1},{
      headers:{
        authtoken
      }
    }) 
  }