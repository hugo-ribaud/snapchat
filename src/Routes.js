import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Camera from "./Components/Camera";


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key='root' hideNavBar={true}>
                    <Scene key='Login' component={Login} title='Login' initial={true} />
                    <Scene key='Register' component={Register} title='Register' />
                    <Scene key='Camera' component={Camera} title='Camera' />
                </Stack>
            </Router>
        );
    }
}