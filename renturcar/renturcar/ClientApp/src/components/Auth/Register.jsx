import React, {useState} from 'react'
import {Loading} from '../Loading'
import {Errors} from '../Errors'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {postData} from '../../Services/Maintenance'

export const Register = () => {
    // States
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [register, setRegister] = useState({
        name:'',
        lastName:'',
        email:'',
        userName:'',
        pwd:''
    })
    const changeInp = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }
    const {name,lastName,email,userName,pwd} = register;

    const inpValidation = () => {
        if (!userName || !pwd || !name || !lastName || !email) return setError("Revise los Campos Vacios")
        else return setError(null)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        inpValidation()

        if(error) return;
        setLoading(true)
        
        setTimeout(() => {
            postData('endpoint', register)
            .then(data => {
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
                                <Errors error={error} /> 
                            : null }
                            <form>
                            <div className="form-group">
                                    <label for="name">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={name}
                                        className="form-control"
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        name="lastName"
                                        value={lastName}
                                        className="form-control" 
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        value={email}
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
                                        id="user" 
                                        name="userName"
                                        value={userName}
                                        className="form-control" 
                                        onChange={changeInp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="inputPassword">Password</label>
                                    <input 
                                        type="password" 
                                        id="inputPassword" 
                                        name="pwd"
                                        value={pwd}
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
                                            <p className="text-secondary">Already have an Account? <Link>Login</Link></p>
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
