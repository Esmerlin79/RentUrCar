import React, {Fragment, useState} from 'react'
import {postData} from '../../Services/Maintenance'
import {Errors} from '../Errors'
import {Loading} from '../Loading'
// import {BrowserRouter as Router, Route} from 'react-router-dom'
// import {Link} from 'react-router-dom'

export const AddCar = () => {
    // States
    const [error, setError ] = useState('')
    const [loading, setLoading] = useState(false)
    const [newCar, setNewCar] = useState({
        carModel: 'Audi',
        carYear : 1995,
        price: 2000,
        img: ''
    })
    const {carModel,carYear,price,img} = newCar
    const updateState = (e) => {
        setNewCar({
            ...newCar, 
            [e.target.name]: e.target.value
        })
        console.log([e.target.name])
    }
    const inpValidation = () => {
        if (!carModel || !carYear) return setError("Revise los Campos Vacios")
        else return setError(null)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        inpValidation()
        
        if(error) return;
        
        setLoading(true)

        // Is just for simulation
        setTimeout(() => {
            postData('endpoint',newCar)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                setLoading(false)
                setError("Se ha perdido la conexion con el servidor")
                console.log(err)
            })
        }, 4000);        
    }
    return (
            <Fragment>
                
                <div className="container-fluid d-flex justify-content-center">
                        <div className="col-md-6 col-lg-8">
                        <div className="d-flex align-items-center py-5">
                            <div 
                                className="container m-auto p-5" 
                                style={{border:"2px solid #e4e4e4", borderRadius:"5px"}}
                            >
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className=" mb-4">Add a Car</h3>
                                {error ?
                                    <Errors error={error} /> 
                                : null }
                                <form
                                    onSubmit = {onSubmit} 
                                >
                                    <div className="form-group">
                                        <label htmlFor="carModel">Car Model</label>
                                        <input 
                                            type="text" 
                                            id="carModel" 
                                            className="form-control" 
                                            value={carModel}
                                            name="carModel"
                                            onChange={ updateState }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="carYear">Year Car</label>
                                        <input 
                                            type="text" 
                                            id="carYear"
                                            name="carYear" 
                                            className="form-control"
                                            value={carYear}
                                            onChange={updateState}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            className="form-control"
                                            value={price}
                                            onChange={updateState}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="img">Picture</label>
                                        <input 
                                            type="file" 
                                            name="img" 
                                            className="form-control"
                                            value={img}
                                            onChange={updateState}
                                        />
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <Loading />
                                        </div>
                                    )
                                    : 
                                    (
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button 
                                                    className="mt-4 btn btn btn-secondary btn-block btn-login text-uppercase mb-2"
                                                    type="submit"
                                                >Go Back
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <button 
                                                    className="mt-4 btn btn btn-success btn-block btn-login text-uppercase mb-2"
                                                    type="submit"
                                                >Add Car
                                                </button>
                                            </div>
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
            </Fragment>
    )
}

