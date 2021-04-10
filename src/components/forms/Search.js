import React from "react";
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';


const Search=()=>{
    const dispatch=useDispatch();
    const {search}=useSelector((state)=>({...state}));
    const {text}=search;
    const history=useHistory();
    const handleSubmit=(e)=>{
        e.preventDefault();
        history.push(`/shop?${text}`);


    }

    const handleChange=(e)=>{
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:e.target.value}
        });
    }


    return(
        <div className="container-fluid ">
            <div className="row m-1">
             <form className="form-inline  st bg-white "  onSubmit={handleSubmit}>

            <input
            onChange={handleChange}
            type="search"
            value={text}
            className="form-control ml-4  "
            
            placeholder="Search"/>

        </form>
        </div>
        </div>
        
       
    );
}

export default Search;