import { useEffect, useState } from 'react';
import { notification } from 'antd';

import axios from 'axios';
import { createError, errorType } from '../helpers/error';

const { API_PATH } = process.env
const { NODE_ENV } = process.env

const withLogin = (BaseComponent) => (props) => {
	const [userData, setUserData] = useState(NODE_ENV === 'development' ? {} : null);
	const [loginErrors, setLoginError] = useState(null);

	const clearLogin = () => {
		setUserData(null);
		localStorage.removeItem("inforadarlogin");
	}

	const login = (data) => {
		setUserData(data);
		setLoginError(null);
		try {
			localStorage.setItem("inforadarlogin", 1);
		} catch (error) {
		}
	}

	const logout = () => {
		axios.delete(`${API_PATH}/me`, {
			headers: { 'X-Requested-With': 'XmlHttpRequest' },
		}).then(result => {
			clearLogin();
		}).catch(error => {
			setLoginError(createError(errorType.LOGOUT, error));
		});
	}

	const loginError = (error, clear = true) => {
		setLoginError(error);
		if (clear)
			clearLogin();
	}

	useEffect(() => {
		const loggedin = localStorage.getItem("inforadarlogin");
		if (loggedin)
			axios.get(`${API_PATH}/me`, {
				headers: { 'X-Requested-With': 'XmlHttpRequest' },
			}).then(result => {
				login(result.data);
			}).catch(error => {
				if (error.response && error.response.status === 401)
					loginError(createError(errorType.RELOGIN, error));
				else
					loginError(createError(errorType.AUTHORIZE, error), false);
			});
	}, [])

	return (
		<BaseComponent
			{...props}
			login={{
				authenticated: !!userData,
				login: login,
				logout: logout,
				loginError: loginError,
				userData: userData,
				setUserData: setUserData,
			}}
		/>
	)
}

export default withLogin