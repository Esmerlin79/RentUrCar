import React, {useState, Fragment, useEffect } from 'react';
import {Header} from './components/Header'
import {Register} from './components/Auth/Register'
import {Login} from './components/Auth/Login'
import {Footer} from './components/Footer'
import {Details} from './components/Dash/Details'
import {Dashboard} from './components/Dash/Dashboard'
import {AddCar} from './components/Dash/AddCar'
import {RentalProvider} from './context/RentalDetail'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SecurityRoute from './components/Auth/SecurityRoute'
import { getCurrectUserAction } from './components/Actions/UserAction';
import { useStateValue } from './context/store';

/**
 * --- LOGIN: 
        PATH: components/Auth/Login
        USABILITY: SEND USERNAME AND PASSWORD TO BACKEND, IF IT'S SUCCESSFULL, MUST REDIRECT TO DASHBOARD
        ERROR MESSAGES ALREADY SETTLED IF DATA ITS NOT CORRECT
 * 
 * --- REGISTER: 
        PATH: components/Auth/Register
        USABILITY: SEND NAME, EMAIL,USERNAME AND PASSWORD TO BACKEND, IF IT'S SUCCESSFULL, MUST REDIRECT TO DASHBOARD
        ERROR MESSAGES ALREADY SETTLED IF DATA ITS NOT CORRECT
 * 
 * --- DASHBOARD:
        PATH: components/Dash/Dashboard
        USABILITY:  SHOW ALL CARS WHICH ARE AVAILABLE TO RENT
                    WITH BUTTON ADD CAR MUST SEND THE USER TO ANOTHER VIEW 
 * --- ADD CAR: 
        PATH: components/Dash/AddCar
        USABILITY: POST A NEW CAR TO BE RENTED
        ERROR MESSAGES ALREADY SETTLED IF DATA IS NOT CORRECT AND REDIRECT WHEN IS SUCCESSFULL
 * 
 * --- CAR LIST: 
        PATH: components/Dash/CarList
        USABILITY: ITERATES ALL CARS THAT ARE IN THE STATE
 *
 * --- CARD:
        PATH: components/Dash/Card
        USABILITY: RECEIVES BY PROP AN OBJECT, IN EACH PARAGRAPH MUST SHOW SOME RELEVANT DATA OF THE CAR TO BE SHOWN IN THE CARD
 *
 * --- DETAILS:
        PATH: components/Dash/Details
        USABILITY: RECEIVES ALL THE DATA OF AN ESPECIFIC CAR TO BE RENTED, IT MUST BE SHOWN ON THE SCREEN THE DATA
                    ALSO, IT HAS A BUTTON TO RENT OR GO BACK, IF RENT BUTTON IS PRESSED, IT MUST SEND THE ID TO THE BACKEND TO LET
                    THEM KNOW THAT A CAR RENTED 
 *
 * --- MAINTENANCE:
        PATH: Services/Maintenance
        USABILITY: GLOBAL METHODS
 */

function App() {
    const [{ userSesion }, dispatch] = useStateValue();

    const [initApp, setInitApp] = useState(false);

    useEffect( () => {
        if(!initApp){
            const response = async () =>{
                const token = window.localStorage.getItem("token");
                if(token){
                 const finished = await getCurrectUserAction(dispatch)
                 if(finished){
                    setInitApp(true)
                 }
                }else{
                    setInitApp(true)
                }
            }
            response()
        }
    }, [initApp])

    return initApp === false ? null : (

            <Fragment>
                    <Header />
                    <Router>
                        <Switch>
                            <Route exact path="/Auth/Register" component={Register}/>
                            <Route exact path="/Auth/Login" component={Login} />
                            <Route exact path="/" component={Login} />
                            {/* <Route exact path="/Dashboard" component={Dashboard} /> */}
                            <SecurityRoute 
                                exact 
                                path = "/Dashboard"
                                component = {Dashboard}
                            />
                            <SecurityRoute 
                                exact 
                                path = "/Dashboard/AddCar"
                                component = {AddCar}
                            />

                            <SecurityRoute 
                                exact 
                                path = "/carDetail"
                                component = {Details}
                            />
                        </Switch>
                    </Router>
                <Footer />
            </Fragment>

    )
}
export default App;