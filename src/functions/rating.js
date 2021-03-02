import React from 'react';
import StarRating from 'react-star-ratings';

 const showAverage=(p)=>{
    if(p && p.ratings){
        let ratingArray=p.ratings;
        let total=[];
        let length=ratingArray.length;
        console.log('length',length);

        ratingArray.map((r)=>total.push(r.star));
        let totalReduced=total.reduce((p,n)=>p+n,0);
        console.log("totalReduced",totalReduced);
        let highest=length*5;
        console.log('heighest',highest);
        let result=(totalReduced*5)/highest;
        console.log('result',result);

        return(
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating starDimension="20px" starSpacing="2px" editing={false} starRatedColor="red" rating={result}/>
                </span>
            </div>
        );

    }
}
export default showAverage;