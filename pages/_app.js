import '../styles/globals.css'
import ReactGA from 'react-ga4'
import withLogin from '../components/withlogin'

const GA4 = process.env.GA4_TAG

if (GA4) {
	ReactGA.initialize(GA4)
}

function MyApp({ Component, pageProps, login }) {
	return <Component {...pageProps} login={login} />
}

export default withLogin(MyApp)
