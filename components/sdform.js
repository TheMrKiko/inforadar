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
			labelWrap
			{...layout}
		>
			<Form.Item
				name="nationality"
				label="Nacionalidade"
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
				name="age"
				label="Idade"
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
				label="Formação académica"
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
				label="Situação Profissional"
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

const yesno = [
	{ "id": 1, "name": "Sim" },
	{ "id": 0, "name": "Não" },
]

const age = [
	{ "id": 1, "name": "< 18" },
	{ "id": 2, "name": "18 - 25" },
	{ "id": 3, "name": "26 - 40" },
	{ "id": 4, "name": "41 - 60" },
	{ "id": 5, "name": "60+" },
]

const qualifications = [
	{ "id": 1, "name": "Ensino básico" },
	{ "id": 2, "name": "Ensino secundário" },
	{ "id": 3, "name": "Bacharelato ou Licenciatura" },
	{ "id": 4, "name": "Mestrado" },
	{ "id": 5, "name": "Doutoramento" },
]

const job = [
	{ "id": 1, "name": "Estudante" },
	{ "id": 2, "name": "Empregado" },
	{ "id": 3, "name": "Desempregado" },
	{ "id": 4, "name": "Reformado" },
	{ "id": 5, "name": "Outra" },
]

const consumedContent = [
	{ "id": 1, "name": "Livros" },
	{ "id": 2, "name": "Jornais" },
	{ "id": 3, "name": "Revistas" },
	{ "id": 4, "name": "Blogues" },
	{ "id": 5, "name": "Outros" },
]

const newsConsumption = [
	{ "id": 1, "name": "Meios impressos" },
	{ "id": 2, "name": "Plataformas online, sem recurso a redes sociais" },
	{ "id": 3, "name": "Redes sociais" },
	{ "id": 4, "name": "TV" },
	{ "id": 5, "name": "Rádio" },
	{ "id": 6, "name": "Outros" },
]

