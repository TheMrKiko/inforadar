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
                            <Typography.Paragraph>
                                É um texto marcadamente informativo, por norma curto, claro, conciso, direto e elaborado segundo regras jornalísticas bem determinadas. Tem título, em geral, direto e apelativo, que resulta do 'lead'. Este corresponde ao primeiro parágrafo da notícia, em que o leitor deve encontrar resposta para seis questões fundamentais: O quê? Quem? Quando? Onde? Porquê? E Como? As duas últimas podem ser exploradas nos parágrafos mais abaixo. Deve conter fontes, que conferem credibilidade à notícia, e é construída em forma de pirâmide invertida. Se precisarmos de fazer uma seleção ou um corte do texto, o mais importante está sempre nos parágrafos iniciais.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Para compor a coleção de notícias, recolhemos artigos noticiosos publicados por nove conceituadas fontes jornalísticas portuguesas. Esses artigos abordam temas de âmbito nacional e internacional, tendo sido extraídos das versões online dos jornais selecionados, em particular, das secções classificadas como política, sociedade, economia, tecnologia, cultura e desporto.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(artigo de) opinião" key="opiniao">
                            <Typography.Paragraph>
                                É um texto em que o seu autor, devidamente identificado, exprime pontos de vista subjetivos relativamente a temas que, por norma, abordam a atualidade, podendo gerar polémica. O estilo pode variar muito de autor para autor. Alguns preferem recorrer a factos e fontes credíveis, de modo a suportar os argumentos apresentados e as suas opiniões, permitindo retirar deduções e conclusões. Pode também ser apenas um texto leve e bem humorado, com pontos de vista pessoais sobre temas de costumes ou do quotidiano.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Os artigos de opinião foram recolhidos da secção de opinião de dez jornais e revistas portugueses online. O processo de seleção priorizou a diversidade de autores, quer de fontes diferentes quer dentro da mesma fonte.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(artigo de) entretenimento" key="entretenimento">
                            <Typography.Paragraph>
                                Estes textos são quase sempre baseados no princípio de querer 'agarrar' o leitor. Os temas são variadíssimos, mas apelam quase sempre a um ambicionado estilo de vida glamoroso, abordando áreas variadas, incluindo gastronomia, férias, cultura, tendências, moda, festas, beleza, alimentação, dietas, 'hobbies', desportos, luxo, aventura, entre muitas outras. São textos leves, de escrita apelativa, que suscitam a atenção, embora muitas vezes sejam apenas um repositório de informação já amplamente conhecida, sem novidade ou caráter noticioso.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Para compor esta coleção, extraímos conteúdos publicados nas secções de celebridades, moda, beleza, família, lifestyle e cultura de seis revistas e suplementos de jornais portugueses.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="sátira" key="satira">
                            <Typography.Paragraph>
                                Textos que se baseiam numa técnica literária que visa ridicularizar um determinado assunto, indivíduo ou organização. A interpretação desta mensagem requer que o leitor esteja em perfeita sintonia com o autor, de modo a perceber a ironia do texto. Caso contrário, pode fazer uma leitura literal e interpretar de forma errada o conteúdo. A ironia utiliza recursos estilísticos tentando obter um efeito cómico, ridicularizando, exagerando. Por vezes, inventa factos, acontecimentos e personagens, apresentando-os de forma verossímil, por vezes plausível, outras não.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Os artigos incluídos nesta coleção foram extraídos de dois conhecidos sites portugueses, autodeclarados fictícios, humorísticos e/ou satíricos nos seus estatutos editoriais.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                        <Collapse.Panel header="(teoria da) conspiração" key="conspiracao">
                            <Typography.Paragraph>
                                É uma hipótese explicativa ou especulativa sobre determinado tema, em que um indivíduo ou organização nos tentou enganar, inventando algo, ou escondendo a realidade, de forma secreta. Tipicamente esse acontecimento é considerado ilegal ou prejudicial à humanidade. Por norma, envolvem sociedades secretas que controlam ou tentam controlar a humanidade; o controlo pode ainda ser exercido por extraterrestres ou por humanos com poderes paranormais. Sempre existiram teorias da conspiração, mas, com a massificação das redes sociais, tornaram-se mais visíveis e mais 'criativas'.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Dada a dificuldade em identificar automaticamente as teorias da conspiração, utilizamos uma abordagem semiautomática para selecionar e classificar este tipo de artigo. Em concreto, exploramos websites específicos que haviam publicado anteriormente, pelo menos, cinco artigos suportando teorias da conspiração, particularmente sobre a origem, escala, prevenção, diagnóstico e tratamento da pandemia COVID-19. Tivemos como foco o tema COVID-19, uma vez que este acontecimento impulsionou a proliferação deste tipo de conteúdos nas redes sociais a níveis sem precedentes. De acordo com estudos recentes, a negação, ou seja, a predisposição psicológica para rejeitar informação especializada e autorizada, o pensamento conspirativo, ou seja, a tendência para encarar eventos sociais desafiantes como o produto de conspirações, e o partidarismo são os ingrediente-chave que sustentam, por exemplo, as inúmeras teorias da conspiração relacionadas com a COVID-19. Para identificar as teorias da conspiração, compilamos uma lista de tópicos a partir de uma seleção de <Typography.Link href={'https://en.wikipedia.org/wiki/COVID-19_misinformation'}>histórias de conspiração disponíveis na Wikipédia</Typography.Link>, e inspecionamos manualmente um conjunto de sites candidatos. Os tópicos selecionados cobrem narrativas como o uso do novo coronavírus como arma biológica, a ligação entre a tecnologia 5G e COVID-19 e vacinas baseadas em mRNA que alterariam o DNA humano.
                            </Typography.Paragraph>
                        </Collapse.Panel>
                    </Collapse>
                </Typography.Paragraph>

                <Typography.Title level={2}>Valores dos indicadores</Typography.Title>
                <Typography.Paragraph>A classificação sugerida resulta da aplicação de um conjunto de cinco classificadores automáticos, treinados com base numa vasta coleção de documentos (nº?), extraídos de um vasto conjunto de fontes (nº?). Cada um dos documentos foi manualmente anotado como pertencendo a uma das categorias consideradas.</Typography.Paragraph>
            </AntLayout.Content>
        </Layout>
    )
}