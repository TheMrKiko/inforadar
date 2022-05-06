import { countries, gender, age, qualifications, yesno, job, consumedContent, newsConsumption } from '../helpers/form';

import { Form, Checkbox, Input, Button, Radio, Switch, Select, Space, Row, Col } from 'antd';

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

const validateMessages = {
	required: "Campo obrigatório.",
	array: {
		max: "Pode, no máximo, selecionar ${max} opções.",
	},
};

const SocioDemForm = ({ onSubmit, submitting }) => {
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
			name="sociodemographic"
			onFinish={onFinish}
			validateMessages={validateMessages}
			colon={false}
			labelWrap
			{...layout}
		>
			<Form.Item
				name="nationality"
				label="Qual a sua nacionalidade?"
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
					showSearch
					optionFilterProp="children"
				>
					{countries.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="gender"
				label="Qual das seguintes opções melhor descreve o seu género?"
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{gender.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="age"
				label="Qual a sua faixa etária?"
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{age.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="qualifications"
				label="Qual a sua formação académica?"
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{qualifications.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="cs_qualifications"
				label="Tem formação ou exerce atividade na área de comunicação social?"
				rules={[{ required: true }]}
			>
				<Radio.Group>
					{yesno.map(c => <Radio.Button key={c.id} value={c.id}>{c.name}</Radio.Button>)}
				</Radio.Group>
			</Form.Item>
			<Form.Item
				name="job"
				label="Qual a sua situação profissional?"
				rules={[{ required: true }]}
			>
				<Select
					placeholder="Escolha uma opção"
					allowClear
				>
					{job.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
				</Select>
			</Form.Item>
			<Form.Item
				name="consumed_content"
				label="Que tipo de conteúdo consome com maior frequência?"
				rules={[{ max: 3, type: 'array' }, { required: true }]}
			>
				<Checkbox.Group>
					<Row>
						{consumedContent.map(c =>
							<Col span={8}>
								<Checkbox key={c.id} value={c.id}>{c.name}</Checkbox>
							</Col>
						)}
					</Row>
				</Checkbox.Group>
			</Form.Item>
			<Form.Item
				name="news_consumption"
				label="Qual o tipo de meio que mais utiliza para consumir notícias?"
				rules={[{ required: true }]}
			>
				<Radio.Group>
					<Row>
						{newsConsumption.map(c =>
							<Col span={24}>
								<Radio key={c.id} value={c.id}>{c.name}</Radio>
							</Col>
						)}
					</Row>
				</Radio.Group>
			</Form.Item>
			<Form.Item {...tailLayout}>
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
	);
};

export default SocioDemForm