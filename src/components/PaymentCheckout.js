import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from  'react-router-dom';
import {Card} from 'react-router-dom';
import { createOrder,emptyUserCart } from '../functions/user';

const PaymentCheckout=({history})=>{

    const dispatch=useDispatch();
    const {user,coupon}=useSelector((state)=>({...state}));

    const [cartTotal,setCartTotal]=useState(0);
    const [totalAfterDiscount,setTotalAfterDiscount]=useState(0);
    const [payable,SetPayable]=useState(0);

    const handleOnclick=()=>{
     createOrder(user.token).then((res)=>{
         if(res.data.ok){
             if(typeof window !=="undefined")localStorage.removeItem("cart");
             dispatch({
                 type:"ADD_TO_CART",
                 payload:[],
             });
            //  dispatch({
            //     type:"COD",
            //     payload:true,
            // });
             dispatch({
                 type:"COUPON_APPLIED",
                 payload:false,
             });
             emptyUserCart(user.token);

         }
     }).catch((err)=>{
       console.log(err);
     })
    }  
    return(
        <div className="container">
            <div className="row text-center p-5">
           <div className="col">
           {/* <h4>Pay On Delivery:</h4> */}
            <Link><button onClick={handleOnclick} className="btn btn-lg btn-raised btn-primary"> click</button></Link>
           </div>
            </div>
        </div>
    );
    }
   
export default PaymentCheckout;