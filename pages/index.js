import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import ArticleAnalysis from '../components/articleanalysis'
import { Button, Card, Col, Layout as AntLayout, Row, Space, Typography } from 'antd'
import cn from 'classnames'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

function HomeBlock({ children, className, span }) {
    return (
        <div className={cn(styles.block, className)}>
            <Row>
                <Col offset={3} span={span}>
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default function Home() {
    return (
        <Layout current={'index'}>
            <Head>
                <title>InfoRadar</title>
            </Head>
            <AntLayout.Content>
                <ArticleAnalysis />
                <HomeBlock className={styles.comofuncblock} span={12}>
                    <Space direction={'vertical'} size={'large'}>
                        <div>
                            <Typography.Title level={2}>
                                Explorar a credibilidade do conteúdo noticioso
                            </Typography.Title>
                            <Typography.Paragraph mark>
                                O InfoRadar tem por objetivo empoderar o leitor, auxiliando-o na análise, avaliação crítica e partilha ética de conteúdos noticiosos. Em termos gerais, o InfoRadar foi concebido de modo a promover a literacia mediática e o combate à desinformação, em particular no contexto português.
                            </Typography.Paragraph>
                        </div>
                        <Link href={'/comofunciona'}>
                            <Button
                                ghost
                                shape={'round'}
                                size={'large'}
                            >
                                Descobrir como funciona
                            </Button>
                        </Link>
                    </Space>
                </HomeBlock>
                <HomeBlock className={styles.browserblock} span={12}>
                    <Space direction={'vertical'} size={'large'}>
                        <Typography.Title level={2}>
                            Ajudamos a analisar os sites que visita
                        </Typography.Title>
                        <Button
                            shape={'round'}
                            size={'large'}
                        >
                            Obter extensão para browser
                        </Button>
                    </Space>
                </HomeBlock>
                <HomeBlock span={18}>
                    <Space direction={'vertical'} size={'large'}>
                        <Typography.Title level={2}>
                            Exemplos
                        </Typography.Title>
                        <Row justify={"space-between"} gutter={[0, 20]}>
                            <Col md={7} sm={11} span={24}>
                                <Link
                                    href={{
                                        query: { 'url': 'https://www.publico.pt/2021/06/25/sociedade/noticia/psp-controla-sai-entra-regiao-lisboa-comboio-autocarro-aviao-1967991' }
                                    }}
                                >
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={"https://imagens.publico.pt/imagens.aspx/1598362?tp=UH&db=IMAGENS&type=JPG&share=1"} />}
                                    >
                                        <Card.Meta
                                            title={<Typography.Text className={utilStyles.whiteSpaceNormal}>{
                                                "PSP controla quem sai ou entra na região de Lisboa de comboio, autocarro ou avião"
                                            }</Typography.Text>}
                                            description="publico.pt"
                                        />
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={7} sm={11} span={24}>
                                <Link
                                    href={{
                                        query: { 'url': 'https://www.publico.pt/2021/06/25/mundo/noticia/portugal-vai-assinar-declaracao-repudio-lei-direitos-lgbti-hungria-1967963' }
                                    }}
                                >
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={"https://imagens.publico.pt/imagens.aspx/1598279?tp=UH&db=IMAGENS&type=JPG&share=1"} />}
                                    >
                                        <Card.Meta
                                            title={<Typography.Text className={utilStyles.whiteSpaceNormal}>{
                                                "Portugal vai assinar declaração de repúdio à lei contra os direitos LGBTI na Hungria"
                                            }</Typography.Text>}
                                            description="publico.pt"
                                        />
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={7} sm={11} span={24}>
                                <Link
                                    href={{
                                        query: { 'url': 'https://www.publico.pt/2021/06/25/local/noticia/associacao-portuguesa-ambiente-aprova-central-fotovoltaica-herdade-torre-bela-1967894' }
                                    }}
                                >
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={"https://imagens.publico.pt/imagens.aspx/1598059?tp=UH&db=IMAGENS&type=JPG&share=1"} />}
                                    >
                                        <Card.Meta
                                            title={<Typography.Text className={utilStyles.whiteSpaceNormal}>{
                                                "Ambiente dá parecer favorável condicionado às centrais fotovoltaicas da Torre Bela"
                                            }</Typography.Text>}
                                            description="publico.pt"
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </Space>
                </HomeBlock>
            </AntLayout.Content>
        </Layout >
    )
}