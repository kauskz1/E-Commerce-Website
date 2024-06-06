/* eslint-disable no-unused-vars */
import './stylesheets/Home.css';
import { useStateValue } from './StateProvider';
import { useState } from 'react';
import Product from './Product';
import bg from './images/bg.jpg';
import hat from './images/hat.png';
import tshirt from './images/tshirt.png';
import tshirt2 from './images/tshirt2.png';
import jeans from './images/jeans.png';
import pants2 from './images/pants2.png';
import tv from './images/tv.jpg';
import laptop from './images/laptop.jpg';
import laptop2 from './images/laptop2.jpg';


const data = [
    {size:3, id:"201", title:"HP Laptop", price:74999, image:laptop, rating:5 },
    {size:3, id:"202", title:"ASUS Laptop", price:59999, image:laptop2, rating:4 },
    {size:3, id:"123", title:"TV", price:39999, image:tv, rating:3 },
    {size:3, id:"31", title:"Hat light-brown", price:6999, image:hat, rating:5 },
    {size:3, id:"11", title:"Black T-Shirt for men", price:4999, image:tshirt, rating:3 },
    {size:3, id:"21", title:"Blue Jeans", price:8999, image:jeans, rating:2 },
    {size:3, id:"22", title:"Black Pants", price:12999, image:pants2, rating:4 },
    {size:3, id:"12", title:"T-Shirt Blue (Men)", price:7999, image:tshirt2, rating:1 },
    
    
]

function Home(){
    const [{search},dispatch] = useStateValue();

    const initialState = {
        price: Infinity,
        rating: null,
        sort: null,
    }
    const [filters,setFilters] = useState(initialState);
    const handleClear = (e)=>{
        setFilters(initialState)

        document.getElementById("price-value").innerHTML= "";
    }
    const handleFilterChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if(name==="price"){
            document.getElementById(name+"-value").innerHTML=Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(value);
        }
        if(name==="rating"){
            value = parseFloat(value);
        }
        setFilters(f=>({...f,[name]:value}));
    };
    const ratings = [4,3,2,1];
    const sort = ["desc","asc"];

    let filteredProductsArray = data.map((product) =>{
        let hide = !product.title.toLowerCase().includes(search);
        hide ||= product.price > filters.price;
        hide ||= product.rating < filters.rating;
        if(hide){
            return null;
        }
        else{
            return <Product key={product.id} {...product} />
        }
    });
    console.log(filteredProductsArray);
    if(filters.sort==="asc"){
        filteredProductsArray = filteredProductsArray.sort((a,b)=> {
            let pa = a?a.props.price:0;
            let pb = b?b.props.price:0;
            return pa-pb;
        }).map((product)=>product);
    }
    else if(filters.sort==="desc"){
        filteredProductsArray = filteredProductsArray.sort((a,b)=> {
            let pa = a?a.props.price:0;
            let pb = b?b.props.price:0;
            return pb-pa;
        }).map((product)=>product);
    }
    console.log(filteredProductsArray);
    const FilteredProducts = () => {
        return filteredProductsArray.map((product)=>product)
    }

    const FilteredProductsDisplay = () => (
        <div className="products-container">
            <FilteredProducts />
        </div>
    )

    return(
        <>
       
        <div className="home"> 
            <div className="home-sidebar">
                <div className="filters-section filter-title">
                    <h1>Filters</h1>
                    <button className="filters-btn-clear" onClick={handleClear}>Clear</button>
                </div>
                <div className="filters-section price">
                    <h2>Max Price:</h2> <span id="price-value"></span>
                    <input type="range" min="0" max="50000" step="5000" value={filters.price} className="filters-price-slider" name="price" onInput={handleFilterChange} />
                </div>
                <div className="filters-section rating">
                    <h2>Rating</h2>
                    <div className="filters-rating-con">
                        <label>
                            <input className="filter-rating-radio" type="radio" name="rating" value={ratings[0]} onChange={handleFilterChange} checked={filters.rating===ratings[0]} />4⭐ & above
                        </label>
                        <label>
                            <input className="filter-rating-radio" type="radio" name="rating" value={ratings[1]} onChange={handleFilterChange} checked={filters.rating===ratings[1]} />3⭐ & above
                        </label>
                        <label>
                            <input className="filter-rating-radio" type="radio" name="rating" value={ratings[2]} onChange={handleFilterChange} checked={filters.rating===ratings[2]} />2⭐ & above
                        </label>
                        <label>
                            <input className="filter-rating-radio" type="radio" name="rating" value={ratings[3]} onChange={handleFilterChange} checked={filters.rating===ratings[3]} />1⭐ & above
                        </label>
                    </div>
                </div>
                <div className="filters-section sortBy">
                <h2>Sort By</h2>
                    <div className="filters-sort">
                        <label>
                            <input className="filter-sort-radio" type="radio" name="sort" value={sort[0]} onChange={handleFilterChange} checked={filters.sort===sort[0]} />Price - High to Low
                        </label>
                        <label>
                            <input className="filter-sort-radio" type="radio" name="sort" value={sort[1]} onChange={handleFilterChange} checked={filters.sort===sort[1]} />Price - Low to High
                        </label>
                    </div>
                </div>
            </div>

            <div className="home-container">   
                <FilteredProductsDisplay />    
            </div>
        </div>
        </>
    );
}

export default Home;