/* eslint-disable no-unused-vars */
import React from 'react'
import './stylesheets/Subtotal.css';
import { useStateValue } from './StateProvider';
import {getCartTotal} from './reducer';
import { Link } from 'react-router-dom';
import { getCartItemsNumber } from './reducer';

function Subtotal() {
  const [{cart},dispatch] = useStateValue();

  return (
    <div className="subtotal">
        <p className="green">Your order is eligible for FREE delivery!</p>
        <h3>Subtotal ({getCartItemsNumber(cart)} items):</h3>
        <span className="subtotal-amount">
          <strong>{Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(getCartTotal(cart))}</strong>
        </span>

        <Link to={cart.length>0 && "/payment"}>
          <button className={"btn-checkout btn-"+(cart.length===0?"disabled":"enabled")}>Proceed to Checkout</button>
        </Link>
    </div>
  )
}

export default Subtotal;