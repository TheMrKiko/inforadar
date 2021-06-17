import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Layout as AntLayout, Input, Space, Row, Col, Typography, Button } from 'antd'
import styles from '../styles/ComoFunciona.module.css'

export default function ComoFunciona() {
    return (
        <Layout current={'comofunciona'}>
            <Head>
                <title>Como Funciona | InfoRadar</title>
            </Head>
            <AntLayout.Content className={styles.container}>
                <Typography.Title level={1}>Como Funciona</Typography.Title>
                <Typography.Paragraph>The mission of FactMe is to help news consumers to better undestand the content and empower to judge the news articles by providing information quality indicators. To use FactMe you can provide an URL of the article or the article text.</Typography.Paragraph>

                <Typography.Paragraph>FactMe will provide a disinformation score which will predict the credibility of the article and also the indicators of disinformation that were used to compute the disinformations score.</Typography.Paragraph>

                <Typography.Title level={2}>Classification of the article</Typography.Title>

                <Typography.Paragraph>We use Artificial Inteligence to classify the content. Our Natural Language Processing has a big database of news articles which help us to learn how false content look like and detect by presenting a credibility score.</Typography.Paragraph>

                <Typography.Paragraph>FactMe will help detecting the credibility by presenting indicators of disinformation and a disinformation score
                    <ul>
                        <li>
                            Indicators of disinformation- The indicators of disinformations can be content-based which are reflected in the article text and context-based which are reflected surronding the news content. We have computed in total of 7 indicators using machine learning algorithms and present them in a color-form to help you analyze and evaluate the news article.
                        </li>
                        <li>
                            Disinformation score- We have also associated a score to the article using the indicators.
                    </li>
                    </ul>
                </Typography.Paragraph>
            </AntLayout.Content>
        </Layout>
    )
}