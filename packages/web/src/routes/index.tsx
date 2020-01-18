import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import FormikWithAntd from "../modules/formExploring/FormikWithAntd";

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/register" component={RegisterConnector} />
            <Route exact={true} path="/formikWithAntd" component={FormikWithAntd}/>
        </Switch>
    </BrowserRouter>
);
