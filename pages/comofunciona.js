import React, { useEffect, useState } from 'react'
import { createError, errorType } from '../helpers/error'
import Histogram from '../components/histogram'
import SearchBar from '../components/searchbar';
import NutritionalInfo from '../components/nutrinfo';
import withArticle from '../components/articleanalysis';
import { transitionSpanLeft } from '../helpers/transition';
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../components/layout'
import { Card, Layout as AntLayout, Input, Space, Row, Radio, Col, Table, Typography, Button, Collapse } from 'antd'
import { Collapse as DynamicCollapse } from 'react-collapse';
import axios from 'axios'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/ComoFunciona.module.css';

const { API_PATH } = process.env

const AnalysisBlock = (props) => (
    <Typography.Paragraph className={styles.nutrinfoblock}>
        <Card>
            <NutritionalInfo
                categories={props.article.categories}
                article={props.article.article}
                matrixRules={props.article.matrixRules}
                indicatorsData={props.article.indicatorsData}
                indicatorsInfo={props.article.indicatorsInfo}
                metricsInfo={props.article.metricsInfo}
                metricsData={props.article.metricsData}
                metricsHistogram={props.article.metricsHistogram}
                inner
            />
        </Card>
    </Typography.Paragraph>
)

const ArticleAnalysis = withArticle(AnalysisBlock);

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
                        <Typography.Title level={5}>Distribui????o da cole????o {c.display_name}</Typography.Title>
                        <Histogram histogram={metricsHistogram && metricsHistogram[metricid]} category={c.id} type={filter} />
                        <Typography.Paragraph>
                            <Typography.Text type={'secondary'}>Este histograma representa a distribui????o das pontua????es da m??trica pela cole????o de {c.display_name.toLowerCase()} relativamente ??s restantes.</Typography.Text>
                        </Typography.Paragraph>
                        {
                            metricsHistogram && metricsHistogram[metricid] && <DynamicCollapse isOpened={filter == "cumulative"}>
                                <Typography.Paragraph>
                                    O <Typography.Link href={'https://pt.wikipedia.org/wiki/Teste_Kolmogorov-Smirnov'}>teste de Kolmogorov-Smirnov</Typography.Link> aplicado a esta cole????o face ??s restantes tem como resultado a estat??stica K-S = {Math.round(metricsHistogram[metricid].categories[c.id].ks_2samp.stat * 1000) / 1000} (<Typography.Text italic>P</Typography.Text>{SciNotation(metricsHistogram[metricid].categories[c.id].ks_2samp.p)}).
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
            category: 'Not??cia',
            articles: 6000,
            sources: 9,
        },
        {
            key: 'opinion',
            category: '(Artigo de) Opini??o',
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
            category: 'S??tira',
            articles: 1029,
            sources: 2,
        },
        {
            key: 'conspiracy',
            category: '(Teoria da) Conspira????o',
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
            title: 'N?? Artigos',
            dataIndex: 'articles',
            key: 'articles',
            width: 150,

        },
        {
            title: 'N?? Fontes',
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

                <Typography.Paragraph>O <Typography.Text strong>InfoRadar</Typography.Text> fornece aos leitores um conjunto de informa????o importante para aferir a credibilidade do conte??do textual que pretendem consumir e/ou partilhar.</Typography.Paragraph>

                <Typography.Paragraph>Para cada artigo apresentado, o <Typography.Text strong>InfoRadar</Typography.Text> estima o grau de probabilidade de o mesmo pertencer a cada uma das <Typography.Text italic><Typography.Link href={'#categorias'}>categorias de (des)informa????o</Typography.Link></Typography.Text> consideradas neste projeto, sendo o resultado da aplica????o de um classificador autom??tico baseado em <Typography.Link href={'#artigo8'}>modelos de "contextual embeddings"</Typography.Link>, treinados com base num <Typography.Link href={'#mint'}>corpus</Typography.Link> criado para o efeito.</Typography.Paragraph>

                <Typography.Paragraph>Al??m disso, o <Typography.Text strong>InfoRadar</Typography.Text> apresenta um conjunto de <Typography.Text italic><Typography.Link href={'#metricas'}>m??tricas explicativas</Typography.Link></Typography.Text> (ou indicadores) que poder??o auxiliar o leitor a aferir a credibilidade do artigo em an??lise. Os valores de cada uma destas <Typography.Text italic>m??tricas explicativas</Typography.Text> correspondem aos percentis obtidos para cada artigo face aos valores apresentados para os 5 subconjuntos que representam as diferentes <Typography.Text italic>categorias de (des)informa????o</Typography.Text> inclu??das na nossa <Typography.Link href={'#mint'}>cole????o de refer??ncia</Typography.Link>. Esses valores devem ser interpretados em fun????o da categoria envolvida.
                </Typography.Paragraph>

                <Typography.Title level={2}>Submiss??o do artigo para an??lise</Typography.Title>
                <Typography.Paragraph>O leitor poder?? submeter diretamente o artigo para avalia????o, colando o URL do artigo ou, alternativamente, o texto que pretende analisar na janela ?? esquerda do <Typography.Text strong>InfoRadar</Typography.Text>.</Typography.Paragraph>
                <Typography.Paragraph>
                    <Row>
                        <Col {...transitionSpanLeft.exited}>
                            <SearchBar />
                        </Col>
                    </Row>
                    <Typography.Text italic>Caixa de pesquisa de exemplo.</Typography.Text>
                </Typography.Paragraph>

                <Typography.Paragraph>O <Typography.Text strong>InfoRadar</Typography.Text> produz uma ficha com <Typography.Text strong>Informa????o Nutricional</Typography.Text>, analisando o artigo em duas dimens??es distintas, mas complementares: classifica????o do artigo quanto ?? sua <Typography.Text italic><Typography.Link href={'#categorias'}>categoria de (des)informa????o</Typography.Link></Typography.Text> e apresenta????o de um conjunto de <Typography.Text italic><Typography.Link href={'#metricas'}>m??tricas explicativas</Typography.Link></Typography.Text> que procuram auxiliar o leitor a avaliar o seu conte??do.</Typography.Paragraph>
                <Typography.Paragraph>
                    <ArticleAnalysis forcequery={{ url: "https://www.publico.pt/2021/04/18/sociedade/noticia/jantar-restaurante-ir-cinema-correr-grupo-partir-segundafeira-1959046" }} />
                    <Typography.Text italic>An??lise de exemplo.</Typography.Text>
                </Typography.Paragraph>

                <Typography.Title id="categorias" level={2}>Categorias de (des)informa????o</Typography.Title>

                <Typography.Paragraph>
                    O artigo em an??lise ?? automaticamente classificado pelo <Typography.Text strong>InfoRadar</Typography.Text> em 4 n??veis:
                    <ol>
                        <li>baixo</li>
                        <li>m??dio-baixo</li>
                        <li>m??dio-alto</li>
                        <li>alto</li>
                    </ol>

                    que representam uma classe de probabilidade de este corresponder a uma das seguintes <Typography.Text italic>categorias de (des)informa????o</Typography.Text>:
                    <Collapse ghost defaultActiveKey={router.asPath.split('#')[1] ?? undefined}>
                        <Collapse.Panel header={<Typography.Text strong>Not??cia</Typography.Text>} key="noticia">
                            <Typography.Paragraph>
                                Texto marcadamente informativo, por norma, claro, conciso, direto, objetivo e elaborado segundo regras jornal??sticas bem definidas. Tem t??tulo, em geral, direto e informativo, que resulta do 'lead'. Este corresponde ao primeiro par??grafo da not??cia, em que o leitor dever?? encontrar resposta para seis quest??es fundamentais: <Typography.Text italic>O qu??? Quem? Quando? Onde? Porqu??? Como?</Typography.Text> As respostas ??s duas ??ltimas quest??es poder??o ser exploradas nos par??grafos mais abaixo. A not??cia deve mencionar as fontes utilizadas, que conferem credibilidade ?? mesma, e ?? constru??da em forma de pir??mide invertida. Se precisarmos de fazer uma sele????o ou um corte do texto, a informa????o mais relevante dever?? estar nos par??grafos iniciais.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A cole????o de refer??ncia, utilizada neste estudo para efeitos de classifica????o autom??tica e c??lculo dos percentis dos indicadores, ?? constitu??da por 6000 artigos noticiosos publicados por nove fontes jornal??sticas portuguesas registadas na ERC. Esses artigos abordam temas de ??mbito nacional e internacional, tendo sido extra??dos das vers??es online dos jornais selecionados, em particular, das sec????es classificadas como <Typography.Text italic>pol??tica</Typography.Text>, <Typography.Text italic>sociedade</Typography.Text>, <Typography.Text italic>economia</Typography.Text>, <Typography.Text italic>tecnologia</Typography.Text>, <Typography.Text italic>cultura</Typography.Text> e <Typography.Text italic>desporto</Typography.Text>.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Artigo de) Opini??o</Typography.Text>} key="opiniao">
                            <Typography.Paragraph>
                                Texto em que o autor, devidamente identificado, exprime opini??es e pontos de vista subjetivos relativamente a temas que, por norma, abordam a atualidade, procurando marcar uma posi????o e gerar algum tipo de rea????o por parte dos leitores. O estilo pode variar muito de autor para autor. Alguns optam por apresentar factos e fontes cred??veis, de modo a suportar os argumentos apresentados e a sustentar as suas conclus??es. Outros optam por criar textos leves e, frequentemente, bem-humorados, abordando opini??es pessoais sobre temas de costumes ou do quotidiano.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A cole????o  de refer??ncia, utilizada neste estudo para efeitos de classifica????o autom??tica e c??lculo dos percentis dos indicadores, ?? constitu??da por 6000 artigos de opini??o, coligidos a partir da sec????o de <Typography.Text italic>opini??o</Typography.Text> de dez jornais e revistas portuguesas registadas na ERC. O processo de sele????o procurou garantir a diversidade de autores, quer de fontes diferentes quer dentro da mesma fonte.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Artigo de) Entretenimento</Typography.Text>} key="entretenimento">
                            <Typography.Paragraph>
                                Textos quase sempre baseados no princ??pio de querer 'agarrar' o leitor. Os temas abordados neste tipo de artigos s??o variad??ssimos, mas apelam frequentemente a um ambicionado estilo de vida glamoroso, abordando ??reas variadas, incluindo gastronomia, f??rias, cultura, tend??ncias, moda, festas, beleza, alimenta????o, dietas, 'hobbies', desportos, luxo, aventura, entre muitas outras. S??o textos leves, de escrita apelativa, que suscitam a aten????o, embora muitas vezes sejam apenas um reposit??rio de informa????o j?? amplamente conhecida, sem novidade ou car??ter noticioso.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A cole????o de refer??ncia, utilizada neste estudo para efeitos de classifica????o autom??tica e c??lculo dos percentis dos indicadores, ?? constitu??da por 6000 artigos de entretenimento, extra??dos das sec????es de <Typography.Text italic>celebridades</Typography.Text>, <Typography.Text italic>moda</Typography.Text>, <Typography.Text italic>beleza</Typography.Text>, <Typography.Text italic>fam??lia</Typography.Text>, <Typography.Text italic>lifestyle</Typography.Text> e <Typography.Text italic>cultura</Typography.Text> de seis revistas e suplementos de jornais portugueses.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>S??tira</Typography.Text>} key="satira">
                            <Typography.Paragraph>
                                Texto que recorre a um conjunto de estrat??gias ret??ricas (em particular, a s??tira, a ironia e o humor) que visam ridicularizar um determinado assunto, indiv??duo ou organiza????o e/ou gerar um efeito c??mico. A correta interpreta????o desta mensagem requer que o leitor esteja em perfeita sintonia com o autor, de modo a perceber a ironia do texto. Neste tipo de texto, o autor inventa ou recria frequentemente factos, acontecimentos e personagens, apresentando-os de forma veross??mil, mas nem sempre plaus??vel.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A cole????o de refer??ncia, utilizada neste estudo para efeitos de classifica????o autom??tica e c??lculo dos percentis dos indicadores, ?? constitu??da por 1029 artigos, extra??dos de dois conhecidos sites portugueses, autodeclarados fict??cios, humor??sticos e/ou sat??ricos nos seus estatutos editoriais.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>(Teoria da) Conspira????o</Typography.Text>} key="conspiracao">
                            <Typography.Paragraph>
                                ?? uma hip??tese explicativa ou especulativa sobre determinado tema, em que supostamente um indiv??duo ou organiza????o nos tentou enganar, inventando algo ou escondendo a realidade, de forma secreta. Tipicamente esse acontecimento ?? considerado ilegal, colocando em causa o debate livre e informativo e, consequentemente, a fragiliza????o das sociedades democr??ticas. Por norma, as teorias da conspira????o envolvem sociedades secretas que controlam ou tentam controlar a humanidade; o controlo pode ainda ser exercido por extraterrestres ou por humanos com poderes paranormais.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A cole????o de refer??ncia, utilizada neste estudo para efeitos de classifica????o autom??tica e c??lculo dos percentis dos indicadores, ?? constitu??da por 1249 artigos semiautomaticamente classificados como conspira????o. Os t??picos cobertos nesta cole????o s??o de natureza bastante diversificada, abrangendo, entre outras, quest??es pol??ticas e econ??micas, de sa??de e tecnologia.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A sele????o e classifica????o deste tipo de conte??dos assenta numa abordagem semiautom??tica. Em concreto, compilamos uma lista de t??picos a partir de uma sele????o de <Typography.Link href={'https://en.wikipedia.org/wiki/COVID-19_misinformation'}>hist??rias de conspira????o dispon??veis na Wikip??dia</Typography.Link> e inspecionamos manualmente um conjunto de sites candidatos. A lista final inclui seis websites que haviam publicado anteriormente, pelo menos, cinco artigos suportando teorias da conspira????o. Os artigos selecionados cobrem narrativas como, por exemplo, o uso do novo coronav??rus como arma biol??gica, a liga????o entre a tecnologia 5G e COVID-19 e vacinas baseadas em RNA que alterariam o ADN humano.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                O tema COVID-19 predomina nesta cole????o, uma vez que este acontecimento impulsionou a proliferac??a??o deste tipo de conteu??dos tanto nos canais de informa????o tradicionais como nas redes sociais a ni??veis sem precedentes. De acordo com estudos recentes, a negac??a??o, ou seja, a predisposic??a??o psicolo??gica para rejeitar informac??a??o especializada e autorizada, o pensamento conspirativo, ou seja, a tende??ncia para encarar eventos sociais desafiantes como o produto de conspirac??o??es, e o partidarismo sa??o os ingredientes-chave que sustentam, por exemplo, as inu??meras teorias da conspirac??a??o relacionadas com a COVID-19.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title id="metricas" level={2}>M??tricas Explicativas</Typography.Title>
                <Typography.Paragraph>As m??tricas explicativas contempladas no <Typography.Text strong>InfoRadar</Typography.Text> resultam de um trabalho de investiga????o que envolveu a an??lise e anota????o de conte??dos noticiosos por parte de profissionais da comunica????o e leitores comuns (ver artigos cient??ficos <Typography.Link href={'#artigo1'}>1</Typography.Link>, <Typography.Link href={'#artigo2'}>2</Typography.Link> e <Typography.Link href={'#artigo3'}>3</Typography.Link>). Em concreto, os resultados apresentados dever??o ajudar o leitor a refletir sobre a credibilidade do conte??do do artigo que est??o a analisar, tendo em considera????o os aspetos computados em cada m??trica:

                    <Collapse ghost defaultActiveKey={router.asPath.split('#')[1] ?? undefined}>
                        <Collapse.Panel header={<Typography.Text strong>Sentimento</Typography.Text>} key="sentiment" id="sentiment">
                            <Typography.Paragraph>
                                Contrariamente ??s not??cias convencionais, onde ?? requerida a utiliza????o de um tom neutro e objetivo, em artigos de outra natureza (por exemplo, em artigos de opini??o), ?? comum o emprego de palavras e express??es com carga emocional (ou sentimento), procurando provocar uma rea????o junto dos leitores.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                O sentimento ?? avaliado com base em contagem de ocorr??ncias lexicais que t??m associada informa????o acerca da polaridade ou intensidade do sentimento. Para tal, foram utilizados como refer??ncia o <Typography.Link href={'#artigo4'}>SentiLex</Typography.Link>, um l??xico de palavras de sentimento desenvolvidos para o portugu??s.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 1, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Subjetividade</Typography.Text>} key="subjectivity" id="subjectivity">
                            <Typography.Paragraph>
                                Contrariamente ??s not??cias convencionais, onde ?? requerida a utiliza????o de um tom neutro e objetivo, em artigos de outra natureza (por exemplo, em artigos de opini??o), ?? comum o emprego de uma maior subjetividade, no sentido em que o autor procura exprimir as suas pr??prias opini??es e pontos de vista, procurando provocar uma rea????o junto dos leitores.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A subjetividade ?? avaliada tamb??m a partir de contagem lexical, considerando termos presentes no <Typography.Link href={'#artigo5'}>Subjectivity Lexicon</Typography.Link>. Como este l??xico foi desenvolvido para a l??ngua inglesa, geramos uma tradu????o do mesmo para o portugu??s por aplica????o de algoritmos/m??todos de tradu????o autom??tica.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 2, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Representatividade do T??tulo</Typography.Text>} key="headline_accuracy" id="headline_accuracy">
                            <Typography.Paragraph>
                                O principal objetivo do t??tulo ?? captar a aten????o do leitor para a hist??ria que este apresenta. No entanto, alguns t??tulos podem ser enganosos e/ou n??o representar, com clareza e precis??o, o conte??do do artigo, o que poder?? apontar para a falta de credibilidade de alguns tipos de conte??dos, em particular, os noticiosos.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                A representatividade do t??tulo ?? avaliada por meio da similaridade do cosseno calculada entre as representa????es vetoriais do t??tulo e do corpo do texto do artigo em quest??o. Para gerar representa????es vetoriais, recorremos ?? t??cnica de <Typography.Text italic>word embeddings</Typography.Text> est??ticos, <Typography.Link href={'#artigo6'}>dispon??veis em portugu??s</Typography.Link>, gerados a partir de <Typography.Link href={'#artigo7'}>Word2vec</Typography.Link>.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 5, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Sensacionalismo do T??tulo</Typography.Text>} key="clickbait" id="clickbait">
                            <Typography.Paragraph>
                                O jornalismo de natureza sensacionalista ou viral recorre frequentemente a t??ticas ou estrat??gias de clickbait (ou ca??a ao clique) para levar o leitor a clicar num determinado tipo de conte??do, geralmente n??o cred??vel.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Estas estrat??gias s??o genericamente englobadas na categoria sensacionalismo, que ?? avaliada com base em um algoritmo de Regress??o Log??stica, treinado num <Typography.Link href={'#clickdataset'}>corpus</Typography.Link> original em ingl??s, que foi traduzido para o portugu??s e atualizado com not??cias extra??das do corpus MINT.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 4, metricsHistogram)}
                        </Collapse.Panel>
                        <Collapse.Panel header={<Typography.Text strong>Palavras N??o Reconhecidas</Typography.Text>} key="spell_checking" id="spell_checking">
                            <Typography.Paragraph>
                                A corre????o lingu??stica ?? um aspeto fundamental a ter em considera????o na reda????o de qualquer tipo de conte??do, que se pretende rigoroso, claro, coeso e isento de qualquer tipo de erro (lexical, sint??tico, sem??ntico, discursivo ou estrutural).
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Embora seja nosso objetivo avaliar todas estas dimens??es, na vers??o atual do <Typography.Text strong>InfoRadar</Typography.Text>, apenas se avalia a cobertura lexical do texto, isto ??, a possibilidade de o artigo apresentar palavras ou express??es n??o dicionarizadas ou desconhecidas. Tais palavras ou express??es poder??o corresponder a nomes pr??prios, siglas ou acr??nimos, neologismos ou erros ortogr??ficos. Em particular, a exist??ncia de erros ortogr??ficos no texto ?? uma forte evid??ncia de que o mesmo poder?? corresponder a um conte??do n??o cred??vel.
                            </Typography.Paragraph>
                            {HistogramBlock(categories, 3, metricsHistogram)}
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title level={2}>Material de refer??ncia</Typography.Title>
                <Typography.Title level={3}>Cole????es</Typography.Title>
                <Typography.Title level={4} id="mint">MINT Corpus</Typography.Title>
                <Typography.Paragraph>O Corpus <Typography.Link href={'#artigo3'}>MINT (Mainstream and Independent News Text)</Typography.Link> ?? constitu??do por mais de 20.000 artigos, publicados entre 1 de junho de 2020 e 31 de maio de 2021, em 33 plataformas de media convencionais e blogues. Cada um dos documentos que comp??em o corpus foi classificado como pertencendo a uma das cinco <Typography.Text italic>categorias de (des)informa????o</Typography.Text> consideradas. Dispon??vel no <Typography.Link href={'https://github.com/dcaled/mint'}>GitHub</Typography.Link>.</Typography.Paragraph>

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
                <Typography.Paragraph>Dataset of news articles for classification into clickbait and non-clickbait. Dispon??vel <Typography.Link href={'https://www.kaggle.com/amananandrai/clickbait-dataset'}>aqui</Typography.Link>.</Typography.Paragraph>

                <Typography.Title level={3}>Publica????es</Typography.Title>
                <ul>
                    <li id="artigo1">Carvalho, P., Caled, D., Silva, M.J., Martins, B., Carvalho, J.P., Carreira, J., Fonseca, J.P., Gomes, T., Camacho, P.: <Typography.Link href={'https://combatefakenews.lusa.pt/wp-content/uploads/2021/07/Carvalho_submission.pdf'}>Assessing news credibility: Misinformation content indicators (2021)</Typography.Link></li>

                    <li id="artigo2">Carvalho, P., Caled, D., Silva, M.J., Martins, B., Carvalho.: Annotation and Assessment of News Credibility (2021)</li>

                    <li id="artigo3">Caled, D., Carvalho, P., Silva, M.J.: <Typography.Link href={'https://arxiv.org/abs/2108.06249'}>MINT - Mainstream and Independent News Text Corpus</Typography.Link>. In: Proceedings of the International Conference on Computational Processing of Portuguese (2022)</li>

                    <li id="artigo4">Silva, M.J., Carvalho, P., Sarmento, L.: <Typography.Link href={'https://link.springer.com/chapter/10.1007/978-3-642-28885-2_25'}>Building a sentiment lexicon for social judgement mining</Typography.Link>. In: International Conference on Computational Processing of the Portuguese Language. Springer. (2012)</li>

                    <li id="artigo5">Wilson, T., Wiebe, J., Hoffmann, P.: <Typography.Link href={'https://dl.acm.org/doi/10.3115/1220575.1220619'}>Recognizing Contextual Polarity in Phrase-Level Sentiment Analysis</Typography.Link>. In: Proceedings of HLT-EMNLP-2005. (2005)</li>

                    <li id="artigo6">Hartmann, N.S., Fonseca, E.R., Shulby, C.D., Treviso, M.V., Silva J.R., Alu??sio, S.M.: <Typography.Link href={'http://143.107.183.175:22980/Proceedings%20STIL%202017.pdf'}>Portuguese Word Embeddings: Evaluating on Word Analogies and Natural Language Tasks</Typography.Link>. In: Anais do XI Simp??sio Brasileiro de Tecnologia da Informa????o e da Linguagem Humana. SBC. (2017)</li>

                    <li id="artigo7">Mikolov, T., Chen, K., Corrado, G., and Dean, J.: <Typography.Link href={'https://arxiv.org/pdf/1301.3781.pdf'}>Efficient estimation of word representations in vector space</Typography.Link>. In: Proceedings of International Conference on Learning Representations Workshop. (2013)</li>

                    <li id="artigo8">Devlin, J., Chang, M. W., Lee, K., Toutanova, K.: <Typography.Link href={'https://aclanthology.org/N19-1423.pdf'}>BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</Typography.Link>. In: Proceedings of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (2019)</li>
                </ul>

            </AntLayout.Content>
        </Layout>
    )
}

export default withRouter(ComoFunciona)