const countries = [
	{ "id": 1, "name": "Afeganistão" },
	{ "id": 2, "name": "África do Sul" },
	{ "id": 3, "name": "Albânia" },
	{ "id": 4, "name": "Alemanha" },
	{ "id": 5, "name": "Andorra" },
	{ "id": 6, "name": "Angola" },
	{ "id": 7, "name": "Anguila" },
	{ "id": 8, "name": "Antígua e Barbuda" },
	{ "id": 9, "name": "Antilhas Holandesas" },
	{ "id": 10, "name": "Arábia Saudita" },
	{ "id": 11, "name": "Argélia" },
	{ "id": 12, "name": "Argentina" },
	{ "id": 13, "name": "Armênia" },
	{ "id": 14, "name": "Aruba" },
	{ "id": 15, "name": "Austrália" },
	{ "id": 16, "name": "Áustria" },
	{ "id": 17, "name": "Azerbaijão" },
	{ "id": 18, "name": "Bahamas" },
	{ "id": 19, "name": "Bahrein" },
	{ "id": 20, "name": "Bangladesh" },
	{ "id": 21, "name": "Barbados" },
	{ "id": 22, "name": "Bélgica" },
	{ "id": 23, "name": "Belize" },
	{ "id": 24, "name": "Benim" },
	{ "id": 25, "name": "Bermudas" },
	{ "id": 26, "name": "Bielorrússia" },
	{ "id": 27, "name": "Bolívia" },
	{ "id": 28, "name": "Bósnia e Herzegovina" },
	{ "id": 29, "name": "Botswana" },
	{ "id": 30, "name": "Brasil" },
	{ "id": 31, "name": "Brunei" },
	{ "id": 32, "name": "Bulgária" },
	{ "id": 33, "name": "Burquina Fasso" },
	{ "id": 34, "name": "Burundi" },
	{ "id": 35, "name": "Butão" },
	{ "id": 36, "name": "Cabo Verde" },
	{ "id": 37, "name": "Camarões" },
	{ "id": 38, "name": "Camboja" },
	{ "id": 39, "name": "Canadá" },
	{ "id": 40, "name": "Cazaquistão" },
	{ "id": 41, "name": "Chade" },
	{ "id": 42, "name": "Chile" },
	{ "id": 43, "name": "China" },
	{ "id": 44, "name": "Chipre" },
	{ "id": 45, "name": "Colômbia" },
	{ "id": 46, "name": "Comores" },
	{ "id": 47, "name": "República do Congo" },
	{ "id": 48, "name": "Coreia do Norte" },
	{ "id": 49, "name": "Coreia do Sul" },
	{ "id": 50, "name": "Costa do Marfim" },
	{ "id": 51, "name": "Costa Rica" },
	{ "id": 52, "name": "Croácia" },
	{ "id": 53, "name": "Cuba" },
	{ "id": 54, "name": "Curaçau" },
	{ "id": 55, "name": "Dinamarca" },
	{ "id": 56, "name": "Djibouti" },
	{ "id": 57, "name": "Dominica" },
	{ "id": 58, "name": "Egito" },
	{ "id": 59, "name": "El Salvador" },
	{ "id": 60, "name": "Emirados Árabes Unidos" },
	{ "id": 61, "name": "Equador" },
	{ "id": 62, "name": "Eritreia" },
	{ "id": 63, "name": "Escócia" },
	{ "id": 64, "name": "Eslováquia" },
	{ "id": 65, "name": "Eslovênia" },
	{ "id": 66, "name": "Espanha" },
	{ "id": 67, "name": "Estados Federados da Micronésia" },
	{ "id": 68, "name": "Estados Unidos" },
	{ "id": 69, "name": "Estónia" },
	{ "id": 70, "name": "Etiópia" },
	{ "id": 71, "name": "Fiji" },
	{ "id": 72, "name": "Filipinas" },
	{ "id": 73, "name": "Finlândia" },
	{ "id": 74, "name": "França" },
	{ "id": 75, "name": "Gabão" },
	{ "id": 76, "name": "Gâmbia" },
	{ "id": 77, "name": "Gana" },
	{ "id": 78, "name": "Geórgia" },
	{ "id": 79, "name": "Granada" },
	{ "id": 80, "name": "Grécia" },
	{ "id": 81, "name": "Guadalupe" },
	{ "id": 82, "name": "Guam" },
	{ "id": 83, "name": "Guatemala" },
	{ "id": 84, "name": "Guiana" },
	{ "id": 85, "name": "Guiana Francesa" },
	{ "id": 86, "name": "Guiné" },
	{ "id": 87, "name": "Guiné Equatorial" },
	{ "id": 88, "name": "Guiné - Bissau" },
	{ "id": 89, "name": "Haiti" },
	{ "id": 90, "name": "Honduras" },
	{ "id": 91, "name": "Hong Kong" },
	{ "id": 92, "name": "Hungria" },
	{ "id": 93, "name": "Iêmen" },
	{ "id": 94, "name": "Ilhas Caimã" },
	{ "id": 95, "name": "Ilhas Cook" },
	{ "id": 96, "name": "Ilhas Feroé" },
	{ "id": 97, "name": "Ilhas Salomão" },
	{ "id": 98, "name": "Ilhas Virgens Americanas" },
	{ "id": 99, "name": "Ilhas Virgens Britânicas" },
	{ "id": 100, "name": "Índia" },
	{ "id": 101, "name": "Indonésia" },
	{ "id": 102, "name": "Inglaterra" },
	{ "id": 103, "name": "Irão" },
	{ "id": 104, "name": "Iraque" },
	{ "id": 105, "name": "Irlanda" },
	{ "id": 106, "name": "Irlanda do Norte" },
	{ "id": 107, "name": "Islândia" },
	{ "id": 108, "name": "Israel" },
	{ "id": 109, "name": "Itália" },
	{ "id": 110, "name": "Jamaica" },
	{ "id": 111, "name": "Japão" },
	{ "id": 112, "name": "Jordânia" },
	{ "id": 113, "name": "Kiribati" },
	{ "id": 114, "name": "Kosovo" },
	{ "id": 115, "name": "Kuwait" },
	{ "id": 116, "name": "Laos" },
	{ "id": 117, "name": "Lesoto" },
	{ "id": 118, "name": "Letônia" },
	{ "id": 119, "name": "Líbano" },
	{ "id": 120, "name": "Libéria" },
	{ "id": 121, "name": "Líbia" },
	{ "id": 122, "name": "Liechtenstein" },
	{ "id": 123, "name": "Lituânia" },
	{ "id": 124, "name": "Luxemburgo" },
	{ "id": 125, "name": "Macau" },
	{ "id": 126, "name": "Macedônia do Norte" },
	{ "id": 127, "name": "Madagáscar" },
	{ "id": 128, "name": "Malásia" },
	{ "id": 129, "name": "Malawi" },
	{ "id": 130, "name": "Maldivas" },
	{ "id": 131, "name": "Mali" },
	{ "id": 132, "name": "Malta" },
	{ "id": 133, "name": "Marrocos" },
	{ "id": 134, "name": "Martinica" },
	{ "id": 135, "name": "Maurícia" },
	{ "id": 136, "name": "Mauritânia" },
	{ "id": 137, "name": "México" },
	{ "id": 138, "name": "Mianmar" },
	{ "id": 139, "name": "Moçambique" },
	{ "id": 140, "name": "Moldávia" },
	{ "id": 141, "name": "Mónaco" },
	{ "id": 142, "name": "Mongólia" },
	{ "id": 143, "name": "Montenegro" },
	{ "id": 144, "name": "Monserrate" },
	{ "id": 145, "name": "Namíbia" },
	{ "id": 146, "name": "Nauru" },
	{ "id": 147, "name": "Nepal" },
	{ "id": 148, "name": "Nicarágua" },
	{ "id": 149, "name": "Níger" },
	{ "id": 150, "name": "Nigéria" },
	{ "id": 151, "name": "Noruega" },
	{ "id": 152, "name": "Nova Caledônia" },
	{ "id": 153, "name": "Nova Zelândia" },
	{ "id": 154, "name": "Omã" },
	{ "id": 155, "name": "País de Gales" },
	{ "id": 156, "name": "Países Baixos" },
	{ "id": 157, "name": "Palau" },
	{ "id": 158, "name": "Palestina" },
	{ "id": 159, "name": "Panamá" },
	{ "id": 160, "name": "Papua - Nova Guiné" },
	{ "id": 161, "name": "Paquistão" },
	{ "id": 162, "name": "Paraguai" },
	{ "id": 163, "name": "Peru" },
	{ "id": 164, "name": "Polinésia Francesa" },
	{ "id": 165, "name": "Polónia" },
	{ "id": 166, "name": "Porto Rico" },
	{ "id": 167, "name": "Portugal" },
	{ "id": 168, "name": "Catar" },
	{ "id": 169, "name": "Quênia" },
	{ "id": 170, "name": "Quirguistão" },
	{ "id": 171, "name": "Reino Unido" },
	{ "id": 172, "name": "República Centro - Africana" },
	{ "id": 173, "name": "Chéquia" },
	{ "id": 174, "name": "Taiwan" },
	{ "id": 175, "name": "República Democrática do Congo" },
	{ "id": 176, "name": "República Dominicana" },
	{ "id": 177, "name": "Roménia" },
	{ "id": 178, "name": "Ruanda" },
	{ "id": 179, "name": "Rússia" },
	{ "id": 180, "name": "São Martinho" },
	{ "id": 181, "name": "Samoa" },
	{ "id": 182, "name": "Samoa Americana" },
	{ "id": 183, "name": "Santa Lúcia" },
	{ "id": 184, "name": "São Cristóvão e Neves" },
	{ "id": 185, "name": "San Marino" },
	{ "id": 186, "name": "São Tomé e Príncipe" },
	{ "id": 187, "name": "São Vicente e Granadinas" },
	{ "id": 188, "name": "Senegal" },
	{ "id": 189, "name": "Serra Leoa" },
	{ "id": 190, "name": "Sérvia" },
	{ "id": 191, "name": "Seicheles" },
	{ "id": 192, "name": "Singapura" },
	{ "id": 193, "name": "São Martinho" },
	{ "id": 194, "name": "Síria" },
	{ "id": 195, "name": "Somália" },
	{ "id": 196, "name": "Sri Lanka" },
	{ "id": 197, "name": "Essuatíni" },
	{ "id": 198, "name": "Sudão" },
	{ "id": 199, "name": "Suécia" },
	{ "id": 200, "name": "Suíça" },
	{ "id": 201, "name": "Suriname" },
	{ "id": 202, "name": "Tajiquistão" },
	{ "id": 203, "name": "Tailândia" },
	{ "id": 204, "name": "Taipé Chinesa" },
	{ "id": 205, "name": "Tanzânia" },
	{ "id": 206, "name": "Timor - Leste" },
	{ "id": 207, "name": "Togo" },
	{ "id": 208, "name": "Tonga" },
	{ "id": 209, "name": "Trinidad e Tobago" },
	{ "id": 210, "name": "Tunísia" },
	{ "id": 211, "name": "Turcas e Caicos" },
	{ "id": 212, "name": "Turquemenistão" },
	{ "id": 213, "name": "Turquia" },
	{ "id": 214, "name": "Tuvalu" },
	{ "id": 215, "name": "Ucrânia" },
	{ "id": 216, "name": "Uganda" },
	{ "id": 217, "name": "Uruguai" },
	{ "id": 218, "name": "Uzbequistão" },
	{ "id": 219, "name": "Vanuatu" },
	{ "id": 220, "name": "Vaticano" },
	{ "id": 221, "name": "Venezuela" },
	{ "id": 222, "name": "Vietnã" },
	{ "id": 223, "name": "Zâmbia" },
	{ "id": 224, "name": "Zimbabwe" },
]

export default SocioDemForm