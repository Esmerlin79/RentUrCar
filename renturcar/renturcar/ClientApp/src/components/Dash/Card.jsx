import React from 'react'
import { useStateValue } from '../../context/store';

export const Card = ({history,cars}) => {

    const [{ showDetails }, dispatch] = useStateValue();

    const rentDetail = () => {
        // dispatch({
        //   type: 'SHOW_DETAILS',
        //   payload: cars
        // })
        // history.push('/CarDetail')
    }

    return (
        <>

                <div className="card mb-4 box-shadow">
                  <img className="card-img-top" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="Card image cap" />
                  <div className="card-body">
                    <div className="row m-auto">
                    <div className="col-md-6">
                      <p className="card-title">{cars.brand}</p>
                      <p className="card-text">{cars.model}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="card-title">{cars.pricePerDay}</p>
                      {/* <p className="card-text">% NEGOTIABLE %</p> */}
                    </div>
                    </div>
                    <div className="d-flex mt-4 justify-content-center">
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => rentDetail(cars)}
                    >View</button>

                    </div>
                  </div>
                </div>
        </>
    )
}
