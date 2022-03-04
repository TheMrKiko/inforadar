import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { Alert, Layout as AntLayout, Input, Space, Row, Col, Typography, Button } from 'antd'
import utilStyles from '../../styles/utils.module.css'
import LoginOptions from '../../components/login'
import SocioDemForm from '../../components/sdform'

const SocioDem = ({ login }) => {
    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Avaliação | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Questionário Sociodemográfico</Typography.Title>
                <Typography.Paragraph>Este questionário serve para fazer perguntas.</Typography.Paragraph>
                {login.authenticated ? <>
                    <Typography.Paragraph><Typography.Text type={'secondary'}>Sessão iniciada.</Typography.Text></Typography.Paragraph>
                    <Typography.Paragraph>
                        <SocioDemForm />
                    </Typography.Paragraph>
                </> :
                    <Typography.Paragraph>
                        <Typography.Text type={'warning'}>Para visualizar esta página, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
                    </Typography.Paragraph>
                }
            </AntLayout.Content>
        </Layout>
    )
}


export default SocioDem