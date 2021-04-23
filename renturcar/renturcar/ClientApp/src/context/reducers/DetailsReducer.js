export const initialState = {
    cars: null,
    carSelected: null,
}

const DetailsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "SHOW_DETAILS": 
            return{
                ...state,
                cars: action.payload
            }
        case "CAR_DETAILS":
            return{
                ...state,
                carSelected: action.payload 
            }
        default:
            return state;
    }
}
export default DetailsReducer;
