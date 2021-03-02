import React, { useState, useEffect } from "react";
import {getProductsByArrivals,getTotalProducts} from '../../functions/product';
import {LoadingOutlined} from "@ant-design/icons";
import ProductCard from "../cards/ProductCard";
import LoadingCards from "../cards/LoadingCards";
import {Pagination} from "antd";
const NewArrivals = () => {
  
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const [totalProducts,setTotalProducts]=useState(0);
  const [page,setPage]=useState(1);
  useEffect(() => {
    loadAllProducts();
   
  }, [page])
  useEffect(() => {
   getTotalProducts().then(res=>setTotalProducts(res.data)); 
   
  }, [])

  const loadAllProducts=()=>{
    setLoading(true);
    getProductsByArrivals("createdAt","desc",page)
    .then((res)=>{
      setProducts(res.data);
      setLoading(false);
    }

    )
    .catch((err)=>console.log(err));
  };
  return(
  <>
 
  <div className="container">
  {loading?(<LoadingCards count={3}/>):(  
  <div className="row">
    {products.map((product)=>(
      <div className="col-md-4 mb-3" key={product._id}>
        <ProductCard product={product}/>
      </div>
    ))}
  </div>)}
</div>
<div className="row ">
    <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
    <Pagination current={page}
total={(totalProducts/3)*10}
onChange={(value)=>setPage(value)}/>

    </nav>
</div>
  </>

  );

}

 

export default NewArrivals;
