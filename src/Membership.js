/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './stylesheets/Membership.css';
import logo from './images/logo.png';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import member_img from './images/member.jpg'
import { collection, getDocs, getDoc, doc, query } from 'firebase/firestore';
import { db } from './Firebase';
import { useEffect } from 'react'

function Benefits(){
    return(
        <div className="membership-benefits">
            <ul className="membership-benefits-list">
                <li>Free deliveries</li>
                <li>Prioritized deliveries</li>
                <li>Discounted prices</li>
            </ul>
        </div>
    )
}

export default function Membership(){
    const [{cart,user,membership},dispatch] = useStateValue();
    const navigate = useNavigate();

    const getData = async (user) =>{
        const userRef = doc(db,"users",user?.uid);
        const userSnapshot = await getDoc(query(userRef));
        dispatch({type:"MEMBERSHIP_CHANGE",active: userSnapshot.data().membership})
    }

    useEffect(() =>{
        if(user){
            getData(user);
        }
        else{
            dispatch({type:"MEMBERSHIP_CHANGE",active:false})
        }

        return () => dispatch({type:"MEMBERSHIP_CHANGE",active:false})
    },[user]);

    function NonMember(){
        const handleClick = (e) => {
            const filtered = cart.filter(entry=> Object.values(entry).some(val=>typeof val==="string" && val.includes("Membership")));
            if(filtered.length===0){
                dispatch({
                    type: "ADD_TO_CART",
                    item: {
                        id:0,
                        title:"React Membership",
                        price:1999,
                        image:logo,
                        rating: 0,
                        count:1
                    }
                });
            }
            navigate("/payment");        
        }    
        return(
        <>
        <p>Buy for only {Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(1999)}/month !</p>
        <Benefits />
        <button className="membership-btn" onClick={handleClick}>Buy Membership</button>
        </>
        );
    }

    function Member(){
        return(
            <>
                <h1>You already have React Membership!</h1>
                <p>You get these benefits:</p>
                <Benefits />
                <img className="membership-img" src={member_img} alt='' />
            </>
        )
    }

    return(
        <div className="membership-container">
            <div className="membership">
                <h1>React Membership</h1>
                {membership?<Member />:<NonMember/>}
            </div>
        </div>
    )
}