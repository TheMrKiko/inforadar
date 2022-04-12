import React, { useEffect, useState } from 'react'
import { createError, errorType } from '../helpers/error'
import Histogram from '../components/histogram'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../components/layout'
import { Layout as AntLayout, Input, Space, Row, Radio, Col, Table, Typography, Button, Collapse } from 'antd'
import { Collapse as DynamicCollapse } from 'react-collapse';
import axios from 'axios'
import utilStyles from '../styles/utils.module.css'

const { API_PATH } = process.env

const ComoFunciona = ({ router }) => {
    const [categories, setCategories] = useState(null);
    const [metricsInfo, setMetricsInfo] = useState(null);
    const [metricsHistogram, setMetricsHistogram] = useState(null);
    const [appError, setError] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_PATH}/metadata`,
            headers: { 'content-type': 'application/json' }
        }).then(result => {
            setCategories(result.data)
        }).catch(error => setError(createError(errorType.GET_INFO, error)));
        axios({
            method: 'get',
            url: `${API_PATH}/metrics`,
            headers: { 'content-type': 'application/json' }
        }).then(result => {
            setMetricsInfo(result.data)
            axios({
                method: 'post',
                url: `${API_PATH}/histogram`,
                headers: { 'content-type': 'application/json' },
                data: {
                    'metrics': result.data.map(i => i.id),
                    'settings': { graphs: ['notcumulative', 'cumulative', 'count'], legend: true },
                }
            }).then(result => {
                setMetricsHistogram(result.data)
            }).catch(error => setError(createError(errorType.HISTOGRAM, error)));
        }).catch(error => setError(createError(errorType.GET_INFO, error),));
    }, []);

    const SciNotation = (n) => n < 10e-6 ? " < 10e-6" : ` = ${n}`

    const HistogramBlock = (categories, metricid, metricsHistogram) => {
        const [filter, setFilter] = useState("count")
        return <Space direction={'vertical'} className={utilStyles.width100}>
            <Space direction={'horizontal'}>
                <Typography.Text type={'secondary'}>Tipo de histograma</Typography.Text>
                <Radio.Group value={filter} onChange={(a) => setFilter(a.target.value)}>
                    <Radio.Button value="count">Contagem</Radio.Button>
                    <Radio.Button value="notcumulative">Probabilidade</Radio.Button>
                    <Radio.Button value="cumulative">Cumulativo</Radio.Button>
                </Radio.Group>
            </Space>
            <Row>
                {categories && categories.map(c => (
                    <Col xs={24} md={12} lg={8} xxl={4}>
                        <Typography.Title level={5}>Distribuição da coleção {c.display_name}</Typography.Title>
                        <Histogram histogram={metricsHistogram && metricsHistogram[metricid]} category={c.id} type={filter} />
                        <Typography.Paragraph>
                            <Typography.Text type={'secondary'}>Este histograma representa a distribuição das pontuações da métrica pela coleção de {c.display_name.toLowerCase()} relativamente às restantes.</Typography.Text>
                        </Typography.Paragraph>
                        {
                            metricsHistogram && metricsHistogram[metricid] && <DynamicCollapse isOpened={filter == "cumulative"}>
                                <Typography.Paragraph>
                                    O <Typography.Link href={'https://pt.wikipedia.org/wiki/Teste_Kolmogorov-Smirnov'}>teste de Kolmogorov-Smirnov</Typography.Link> aplicado a esta coleção face às restantes tem como resultado a estatística K-S = {Math.round(metricsHistogram[metricid].categories[c.id].ks_2samp.stat * 1000) / 1000} (<Typography.Text italic>P</Typography.Text>{SciNotation(metricsHistogram[metricid].categories[c.id].ks_2samp.p)}).
                                </Typography.Paragraph>
                            </DynamicCollapse>
                        }
                    </Col>
                ))}
            </Row>
        </Space>
    }

    const dataSource = [
        {
            key: 'factual',
            category: 'Notícia',
            articles: 6000,
            sources: 9,
        },
        {
            key: 'opinion',
            category: '(Artigo de) Opinião',
            articles: 6000,
            sources: 10,
        },
        {
            key: 'entertainment',
            category: '(Artigo de) Entretenimento',
            articles: 6000,
            sources: 6,
        },
        {
            key: 'satire',
            category: 'Sátira',
            articles: 1029,
            sources: 2,
        },
        {
            key: 'conspiracy',
            category: '(Teoria da) Conspiração',
            articles: 1249,
            sources: 6,
        },
    ];

    const columns = [
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            width: 250,
        },
        {
            title: 'Nº Artigos',
            dataIndex: 'articles',
            key: 'articles',
            width: 150,

        },
        {
            title: 'Nº Fontes',
            dataIndex: 'sources',
            key: 'sources',
            width: 150,
        },
    ];

    return (
        <Layout current={'comofunciona'}>
            <Head>
                <title>Como Funciona | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Typography.Title level={1}>Como Funciona</Typography.Title>

                <Typography.Paragraph>O <Typography.Text strong>InfoRadar</Typography.Text> fornece aos leitores um conjunto de informação importante para aferir a credibilidade do conteúdo textual que pretendem consumir e/ou partilhar.</Typography.Paragraph>

                <Typography.Paragraph>Para cada artigo apresentado, o <Typography.Text strong>InfoRadar</Typography.Text> estima o grau de probabilidade de o mesmo pertencer a cada uma das <Typography.Text italic><Typography.Link href={'#categorias'}>categorias de (des)informação</Typography.Link></Typography.Text> consideradas neste projeto, sendo o resultado da aplicação de um classificador automático baseado em <Typography.Link href={'#artigo8'}>modelos de "contextual embeddings"</Typography.Link>, treinados com base num <Typography.Link href={'#mint'}>corpus</Typography.Link> criado para o efeito.</Typography.Paragraph>

                <Typography.Paragraph>Além disso, o <Typography.Text strong>InfoRadar</Typography.Text> apresenta um conjunto de <Typography.Text italic><Typography.Link href={'#metricas'}>métricas explicativas</Typography.Link></Typography.Text> (ou indicadores) que poderão auxiliar o leitor a aferir a credibilidade do artigo em análise. Os valores de cada uma destas <Typography.Text italic>métricas explicativas</Typography.Text> correspondem aos percentis obtidos para cada artigo face aos valores apresentados para os 5 subconjuntos que representam as diferentes <Typography.Text italic>categorias de (des)informação</Typography.Text> incluídas na nossa <Typography.Link href={'#mint'}>coleção de referência</Typography.Link>. Esses valores devem ser interpretados em função da categoria envolvida.
                </Typography.Paragraph>

                <Typography.Title level={2}>Submissão do artigo para análise</Typography.Title>
                <Typography.Paragraph>O leitor poderá submeter diretamente o artigo para avaliação, colando o URL do artigo ou, alternativamente, o texto que pretende analisar na janela à esquerda do <Typography.Text strong>InfoRadar</Typography.Text>.</Typography.Paragraph>
                <Typography.Paragraph><Typography.Text italic>[inserir imagem]</Typography.Text></Typography.Paragraph>

                <Typography.Paragraph>O <Typography.Text strong>InfoRadar</Typography.Text> produz uma ficha com <Typography.Text strong>Informação Nutricional</Typography.Text>, analisando o artigo em duas dimensões distintas, mas complementares: classificação do artigo quanto à sua <Typography.Text italic><Typography.Link href={'#categorias'}>categoria de (des)informação</Typography.Link></Typography.Text> e apresentação de um conjunto de <Typography.Text italic><Typography.Link href={'#metricas'}>métricas explicativas</Typography.Link></Typography.Text> que procuram auxiliar o leitor a avaliar o seu conteúdo.</Typography.Paragraph>
                <Typography.Paragraph><Typography.Text italic>[inserir imagem]</Typography.Text></Typography.Paragraph>

                <Typography.Title id="categorias" level={2}>Categorias de (des)informação</Typography.Title>

                <Typography.Paragraph>
                    O artigo em análise é automaticamente classificado pelo <Typography.Text strong>InfoRadar</Typography.Text> em 4 níveis:
                    <ol>
                        <li>baixo</li>
                        <li>médio-baixo</li>
                        <li>médio-alto</li>
                        <li>alto</li>
                    </ol>

                    que representam uma classe de probabilidade de este corresponder a uma das seguintes <Typography.Text italic>categorias de (des)informação</Typography.Text>:
                    <Collapse ghost defaultActiveKey={router.asPath.split('#')[1] ?? undefined}>
                        <Collapse.Panel header={<Typography.Text strong>Notícia</Typography.Text>} key="noticia">
                            <Typography.Paragraph>
                                Texto marcadamente informativo, por norma, claro, conciso, direto, objetivo e elaborado segundo regras jornalísticas bem definidas. Tem título, em geral, direto e informativo, que resulta do 'lead'. Este corresponde ao primeiro parágrafo da notícia, em que o leitor deverá encontrar resposta para seis questões fundamentais: <Typography.Text italic>O quê? Quem? Quando? Onde? Porquê? Como?</Typography.Text> As respostas às duas últimas questões poderão ser exploradas nos parágrafos mais abaixo. A notícia deve mencionar as fontes utilizadas, que conferem credibilidade à mesma, e é construída em forma de pirâmide invertida. Se precisarmos de fazer uma seleção ou um corte do texto, a informação mais relevante deverá estar nos parágrafos iniciais.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A coleção de referência, utilizada neste estudo para efeitos de classificação automática e cálculo dos percentis dos indicadores, é constituída por 6000 artigos noticiosos publicados por nove fontes jornalísticas portuguesas registadas na ERC. Esses artigos abordam temas de âmbito nacional e internacional, tendo sido extraídos das versões online dos jornais selecionados, em particular, das secções classificadas como <Typography.Text italic>política</Typography.Text>, <Typography.Text italic>sociedade</Typography.Text>, <Typography.Text italic>economia</Typography.Text>, <Typography.Text italic>tecnologia</Typography.Text>, <Typography.Text italic>cultura</Typography.Text> e <Typography.Text italic>desporto</Typography.Text>.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Artigo de) Opinião</Typography.Text>} key="opiniao">
                            <Typography.Paragraph>
                                Texto em que o autor, devidamente identificado, exprime opiniões e pontos de vista subjetivos relativamente a temas que, por norma, abordam a atualidade, procurando marcar uma posição e gerar algum tipo de reação por parte dos leitores. O estilo pode variar muito de autor para autor. Alguns optam por apresentar factos e fontes credíveis, de modo a suportar os argumentos apresentados e a sustentar as suas conclusões. Outros optam por criar textos leves e, frequentemente, bem-humorados, abordando opiniões pessoais sobre temas de costumes ou do quotidiano.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A coleção  de referência, utilizada neste estudo para efeitos de classificação automática e cálculo dos percentis dos indicadores, é constituída por 6000 artigos de opinião, coligidos a partir da secção de <Typography.Text italic>opinião</Typography.Text> de dez jornais e revistas portuguesas registadas na ERC. O processo de seleção procurou garantir a diversidade de autores, quer de fontes diferentes quer dentro da mesma fonte.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Artigo de) Entretenimento</Typography.Text>} key="entretenimento">
                            <Typography.Paragraph>
                                Textos quase sempre baseados no princípio de querer 'agarrar' o leitor. Os temas abordados neste tipo de artigos são variadíssimos, mas apelam frequentemente a um ambicionado estilo de vida glamoroso, abordando áreas variadas, incluindo gastronomia, férias, cultura, tendências, moda, festas, beleza, alimentação, dietas, 'hobbies', desportos, luxo, aventura, entre muitas outras. São textos leves, de escrita apelativa, que suscitam a atenção, embora muitas vezes sejam apenas um repositório de informação já amplamente conhecida, sem novidade ou caráter noticioso.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A coleção de referência, utilizada neste estudo para efeitos de classificação automática e cálculo dos percentis dos indicadores, é constituída por 6000 artigos de entretenimento, extraídos das secções de <Typography.Text italic>celebridades</Typography.Text>, <Typography.Text italic>moda</Typography.Text>, <Typography.Text italic>beleza</Typography.Text>, <Typography.Text italic>família</Typography.Text>, <Typography.Text italic>lifestyle</Typography.Text> e <Typography.Text italic>cultura</Typography.Text> de seis revistas e suplementos de jornais portugueses.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Sátira</Typography.Text>} key="satira">
                            <Typography.Paragraph>
                                Texto que recorre a um conjunto de estratégias retóricas (em particular, a sátira, a ironia e o humor) que visam ridicularizar um determinado assunto, indivíduo ou organização e/ou gerar um efeito cómico. A correta interpretação desta mensagem requer que o leitor esteja em perfeita sintonia com o autor, de modo a perceber a ironia do texto. Neste tipo de texto, o autor inventa ou recria frequentemente factos, acontecimentos e personagens, apresentando-os de forma verossímil, mas nem sempre plausível.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A coleção de referência, utilizada neste estudo para efeitos de classificação automática e cálculo dos percentis dos indicadores, é constituída por 1029 artigos, extraídos de dois conhecidos sites portugueses, autodeclarados fictícios, humorísticos e/ou satíricos nos seus estatutos editoriais.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Teoria da) Conspiração</Typography.Text>} key="conspiracao">
                            <Typography.Paragraph>
                                É uma hipótese explicativa ou especulativa sobre determinado tema, em que supostamente um indivíduo ou organização nos tentou enganar, inventando algo ou escondendo a realidade, de forma secreta. Tipicamente esse acontecimento é considerado ilegal, colocando em causa o debate livre e informativo e, consequentemente, a fragilização das sociedades democráticas. Por norma, as teorias da conspiração envolvem sociedades secretas que controlam ou tentam controlar a humanidade; o controlo pode ainda ser exercido por extraterrestres ou por humanos com poderes paranormais.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A coleção de referência, utilizada neste estudo para efeitos de classificação automática e cálculo dos percentis dos indicadores, é constituída por 1249 artigos semiautomaticamente classificados como conspiração. Os tópicos cobertos nesta coleção são de natureza bastante diversificada, abrangendo, entre outras, questões políticas e económicas, de saúde e tecnologia.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A seleção e classificação deste tipo de conteúdos assenta numa abordagem semiautomática. Em concreto, compilamos uma lista de tópicos a partir de uma seleção de <Typography.Link href={'https://en.wikipedia.org/wiki/COVID-19_misinformation'}>histórias de conspiração disponíveis na Wikipédia</Typography.Link> e inspecionamos manualmente um conjunto de sites candidatos. A lista final inclui seis websites que haviam publicado anteriormente, pelo menos, cinco artigos suportando teorias da conspiração. Os artigos selecionados cobrem narrativas como, por exemplo, o uso do novo coronavírus como arma biológica, a ligação entre a tecnologia 5G e COVID-19 e vacinas baseadas em RNA que alterariam o ADN humano.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                O tema COVID-19 predomina nesta coleção, uma vez que este acontecimento impulsionou a proliferação deste tipo de conteúdos tanto nos canais de informação tradicionais como nas redes sociais a níveis sem precedentes. De acordo com estudos recentes, a negação, ou seja, a predisposição psicológica para rejeitar informação especializada e autorizada, o pensamento conspirativo, ou seja, a tendência para encarar eventos sociais desafiantes como o produto de conspirações, e o partidarismo são os ingredientes-chave que sustentam, por exemplo, as inúmeras teorias da conspiração relacionadas com a COVID-19.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title id="metricas" level={2}>Métricas Explicativas</Typography.Title>
                <Typography.Paragraph>As métricas explicativas contempladas no <Typography.Text strong>InfoRadar</Typography.Text> resultam de um trabalho de investigação que envolveu a análise e anotação de conteúdos noticiosos por parte de profissionais da comunicação e leitores comuns (ver artigos científicos <Typography.Link href={'#artigo1'}>1</Typography.Link>, <Typography.Link href={'#artigo2'}>2</Typography.Link> e <Typography.Link href={'#artigo3'}>3</Typography.Link>). Em concreto, os resultados apresentados deverão ajudar o leitor a refletir sobre a credibilidade do conteúdo do artigo que estão a analisar, tendo em consideração os aspetos computados em cada métrica:

                    <Collapse ghost defaultActiveKey={router.asPath.split('#')[1] ?? undefined}>
                        <Collapse.Panel header={<Typography.Text strong>Sentimento</Typography.Text>} key="sentiment" id="sentiment">
                            <Typography.Paragraph>
                                Contrariamente às notícias convencionais, onde é requerida a utilização de um tom neutro e objetivo, em artigos de outra natureza (por exemplo, em artigos de opinião), é comum o emprego de palavras e expressões com carga emocional (ou sentimento), procurando provocar uma reação junto dos leitores.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                O sentimento é avaliado com base em contagem de ocorrências lexicais que têm associada informação acerca da polaridade ou intensidade do sentimento. Para tal, foram utilizados como referência o <Typography.Link href={'#artigo4'}>SentiLex</Typography.Link>, um léxico de palavras de sentimento desenvolvidos para o português.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 1, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Subjetividade</Typography.Text>} key="subjectivity" id="subjectivity">
                            <Typography.Paragraph>
                                Contrariamente às notícias convencionais, onde é requerida a utilização de um tom neutro e objetivo, em artigos de outra natureza (por exemplo, em artigos de opinião), é comum o emprego de uma maior subjetividade, no sentido em que o autor procura exprimir as suas próprias opiniões e pontos de vista, procurando provocar uma reação junto dos leitores.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A subjetividade é avaliada também a partir de contagem lexical, considerando termos presentes no <Typography.Link href={'#artigo5'}>Subjectivity Lexicon</Typography.Link>. Como este léxico foi desenvolvido para a língua inglesa, geramos uma tradução do mesmo para o português por aplicação de algoritmos/métodos de tradução automática.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 2, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Representatividade do Título</Typography.Text>} key="headline_accuracy" id="headline_accuracy">
                            <Typography.Paragraph>
                                O principal objetivo do título é captar a atenção do leitor para a história que este apresenta. No entanto, alguns títulos podem ser enganosos e/ou não representar, com clareza e precisão, o conteúdo do artigo, o que poderá apontar para a falta de credibilidade de alguns tipos de conteúdos, em particular, os noticiosos.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A representatividade do título é avaliada por meio da similaridade do cosseno calculada entre as representações vetoriais do título e do corpo do texto do artigo em questão. Para gerar representações vetoriais, recorremos à técnica de <Typography.Text italic>word embeddings</Typography.Text> estáticos, <Typography.Link href={'#artigo6'}>disponíveis em português</Typography.Link>, gerados a partir de <Typography.Link href={'#artigo7'}>Word2vec</Typography.Link>.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 5, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Sensacionalismo do Título</Typography.Text>} key="clickbait" id="clickbait">
                            <Typography.Paragraph>
                                O jornalismo de natureza sensacionalista ou viral recorre frequentemente a táticas ou estratégias de clickbait (ou caça ao clique) para levar o leitor a clicar num determinado tipo de conteúdo, geralmente não credível.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Estas estratégias são genericamente englobadas na categoria sensacionalismo, que é avaliada com base em um algoritmo de Regressão Logística, treinado num <Typography.Link href={'#clickdataset'}>corpus</Typography.Link> original em inglês, que foi traduzido para o português e atualizado com notícias extraídas do corpus MINT.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 4, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Palavras Não Reconhecidas</Typography.Text>} key="spell_checking" id="spell_checking">
                            <Typography.Paragraph>
                                A correção linguística é um aspeto fundamental a ter em consideração na redação de qualquer tipo de conteúdo, que se pretende rigoroso, claro, coeso e isento de qualquer tipo de erro (lexical, sintático, semântico, discursivo ou estrutural).
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Embora seja nosso objetivo avaliar todas estas dimensões, na versão atual do <Typography.Text strong>InfoRadar</Typography.Text>, apenas se avalia a cobertura lexical do texto, isto é, a possibilidade de o artigo apresentar palavras ou expressões não dicionarizadas ou desconhecidas. Tais palavras ou expressões poderão corresponder a nomes próprios, siglas ou acrónimos, neologismos ou erros ortográficos. Em particular, a existência de erros ortográficos no texto é uma forte evidência de que o mesmo poderá corresponder a um conteúdo não credível.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 3, metricsHistogram)}
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title level={2}>Material de referência</Typography.Title>
                <Typography.Title level={3}>Coleções</Typography.Title>
                <Typography.Title level={4} id="mint">MINT Corpus</Typography.Title>
                <Typography.Paragraph>O Corpus <Typography.Link href={'#artigo3'}>MINT (Mainstream and Independent News Text)</Typography.Link> é constituído por mais de 20.000 artigos, publicados entre 1 de junho de 2020 e 31 de maio de 2021, em 33 plataformas de media convencionais e blogues. Cada um dos documentos que compõem o corpus foi classificado como pertencendo a uma das cinco <Typography.Text italic>categorias de (des)informação</Typography.Text> consideradas. Disponível no <Typography.Link href={'https://github.com/dcaled/mint'}>GitHub</Typography.Link>.</Typography.Paragraph>

                <Typography.Paragraph>
                    <Space>
                        <Table
                            pagination={false}
                            size={'medium'}
                            dataSource={dataSource}
                            columns={columns}
                            bordered
                            summary={pageData => {
                                const [tarticles, tsources] = pageData.reduce((sum, curr) => [sum[0] + curr.articles, sum[1] + curr.sources], [0, 0]);

                                return (
                                    <Table.Summary>
                                        <Table.Summary.Row style={{ background: '#fafafa' }}>
                                            <Table.Summary.Cell>Total</Table.Summary.Cell>
                                            <Table.Summary.Cell>{tarticles}</Table.Summary.Cell>
                                            <Table.Summary.Cell>{tsources}</Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                )
                            }}
                        />
                    </Space>
                </Typography.Paragraph>

                <Typography.Title level={4} id="clickdataset">Clickbait Dataset</Typography.Title>
                <Typography.Paragraph>Dataset of news articles for classification into clickbait and non-clickbait. Disponível <Typography.Link href={'https://www.kaggle.com/amananandrai/clickbait-dataset'}>aqui</Typography.Link>.</Typography.Paragraph>

                <Typography.Title level={3}>Publicações</Typography.Title>
                <ul>
                    <li id="artigo1">Carvalho, P., Caled, D., Silva, M.J., Martins, B., Carvalho, J.P., Carreira, J., Fonseca, J.P., Gomes, T., Camacho, P.: <Typography.Link href={'https://combatefakenews.lusa.pt/wp-content/uploads/2021/07/Carvalho_submission.pdf'}>Assessing news credibility: Misinformation content indicators (2021)</Typography.Link></li>

                    <li id="artigo2">Carvalho, P., Caled, D., Silva, M.J., Martins, B., Carvalho.: Annotation and Assessment of News Credibility (2021)</li>

                    <li id="artigo3">Caled, D., Carvalho, P., Silva, M.J.: <Typography.Link href={'https://arxiv.org/abs/2108.06249'}>MINT - Mainstream and Independent News Text Corpus</Typography.Link>. In: Proceedings of the International Conference on Computational Processing of Portuguese (2022)</li>

                    <li id="artigo4">Silva, M.J., Carvalho, P., Sarmento, L.: <Typography.Link href={'https://link.springer.com/chapter/10.1007/978-3-642-28885-2_25'}>Building a sentiment lexicon for social judgement mining</Typography.Link>. In: International Conference on Computational Processing of the Portuguese Language. Springer. (2012)</li>

                    <li id="artigo5">Wilson, T., Wiebe, J., Hoffmann, P.: <Typography.Link href={'https://dl.acm.org/doi/10.3115/1220575.1220619'}>Recognizing Contextual Polarity in Phrase-Level Sentiment Analysis</Typography.Link>. In: Proceedings of HLT-EMNLP-2005. (2005)</li>

                    <li id="artigo6">Hartmann, N.S., Fonseca, E.R., Shulby, C.D., Treviso, M.V., Silva J.R., Aluísio, S.M.: <Typography.Link href={'http://143.107.183.175:22980/Proceedings%20STIL%202017.pdf'}>Portuguese Word Embeddings: Evaluating on Word Analogies and Natural Language Tasks</Typography.Link>. In: Anais do XI Simpósio Brasileiro de Tecnologia da Informação e da Linguagem Humana. SBC. (2017)</li>

                    <li id="artigo7">Mikolov, T., Chen, K., Corrado, G., and Dean, J.: <Typography.Link href={'https://arxiv.org/pdf/1301.3781.pdf'}>Efficient estimation of word representations in vector space</Typography.Link>. In: Proceedings of International Conference on Learning Representations Workshop. (2013)</li>

                    <li id="artigo8">Devlin, J., Chang, M. W., Lee, K., Toutanova, K.: <Typography.Link href={'https://aclanthology.org/N19-1423.pdf'}>BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</Typography.Link>. In: Proceedings of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (2019)</li>
                </ul>

            </AntLayout.Content>
        </Layout>
    )
}

export default withRouter(ComoFunciona)