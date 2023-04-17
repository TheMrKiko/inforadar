import { Breadcrumb, Layout as AntLayout, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import MainAnalysisBlock from '../../components/mainanalysis';
import MintAnalysisBlock from '../../components/mintanalysis';
import witharticle from '../../components/witharticle';
import { md } from '../../helpers/query';
import utilStyles from '../../styles/utils.module.css';

const AnalysisBlock = (props) => (props.article.mode) === md.MINT ? <MintAnalysisBlock {...props} /> : <MainAnalysisBlock {...props} />

const ArticleAnalysis = witharticle(AnalysisBlock);

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
				<Typography.Paragraph>O objetivo deste inquérito é melhorar o InfoRadar e a sua Informação Nutricional, através da leitura e análise de cada artigo. Este processo irá demorar, em média, 5 minutos.</Typography.Paragraph>
				{login.authenticated ?
					<ArticleAnalysis login={login} />
					:
					<Typography.Paragraph>
						<Typography.Text type={'warning'}>Para visualizar esta página, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
					</Typography.Paragraph>
				}
			</AntLayout.Content>
		</Layout>
	)
}


export default Artigo