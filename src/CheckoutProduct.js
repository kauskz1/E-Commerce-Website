/* eslint-disable no-unused-vars */
import {useStateValue } from './StateProvider';
import './stylesheets/CheckoutProduct.css';


export default function CheckoutProduct({id,title,price,image,rating,count, hideButton}){
    const [{cart}, dispatch] = useStateValue();

    const removeFromCart = () =>{
        dispatch({
            type:"REMOVE_FROM_CART",
            id:id,
        });
    };

    var imageFocus = false;
    const handleImageClick = (e) =>{
        const fullPage = document.getElementById("fullpage");
        const fullpageImg = document.getElementById("fullpage-img")
        let img = e.target
        if(!imageFocus){
            fullpageImg.style.backgroundImage = 'url('+img.src+')';
            fullPage.style.display = "block";
        }
    }

    return(
    <>
        <div className="checkoutProduct">
            <img className="checkoutProduct-img" src={image} alt="" onClick={handleImageClick}/>
        
            <div className="checkoutProduct-container">
                <div className="checkoutProduct-info">
                    <p className="checkoutProduct-title">{title} <small><span className="checkoutProduct-count"> x{count}</span></small></p>
                    <p className="checkoutProduct-price">
                        <strong>{Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(price*count)}</strong>
                    </p>
                </div>

                <div className="checkoutProduct-rating">
                    {Array(rating).fill().map((_,i)=> <p key={i}>⭐</p>)}
                </div>
                {!hideButton && (
                <button className="btn-remove" onClick={removeFromCart}>Remove from Cart</button>
                )}
            </div>
        </div>
        <hr />
    </>
    );
}
