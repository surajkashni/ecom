import React, { useState, useEffect } from "react";

import AdminNav from "../../components/nav/AdminNav";
import {getOrders,changeStatus} from '../../functions/admin';

import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Order from '../../components/order/Order';

const AdminDashboard = () => {

  const [orders,setOrders]=useState([]);
  const {user} = useSelector((state)=>({...state}));

  useEffect(()=>{
    loadOrders();
  },[]);

  const handleStatusChange=(orderId,orderStatus)=>{
    changeStatus(orderId,orderStatus,user.token).then((res)=>{
      toast.success("Status Updated");
      loadOrders();
    });
  }

  const loadOrders=()=>{
    getOrders(user.token).then((res)=>{
      console.log(res.data);
      setOrders(res.data);
    })
  }
 
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <AdminNav />
        </div>
        
        <div className="col bg-white">
          <h4>AdminDashboard</h4>
         <Order order={orders} handleStatusChange={handleStatusChange}/>
          
         
          </div>
          </div>
    </div>
  );
};

export default AdminDashboard;
