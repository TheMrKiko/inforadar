import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import withArticle from '../../components/articleanalysis';
import ArticleCard from '../../components/articlecard';
import NutritionalInfo from '../../components/nutrinfo';
import SocioDemForm from '../../components/sdform';
import { Card, Layout as AntLayout, Typography, Breadcrumb, Space } from 'antd';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/AvaliacaoArtigo.module.css';

const AnalysisBlock = (props) => (
	<>
		<Typography.Title level={2}>Avaliação do Artigo</Typography.Title>
		<Typography.Paragraph>Leia agora, com atenção, o seguinte artigo.</Typography.Paragraph>
		{props.article.article && (
			<Typography.Paragraph>
				<blockquote>
					<Typography.Title level={3}>{props.article.article.headline}</Typography.Title>
					<Typography.Paragraph>{props.article.article.body_text}</Typography.Paragraph>
				</blockquote>
			</Typography.Paragraph>
		)}
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
	</>
)

const ArticleAnalysis = withArticle(AnalysisBlock)

const Artigo = ({ login }) => {
	return (
		<Layout current={'avaliacao'} login={login}>
			<Head>
				<title>Inquérito de Avaliação de Artigos | InfoRadar</title>
			</Head>
			<AntLayout.Content className={utilStyles.container}>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link href={'/avaliacao'}>Avaliação</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Typography.Title>Inquérito de Avaliação de Artigos</Typography.Title>
					</Breadcrumb.Item>
				</Breadcrumb>
				<Typography.Paragraph>Primeiro, iremos dar-lhe instruções.</Typography.Paragraph>
				{login.authenticated ? <>
					<Typography.Paragraph><Typography.Text type={'secondary'}>Sessão iniciada.</Typography.Text></Typography.Paragraph>
					<Typography.Paragraph>
						<ArticleAnalysis />
					</Typography.Paragraph>
				</> :
					<Typography.Paragraph>
						<Typography.Text type={'warning'}>Para visualizar esta página, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
					</Typography.Paragraph>
				}
			</AntLayout.Content>
		</Layout>
	)
}


export default Artigo