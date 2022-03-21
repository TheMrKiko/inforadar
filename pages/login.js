import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Layout as AntLayout, Input, Space, Row, Col, Typography, Button } from 'antd'
import utilStyles from '../styles/utils.module.css'
import LoginOptions from '../components/login'

const Login = ({ login }) => {
    return (
        <Layout current={'login'} login={login}>
            <Head>
                <title>Iniciar Sessão | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Iniciar Sessão</Typography.Title>
                <Typography.Paragraph>O seu endereço de email será usado apenas para iniciar sessão cpm o Google. Não o armazenamos, nem associamos quaisquer dados que o permitem identificar aos dados por si fornecidos.</Typography.Paragraph>
                <LoginOptions login={login} />
            </AntLayout.Content>
        </Layout>
    )
}


export default Login