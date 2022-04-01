import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Layout as AntLayout, Input, Space, Row, Col, Typography, Button } from 'antd'
import utilStyles from '../styles/utils.module.css'

export default function Sobre() {
    return (
        <Layout current={'sobre'}>
            <Head>
                <title>Sobre | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Sobre</Typography.Title>

                <Typography.Paragraph>A plataforma <Typography.Text strong>InfoRadar</Typography.Text>, criada no âmbito do <Typography.Link href={'https://combatefakenews.lusa.pt/o-projeto-combate-as-fake-news-contra-fake/'}>Projeto CONTRAFAKE</Typography.Link>, procura agilizar a deteção de notícias não credíveis ou falsas (<Typography.Text italic>fake news</Typography.Text>) em língua portuguesa, recorrendo a recursos e estratégias de inteligência artificial, inspirados no princípio de 'informação nutricional' dos textos.</Typography.Paragraph>

                <Typography.Title level={2}>Objetivos</Typography.Title>
                <Typography.Paragraph>O principal objetivo do InfoRadar é contribuir para o empoderamento dos leitores, fornecendo-lhes um conjunto de indicadores e métricas que lhes permitam analisar a qualidade dos conteúdos noticiosos com que são confrontados e, assim, tomar decisões conscientes e informadas no que se refere ao consumo e partilha desses conteúdos.</Typography.Paragraph>
                <Typography.Paragraph>Especificamente, a informação apresentada na plataforma deverá permitir ao utilizador analisar o <Typography.Text strong>grau de credibilidade</Typography.Text> dos conteúdos noticiosos com base:
                    <ol type={'a'}>
                        <li>Nas fontes de onde estes foram extraídos;</li>
                        <li>Num conjunto de indicadores textuais como, por exemplo, o grau de sentimento expresso na notícia, utilizando ferramentas de processamento de língua natural e computação inteligente;</li>
                        <li>Na similaridade textual e representações contextuais de palavras, que poderão ajudar a determinar a probabilidade de se tratar de uma mesma história (falsa) transposta para um novo contexto.</li>
                    </ol>
                </Typography.Paragraph>
                <Typography.Paragraph>O InfoRadar contempla ainda o desenvolvimento de um 'plugin' para incorporar num browser, de modo a caracterizar semanticamente esses conteúdos e atribuir graus de confiança a notícias e aos sites de informação que as promovem.</Typography.Paragraph>

                <Typography.Title level={2}>O Projeto CONTRAFAKE</Typography.Title>
                <Typography.Paragraph>O Projeto CONTRAFAKE é uma iniciativa da <Typography.Link href={'https://www.lusa.pt'}>Lusa</Typography.Link>, financiada pelo programa Portugal2020, com a parceria do <Typography.Link href={'https://www.inesc-id.pt'}>INESC-ID</Typography.Link>, <Typography.Link href={'https://www.cncs.gov.pt'}>CNCS – Centro Nacional de Cibersegurança</Typography.Link> e <Typography.Link href={'https://inknow.pt'}>in:know</Typography.Link>. Este projeto tem por objetivo a agregação de informação e desenvolvimento de recursos computacionais e ferramentas tecnológicas, baseadas em inteligência artificial, para proteção e apoio aos profissionais de comunicação, cidadãos e instituições contra ações de desinformação veiculadas através das redes sociais e de outras fontes de informação digital.</Typography.Paragraph>
            </AntLayout.Content>
        </Layout>
    )
}