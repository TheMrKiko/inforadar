import { useEffect, useState } from 'react';
import { notification } from 'antd';

import axios from 'axios';

const { API_PATH } = process.env

const withLogin = (BaseComponent) => (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [userData, setUserData] = useState(null);
	const [loginErrors, setLoginError] = useState(false);
	const [logoutErrors, setLogoutError] = useState(false);

	const clearLogin = () => {
		setAuthenticated(false);
		setUserData(null);
		setLogoutError(false);
		localStorage.removeItem("inforadarlogin");
	}


	const login = (data) => {
		setAuthenticated(true);
		setUserData(data);
		setLoginError(false);
		try {
			localStorage.setItem("inforadarlogin", 5); //meter um 5 no numero de vezes da cookie e ir reduzindo
		} catch (error) {
		}
	}

	const logout = () => {
		axios.delete(`${API_PATH}/me`, {
			headers: { 'X-Requested-With': 'XmlHttpRequest' },
		}).then(result => {
			clearLogin();
		}).catch(error => {
			setLogoutError(true);
		});
	}

	const loginError = () => {
		setLoginError(true);
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
					clearLogin();
				else
					loginError();
			});
	}, [])

	useEffect(() => {
		if (loginErrors) {
			notification.open({
				message: 'Erro a iniciar sessão',
			});
			setLoginError(false);
		}
		if (logoutErrors) {
			notification.open({
				message: 'Erro a terminar a sessão',
			});
			setLogoutError(false);
		}
	}, [loginErrors, logoutErrors]);

	return (
		<BaseComponent
			{...props}
			login={{
				authenticated: authenticated,
				login: login,
				logout: logout,
				loginError: loginError,
				userData: userData,
			}}
		/>
	)
}

export default withLogin