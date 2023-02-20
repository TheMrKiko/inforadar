import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AppealForm, ArticleStructureForm, ArticleTitleForm, ConspiracyNarrativeForm, GeneralPerceptionForm, ObjectivitySubjectivityForm, SentimentEmotionForm } from './forms/main';
import { createError, errorType } from '../helpers/error';
import { Button, Space, Spin, Steps, Typography } from 'antd';
import axios from 'axios';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/AvaliacaoArtigo.module.css';

const API_PATH = process.env.API_PATH

const Navigation = ({ step, setStep }) => {
	return (
		<Typography.Paragraph>
			<Steps onChange={(value) => value < step && setStep(value)}
				direction={'horizontal'} progressDot current={step}>
				<Steps.Step title="Leitura do Artigo" />
				<Steps.Step title="Perceção Geral" />
				<Steps.Step title="Título do Artigo" />
				<Steps.Step title="Estrutura do Artigo" />
				<Steps.Step title="Objetividade e Subjetividade" />
				<Steps.Step title="Discurso e Retórica" />
				<Steps.Step title="Narrativa de Conspiração" />
				<Steps.Step title="Sentimento e Emoção" />
			</Steps>
		</Typography.Paragraph>
	)
}

const MainAnalysisBlock = (props) => {
	const [step, setStep] = useState(0);
	const [gpfFields, setGPFFields] = useState(null);
	const [atfFields, setATFFields] = useState(null);
	const [asfFields, setASFFields] = useState(null);
	const [osfFields, setOSFFields] = useState(null);
	const [afFields, setAFFields] = useState(null);
	const [cnfFields, setCNFFields] = useState(null);
	const [sefFields, setSEFFields] = useState(null);
	const [formValues, setFormValues] = useState([{}, {}, {}, {}, {}, {}, {}]);
	const [submitting, setSubmitting] = useState(false);
	const [timeStarted, _] = useState(Date.now());
	const submitFormValues = (index, values) => {
		setFormValues(prevValues => prevValues.map((v, i) => index === i ? values : v));
	}

	const refsByStep = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

	const submitForm = () => {
		const timeTaken = Date.now() - timeStarted;
		const formData = {
			...formValues.reduce((prev, curr) => ({ ...prev, ...curr }), {}), corpus_article_id: props.article.article.id, time_taken: timeTaken,
		}
		axios.post(`${API_PATH}/article_annotation`, formData, {
			headers: { 'X-Requested-With': 'XmlHttpRequest' },
		}).then(result => {
			setStep(8);
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

	useEffect(() => {
		if (step && step != 8)
			refsByStep[step].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [step]);

	return props.article.article ? (
		<Space direction={'vertical'} className={utilStyles.width100}>
			{step < 8 && <Navigation step={step} setStep={setStep} />}
			{step != 8 && <div ref={refsByStep[0]} />}
			{step != 8 && <Typography.Text type={step != 0 && 'secondary'}>Leia, com atenção, o seguinte artigo.</Typography.Text>}
			{props.article.article && step != 8 && (
				<Typography.Paragraph>
					<blockquote>
						<Typography.Title level={3}>{props.article.article.headline}</Typography.Title>
						<Typography.Paragraph style={{ whiteSpace: 'pre-wrap', }}>{props.article.article.body_text}</Typography.Paragraph>
					</blockquote>
					<Typography.Text type={'secondary'}>Algo de errado com o artigo? <Link href='/avaliacao'>Escolher outro artigo</Link> ou <Typography.Link href='mailto:mint-annotation@googlegroups.com'>questionar por email</Typography.Link>.</Typography.Text>
				</Typography.Paragraph>
			)}
			{step == 0 && <Button type={'primary'} onClick={() => setStep(1)}>Continuar</Button>}
			{step != 8 && <div ref={refsByStep[1]} />}
			{step == 1 &&
				<GeneralPerceptionForm
					fields={gpfFields}
					onChange={setGPFFields}
					onSubmit={(values) => {
						submitFormValues(0, values);
						setStep(2);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[2]} />}
			{step == 2 &&
				<ArticleTitleForm
					fields={atfFields}
					onChange={setATFFields}
					onSubmit={(values) => {
						submitFormValues(1, values);
						setStep(3);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[3]} />}
			{step == 3 &&
				<ArticleStructureForm
					fields={asfFields}
					onChange={setASFFields}
					onSubmit={(values) => {
						submitFormValues(2, values);
						setStep(4);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[4]} />}
			{step == 4 &&
				<ObjectivitySubjectivityForm
					fields={osfFields}
					onChange={setOSFFields}
					onSubmit={(values) => {
						submitFormValues(3, values);
						setStep(5);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[5]} />}
			{step == 5 &&
				<AppealForm
					fields={afFields}
					onChange={setAFFields}
					onSubmit={(values) => {
						submitFormValues(4, values);
						setStep(6);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[6]} />}
			{step == 6 &&
				<ConspiracyNarrativeForm
					fields={cnfFields}
					onChange={setCNFFields}
					onSubmit={(values) => {
						submitFormValues(5, values);
						setStep(7);
					}}
				/>
			}
			{step != 8 && <div ref={refsByStep[7]} />}
			{step == 7 &&
				<SentimentEmotionForm
					fields={sefFields}
					onChange={setSEFFields}
					onSubmit={(values) => {
						submitFormValues(6, values);
						setSubmitting(true);
					}}
					submitting={submitting}
				/>
			}
			{step >= 1 && step < 8 && <Navigation step={step} setStep={setStep} />}
			{step == 8 && <Typography.Paragraph>
				<Typography.Text type={'success'}>Resposta submetida! Obrigado pela sua participação. <Link href='/avaliacao'>Avaliar outro artigo</Link>.</Typography.Text>
			</Typography.Paragraph>}
		</Space>
	) : <Spin size={'large'} />
}


export default MainAnalysisBlock;