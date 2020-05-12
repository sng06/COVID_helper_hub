import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Chatroom from './Chatroom';
import socket from './socket';

export default class Chatpanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        let id = Math.floor(Math.random() * 1000);
        this.state = {
            user: {name: props.user, id: id},     //TODO: get user name after login
            client: socket(),
        };

    }

    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider>
                    <Chatroom
                        user={this.state.user}
                        onSendMessage={
                            (message, cb) => this.state.client.message(
                                this.state.user,
                                message,
                                cb
                            )
                        }
                        registerHandler={this.state.client.registerHandler}
                        unregisterHandler={this.state.client.unregisterHandler}
                    />
                </MuiThemeProvider>
            </BrowserRouter>
        )
    }
}