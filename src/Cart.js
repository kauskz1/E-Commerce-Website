/* eslint-disable no-unused-vars */
import './stylesheets/Cart.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { forwardRef } from 'react';
import FlipMove from 'react-flip-move';

function Cart(){
    const [{cart,user}, dispatch] = useStateValue();

    const FunctionalArticle = forwardRef((props, ref) => (
        <div ref={ref}>
          {<CheckoutProduct {...props} />}
        </div>
      ));
      
    const TopArticles = ({ articles }) => (
    <FlipMove >
        {articles.map((article,i) => (
        <FunctionalArticle key={i} {...article} />
        ))}
    </FlipMove>
    );

    return(
        <div className="cart">
            <div className="cart-left">
                <h3>Hello, {user?user.email:"Guest"}</h3>
                <h1 style={{margin:'10px 0'}}>Shopping Cart</h1>
                <hr/>
                <div className="cart-items">
                {
                    TopArticles({articles:cart})
                }
                {cart.length===0&&<h2>No items in cart!</h2>}
                </div>
            </div>

            <div className="cart-right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Cart;