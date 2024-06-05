import React from 'react'
import './stylesheets/Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({order,idx,first}) {
  return (
    <div key={idx} className={"order"+ (first?" first":"")}>
        <h2>Order #{idx}</h2>

        <p>Ordered on: {moment.unix(order.data.created.seconds).format('DD MMMM YYYY, h:mma')}</p>

        <p className="order-id">
            <small>Order ID: {order.id}</small>
        </p>

        <div className="order-address">
            <strong>Delivery Address:</strong>
            <div className="order-address-flex">
                <p>{order.data.address.line1}</p>
                <p>{order.data.address.line2}</p>
                <p>{order.data.address.city}</p>
            </div>
        </div>
        {order.data.cart?.map((item,i)=>(
            <>
            <CheckoutProduct key={i} id={item.id} title={item.title} price={item.price} image={item.image} rating={item.rating} count={item.count} hideButton={true}/>
            </>
        ))}

    </div>
  )
}

export default Order