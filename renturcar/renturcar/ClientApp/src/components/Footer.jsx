import React from 'react'

export const Footer = () => {
    return (
        <>
            <footer className=" fixed-bottom col-md-12 bg-dark mt-8 p-10">
                <div className="container">
                    <p className="text-center text-white ">
                        &copy; RentUrCar | All rights reserved | {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </>
    )
}
