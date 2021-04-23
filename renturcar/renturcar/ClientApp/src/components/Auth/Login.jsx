import React, {useState} from 'react'
import {Message} from '../Message'
import {Loading} from '../Loading'
import { useStateValue } from '../../context/store';
import {Link} from 'react-router-dom'
import { LoginAction } from '../Actions/UserAction';

export const Login = ({history}) => {
    // States
    const [{ userSesion }, dispatch] = useStateValue();

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState({
        userName:'',
        Password:''
    })
    const changeInp = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    const {userName,Password} = login;

    // ANCHOR POST DATA METHOD

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!userName || !Password) return setError("Revise los Campos Vacios")

        setError(null)
        setLoading(true)
        
       const test = await LoginAction(login, dispatch)
       if(!test.data.successfull){
            setError("Usuario Incorrecto intente de nuevo")
            setLoading(false)
            return;
       }
       history.push('/Dashboard');

    }

    return (
            <form 
                onSubmit = {onSubmit} 
            >
                
                <div className="container-fluid d-flex justify-content-center">
                        <div className="col-md-6 col-lg-8">
                        <div className="d-flex align-items-center py-5">
                            <div 
                                className="container m-auto p-5" 
                                style={{border:"2px solid #e4e4e4", borderRadius:"5px"}}
                            >
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className=" mb-4">RentalUrCar</h3>
                                <h5 className=" mb-4">Login</h5>
                                {error ?
                                <Message 
                                    message={error} 
                                    alertType="danger"
                                /> 
                            : null }
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="userName">User Name</label>
                                        <input 
                                            type="text" 
                                            id="userName" 
                                            className="form-control" 
                                            name="userName"
                                            value={userName}
                                            onChange={changeInp}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input 
                                            type="password" 
                                            id="inputPassword" 
                                            className="form-control" 
                                            name="Password"
                                            value={Password}
                                            onChange={changeInp}
                                        />
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <Loading />
                                        </div>
                                    )
                                    : 
                                    (
                                        <div>
                                            <p className="text-secondary">Don't have an Account yet? <Link to="/Auth/Register">Register</Link></p>
                                            <button 
                                                className="mt-4 btn btn btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" 
                                                type="submit"
                                            >Sign In</button>
                                        </div>
                                    )
                                    }
                                </form>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                </div>
            </form>
    )
}

export default Login;
