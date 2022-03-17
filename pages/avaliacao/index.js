import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Layout from '../../components/layout'
import LoginOptions from '../../components/login'
import { md } from '../../helpers/query'
import { Alert, Layout as AntLayout, Input, Space, Row, Col, Typography, Button } from 'antd'

import utilStyles from '../../styles/utils.module.css'

const { API_PATH } = process.env

const Avaliacao = ({ login }) => {
    const [chosenArticle, setChosenArticle] = useState(null);

    useEffect(() => {
        axios.get(`${API_PATH}/article_annotation`, {
            headers: { 'X-Requested-With': 'XmlHttpRequest' },
        }).then(result => {
            setChosenArticle(result.data);
        }).catch(error => {
            if (error.response && error.response.status === 401)
                login.loginError();
        });
    }, []);

    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Avaliação | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Avaliação</Typography.Title>
                <Typography.Paragraph>De forma a melhorar os classificadores do InfoRadar, contamos com a colaboração dos utilizadores da plataforma para darem a sua opinião sobre os classificadores e os valores das métricas referentes a alguns artigos de exemplo.</Typography.Paragraph>
                <Typography.Paragraph>Para avaliar o InfoRadar, e cruzar a avaliação com dados sociodemográficos, pedimos que o utilizador se registe na nossa plataforma e preencha um questionário sociodemográfico (uma única vez), antes de avaliar artigos de exemplo.</Typography.Paragraph>
                {login.authenticated ? <>
                    <Typography.Paragraph><Typography.Text type={'secondary'}>Sessão iniciada.</Typography.Text></Typography.Paragraph>
                    {login.userData && !login.userData.sociodemographic && <Typography.Paragraph>
                        <Alert
                            message="Questionário Incompleto"
                            description="Ainda não preencheu o questionário sociodemográfico. Só necessita de o fazer uma vez. Permite-nos cruzar os dados da sua avaliação de artigos com dados demográficos. O questionário é anónimo."
                            type={'warning'}
                            showIcon
                            action={<Link href='/avaliacao/sociodem'><Button size={'middle'}>Preencher</Button></Link>}
                        />
                    </Typography.Paragraph>}
                    <Typography.Title level={2}>Avaliar o InfoRadar</Typography.Title>
                    <Typography.Paragraph>Vamos pedir que leia um artigo e a sua análise pelo InfoRadar e, de seguida responda a algumas perguntas sobre a Informação Nutricional desse artigo. Isto irá demorar no máximo 5 minutos.</Typography.Paragraph>
                    {<Link
                        href={chosenArticle ? `/avaliacao/artigo?mode=${md.MINT}&mid=${chosenArticle}` : ''}
                    >
                        <Button disabled={login.userData && !login.userData.sociodemographic} loading={login.userData && login.userData.sociodemographic && !chosenArticle} type={'primary'} size={'large'}>Avaliar artigo</Button>
                    </Link>}
                </> :
                    <Typography.Paragraph>
                        <Typography.Text type={'warning'}>Para visualizar esta página, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
                    </Typography.Paragraph>
                }
            </AntLayout.Content>
        </Layout>
    )
}


export default Avaliacao