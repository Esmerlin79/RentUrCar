import React, { useEffect,useState} from 'react'
import {Card} from './Card'
import {getAll} from '../../Services/Maintenance'
import {Message} from '../Message'

export const Dashboard = ({history}) => {

    const [error,setError] = useState('')
    const [cars, getCars] = useState([])

    const addCar = () => {
        history.push('/Auth/AddCar')
    }

    useEffect(() => {
        const getAllRents = async () => {
            const res = await getAll();
            if(res.data.successfull) {
                return getCars(res.json())
            }
            return setError('Data Not Found')
        }
        getAllRents()
    },[cars]);

    return (
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
                        <Card cars={cars}/>
                    </>
                )}
                
            </div>
        </>
        
    )
}
