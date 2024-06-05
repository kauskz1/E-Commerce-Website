/* eslint-disable no-unused-vars */
import { Outlet,Link } from 'react-router-dom';
import './stylesheets/Navbar.css';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import search_icon from './images/search.png';
import cart_icon from './images/shopping-cart.png';
import { getAuth } from 'firebase/auth';
import { getCartItemsNumber } from './reducer';

export default function Navbar(){
    const [{cart,user,search},dispatch] = useStateValue();
    const auth = getAuth();
    const navigate = useNavigate();

    const handleAuthentication = () => {
        if(user){
            auth.signOut();
        }
    }

    return(
        <>
        <div key="navbar" className="navbar">
            <Link key="title" to="/">
                <div key="title" className="title">
                    <img key="img" className="navbar-logo" src={logo} alt="logo" />
                    <span key="title-text" className="title-text">Shop</span>
                </div>
            </Link>

            <div key="search" className="navbar-search" onClick={(e)=>navigate('/')}>
                <input key="search" className="navbar-search-input" type="text" placeholder="Search for products..." onChange={(e)=>dispatch({
                    type: "SEARCH_PRODUCT",
                    value: e.target.value.toLowerCase()
                })}/>
                <img key="searcy-icon" className="navbar-search-icon" src={search_icon} alt="search" />
            </div>

            <div key="nav" className="navbar-nav">
                <Link key="login" to={!user && "/login"}>
                    <div key="user" className="navbar-option" onClick={handleAuthentication}>
                        <span key="line1" className="navbar-option-line1">Hello {user?user.email:"Guest"}</span>
                        <span key="line2" className="navbar-option-line2">{user?"Sign out":"Sign in"}</span>
                    </div>
                </Link>

                <Link key="orders" to="/orders">
                    <div key="orders" className="navbar-option">
                        <span key="line1" className="navbar-option-line1">Returns &</span>
                        <span key="line2" className="navbar-option-line2">Orders</span>
                    </div>
                </Link>

                <Link key="membership" to="/membership">
                    <div key="membership" className="navbar-option">
                        <span key="line1" className="navbar-option-line1">Your</span>
                        <span key="line2" className="navbar-option-line2">Membership</span>
                    </div>
                </Link>

                <Link key="cart" to="/cart">
                    <div key="cart" className="navbar-option-cart">
                        <img key="cart-icon" className="navbar-cart" src={cart_icon} alt="cart" />
                        <span key="cart-count" className="navbar-option-line2 navbar-basketCount">
                            {getCartItemsNumber(cart)}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
        <Outlet/>
        </>
    );
}