import { Form, Space, Checkbox, Input, Button, Radio, Switch, Select, Row, Col, Typography, Skeleton } from 'antd';

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

const FirstImpressionsForm = ({ categories, fields, onChange, onSubmit }) => {
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
			name="first-impressions"
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
			<Typography.Title level={3}>Credibilidade inicial do artigo</Typography.Title>
			<Row>
				<Col {...layout.labelCol}>
					<Typography.Text strong>Indique a probabilidade de o artigo corresponder a cada uma das seguintes categorias.</Typography.Text>
				</Col>
			</Row>
			{categories.map(cat =>
				<Form.Item
					key={cat.id}
					name={`likely_being_${cat.name}`}
					label={<Typography.Text type={'secondary'}>{cat.display_name}:</Typography.Text>}
					rules={[{ required: true }]}
				>
					<Radio.Group>
						<Row>
							<Col>
								{prob.map(c =>
									<Radio key={c.id} value={c.id}>{c.name}</Radio>
								)}
							</Col>
						</Row>
					</Radio.Group>
				</Form.Item>)}
			<Form.Item
				name="pre_credibility"
				label={<Typography.Text strong>Indique o grau de credibilidade do artigo.</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{cred.map(c =>
						<Row key={c.id}>
							<Col>
								<Radio value={c.id}>{c.name}</Radio>
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
	) : <Skeleton />;
};

const CredibilityForm = ({ fields, onChange, onSubmit }) => {
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
			name="credibility"
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
			<Typography.Title level={3}>Credibilidade do artigo</Typography.Title>
			<Form.Item
				name="change_in_perception"
				label={<Typography.Text strong>A informação apresentada pelo InfoRadar influenciou a sua perceção sobre a credibilidade do artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{changepercept.map(c =>
						<Row key={c.id}>
							<Col>
								<Radio value={c.id}>{c.name}</Radio>
							</Col>
						</Row>
					)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="info_is_useful"
				label={<Typography.Text strong>Indique a utilidade da informação sobre a categoria do artigo.</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{useful.map(c =>
						<Row key={c.id}>
							<Col>
								<Radio value={c.id}>{c.name}</Radio>
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

const MetricsForm = ({ metricsInfo, fields, onChange, onSubmit, submitting }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		onSubmit(values);
	};

	const onReset = () => {
		form.resetFields();
	};

	return metricsInfo ? (
		<Form
			form={form}
			name="metrics"
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
			<Typography.Title level={3}>Métricas explicativas</Typography.Title>
			<Row>
				<Col {...layout.labelCol}>
					<Typography.Text strong>Classifique o quão concorda com as seguintes afirmações.</Typography.Text>
				</Col>
			</Row>
			{metricsInfo.map(metric =>
				<div key={metric.id}>
					<Typography.Text type={'secondary'}>{metric.display_name}:</Typography.Text>
					<Form.Item
						name={`info_reflected_in_${metric.name}`}
						label={<Typography.Text>Os valores apresentados para a métrica <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text> estimada pelo InfoRadar refletem a informação apresentada no artigo.</Typography.Text>}
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Row>
								<Col>
									{agree.map(c =>
										<Radio key={c.id} value={c.id}>{c.name}</Radio>
									)}
								</Col>
							</Row>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name={`relevance_of_${metric.name}`}
						label={<Typography.Text>A informação sobre o grau de <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text> é pertinente para aferir a credibilidade do artigo.</Typography.Text>}
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Row>
								<Col>
									{agree.map(c =>
										<Radio key={c.id} value={c.id}>{c.name}</Radio>
									)}
								</Col>
							</Row>
						</Radio.Group>
					</Form.Item>
				</div>
			)}
			<Form.Item
				label={<Typography.Text strong>Qual a métrica que considera mais relevante ou informativa para determinar o grau de credibilidade do artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Row>
					<Col>
						<Form.Item name="most_relevant_metric" noStyle>
							<Select
								placeholder="Escolha uma opção"
								allowClear
							>
								{metricsInfo.map(m => <Select.Option key={m.id} value={m.id}>{m.display_name}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item
				label={<Typography.Text strong>Qual a métrica que considera menos relevante ou informativa para determinar o grau de credibilidade do artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Row>
					<Col>
						<Form.Item name="least_relevant_metric" noStyle>
							<Select
								placeholder="Escolha uma opção"
								allowClear
							>
								{metricsInfo.map(m => <Select.Option key={m.id} value={m.id}>{m.display_name}</Select.Option>)}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item >
				<Space>
					<Button htmlType={'reset'} onClick={onReset}>
						Limpar
					</Button>
					<Button loading={submitting} type={'primary'} htmlType={'submit'}>
						Submeter
					</Button>
				</Space>
			</Form.Item>
		</Form>
	) : <Skeleton />;
};

const agree = [
	{ "id": 1, "name": "Discordo totalmente" },
	{ "id": 2, "name": "Discordo" },
	{ "id": 3, "name": "Indeciso" },
	{ "id": 4, "name": "Concordo" },
	{ "id": 5, "name": "Concordo totalmente" },
	{ "id": 0, "name": "Não sei" },
]

const useful = [
	{ "id": 1, "name": "Nada útil" },
	{ "id": 2, "name": "Pouco útil" },
	{ "id": 3, "name": "Razoavelmente útil" },
	{ "id": 4, "name": "Útil" },
	{ "id": 5, "name": "Muito útil" },
	{ "id": 0, "name": "Não sei" },
]

const changepercept = [
	{ "id": 1, "name": "Sim, neste momento, o artigo parece-me menos credível." },
	{ "id": 2, "name": "Não, a minha perceção sobre a credibilidade do artigo não mudou." },
	{ "id": 3, "name": "Sim, neste momento, o artigo parece-me mais credível." },
	{ "id": 0, "name": "Não sei" },
]

const cred = [
	{ "id": 1, "name": "Nada credível" },
	{ "id": 2, "name": "Pouco credível" },
	{ "id": 3, "name": "Neutro" },
	{ "id": 4, "name": "Credível" },
	{ "id": 5, "name": "Extremamente credível" },
	{ "id": 0, "name": "Não sei" },
]

const prob = [
	{ "id": 1, "name": "Nada provável" },
	{ "id": 2, "name": "Pouco provável" },
	{ "id": 3, "name": "Neutro" },
	{ "id": 4, "name": "Provável" },
	{ "id": 5, "name": "Extremamente provável" },
	{ "id": 0, "name": "Não sei" },
]

export { FirstImpressionsForm, CredibilityForm, MetricsForm }