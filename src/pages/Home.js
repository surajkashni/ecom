import React from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from '../components/category/CategoryList';
import SubList  from '../components/sub/SubList';
const Home = () => {
  
  
  return(
  <>
  <div className="jumbotron text-center h1 font-weight-bold" style={{backgroundColor:''}}>
    All Products
  </div>
  <div className="jumbotron text-center p3 mt-5 mb-5 display-4" style={{backgroundColor:''}}>
    NewArrivals

  </div>
  <NewArrivals/>
  <div className="jumbotron text-center p3 mt-5 mb-5 display-4" style={{backgroundColor:''}}>
    BestSellers

  </div>
  <BestSellers/>
  <div className="jumbotron text-center p3 mt-5 mb-5 display-4" style={{backgroundColor:''}}>
    Categories

  </div>
  <CategoryList/>
  <div className="jumbotron text-center p3 mt-5 mb-5 display-4" style={{backgroundColor:''}}>
   Sub Categories

  </div>
  <SubList/>
  </>

  );

}

 

export default Home;
