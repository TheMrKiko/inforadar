import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import ArticleAnalysis from '../components/articleanalysis'
import Examples from '../components/examples'
import { Button, Col, Layout as AntLayout, Row, Space, Typography } from 'antd'
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
                        <div>
                            <Typography.Title level={2}>
                                Ajudamos a analisar os sites que visita
                            </Typography.Title>
                            <Typography.Paragraph mark>
                                A extensão do InfoRadar agiliza a análise de artigos durante a navegação web, providenciando um atalho para a nossa plataforma.
                            </Typography.Paragraph>
                        </div>
                        <Link href={'https://chrome.google.com/webstore/detail/inforadar/hbgghmlepngdalgcnhggaobapcgblikd'}>
                            <Button
                                shape={'round'}
                                size={'large'}
                            >
                                Obter extensão para browser
                            </Button>
                        </Link>
                    </Space>
                </HomeBlock>
                <HomeBlock span={18} className={utilStyles.width100}>
                    <Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
                        <Typography.Title level={2}>
                            Exemplos
                        </Typography.Title>
                        <Examples />
                    </Space>
                </HomeBlock>
            </AntLayout.Content>
        </Layout >
    )
}