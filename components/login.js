import React, { useState } from 'react';
import { withRouter } from 'next/router'
import { GoogleLogin } from 'react-google-login';
import { Typography, Modal, Button } from 'antd';

import axios from 'axios';

const { API_PATH } = process.env
const { GOOGLE_CLIENT_ID } = process.env

class LoginOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkAlreadyLoggedIn();
    }

    componentDidUpdate() {
        this.checkAlreadyLoggedIn();
    }

    checkAlreadyLoggedIn() {
        // Redirect if authentication is done:
        if (this.props.login.authenticated)
            this.props.router.push({
                pathname: '/avaliacao'
            })
    }

    loginSuccess(googleData) {
        const formData = new FormData();
        formData.set('id_token', googleData.tokenObj.id_token);

        axios.post(`${API_PATH}/me`, formData, {
            headers: { 'X-Requested-With': 'XmlHttpRequest' },
        }).then(result => {
            this.props.login.login(result.data);
        }).catch(error => {
            this.props.login.loginError(error);
        });
    };


    loginFailure(d) {
        this.props.login.loginError(d);
    };


    render() {
        return (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText={'Iniciar sessão com o Google'}
                onSuccess={(gd) => this.loginSuccess(gd)}
                onFailure={(d) => this.loginFailure(d)}
                cookiePolicy={'single_host_origin'}
                redirectUri={'postmessage'}
                scope={'openid'}
            />
        );
    }
};


export default withRouter(LoginOptions)
