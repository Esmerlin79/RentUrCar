export const initialState = {
    user: {
        userName: '',
    },
    authenticated: false
}

const UserReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "INICIAR_SESION": 
            return{
                ...state,
                user: action.payload,
                authenticated: true
            }
        case "SALIR_SESION": 
            return{
                ...state,
                user: null,
                authenticated: false
            }
    
        default:
            return state;
    }
}
export default UserReducer;
