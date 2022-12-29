import { layout, validateMessages, numbc, categoryOther, consistency, yesno, timeSpace, factOpinion, uniquePerspective, yesnona, usVsThem, conspiracyThemes, polarity, emotion } from '../../helpers/form';

import { Form, Space, Button, Radio, Select, Row, Col, Typography, Input } from 'antd';
import utilStyles from '../../styles/utils.module.css'


const GeneralPerceptionForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="general-perception"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Categoria e perceção geral da credibilidade do artigo</Typography.Title>
			<Form.Item
				name="category"
				label={<Typography.Text strong>1. Se tivesse de classificar este artigo, em que categoria o incluiria?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{categoryOther.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) => prevValues.category !== currentValues.category}
			>
				{({ getFieldValue }) =>
					getFieldValue('category') === 4 ? (
						<Form.Item
							name="category_other"
							label={<Typography.Text type={'secondary'}>Qual?</Typography.Text>}
							rules={[{ required: true }]}
							labelCol={{ offset: 1 }}
							wrapperCol={{ offset: 1, span: 3 }}
						>
							<Input />
						</Form.Item>
					) : null}
			</Form.Item>
			<Form.Item
				name="credibility"
				label={<Typography.Text strong>2. Indique o grau de credibilidade do artigo (1 = nada credível e 5 = extremamente credível).</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const ArticleTitleForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="article_title"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Título do artigo</Typography.Title>
			<Form.Item
				name="representativeness"
				label={<Typography.Text strong>3. O título consegue resumir, de forma clara, o conteúdo do artigo (1 = discordo totalmente e 5 = concordo totalmente).</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="sensationalism"
				label={<Typography.Text strong>4. O título do artigo induziu-me em erro e/ou defraudou as minhas expectativas iniciais (1 = discordo totalmente e 5 = concordo totalmente).</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const ArticleStructureForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="article_structure"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Estrutura do artigo</Typography.Title>
			<Form.Item
				name="consistency"
				label={<Typography.Text strong>5. A narrativa do artigo apresenta um fio condutor lógico e claro?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{consistency.map(c =>
						<Row>
							<Col>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							</Col>
						</Row>
					)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="cites_sources"
				label={<Typography.Text strong>6. O artigo cita fontes de informação para sustentar os factos, as hipóteses ou as conclusões apresentadas?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="source_credibility"
				label={<Typography.Text strong>7. Qual o grau de credibilidade das fontes utilizadas (1 = nada credível e 5 = extremamente credível)?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="time_space"
				label={<Typography.Text strong>8. A informação apresentada no artigo tem referências concretas ao tempo e ao espaço?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{timeSpace.map(c =>
						<Row>
							<Col>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							</Col>
						</Row>
					)}
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const ObjectivitySubjectivityForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="objectivity_subjectivity"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Objetividade/Subjetividade da informação</Typography.Title>
			<Form.Item
				name="objectivity"
				label={<Typography.Text strong>10. Relativamente à informação apresentada no artigo, qual o seu grau de objetividade (1 = nada objetivo e 5 = extremamente objetivo)?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="fact_opinion"
				label={<Typography.Text strong>11. Na sua opinião, a informação apresentada no artigo corresponde predominantemente a factos ou opiniões?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{factOpinion.map(c =>
						<Row>
							<Col>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							</Col>
						</Row>
					)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) => prevValues.fact_opinion !== currentValues.fact_opinion}
			>
				{({ getFieldValue }) =>
					getFieldValue('fact_opinion') === 1 ? <>
						<Typography.Text type={'secondary'}>Factos</Typography.Text>
						<Form.Item
							name="accuracy"
							label={<Typography.Text>a) Os factos são apresentados de forma rigorosa e precisa (1 = nada rigorosa e 5 = extremamente rigorosa)?</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								<Row>
									<Col>
										{numbc.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
							</Radio.Group>
						</Form.Item>
					</> : getFieldValue('fact_opinion') === 2 ? <>
						<Typography.Text type={'secondary'}>Opiniões</Typography.Text>
						<Form.Item
							name="clear_viewpoint"
							label={<Typography.Text>a) O autor defende claramente um ponto de vista (ou assume um posicionamento claro) no artigo face às temáticas abordadas (1 = nada claro e 5 = extremamente claro)?</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								<Row>
									<Col>
										{numbc.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="author_conviction"
							label={<Typography.Text>b) Indique o grau de convicção do autor face às hipóteses ou conclusões que apresenta ao longo do artigo (1 = nada convicto e 5 = extremamente convicto).</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								<Row>
									<Col>
										{numbc.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="unique_perspective"
							label={<Typography.Text>c) A informação no artigo é apresentada como sendo a única que é verdadeira?</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								<Row>
									<Col>
										{uniquePerspective.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="personal_perspective"
							label={<Typography.Text>d) O autor reconhece, de forma explícita, que as conclusões apresentadas no artigo refletem a sua perspetiva pessoal (1 = não reconhece de todo e 5 = reconhece completamente)?</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								<Row>
									<Col>
										{numbc.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="clarity"
							label={<Typography.Text>e) O autor responde de forma clara às questões que coloca no texto?</Typography.Text>}
							rules={[{ required: true }]}
						>
							<Radio.Group>
								{yesnona.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
							</Radio.Group>
						</Form.Item>
					</> : null
				}
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const AppealForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="appeal_strategy"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Estratégias discursivas e retóricas</Typography.Title>
			<Form.Item
				name="appeal_to_fear"
				label={<Typography.Text strong>12. Há afirmações no texto que possam suscitar medo no leitor?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="appeal_to_action"
				label={<Typography.Text strong>13. O autor faz um apelo direto ou indireto à ação (isto é, aborda a necessidade de alterar o estado atual das coisas)?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="personal_attack"
				label={<Typography.Text strong>14. O artigo apresenta um ataque, direto ou indireto, a indivíduos (por exemplo, figuras públicas) ou a organizações?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="sarcasm"
				label={<Typography.Text strong>15. O autor recorre ao sarcasmo, ironia ou humor no artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const ConspiracyNarrativeForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="conspiracy_narrative"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Narrativa de conspiração</Typography.Title>
			<Form.Item
				name="secret_society"
				label={<Typography.Text strong>16. O artigo faz referência, direta ou indireta, à existência de uma sociedade ou grupo secreto?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="evil_forces"
				label={<Typography.Text strong>17. O artigo sugere que existem forças do poder ou mal-intencionadas que originaram, secretamente, os acontecimentos reportados no artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="threatening_truths"
				label={<Typography.Text strong>18. O autor propõe-se a revelar verdades disruptivas ou ameaçadoras?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="us_vs_them"
				label={<Typography.Text strong>19. No texto, é possível identificar dois grandes grupos: os bons (isto é, os que partilham as ideias do autor) e os maus (os outros)?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{usVsThem.map(c =>
						<Row>
							<Col>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							</Col>
						</Row>
					)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="conspiracy_themes"
				label={<Typography.Text strong>20. Algum dos seguintes temas é abordado no artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{conspiracyThemes.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) => prevValues.conspiracy_themes !== currentValues.conspiracy_themes}
			>
				{({ getFieldValue }) =>
					getFieldValue('conspiracy_themes') === 4 ? (
						<Form.Item
							name="conspiracy_themes_other"
							label={<Typography.Text type={'secondary'}>Qual?</Typography.Text>}
							rules={[{ required: true }]}
							labelCol={{ offset: 1 }}
							wrapperCol={{ offset: 1, span: 3 }}
						>
							<Input />
						</Form.Item>
					) : null}
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Próximo
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const SentimentEmotionForm = ({ fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="sentiment_emotion"
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={onFinish}
			labelWrap
			scrollToFirstError
			validateMessages={validateMessages}
			layout={'vertical'}
			{...layout}
		>
			<Typography.Title level={3}>Sentimento e Emoção</Typography.Title>
			<Form.Item
				name="sentiment_polarity"
				label={<Typography.Text strong>21. Que tom (ou sentimento) geral o autor emprega no artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{polarity.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="sentiment_intensity"
				label={<Typography.Text strong>22. Qual o grau de intensidade do sentimento ou emoções expressas no artigo (1 = nada intenso e 5 = extremamente intenso)?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numbc.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				noStyle
				shouldUpdate={(prevValues, currentValues) => prevValues.emotion !== currentValues.emotion}
			>
				{({ getFieldValue }) => {
					const containsNoneValue = getFieldValue('emotion')?.includes(0);
					const constainsSomeValue = getFieldValue('emotion')?.length;
					return (
						<Form.Item
							name="emotion"
							label={<Typography.Text strong>23. Alguma(s) destas emoções está(ão) presente(s) no artigo?</Typography.Text>}
							rules={[{ min: 1, type: 'array' }, { required: true }]}
						>
							<Select
								placeholder="Escolha, pelo menos, uma opção"
								mode={'multiple'}
								allowClear
							>
								{emotion.map(c => (
									<Select.Option key={c.id} value={c.id}
										disabled={constainsSomeValue && ((c.id && containsNoneValue) || (!c.id && !containsNoneValue))}
									>{c.name}</Select.Option>))}
							</Select>
						</Form.Item>
					)

				}}
			</Form.Item>
			<Form.Item
				name="main_emotion"
				label={<Typography.Text strong>24. Qual a emoção predominante no artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{emotion.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item>
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button type={'primary'} htmlType={'submit'}>
						Submeter
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export { GeneralPerceptionForm, ArticleTitleForm, ArticleStructureForm, ObjectivitySubjectivityForm, AppealForm, ConspiracyNarrativeForm, SentimentEmotionForm }