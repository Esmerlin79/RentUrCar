import React, {Fragment, useState} from 'react'
import {postData} from '../../Services/Maintenance'
import {Message} from '../Message'
import {Loading} from '../Loading'
import { AddCarAction } from '../Actions/RentCarAction';
// import {BrowserRouter as Router, Route} from 'react-router-dom'
// import {Link} from 'react-router-dom'

export const AddCar = ({ history }) => {
    // States
    const [error, setError ] = useState('')
    const [loading, setLoading] = useState(false)
    const [newCar, setNewCar] = useState({
        Brand: '',
        Model : '',
        PricePerDay: 0,
        photo: ''
    })
    const {Brand,Model,PricePerDay} = newCar
    const updateState = (e) => {
        setNewCar({
            ...newCar, 
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (Brand.trim() === '' || Model.trim() === '' || PricePerDay <= 0){
            setError("Revise los Campos Vacios");
            return;
          } 
        
        setLoading(true)
        const response = await AddCarAction(newCar)
        console.log(response)
        if(!response.data.successfull){
            setError("Hubo un error al agregar el carro")
            setLoading(false);
            return;
        }
        history.push('/Dashboard');    
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
                                    <Message 
                                        message={error} 
                                        alertType="danger"
                                    /> 
                                : null }
                                <form
                                    onSubmit = {onSubmit} 
                                >
                                    <div className="form-group">
                                        <label htmlFor="carModel">Car Brand</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={Brand}
                                            name="Brand"
                                            onChange={ updateState }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="carYear">Model</label>
                                        <input 
                                            type="text" 
                                            name="Model" 
                                            className="form-control"
                                            value={Model}
                                            onChange={updateState}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price">Price Per Day</label>
                                        <input 
                                            type="number" 
                                            name="PricePerDay" 
                                            className="form-control"
                                            value={PricePerDay}
                                            onChange={updateState}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="img">Picture</label>
                                        <input 
                                            type="file" 
                                            name="img" 
                                            className="form-control"
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

