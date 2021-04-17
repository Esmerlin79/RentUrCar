import React from "react";
import { Route, Switch } from "react-router";
import App from "../App";

export const AppRoutes = () => {
    return (
        <>
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/" component={App} />
                </Switch>
            </div>
        </>
    );
};
