import { numb, changepercept } from '../../helpers/form';

import { Form, Space, Button, Radio, Select, Row, Col, Typography, Skeleton } from 'antd';
import utilStyles from '../../styles/utils.module.css'

const layout = {
	labelCol: {
		sm: { span: 18 },
		xs: { span: 24 }
	},
	wrapperCol: {
		span: 16,
	},
};

const validateMessages = {
	required: "Campo obrigatório.",
};

const GeneralPerceptionForm = ({ categories, fields, onChange, onSubmit }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return categories ? (
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
					{categories.map(c => <Select.Option key={c.id} value={c.id}>{c.display_name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="credibility"
				label={<Typography.Text strong>2. Indique o grau de credibilidade do artigo (1 = nada credível e 5 = extremamente credível).</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numb.map(c =>
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
	) : <Skeleton />;
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
							{numb.map(c =>
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
							{numb.map(c =>
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
					<Row>
						<Col>
							{numb.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="cites_sources"
				label={<Typography.Text strong>6. O artigo cita fontes de informação para sustentar os factos, as hipóteses ou as conclusões apresentadas?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						<Col>
							{numb.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
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
							{numb.map(c =>
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
					<Row>
						<Col>
							{numb.map(c =>
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
							{numb.map(c =>
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
					<Row>
						<Col>
							{numb.map(c =>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							)}
						</Col>
					</Row>
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
										{numb.map(c =>
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
										{numb.map(c =>
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
										{numb.map(c =>
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
										{numb.map(c =>
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
										{numb.map(c =>
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
								<Row>
									<Col>
										{numb.map(c =>
											<Radio key={c.id} value={c.id}>{c.name}</Radio>
										)}
									</Col>
								</Row>
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

export { GeneralPerceptionForm, ArticleTitleForm, ArticleStructureForm, ObjectivitySubjectivityForm }