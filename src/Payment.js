/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./stylesheets/Payment.css";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { useState } from "react";
import images from 'react-payment-inputs/images';
import { getCartTotal } from "./reducer";
import { getCartItemsNumber } from "./reducer";
import { useNavigate } from "react-router-dom";
import {db} from "./Firebase";
import { getDatabase } from "firebase/database";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export default function Payment(){
    const [{cart,user,membership},dispatch] = useStateValue();
    const {meta, wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps} = usePaymentInputs();
    const [cardNo,setCardNo] = useState();
    const [cardExpiry,setCardExpiry] = useState();
    const [cardCVC,setCardCVC] = useState();
    const navigate = useNavigate();

    const [form,setForm] = useState({});
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setForm(v=>({...v,[name]:value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.addr_line1||!form.city){
            alert("Enter your address before proceeding!")
            return;
        }
        updateDoc(doc(db,"users",user?.uid),{
            membership:true
        })
        if(!meta.error){
            const filtered = cart.filter(entry=> Object.values(entry).some(val=>typeof val==="string" && val.includes("Membership")));
            if(filtered.length>0){
                dispatch({
                    type: "MEMBERSHIP_CHANGE",
                    active: true
                });
                
            }

            addDoc(collection(db,"users",user?.uid,"orders"),{
                cart: cart,
                address: {line1:form.addr_line1,
                    line2:form.addr_line2?form.addr_line2:"",
                    city: form.city
                },
                amount: getCartTotal(cart),
                created: (new Date())
            });

            dispatch({
                type:"EMPTY_CART",
            });

            navigate("/orders");      
        }  
    }

    return(
        <div className="payment">
            <div className="payment-container">
                <h1 key="header">
                    Checkout (
                        <Link to="/cart">{getCartItemsNumber(cart)} items</Link>
                    )
                </h1>

                <div key="sec1" className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>  
                    <div className="payment-address">
                        <p>{user?.email}</p>
                        <form>
                            <label htmlFor="addr_line1">
                                    Address Line-1 <input id="addr_line1" name="addr_line1" type="text" className="payment-addr-input" value={form.addr_line1}
                                    onChange={handleChange} required/>
                            </label>
                            <label htmlFor="addr_line2">
                                Address Line-2 <input id="addr_line2" name="addr_line2" type="text" className="payment-addr-input"  value={form.addr_line2}
                                    onChange={handleChange}/>
                            </label>
                            <label htmlFor="city">
                                City <input id="city" name="city" type="text" className="payment-addr-input"  value={form.city}
                                    onChange={handleChange} required/>
                            </label>
                        </form>      
                    </div>
                </div>

                <div key="sec2" className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                        {cart.map(item=>(
                            <CheckoutProduct id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating} count={item.count}/>
                        ))}
                    </div>
                </div>

                <div key="sec3" className="payment-section">
                    <div className="payment-title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment-details">
                        <PaymentInputsWrapper {...wrapperProps}>
                            <svg {...getCardImageProps({images})} />
                            <input id="no" {...getCardNumberProps({onChange:(e)=>(setCardNo(e.target.value))})} value={cardNo} />
                            <input id="exp" {...getExpiryDateProps({onChange:e=>setCardExpiry(e.target.value)})} value={cardExpiry}/>
                            <input id="cvc" {...getCVCProps({onChange:e=>setCardCVC(e.target.value)})} value={cardCVC}/>
                        </PaymentInputsWrapper>
                        <p className="payment-total">Order Total:{" "}
                        <strong>{Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(getCartTotal(cart))}</strong>
                        </p>

                        <button className={"payment-btn payment-btn-"+(meta.error&&"disabled")} onClick={handleSubmit}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}