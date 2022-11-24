import React, { useState } from 'react';
import { withRouter } from 'next/router'
import { GoogleLogin } from 'react-google-login';
import { Typography, Modal, Button, Space, Input } from 'antd';
import { createError, errorType } from '../helpers/error';

import axios from 'axios';

const API_PATH = process.env.API_PATH
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

class LoginOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { withCode: false, code: "" };
    }

    componentDidMount() {
        this.checkAlreadyLoggedIn();
        if (this.props.router.query?.code)
            this.updateCode();
    }

    componentDidUpdate(prevProps) {
        this.checkAlreadyLoggedIn();
        if (this.props.router.query?.code && this.props.router.query?.code !== prevProps.router.query?.code)
            this.updateCode();
    }

    checkAlreadyLoggedIn() {
        // Redirect if authentication is done:
        if (this.props.login.authenticated)
            this.props.router.push({
                pathname: '/avaliacao'
            })
    }

    sanitize(value) {
        return value.toUpperCase().replace(/[^a-z0-9]/gi, '').substring(0, 6);
    };

    isCodeValid() {
        return this.state.code.length === 0 || this.state.code.length === 6;
    };

    updateCode() {
        this.setState({ withCode: true, code: this.sanitize(this.props.router.query.code) });
    };

    loginSuccess(googleData) {
        const formData = new FormData();
        formData.set('id_token', googleData.tokenObj.id_token);
        if (this.state.code.length && this.isCodeValid())
            formData.set('reg_code', this.state.code);

        axios.post(`${API_PATH}/me`, formData, {
            headers: { 'X-Requested-With': 'XmlHttpRequest' },
        }).then(result => {
            this.props.login.login(result.data);
        }).catch(error => {
            this.props.login.loginError(createError(errorType.LOGIN, error));
        });
    };

    loginFailure(d) {
        this.props.login.loginError(createError(errorType.GOOGLE, d));
    };

    render() {
        return (
            <Space direction={'vertical'} size={'middle'}>
                <GoogleLogin
                    disabled={!this.isCodeValid()}
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText={'Iniciar sessão com o Google'}
                    onSuccess={(gd) => this.loginSuccess(gd)}
                    onFailure={(d) => this.loginFailure(d)}
                    cookiePolicy={'single_host_origin'}
                    redirectUri={'postmessage'}
                    scope={'openid'}
                />
                {
                    !this.state.withCode ?
                        <Typography.Link type='secondary' onClick={() => this.setState({ withCode: true })}>Tem um código de registo?</Typography.Link>
                        :
                        <Space direction={'horizontal'}>
                            <Typography.Text>Código de registo:</Typography.Text>
                            <Input
                                status={!this.isCodeValid() ? 'error' : ''}
                                value={this.state.code}
                                onChange={v => this.setState({ code: this.sanitize(v.target.value) })} />
                            <Typography.Text type={'secondary'}>(Apenas necessário no primeiro início de sessão de anotadores remunerados.)</Typography.Text>
                        </Space>
                }
            </Space>
        );
    }
};


export default withRouter(LoginOptions)
