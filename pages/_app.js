import '../styles/globals.css'
import 'antd/dist/reset.css'
import withLogin from '../components/withlogin'

function MyApp({ Component, pageProps, login }) {
  return <Component {...pageProps} login={login} />
}

export default withLogin(MyApp)