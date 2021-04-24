import React, {useContext, useState} from 'react'
import {postData} from '../../Services/Maintenance'
import {Message} from '../Message';
import { useStateValue } from '../../context/store';
import { Redirect } from 'react-router-dom';
import { rentCarAction } from '../Actions/RentCarAction';
import Swal from 'sweetalert2'

export const Details = ({history}) => {
    // State to check if the Rent was successfully made to show a message
    const [rentSuccess, setRentSuccess] = useState('')
    const [rentError, setRentError] = useState('')

    const [{ showDetails }, dispatch] = useStateValue();

    const goBack = () => {
        history.push('/Dashboard')
    }

    const rentCar = () => {

        if(showDetails.carSelected.status === 0){
                Swal.fire({
                    title: 'Are you sure you want to rent this car?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, rent the car!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const car = showDetails.carSelected;
        
                        car.status = 1;      
                        const response = await rentCarAction(car)
        
                    Swal.fire(
                        'Rented!',
                        'The car has been rented successfully',
                        'success'
                    );
        
                    if(response.data.successfull){
                        history.push('/Dashboard')
                    }
                    }
                })

            }else{
                const rentAgain = async () =>{
                    const car = showDetails.carSelected;
                    car.status = 0;   
                    const response = await rentCarAction(car)
                    Swal.fire(
                        'Updated!',
                        'The car is for rent again',
                        'success'
                    );
                    if(response.data.successfull){
                        history.push('/Dashboard')
                    }
                }
                rentAgain();   
            }
        
    }
  
    return showDetails.carSelected === null ? <Redirect to="/Dashboard" /> : (
        <div className="container  pt-5">

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

            <div className="row ">
                    <div className="col-md-8">
                        <div className="card">
                        {showDetails.carSelected.photo !== '' ? (
                            <img className="card-img-top" src={`https://${window.location.host}/${showDetails.carSelected.photo}`} alt="Card image cap" />
                        ): (
                            <img className="card-img-top" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="Card image cap" />
                        )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label><b>Brand: </b>{showDetails.carSelected.brand || "" }</label><br/>
                        <label><b>Car Model: </b>{showDetails.carSelected.model || "" }</label><br/>
                        <label><b>Price: </b>{showDetails.carSelected.pricePerDay || 0 }</label><br/>
                        {/* <label><b>Price: </b>$2,000,000 US</label><br/> */}
                        
                        <button
                            onClick={rentCar}
                            className="btn btn-warning mr-2"
                        >{showDetails.carSelected.status === 0 ? 'Rent' : 'Enable Again'}</button>
                        <button
                            onClick={() => goBack()}
                            className="btn btn-secondary"
                        >Go back</button>
                </div>
            </div>
        </div>
    )
}
