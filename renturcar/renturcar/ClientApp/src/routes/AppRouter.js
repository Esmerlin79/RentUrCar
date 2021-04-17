import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AppRoutes } from "./AppRoutes";


export const AppRouter = () => {

    const logged = true; // !this will change later on

    return (
    <Router>
        <Switch>
            {/* <PublicRoute 
                exact path = "/login" 
                component = {LoginScreen} 
                isAuthenticated = {logged}/> */}
            <PrivateRoute 
                isAuthenticated = {logged}
                component = {AppRoutes}/>
                path = "/" 
        </Switch>
    </Router>
    )
}
