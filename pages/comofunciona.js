import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { Layout as AntLayout, Input, Space, Row, Col, Typography, Button, Collapse } from 'antd'
import utilStyles from '../styles/utils.module.css'

export default function ComoFunciona() {
    return (
        <Layout current={'comofunciona'}>
            <Head>
                <title>Como Funciona | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Como Funciona</Typography.Title>

                <Typography.Paragraph>Em vez de tentar rotular o conteúdo noticioso como pouco credível ou enganador (ou "fake news"), o InfoRadar é um modelo explicativo, que fornece ao leitor informação sobre um conjunto de indicadores relevantes acerca do conteúdo que pretendem consumir.</Typography.Paragraph>

                <Typography.Title level={2}>Indicadores apresentados</Typography.Title>
                <Typography.Paragraph>Por analogia com os produtos alimentares, que disponibilizam um conjunto de informação nutricional, fundamental para o consumidor tomar decisões informadas quanto à aquisição, ou não, desses produtos, o InfoRadar apresenta um conjunto relevante de indicadores – caracterizadores do conteúdo noticioso – que poderão orientar o leitor no consumo e partilha de informação.</Typography.Paragraph>

                <Typography.Paragraph>Os indicadores contemplados no InfoRadar resultam de um rigoroso <Typography.Link href={'https://www.researchsquare.com/article/rs-173067/v1'}>trabalho de análise e anotação de notícias em português</Typography.Link>, organizados nas seguintes categorias:
                    <ul>
                        <li>Emoção</li>
                        <li>Subjetividade</li>
                        <li>Afetividade</li>
                        <li>Credibilidade da fonte (ERC)</li>
                        <li>Citação de fontes</li>
                        <li>Utilização de estratégias de Clickbait</li>
                    </ul>
                </Typography.Paragraph>

                <Typography.Title level={2}>Classificação dos artigos</Typography.Title>
                <Typography.Paragraph>De acordo com o InfoRadar, o artigo em análise partilha um conjunto (muito) elevado/moderado/(muito) baixo de características com artigos classificados como:

                    <Collapse ghost>
                        <Collapse.Panel header="notícia" key="noticia">
                            <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(artigo de) opinião" key="opiniao">
                            <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(artigo de) entretenimento" key="entretenimento">
                            <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="sátira" key="satira">
                            <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(teoria da) conspiração" key="conspiracao">
                            <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography.Paragraph>
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title level={2}>Valores dos indicadores</Typography.Title>
                <Typography.Paragraph>A classificação sugerida resulta da aplicação de um conjunto de cinco classificadores automáticos, treinados com base numa vasta coleção de documentos (nº?), extraídos de um vasto conjunto de fontes (nº?). Cada um dos documentos foi manualmente anotado como pertencendo a uma das categorias consideradas.</Typography.Paragraph>
            </AntLayout.Content>
        </Layout>
    )
}