import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
   const [address, setAddress] = useState("");
   const [pin, setPin] = useState("");
   const [mobile,setMobile]=useState('');
    

  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user,COD } = useSelector((state) => ({ ...state }));
  const { coupon1 } = useSelector((state) => (state.coupon));
  
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  //   // console.log(e.target.name, " ----- ", e.target.value);
  // };

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Continue shopping.");
    });
  };

  const saveAddressToDb = (e) => {
    // console.log(address);
    e.preventDefault();
    saveUserAddress(user.token,mobile,pin,address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <div className="container-fluid">
      {/* <ReactQuill theme="snow" value={address} onChange={setAddress} /> */}
      <Form onSubmit={saveAddressToDb}>
        {/* <FormGroup row>
        <Label sm={2}>Name :</Label>
        <Col sm={10}><Input type="text" name="name" onChange={handleChange} value={name} /></Col>        
        </FormGroup> */}
        <FormGroup row>
        <Label sm={2}>Mobile :</Label>
        <Col sm={10}><Input type="text"className="st text-center" onChange={(e)=>setMobile(e.target.value)} value={mobile}  name="mobile" /></Col>        
        </FormGroup >
        <FormGroup row>
        <Label sm={2}>Address :</Label>
        <Col sm={10}><Input type="text" className="st text-center" name="address" onChange={(e)=>setAddress(e.target.value)} value={address} /></Col>        
        </FormGroup>
        <FormGroup row>
        <Label sm={2}>Pin :</Label>
        <Col sm={10}><Input type="text" className="st text-center" name="pin" onChange={(e)=>setPin(e.target.value)} value={pin}  /></Col>        
        </FormGroup>
       
        
        <button style={{alignSelf:"center"}} className="btn btn-primary" >Submit</button>
        
       
      </Form>
      
    </div>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i} >
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <div className="m-1">
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control text-center st "
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2 ml-2">
        Apply
      </button>
    </div>
  );

  const createCashOrder =async () => {
    createCashOrderUser(user.token, COD, coupon1).then((res) => {
      setTimeout(()=>{},1000);
      console.log("USER CASH ORDER CREATED RES ", );
      // //empty cart form redux, local Storage, reset coupon, reset COD, redirect
      
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
     
    });
  };

  return (
    <div className="row">
      <div className="col-md-5 mt-2 ">
        <h4 className="ml-4">Delivery Address</h4>
        <br />
       
        {showAddress()}
        <br/>
        <h4 className="ml-4">Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6 m-2">
        <h4 className="ml-5">Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total:Rs. {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: Rs.{totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
           {/* {COD?( */}
              <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={createCashOrder}
            >
              Place Order
            </button>
          {/* //  ):(
          //     <button */}
          {/* //     className="btn btn-primary"
          //     disabled={!addressSaved || !products.length}
          //     onClick={() => history.push("/payment")}
          //   >
          //     Place Order
          //   </button>
          //  )} */}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
