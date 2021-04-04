import React,{useState}  from "react";
import {Card,Tabs,Tooltip} from "antd";
import {Link} from "react-router-dom";
import {HeartOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from '../cards/ProductListItems';
import StarRating from 'react-star-ratings';
import Rating from '../modal/Rating';
import showAverage from '../../functions/rating';
import {useHistory} from 'react-router'
import _ from 'lodash';
import {useSelector,useDispatch,} from 'react-redux';
import {addToWishlist} from "../../functions/user";
import { toast } from "react-toastify";

const {TabPane}=Tabs;
const SingleProduct=({product,star,onStarClick})=>{
    const history=useHistory();
    const {cart,user}=useSelector((state)=>({...state}));
    const dispatch=useDispatch();
    const [tooltip,setTooltip]=useState("click to add!");

    const {title,description,images,_id,price,category,subs,shipping}=product;
    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
          console.log("ADDED TO WISHLIST", res.data);
          toast.success("Added to wishlist");
        //   history.push("/user/wishlist");
        });
      };
    const handleAddToCart=(e)=>{
        let cart=[];
        if(typeof window !="undefined"){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            cart.push({
                ...product,
                count:1,
            });
            let unique=_.uniqWith(cart,_.isEqual);
            localStorage.setItem("cart",JSON.stringify(unique));
            setTooltip("Added!");
            dispatch({
                type:"ADD_TO_CART",
                payload:unique,
            });
            dispatch({
                type:"SET_VISIBLE",
                payload:true,
            });
        }
    }
    
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
        actions={[
            <Tooltip title={product.quantity>0?tooltip:"Out of stock"}> <a onClick={handleAddToCart} disabled={product.quantity<1}><ShoppingCartOutlined className="text-danger" /><br/>{product.quantity?('Add to cart'):('Out of stock')}</a></Tooltip>
        ,<a onClick={handleAddToWishlist}><HeartOutlined className="text-danger" /><br/>Whishlist</a>,
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