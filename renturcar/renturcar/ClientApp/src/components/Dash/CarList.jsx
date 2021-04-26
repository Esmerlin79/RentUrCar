import React, { Fragment } from 'react'
import {Card} from './Card'
import {v4 as uuidv4} from 'uuid';

export const CarList = ({cars}) => {
    return (
           <div className="row">
                {cars !== null ? 
                    cars.map(car => (
                        <Card 
                            key={uuidv4()}
                            cars={car}
                        />
                    ))
                    : <p>No hay carros en alquiler</p>}
           </div>

    )
}
