import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Layout from '../../components/layout'
import LoginOptions from '../../components/login'
import { md } from '../../helpers/query'
import { Alert, Layout as AntLayout, Input, Space, Row, Col, Typography, Button, Progress } from 'antd'

import utilStyles from '../../styles/utils.module.css'

const { API_PATH } = process.env

const Avaliacao = ({ login }) => {
    const [chosenArticle, setChosenArticle] = useState(null);

    useEffect(() => {
        if (login.authenticated)
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
                <Typography.Paragraph>De forma a melhorarmos o InfoRadar, pedimos a sua opinião sobre os resultados da classificação automaticamente gerados para um dos artigos aleatoriamente selecionados.</Typography.Paragraph>
                <Typography.Paragraph>Para o efeito, deverá registar-se na nossa plataforma e preencher um breve questionário sociodemográfico.</Typography.Paragraph>
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
                    <Typography.Paragraph>Pedimos que leia um artigo e tenha em consideração a análise fornecida pelo InfoRadar, respondendo a algumas perguntas sobre o artigo e a sua Informação Nutricional. Este processo irá demorar, no máximo, 5 minutos.</Typography.Paragraph>
                    <Row justify={'center'} align={'middle'} gutter={25} className={utilStyles.width100}>
                        <Col><Link
                            href={chosenArticle ? `/avaliacao/artigo?mode=${md.MINT}&mid=${chosenArticle}` : ''}
                        >
                            <Button disabled={login.userData && !login.userData.sociodemographic} loading={login.userData && login.userData.sociodemographic && !chosenArticle} type={'primary'} size={'large'}>Avaliar artigo</Button>
                        </Link></Col>
                        <Col flex={'auto'}>{login.userData.total_to_annotate &&
                            <Progress percent={Math.round(login.userData.annotated * 1000 / login.userData.total_to_annotate) / 10} />
                        }</Col>
                    </Row>
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