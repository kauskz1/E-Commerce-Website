/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './stylesheets/index.css';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import Login from './Login';
import Membership from './Membership';
import Payment from './Payment';
import { useEffect } from 'react';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import Popup from './Popup';

function ImageContainer(){
  function handleClick(e){
    document.getElementById("fullpage").style.display = 'none';
  }

  return(
    <div id="fullpage" onClick={handleClick}>
      <div id="fullpage-img" />
    </div>
  );
}

function App() {
  const [{cart,user,popups},dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser =>{
      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }
      else{
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  },[]);

  useEffect(()=>{
    setTimeout(()=>{
      let popup = document.getElementById("popups").firstChild;
      if(popup) popup.remove();
    },3000);
  },[popups])

  return (
    <>
      <ImageContainer />
      <div id="popups">
        {popups.map((popup) => popup)}
      </div>
      <BrowserRouter key="router">
        <Routes key="main">
            <Route key="index" index element={[<Navbar/>,<Home/>]} />
            <Route key="login" path="login" element={<Login/>} />
            <Route key="cart" path="cart" element={[<Navbar/>,<Cart/>]} />
            <Route key="orders" path="orders" element={[<Navbar/>,<Orders/>]} />
            <Route key="membership" path="membership" element={[<Navbar/>,<Membership/>]} />
            <Route key="payment" path="payment" element={[<Navbar/>,<Payment/>]} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
