import React from 'react';
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";


const Order=({order,handleStatusChange})=>{
    console.log("order",JSON.stringify(order,null,4));
    const showOrderTable=(order)=>{
        return(
          <table className="table table-bordered">
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

    
    return(
        
        
        <div>
                {order.map((order)=>(
            <div key={order._id} className="row pb-5">
                <div className="btn btn-block bg-light">
                    {/* payment info */}<p>Payment info</p></div>
                    <div className='row'>
                      <div className="col">
                        <h7>Username: {order.Username} | |  Email: {order.Email} </h7>
                        
                      </div>
                      </div>
                      
                     
                      {/* <div className="row">
                        <div className="col text-center">
                        <h7>Address: </h7>
                      <p>{order.Address}</p>
                        </div>
                        

                      </div> */}

                    
        
                
                   
                      <div className="row m-2">
                        
                      {/* <div className="col"> */}
                        <select 
                        onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                        className='form-control'
                        
                        defaultValue={order.orderStatus}
                        name="status"
                        >
                          <option value="Cash on Delivery">Cash On Delivery</option>
                          <option value="Not Proccessing">Not Proccessing</option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
        
                        </select>
                        {/* </div> */}
                    
                      </div>
                  
                    
                   
                    
                
                {showOrderTable(order)}
            </div>
        ))}
    </div>

    );
        }

   



export default Order;