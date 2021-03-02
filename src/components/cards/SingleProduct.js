import React from "react";
import {Card,Tabs} from "antd";
import {Link} from "react-router-dom";
import {HeartOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from '../cards/ProductListItems';
import StarRating from 'react-star-ratings';
import Rating from '../modal/Rating';
import showAverage from '../../functions/rating';

const {TabPane}=Tabs;
const SingleProduct=({product,star,onStarClick})=>{
    const {title,description,images,_id,price,category,subs,shipping}=product;
return(
    <div className="container-fluid">
        <div className="row m-2 ">
            <div className="col-md-7 ">
               {images&&images.length? <Carousel showArrows={true} infiniteLoop autoPlay>
                <div>
                   {images&&images.map((i)=>(
                       <img src={i.url} key={i.public_id}/>
                   ))}
                </div>
                
            </Carousel>:
            <Card
            cover={
                <img src={images&&images.length?images[0].url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcrfpTtlzlvMlfP4qGGGY_ZVgauhv2nIYc_NBOLmpOH11UPf3qZhJTRxD5Aj_PHOw47G-WxcK&usqp=CAc"}
               
                className="p-1 card-img"
               />
            }>
             </Card>}
             <Tabs type="card">
                 <TabPane tab="Description" key="1">
                     {description}
                 </TabPane>
                 <TabPane tab="More info" key="2">
                    Call us on 889790900 for any query
                 </TabPane>
             </Tabs>
             </div>
            <div className="col-md-5">
                <h1 className=" p-3 " style={{color:"whitesmoke",backgroundColor:"#0384fc"}}>{title}</h1>
                {product && product.ratings && product.ratings.length>0?(showAverage(product)):(<div className="text-center">No Rating yet</div>)}
                
            <Card 
        actions={[<><ShoppingCartOutlined className="text-warning"/><br/> Add to cart</>,<Link to={"/"}><HeartOutlined className="text-danger" /><br/>Whishlist</Link>,
        <Rating>
        <StarRating 
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick} 
                isSelectable={true}
                starRatedColor="yellow"/>
        </Rating>,]}
        >
           
        <ProductListItems product={product}/>
        
        </Card>
            </div>
        </div>
       
    </div>
);
}

export default SingleProduct;