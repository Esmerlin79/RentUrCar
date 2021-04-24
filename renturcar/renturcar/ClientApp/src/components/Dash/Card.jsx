import React from 'react'
import { useStateValue } from '../../context/store';
import { Link } from 'react-router-dom';

export const Card = ({ cars}) => {

    const [{ showDetails }, dispatch] = useStateValue();

    const rentDetail = (data) => {
        dispatch({
          type: 'CAR_DETAILS',
          payload: data
        })
    }

    return (
        <>
                <div className="col-md-6">
                <div className="card mb-4 box-shadow">
                  {cars.photo !== '' ? (
                    <img className="card-img-top" src={`https://${window.location.host}/${cars.photo}`} alt="Card image cap" />
                  ): (
                    <img className="card-img-top" src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg" alt="Card image cap" />
                  )}
                  <div className="card-body">
                    <div className="row m-auto">
                    <div className="col-md-12 text-center">
                      {cars.status === 1 ? (
                        <h2 className="card-title" style={{color:"red"}}>Rented</h2>
                      ): null}
                      <h2 className="card-title">{cars.brand + " "+ cars.model}</h2>
                      
                    </div>
                    <div className="col-md-12 text-center">
                      
                    <p className="card-title">$ {cars.pricePerDay}</p>
                    </div>
                    </div>
                    <div className="d-flex mt-4 justify-content-center">
                    <Link 
                      to="/carDetail"
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => rentDetail(cars)}
                    >View</Link>

                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}
