/* eslint-disable no-unused-vars */
import './stylesheets/Product.css';
import { useStateValue } from './StateProvider';

function Product({id,title,price,image,rating}){
    const [{cart},dispatch] = useStateValue();

    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item:{
                id: id,
                title: title,
                price: price,
                image: image,
                rating: rating,
                count:1,
            },
        });
    }

    return(
        <div className="product" key={id}>
            <div className="product-info">
                <p className="product-title">{title}</p>
                <p className="product-price">
                    <strong>{Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(price)}</strong>
                </p>
            </div>

            <img src={image} alt=""/>
            <div className="product-rating">
                {Array(rating).fill().map((_,i) => <p key={i}>⭐</p>)}                
            </div>

            <button className="btn-add" onClick={addToCart}>Add to cart</button>
        </div>
    );
}

export default Product;