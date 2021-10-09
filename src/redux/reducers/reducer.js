import { actionTypes } from './../../redux/actionTypes/actionTypes';

const INITIAL_STATE = {
        viewProduct:{},
         cartData:[]
}

const Reducer = (state = INITIAL_STATE, action) =>{
   
    switch(action.type) {
       case actionTypes.ADD_TO_CART:
           { 
               console.log('reducer',state.cartData,action);
             return {
                 ...state,
                 cartData: [...state.cartData, action.payload]
             }
          }
          case actionTypes.VIEW_PRODUCT:
            { 
                console.log('reducer',state.cartData,action);
              return {
                  ...state,
                  viewProduct: action.payload
              }
           }
       default:   
             return state;
    }
} 

export default Reducer;