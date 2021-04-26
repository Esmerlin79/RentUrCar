import React from 'react'
import { Route } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { PrivateRoute } from './PrivateRoute'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest

}) => {
    return (
        <Route {...rest}
            component = {(props) => (
                (isAuthenticated)
                ? <PrivateRoute 
                    isAuthenticated = {true}
                    component = {AppRoutes}
                />
                : <Component/>
            )}
        />
    )
}
