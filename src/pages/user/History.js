import React,{useEffect,useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector,useDispatch} from 'react-redux';
import {getOrder} from '../../functions/user';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'



const History = () => {
const [orders,setOrders]=useState([]);
const {user} =useSelector((state)=>({...state}));

useEffect(()=>{
  loadUserOrders();
},[]);


const loadUserOrders=()=>{

  getOrder(user.token).then((res)=>{
    console.log(JSON.stringify(res.data,null,4));
    setOrders(res.data);
  })
}

const showOrderTable=(order)=>{
  return(
    <table className="table table-bordered bg-white">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
         
          

        </tr>

      </thead>
      <tbody>
        {order.products.map((p,i)=>(
          <tr ket={i}>
            <td><b>{p.product.title}</b></td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>{p.product.shipping==='yes'?<CheckCircleOutlined style={{color:"green"}}/>:<CloseCircleOutlined style={{color:"red"}}/>}</td>

          </tr>
        ))}
      </tbody>

    </table>
  );

  
  
}

const showEachOrder=()=>{
  return(
    orders.reverse().map((o,i)=>(
      <div key={i} className="m-5 p-3 card bg-light">
        <div className="row m-1" style={{justifyContent:"space-between"}}>
        <button className="btn col-md-4   btn-raised mb-2 bg-white">Amount Rs.{o.paymentIntent.amount} </button> 
      <button className="btn col-md-4   btn-raised mb-2 bg-white"> Status:{o.paymentIntent.status} </button> 
      <button className="btn col-md-4   btn-raised mb-2 bg-white">Payment Method:{o.paymentIntent.payment_method_types[0]}</button> 

        </div>


       {showOrderTable(o)}
       <div className="row">
        <div className="col">
          {/* <button className="btn btn-outlined btn-primary"><a>PDF download</a></button> */}
        </div>
       </div>
  
      </div>
    ))
  );
  
}


  return(
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2 m-4">
        <UserNav />
      </div>
      <div className="col text-center">
 <button className="btn btn-raised m-4"><h4 className="m-2 " style={{color:'#006600'}}> {orders.length>0?"Order History":"Not Placed Any Order"}</h4></button>  
       {showEachOrder()}     
    </div>
    </div>
  </div>
  );
};
  


export default History;
