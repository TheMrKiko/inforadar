import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { Layout as AntLayout, Typography, Breadcrumb } from 'antd'
import utilStyles from '../../styles/utils.module.css'
import SocioDemForm from '../../components/sdform'
import { createError, errorType } from '../../helpers/error'
import axios from 'axios'

const { API_PATH } = process.env

const form_stts = {
    ERROR: -1,
    INITIAL: 0,
    SUBMITTING: 1,
    SUCCESS: 2,
}

const SocioDem = ({ login }) => {
    const [formStatus, setFormStatus] = useState(form_stts.INITIAL);

    const submitForm = (values) => {
        axios.post(`${API_PATH}/sociodemographic`, values, {
            headers: { 'X-Requested-With': 'XmlHttpRequest' },
        }).then(result => {
            setFormStatus(form_stts.SUCCESS);
            login.setUserData({
                ...login.userData,
                sociodemographic: true
            })
        }).catch(error => {
            if (error.response && error.response.status === 401)
                login.loginError(createError(errorType.RELOGIN, error));
            else
                login.loginError(createError(errorType.AUTHORIZE, error), false);
            setFormStatus(form_stts.ERROR);
        });
    }

    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Questionário Sociodemográfico | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link href={'/avaliacao'}>Avaliação</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Typography.Title level={1}>Questionário Sociodemográfico</Typography.Title>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Paragraph>Este questionário serve para fazer perguntas.</Typography.Paragraph>
                {login.authenticated ? <>
                    <Typography.Paragraph><Typography.Text type={'secondary'}>Sessão iniciada.</Typography.Text></Typography.Paragraph>
                    <Typography.Paragraph>
                        {formStatus == form_stts.SUCCESS ?
                            <Typography.Text type={'success'}>Questionário submetido! <Link href='/avaliacao'>Voltar atrás</Link>. </Typography.Text> :
                            (login.userData && !login.userData.sociodemographic ?
                                <SocioDemForm
                                    submitting={formStatus == form_stts.SUBMITTING}
                                    onSubmit={(values) => {
                                        setFormStatus(form_stts.SUBMITTING);
                                        submitForm(values);
                                    }}
                                /> : <Typography.Text type={'warning'}>Já preencheu este questionário. Apenas necessita de o efetuar uma vez. <Link href='/avaliacao'>Voltar atrás</Link>.</Typography.Text>
                            )}
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