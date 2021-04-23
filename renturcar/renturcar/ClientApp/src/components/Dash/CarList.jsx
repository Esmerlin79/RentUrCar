import React from 'react'
import {Card} from './Card'
export const CarList = ({cars}) => {
    return (
        <div>
            {cars !== null ? 
            cars.map(car => (
                <Card 
                    key={car.brand}
                    cars={car}
                />
            ))
            : <p>No hay carros en alquiler</p>}

        </div>
    )
}
