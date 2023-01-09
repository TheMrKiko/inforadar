import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Layout from '../../components/layout'
import LoginOptions from '../../components/login'
import { collectionsToMode } from '../../helpers/api'
import { md } from '../../helpers/query'
import { createError, errorType } from '../../helpers/error'
import { Alert, Layout as AntLayout, Input, Result, Modal, Space, Row, Col, Typography, Button, Progress } from 'antd'
import { DatabaseOutlined } from '@ant-design/icons'

import utilStyles from '../../styles/utils.module.css'

const API_PATH = process.env.API_PATH

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
                    login.loginError(createError(errorType.RELOGIN, error));
                else
                    login.loginError(createError(errorType.AUTHORIZE, error), false);
            });
    }, [login.authenticated]);

    useEffect(() => {
        if (chosenArticle === 0)
            Modal.success({
                content: <Result
                    status={'success'}
                    title="Parabéns, tudo anotado! 🎉"
                    subTitle={<>
                        <Typography.Paragraph type={'secondary'}>Anotou com sucesso todos os artigos disponíveis. Agradecemos imenso a sua participação neste estudo. Para questões sobre como estes dados vão ser usados, entre em contacto connosco.</Typography.Paragraph>
                        <Typography.Paragraph type={'secondary'}>As restantes páginas do InfoRadar continuam ao dispor do público para analisar textos e equipar os leitores com ferramentas para combater a desinformação.</Typography.Paragraph>
                    </>}
                />,
                icon: null,
                width: 450,
            });
    }, [chosenArticle]);

    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Avaliação | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Avaliação</Typography.Title>
                <Typography.Paragraph>De forma a melhorarmos o InfoRadar, pedimos a sua participação num <Typography.Text strong>estudo de avaliação</Typography.Text> dos resultados da classificação automaticamente gerada pela plataforma, para um dos artigos usados para treinar o algoritmo aleatoriamente selecionados.</Typography.Paragraph>
                <Typography.Paragraph>O processo requer que tenha sessão iniciada no InfoRadar e que preencha um breve questionário sociodemográfico, antes de avaliar artigos.</Typography.Paragraph>
                {login.authenticated ? <>
                    {login.userData.collection !== 'default' && <Typography.Paragraph type={'secondary'}>
                        Estudo da coleção {login.userData.collection.toUpperCase()}. Questões sobre este estudo ou as suas perguntas? Envie um email para <Typography.Link href='mailto:mint-annotation@googlegroups.com'>mint-annotation@googlegroups.com</Typography.Link>.
                    </Typography.Paragraph>}
                    {login.userData && !login.userData.sociodemographic && <Typography.Paragraph>
                        <Alert
                            message="Questionário Incompleto"
                            description="Ainda não preencheu o questionário sociodemográfico. Só necessita de o fazer uma vez. Permite-nos cruzar os dados da sua avaliação de artigos com dados demográficos. O questionário é anónimo."
                            type={'warning'}
                            showIcon
                            action={<Link href='/avaliacao/sociodem' legacyBehavior><Button size={'middle'}>Preencher</Button></Link>}
                        />
                    </Typography.Paragraph>}

                    <Typography.Title level={2}>
                        <Space direction={'horizontal'} align={'end'} wrap>
                            Avaliar o InfoRadar
                            {login.authenticated && login.userData.admin &&
                                <Link href={'/avaliacao/respostas'} legacyBehavior>
                                    <Button icon={<DatabaseOutlined />} shape={'round'}>Consultar respostas</Button>
                                </Link>}
                        </Space>
                    </Typography.Title>
                    <Typography.Paragraph>Pedimos que leia um artigo e tenha em consideração a análise fornecida pelo InfoRadar, respondendo a algumas perguntas sobre o artigo e a sua Informação Nutricional. Este processo irá demorar, em média, 5 minutos.</Typography.Paragraph>
                    <Row justify={'center'} align={'middle'} gutter={25} className={utilStyles.width100}>
                        <Col><Link
                            href={chosenArticle ? `/avaliacao/artigo?mode=${collectionsToMode[login.userData.collection]}&mid=${chosenArticle}` : ''}
                            legacyBehavior>
                            <Button disabled={login.userData && (!login.userData.sociodemographic || chosenArticle === 0)} loading={login.userData && login.userData.sociodemographic && chosenArticle === null} type={'primary'} size={'large'}>Avaliar artigo</Button>
                        </Link></Col>
                        <Col flex={'auto'}>{login.userData.total_to_annotate &&
                            <Progress percent={Math.round(login.userData.annotated * 1000 / login.userData.total_to_annotate) / 10} />
                        }</Col>
                    </Row>
                </> :
                    <Typography.Paragraph>
                        <Typography.Text type={'warning'}>Para continuar, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
                    </Typography.Paragraph>
                }
            </AntLayout.Content>
        </Layout>
    )
}


export default Avaliacao