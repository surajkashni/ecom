import React from 'react';
import {Drawer,Button} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

const SideDrawer=()=>{
    const dispatch=useDispatch();
    const {drawer,cart}=useSelector((state)=>({...state}));

    return<Drawer onClose={()=>{
        dispatch({
            type:"SET_VISIBLE",
            payload:false,
        });
    }}  
    visible={drawer} 
    className="text-center" 
    placement={'right'}
    closable={false}
    title={`Cart   ${cart.length} Product`}>
       {cart.map((p)=>(
           <div className="row" key={p._id}>
             <div className="col">
             {p.images[0]?
             <><img src={p.images[0].url} 
             style={{width:"150px",height:"auto",objectFit:"cover"}}/>
             <p className=" bg-secondary text-light" >
                 {p.title} x {p.count}</p></>:
                 <><p>No image available</p>
             <p className="bg-secodary text-light" >
                 {p.title} x {p.count}</p></>
             }
             </div>
           </div>
       ))}
       <Link to="/cart" >
           <Button className="text-center btn-primary btn-raised btn btn-block" onClick={()=>{
               dispatch({
                   type:"SET_VISIBLE",
                   payload:false
               })
           }}>
               Go To Cart
           </Button>
       </Link>
        </Drawer>;
}

export default SideDrawer;