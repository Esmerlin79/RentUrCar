import React, { useEffect,useState} from 'react'
import {getAll} from '../../Services/Maintenance'
import {Message} from '../Message'
import { getAllCarsAction } from '../Actions/RentCarAction'
import { useStateValue } from '../../context/store';
import { CarList } from './CarList'

export const Dashboard = ({history}) => {

    const [{ showDetails }, dispatch] = useStateValue();

    const [error,setError] = useState('')
    const [cars, getCars] = useState(null)

    const addCar = () => {
        history.push('/Dashboard/AddCar')
    }

    useEffect(() => {
       getAllCarsAction(dispatch);
        
    },[]);

    return showDetails === null ? null :(
        <>
            <main role="main">

            <section className="jumbotron text-center">
                <div className="container">
                <h1 className="jumbotron-heading">RentUrCar</h1>
                <p className="lead text-muted">Where you can either sell or rent your car, we think in your earnings</p>
                </div>
            </section>
            </main>

            <div className="container">
                {error ? 
                    ( <Message alertType="danger" message={error} /> )
                : (
                    <>
                        <div className="col-md-12 d-flex justify-content-end">
                            <button 
                                onClick={()=> addCar()}
                                className="btn btn-success"
                                >Add a Car</button>
                        </div>
                        <CarList cars={showDetails.cars}/>
                    </>
                )}
                
            </div>
        </>
        
    )
}
