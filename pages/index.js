import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import withArticle from '../components/articleanalysis';
import Examples from '../components/examples';
import ArticleCard from '../components/articlecard';
import ERCLabel from '../components/erclabel';
import NutritionalInfo from '../components/nutrinfo';
import SearchBar from '../components/searchbar';
import { md } from '../helpers/query';
import { transitionOpacity, transitionSpanLeft, transitionSpanRight } from '../helpers/transition';
import { LeftCircleOutlined } from '@ant-design/icons';
import { Button, Col, Layout as AntLayout, Row, Space, Typography } from 'antd';
import { CSSTransition, SwitchTransition, Transition } from 'react-transition-group';
import cn from 'classnames';

import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

const AnalysisBlock = (props) => (
    <Transition in={props.opened()} timeout={500}>
        {tstate => (
            <Row>
                <Col className={cn(styles.sidebar, utilStyles.transitionAll)} {...transitionSpanLeft[tstate]}>
                    <Row>
                        <Col offset={3} span={18}>
                            <Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
                                {!props.opened() ? (
                                    <Typography.Title
                                        style={transitionOpacity[tstate]}
                                        level={1}
                                    >Que artigo quer analisar?</Typography.Title>
                                ) : (
                                    <Typography.Title level={3}>
                                        <Space size={"middle"}>
                                            <LeftCircleOutlined onClick={props.onCancelSearching} />
                                            <Typography.Text>Voltar</Typography.Text>
                                        </Space>
                                    </Typography.Title>
                                )}
                                <SearchBar
                                    onChangeMode={props.onChangeMode}
                                    onSearching={props.onSearching}
                                    onChangeUrl={props.onChangeUrl}
                                    onChangeTitle={props.onChangeTitle}
                                    onChangeBody={props.onChangeBody}
                                    {...props.article}
                                />
                                <Space direction={'vertical'} size={'small'} className={utilStyles.width100}>
                                    {props.opened() &&
                                        <ArticleCard
                                            article={props.article.article}
                                            url={props.article.url}
                                        />
                                    }
                                    {props.opened() && props.article.article && props.article.mode == md.URL && props.article.sourceData &&
                                        <ERCLabel
                                            sourceInfo={props.article.sourceInfo}
                                            sourceData={props.article.sourceData}
                                        />
                                    }
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col {...transitionSpanRight[tstate]}>
                    <SwitchTransition>
                        <CSSTransition
                            key={props.opened() ? 'open' : 'close'}
                            timeout={500}
                            classNames={{
                                enter: styles.fadeenter,
                                enterActive: styles.fadeactiveenter,
                                exit: styles.fadeexit,
                                exitActive: styles.fadeactiveexit,
                            }}
                        >
                            {!props.opened() ? (
                                <div className={styles.bgimage}>
                                    <Image
                                        priority
                                        src={`${process.env.BASE_PATH}/roman-kraft.jpg`}
                                        layout={'fill'}
                                        objectFit={'cover'} />
                                </div>
                            ) : (
                                <div className={utilStyles.justifyContentCenter}>
                                    <Space direction={'vertical'} size={'large'} className={styles.reportcontainer}>
                                        <Typography.Title>Informação Nutricional</Typography.Title>
                                        <NutritionalInfo
                                            categories={props.article.categories}
                                            article={props.article.article}
                                            matrixRules={props.article.matrixRules}
                                            indicatorsData={props.article.indicatorsData}
                                            indicatorsInfo={props.article.indicatorsInfo}
                                            metricsInfo={props.article.metricsInfo}
                                            metricsData={props.article.metricsData}
                                            metricsHistogram={props.article.metricsHistogram}
                                        />
                                    </Space>
                                </div>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </Col>
            </Row>
        )}
    </Transition>
)

const ArticleAnalysis = withArticle(AnalysisBlock)

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

export default function Home({ login }) {
    return (
        <Layout current={'index'} login={login}>
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
                {false && <HomeBlock span={18} className={utilStyles.width100}>
                    <Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
                        <Typography.Title level={2}>
                            Exemplos
                        </Typography.Title>
                        <Examples />
                    </Space>
                </HomeBlock>}
            </AntLayout.Content>
        </Layout >
    )
}