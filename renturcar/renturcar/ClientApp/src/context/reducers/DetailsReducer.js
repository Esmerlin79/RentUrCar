export const initialState = {
    cars: null,
    authenticated: false
}

const DetailsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "SHOW_DETAILS": 
            return{
                ...state,
                cars: action.payload
            }
        default:
            return state;
    }
}
export default DetailsReducer;
