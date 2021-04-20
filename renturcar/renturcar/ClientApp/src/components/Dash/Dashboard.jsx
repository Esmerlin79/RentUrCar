import React, { Fragment } from 'react'
import {Card} from './Card'
// import {BrowserRouter as Router, Route,Link} from 'react-router-dom'

export const Dashboard = () => {
    return (
        <Fragment>
            <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                <h1 className="jumbotron-heading">RentUrCar</h1>
                <p className="lead text-muted">Where you can either sell or rent your car, we think in your earnings</p>
                </div>
            </section>
            </main>
            <div className="container">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success">Add a Car</button>
                </div>
                <Card />
            </div>
        </Fragment>
        
    )
}
