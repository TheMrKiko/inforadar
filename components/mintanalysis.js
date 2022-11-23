import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Layout from './layout';
import withArticle from './witharticle';
import ArticleCard from './articlecard';
import NutritionalInfo from './nutrinfo';
import ERCLabel from './erclabel';
import { CredibilityForm, FirstImpressionsForm, MetricsForm } from './forms/mint';
import { createError, errorType } from '../../helpers/error';
import { Button, Card, Col, Row, Space, Spin, Steps, Typography } from 'antd';
import axios from 'axios';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/AvaliacaoArtigo.module.css';

const { API_PATH } = process.env

const Navigation = ({ step, setStep }) => {
	const setStepFunc = (thisstep) => () => setStep(thisstep);
	return (
		<Typography.Paragraph>
			<Steps direction={'horizontal'} progressDot current={step}>
				<Steps.Step onStepClick={0 < step && setStepFunc(0)} title="Leitura do Artigo" />
				<Steps.Step onStepClick={1 < step && setStepFunc(1)} title="Primeiras Impressões" />
				<Steps.Step onStepClick={2 < step && setStepFunc(2)} title="Informação Nutricional" />
				<Steps.Step onStepClick={3 < step && setStepFunc(3)} title="Credibilidade" />
				<Steps.Step onStepClick={4 < step && setStepFunc(4)} title="Métricas Explicativas" />
			</Steps>
		</Typography.Paragraph>
	)
}

const AnalysisBlock = (props) => {
	const [step, setStep] = useState(0);
	const [fifFields, setFIFFields] = useState(null);
	const [cfFields, setCFFields] = useState(null);
	const [mfFields, setMFFields] = useState(null);
	const [formValues, setFormValues] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [timeStarted, _] = useState(Date.now());
	const submitFormValues = (values) => setFormValues(prevValues => ({ ...prevValues, ...values }));

	const refsByStep = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

	const scrollAndSetStep = (st) => {
		setStep(st);
		refsByStep[st].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	const submitForm = () => {
		const timeTaken = Date.now() - timeStarted;
		const formData = { ...formValues, corpus_article_id: props.article.article.id, time_taken: timeTaken, }
		axios.post(`${API_PATH}/article_annotation`, formData, {
			headers: { 'X-Requested-With': 'XmlHttpRequest' },
		}).then(result => {
			setStep(5);
			props.login.setUserData({
				...props.login.userData,
				annotated: props.login.userData.annotated + 1,
			})
		}).catch(error => {
			if (error.response && error.response.status === 401)
				props.login.loginError(createError(errorType.RELOGIN, error));
			else
				props.login.loginError(createError(errorType.AUTHORIZE, error), false);
			setSubmitting(false);
		});
	}

	useEffect(() => {
		if (submitting)
			submitForm();
	}, [formValues, submitting]);

	return props.article.article ? (
		<Space direction={'vertical'} className={utilStyles.width100}>
			{step < 5 && <Navigation step={step} setStep={scrollAndSetStep} />}
			{step != 5 && <div ref={refsByStep[0]} />}
			{step <= 1 && <Typography.Text type={step != 0 && 'secondary'}>Leia, com atenção, o seguinte artigo.</Typography.Text>}
			{props.article.article && step <= 1 && (
				<Typography.Paragraph>
					<blockquote>
						<Typography.Title level={3}>{props.article.article.headline}</Typography.Title>
						<Typography.Paragraph style={{ whiteSpace: 'pre-wrap', }}>{props.article.article.body_text}</Typography.Paragraph>
					</blockquote>
					<Typography.Text type={'secondary'}>Algo de errado com o artigo? <Link href='/avaliacao'>Escolher outro artigo</Link> ou <Typography.Link href='mailto:mint-annotation@googlegroups.com'>questionar por email</Typography.Link>.</Typography.Text>
				</Typography.Paragraph>
			)}
			{step == 0 && <Button type={'primary'} onClick={() => scrollAndSetStep(1)}>Continuar</Button>}
			{step != 5 && <div ref={refsByStep[1]} />}
			{step == 1 &&
				<FirstImpressionsForm
					categories={props.article.categories}
					fields={fifFields}
					onChange={setFIFFields}
					onSubmit={(values) => {
						submitFormValues(values);
						scrollAndSetStep(2);
					}}
				/>
			}
			{step != 5 && <div ref={refsByStep[2]} />}
			{step >= 2 && step < 5 && <>
				<Typography.Paragraph type={step >= 3 && 'secondary'}>Agora, observe o mesmo artigo contextualizado e analise a informação providenciada pelo InfoRadar. <Link href={`/comofunciona`} target="_blank">Ver como funciona o InfoRadar</Link>.</Typography.Paragraph>
				<Row gutter={20}>
					<Col span={24} sm={{ span: 6 }}>
						<Space direction={'vertical'}>
							<ArticleCard
								article={props.article.article}
								url={props.article.article.url}
							/>
							{props.article.sourceData && <ERCLabel
								sourceInfo={props.article.sourceInfo}
								sourceData={props.article.sourceData}
							/>}
						</Space>
					</Col>
					<Col span={24} sm={{ span: 18 }}>
						<Typography.Paragraph className={styles.nutrinfoblock}>
							<Card>
								<Typography.Title level={3}>Informação Nutricional</Typography.Title>
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
						<Space direction={'vertical'} className={utilStyles.width100}>
							<Typography.Text type={'secondary'}>Algo de errado com o artigo ou a análise? <Link href='/avaliacao'>Escolher outro artigo</Link> ou <Typography.Link href='mailto:mint-annotation@googlegroups.com'>questionar por email</Typography.Link>.</Typography.Text>
							{step == 2 && <Button type={'primary'} onClick={() => scrollAndSetStep(3)}>Continuar</Button>}
							{step != 5 && <div ref={refsByStep[3]} />}
							{step == 3 &&
								<CredibilityForm
									fields={cfFields}
									onChange={setCFFields}
									onSubmit={(values) => {
										submitFormValues(values);
										scrollAndSetStep(4);
									}}
								/>
							}
							{step != 5 && <div ref={refsByStep[4]} />}
							{step == 4 &&
								<MetricsForm
									metricsInfo={props.article.metricsInfo}
									fields={mfFields}
									onChange={setMFFields}
									onSubmit={(values) => {
										submitFormValues(values);
										setSubmitting(true);
									}}
									submitting={submitting}
								/>
							}
							{step >= 2 && step < 5 && <Navigation step={step} setStep={scrollAndSetStep} />}
						</Space>
					</Col>
				</Row>
			</>}
			{step == 5 && <Typography.Paragraph>
				<Typography.Text type={'success'}>Resposta submetida! Obrigado pela sua participação. <Link href='/avaliacao'>Avaliar outro artigo</Link>.</Typography.Text>
			</Typography.Paragraph>}
		</Space>
	) : <Spin size={'large'} />
}

const ArticleAnalysis = withArticle(AnalysisBlock);

export default ArticleAnalysis;