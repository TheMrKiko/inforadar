import { numb, changepercept } from '../../helpers/form';

import { Form, Space, Checkbox, Input, Button, Radio, Switch, Select, Row, Col, Typography, Skeleton, Divider, Collapse, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import utilStyles from '../styles/utils.module.css'

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
			<Typography.Title level={3}>Perceção geral</Typography.Title>
			<Row>
				<Col {...layout.labelCol}>
					<Typography.Text strong>1. Indique a probabilidade de o artigo corresponder a cada uma das seguintes categorias (1 = nada provável e 5 = extremamente provável).</Typography.Text>
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
								{numb.map(c =>
									<Radio key={c.id} value={c.id}>{c.name}</Radio>
								)}
							</Col>
						</Row>
					</Radio.Group>
				</Form.Item>)}
			<Form.Item
				name="pre_credibility"
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
				label={<Typography.Text strong>3. A informação apresentada pelo InfoRadar influenciou a sua perceção sobre a credibilidade do artigo?</Typography.Text>}
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
				label={<Typography.Text strong>4. Indique a utilidade da informação sobre a categoria do artigo (1 = nada útil e 5 = extremamente útil).</Typography.Text>}
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
					<Typography.Text strong>5. Classifique o quão concorda com as seguintes afirmações (1 = discordo totalmente e 5 = concordo totalmente).</Typography.Text>
				</Col>
			</Row>
			<Collapse
				ghost
				defaultActiveKey={metricsInfo.map(m => m.id)}
			>
				{metricsInfo.map((metric, i) =>
					<Collapse.Panel
						header={<Typography.Text type={'secondary'}>5.{i + 1}. {metric.display_name}</Typography.Text>}
						key={metric.id}
					>
						<div className={utilStyles.nullAntTBPadding}>
							<Form.Item
								name={`info_reflected_in_${metric.name}`}
								label={<Typography.Text>a) Os valores apresentados para a métrica <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text> estimada pelo InfoRadar refletem a informação apresentada no artigo.</Typography.Text>}
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
								name={`relevance_of_${metric.name}`}
								label={<Typography.Text>b) A informação sobre o grau de <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text> é pertinente para aferir a credibilidade deste artigo.
									<Tooltip title={`Pretendemos saber se a informação da métrica ${metric.display_name.toLowerCase()} calculada para o artigo em análise ajuda o leitor a aferir a credibilidade do mesmo. Claro que isto não pode ser analisado isoladamente. O leitor vai consolidando o conhecimento e afinando a sua percepção conforme vai avançando no processo de análise.`}><QuestionCircleOutlined /></Tooltip>
								</Typography.Text>}
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
						</div>
					</Collapse.Panel>
				)}
			</Collapse>
			<Form.Item
				name="most_relevant_metric"
				label={<Typography.Text strong>6. Qual a métrica que considera mais relevante ou informativa para determinar o grau de credibilidade deste artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{metricsInfo.map(m => <Select.Option key={m.id} value={m.id}>{m.display_name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="least_relevant_metric"
				label={<Typography.Text strong>7. Qual a métrica que considera menos relevante ou informativa para determinar o grau de credibilidade deste artigo?</Typography.Text>}
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{metricsInfo.map(m => <Select.Option key={m.id} value={m.id}>{m.display_name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item>
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

export { FirstImpressionsForm, CredibilityForm, MetricsForm }