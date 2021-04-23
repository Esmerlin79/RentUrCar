import axios from 'axios';
import HttpClient from '../../Services/HttpClient';

const inst = axios.create();
inst.CancelToken = axios.CancelToken;
inst.isCancel = axios.isCancel;

export function LoginAction(user, dispatch){

    dispatch({
        type: 'LOADING'
    })
    const LoginUser = async data => {
        try {
            const result = await inst.post('/User/Login', data);
            if(!result.data.successfull){
                dispatch({
                    type: 'ERROR_LOGIN',
                    payload: result.data.messages
                })
                return result;
            }
            dispatch({
                type: 'INICIAR_SESION',
                payload: result.data.data.name + ' ' + result.data.data.lastName
            })
            localStorage.setItem('token', result.data.data.token)
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    return LoginUser(user);
}

export function RegisterAction(user, dispatch){
    dispatch({
        type: 'LOADING'
    })

    const registerUser = async data => {

        try {
            const result = await inst.post('/User/Register', data);
            if(!result.data.successfull){
                dispatch({
                    type: 'ERROR_LOGIN',
                    payload: result.data.messages
                })
                return result;
            }
            dispatch({
                type: 'REGISTRAR_USUARIO',
                payload: result.data.data.name + ' ' + result.data.data.lastName
            })
            localStorage.setItem('token', result.data.data.token)
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    return registerUser(user);
}