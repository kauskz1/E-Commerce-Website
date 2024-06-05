import Popup from "./Popup";

export const initialState = {
    cart: [],
    search: "",
    user: null,
    membership: false,
    popups: [],
};

export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => (item.price*item.count)+amount, 0);

export const getCartItemsNumber = (cart) =>
    cart?.reduce((c, item) => (item.count+c), 0);

function cartContainsItem(cart,item){
    for(let i in cart){
        if(cart[i].id === item.id){
            return i;
        }
    }
    return -1;
}

const reducer = (state,action) => {
    switch(action.type){
    case "ADD_TO_CART":
        var index = cartContainsItem(state.cart,action.item);
        if(index>=0){          
            let newCart = [...state.cart];
            newCart[index].count += 1;
            return{
                ...state,
                cart: newCart,
                popups: [...state.popups,<Popup key={"add"+action.item.id} image={action.item.image} title="Product Added" desc={"Added 1 "+action.item.title+" to the cart."}/>]
            }
        }
        else{      
            return{
                ...state,
                cart: [...state.cart, action.item],
                popups: [...state.popups,<Popup key={"add-quantity"+action.item.id} image={action.item.image} title="Product Added" desc={action.item.title+" was added to the cart."}/>]
            };
        };
    case "EMPTY_CART":
        return{
            ...state,
            cart: []
        }
    case "REMOVE_FROM_CART":
        const i = state.cart.findIndex(
            (cartItem) => cartItem.id === action.id
        );
        let newCart = [...state.cart];
        let newPopup;
        if(i>=0){
            newCart.splice(i,1);
            newPopup = <Popup key={"del"+state.cart[i].id} image={state.cart[i].image} title="Product Removed" desc={state.cart[i].title+" was removed from the cart."} />
        }else{
            console.warn(`Can't remove product (id: ${action.id}) as it is not in cart!`)
        }
        return{
            ...state,
            cart: newCart,
            popups: [...state.popups,newPopup]
        };
    case "SEARCH_PRODUCT":
        return{
            ...state,
            search: action.value
        }
    case "SET_USER":
        return{
            ...state,
            user: action.user
        };
    case "MEMBERSHIP_CHANGE":
        return{
            ...state,
            membership: action.active
        };
    default:
        return state;
    }
}

export default reducer; 