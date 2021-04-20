import React, {useContext} from 'react'
import {RentalContext} from '../../context/RentalDetail'

export const Details = () => {
    const {car} = useContext(RentalContext)
    return (
        <div className="container">
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
                            className="btn btn-warning mr-2"
                        >Buy</button>
                        <button
                            className="btn btn-secondary"
                        >Go back</button>
                </div>
            </div>
        </div>
    )
}
