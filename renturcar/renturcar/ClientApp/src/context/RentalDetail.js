import React, {createContext, useState, useEffect} from 'react';
import {getDetails} from '../Services/Maintenance'

export const RentalContext = createContext();

export const RentalProvider = (props) => {
    const [car, setCar] = useState({})
    useEffect(() => {
        const detailData = async () => {
            const data = await getDetails()
            setCar(data)
        }
        detailData()
    }, [car])
    return(
        <RentalContext.Provider
            value={{
                setCar
            }}
        >
            {props.children}
        </RentalContext.Provider>
    )
}

