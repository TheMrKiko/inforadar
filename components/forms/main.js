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
			<Typography.Title level={3}>Título do artigo</Typography.Title>
			<Form.Item
				name="change_in_perception"
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
				name="info_is_useful"
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

export { GeneralPerceptionForm, ArticleTitleForm }