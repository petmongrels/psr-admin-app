import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Service} from "./service/Service";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        {dashboard()}
                    </Route>
                    <Route path="/service">
                        {Service()}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
