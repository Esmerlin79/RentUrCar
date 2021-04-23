export const initialState = {
    user: '',
    error: [],
    authenticated: false,
    loading: false
}

const UserReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "REGISTRAR_USUARIO":
        case "INICIAR_SESION": 
            return{
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case "SALIR_SESION": 
            return{
                ...state,
                user: null,
                authenticated: false
            }
        case "ERROR_LOGIN":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
export default UserReducer;
