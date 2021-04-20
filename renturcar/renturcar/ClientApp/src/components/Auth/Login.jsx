import React, {useState} from 'react'
import {postData} from '../../Services/Maintenance'
import {Errors} from '../Errors'
import {Loading} from '../Loading'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export const Login = ({history}) => {
    // States
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState({
        userName:'',
        pwd:''
    })
    const changeInp = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    const {userName,pwd} = login;

    const inpValidation = () => {
        if (!userName || !pwd) return setError("Revise los Campos Vacios")
        else return setError(null)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        inpValidation()

        if(error) return;
        setLoading(true)
        
        setTimeout(() => {
            postData('endpoint', login)
            .then(data => {
               // history.push(Ruta Dashboard)
                console.log(data)
            })
            .catch(err => {
                setLoading(false)
                setError("Se ha perdido la conexion con el Servidor")
                console.log(err)
            })
        }, 3000);
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
                                    <Errors error={error} /> 
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
                                            name="pwd"
                                            value={pwd}
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
                                            <p className="text-secondary">Don't have an Account yet? <Link>Register</Link></p>
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
