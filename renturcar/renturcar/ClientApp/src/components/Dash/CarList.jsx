import React, { Fragment } from 'react'
import {Card} from './Card'

export const CarList = ({cars}) => {
    return (
           <div className="row">
                {cars !== null ? 
                    cars.map(car => (
                        <div className="col-md-6">
                                <Card 
                                key={car.brand}
                                cars={car}
                            />
                        </div>
                    ))
                    : <p>No hay carros en alquiler</p>}
           </div>

    )
}
