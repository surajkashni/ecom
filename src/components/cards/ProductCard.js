import React,{useState} from "react";
import {Card,Skeleton,Tooltip} from 'antd';
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import showAverage from '../../functions/rating';
import _ from 'lodash';
import {useSelector,useDispatch} from 'react-redux';
const {Meta} =Card;
const ProductCard=({product})=>{
    //destt
    const {cart,user}=useSelector((state)=>({...state}));
    const dispatch=useDispatch();
    const [tooltip,setTooltip]=useState("click to add!");
    const {title,description,images,slug}=product;
    const handleAddToCart=()=>{
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
        <>
        {product && product.ratings && product.ratings.length>0?(showAverage(product)):(<div className="text-center pt-1 pb-3">No Rating yet</div>)}

        <Card cover={
            <img src={images&&images.length?images[0].url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcrfpTtlzlvMlfP4qGGGY_ZVgauhv2nIYc_NBOLmpOH11UPf3qZhJTRxD5Aj_PHOw47G-WxcK&usqp=CAc"}
            style={{height:"190px",objectFit:"cover"}}
            className="p-1"
           />
        }
        actions={[<Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning"/><br/> View Product</Link>,
            <Tooltip title={product.quantity>0?tooltip:"Out of stock"}> <a onClick={handleAddToCart} disabled={product.quantity<1}><ShoppingCartOutlined className="text-danger" /><br/>{product.quantity?('Add to cart'):('Out of stock')}</a></Tooltip>   
    ]}
        >
            <Meta title={title} description={`${description && description.substring(0,40)}...`}/>

        </Card>
        </>
    );
}

export default ProductCard;