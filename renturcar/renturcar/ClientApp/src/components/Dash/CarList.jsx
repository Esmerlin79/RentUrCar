import React from 'react'
import Card from './Card'
export const CarList = ({cars}) => {
    return (
        <div>
            {cars.map(car => (
                <Card 
                    key={car.id}
                    cars={cars}
                />
            ))}
        </div>
    )
}
