import React, {useContext, useState} from 'react'
import {RentalContext} from '../../context/RentalDetail'
import {postData} from '../../Services/Maintenance'
import {Message} from '../Message'

export const Details = ({history}) => {
    const {car} = useContext(RentalContext)
    // State to check if the Rent was successfully made to show a message
    const [rentSuccess, setRentSuccess] = useState('')
    const [rentError, setRentError] = useState('')

    const goBack = () => {
        history.push('/Dashboard')
    }

    const rentCar = async (id) => {
        postData('endpoint', id)
        .then(({data}) => {
            if(data.successfull){
                setRentSuccess('Car Successfully Rented')
                return;
            }
            setRentError('Car was not rented successfully, try again')
        })
        .catch(() => {
            setRentSuccess('Car not rented')
            return
        })
    }
    return (
        <div className="container">

            { rentSuccess ? ( 
                <Message
                    alertType="success" 
                    message={rentSuccess} 
                /> 
            ): rentError ? (
                <Message
                    alertType="danger" 
                    message={rentError} 
                /> 
            ) : null}

            <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                        <img src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt=""/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label><b>Name of Seller: </b>Ismael</label><br/>
                        <label><b>Car Model: </b>Mitsubishi</label><br/>
                        <label><b>Year Car: </b>2001</label><br/>
                        <label><b>Price: </b>$2,000,000 US</label><br/>
                        
                        <button
                            rentCar={rentCar}
                            className="btn btn-warning mr-2"
                        >Rent</button>
                        <button
                            onClick={() => goBack()}
                            className="btn btn-secondary"
                        >Go back</button>
                </div>
            </div>
        </div>
    )
}
