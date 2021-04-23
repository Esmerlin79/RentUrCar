import React, {useState} from 'react'
import {Loading} from '../Loading'
import {Message} from '../Message'
import { useStateValue } from '../../context/store';
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {postData} from '../../Services/Maintenance'
import { RegisterAction } from '../Actions/UserAction';

export const Register = ({history}) => {
    // States
    const [{ userSesion}, dispatch] = useStateValue();
    
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [register, setRegister] = useState({
        Nombre:'',
        Apellidos:'',
        Email:'',
        Username:'',
        Password:''
    })
    const changeInp = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    const {Nombre,Apellidos,Email,Username,Password} = register;

    const inpValidation = () => {
        if (!Username || !Password || !Nombre || !Apellidos || !Email) return setError("Revise los Campos Vacios")
        else return setError(null)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        inpValidation()

        if(error) return;
        setLoading(true)
        
        const response = await RegisterAction(register, dispatch);
        if(!response.data.successfull){
            setError(response.data.messages[0])
            setLoading(false);
            return; 
        }
        history.push('/Dashboard');
   
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                
            <div className="container-fluid d-flex justify-content-center">
                    <div className="col-md-6 col-lg-8">
                    <div className="d-flex align-items-center py-5">
                        <div 
                            className="container m-auto p-5" 
                            style={{border:"2px solid #e4e4e4", borderRadius:"5px"}}
                        >
                        <div className="row">
                            
                            <div className="col-md-9 col-lg-8 mx-auto">
                            <h3 className="mb-4">Welcome to RentUrCar!</h3>
                            <h5 className="mb-4">Register</h5>
                            {error ?
                                <Message 
                                    message={error} 
                                    alertType="danger"
                                /> 
                            : null }
                            <form>
                            <div className="form-group">
                                    <label for="name">Name</label>
                                    <input 
                                        type="text"  
                                        name="Nombre"
                                        value={Nombre}
                                        className="form-control"
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input 
                                        type="text"
                                        name="Apellidos"
                                        value={Apellidos}
                                        className="form-control" 
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        name="Email"
                                        value={Email}
                                        className="form-control" 
                                        placeholder="example@example.com" 
                                        required
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="user">User Name</label>
                                    <input 
                                        type="text" 
                                        name="Username"
                                        value={Username}
                                        className="form-control" 
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="inputPassword">Password</label>
                                    <input 
                                        type="password" 
                                        name="Password"
                                        value={Password}
                                        className="form-control" 
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
                                            <p className="text-secondary">Already have an Account? <Link to="/Auth/Login">Login</Link></p>
                                            <button 
                                                className="mt-4 btn btn btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" 
                                                type="submit"
                                            >Sign Up</button>
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
        </>
    )
}

export default Register;
