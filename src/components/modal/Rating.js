import React,{useState} from 'react';
import {Modal,Button} from 'antd';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {StarOutlined} from '@ant-design/icons';
import {useHistory,useParams} from 'react-router-dom';
const Rating=({children})=>{
    const {user}=useSelector((state)=>({...state}));
    const [modalVisible,setModalVisible]=useState(false);
    const history=useHistory();
    const {slug}=useParams();
    const setModal=()=>{
        user&&user.token?(setModalVisible(true)):(history.push({
            pathname:"/login",
            state:{from:`/product/${slug}`}
        }));
    }
    return(
    <>
    <div onClick={()=>setModal()}>
        <StarOutlined className="text-danger"/> <br/>
        {user?"Leave rating":"Login to leave rating"}
    </div>
    <Modal 
    title="Leave a rating"
    centered
    visible={modalVisible}
    onOk={()=>{
        setModalVisible(false);
        toast.success("Thank you for your review");
    }}
    onCancel={()=>{
        setModalVisible(false);
    }}>
        {children}
    </Modal>
    </>    );

}

export default Rating;