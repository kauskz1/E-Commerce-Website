/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './stylesheets/Orders.css';
import { db } from './Firebase';
import { useStateValue } from './StateProvider';
import { collection, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore';
import Order from './Order';

function Orders(){
    const [{cart,user},dispatch] = useStateValue();
    const [orders,setOrders] = useState([]);

    const getData = async (user) =>{
        const ordersRef = collection(db,"users",user?.uid,"orders");
        const ordersSnapshot = await getDocs(query(ordersRef, orderBy('created','desc')));
        setOrders([]);
        ordersSnapshot.forEach((doc)=>{
            setOrders(o=>[...o,{
                id: doc.id,
                data: doc.data()
            }])
        })
    }

    useEffect(()=>{
        if(user){
            getData(user);
        }else{
            setOrders([]);
        }

        return () => {
            setOrders([]);
        }
    },[user])

    return(
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders-container">
                
                {orders?.map((order,i)=>(
                    <>
                    {i===0?(<h2>Latest Order:</h2>):(<></>)}
                    <Order key={i} order={order} idx={orders.length-i} first={i===0?true:false}/>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Orders;