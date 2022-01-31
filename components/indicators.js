import React, { useState } from 'react'
import { colorScaleClass } from "../helpers/color";
import { Card, Collapse, Button, Select, Space, Typography, Row, Col } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import Example from './radar'

import utilStyles from '../styles/utils.module.css'

const levelLabels = {
	0: 'baixo',
	1: 'médio-baixo',
	2: 'médio-alto',
	3: 'alto',
	4: 'exato',
}

const Feedback = ({ categories }) => {
	const [feedback, setFeedback] = useState()
	const [feedbackSuggested, setFeedbackSuggested] = useState(false)
	const [suggestionSelected, setSuggestionSelected] = useState(categories && categories[0].id)
	const isFeedbackGiven = () => feedback == "agree" || (feedback == "disagree" && feedbackSuggested)
	return !isFeedbackGiven() ? (
		feedback != "disagree" ? (
			<Row>
				<Typography.Text type={'secondary'}>Concorda com esta classificação?</Typography.Text>
				<Button type={'link'} size={'small'} onClick={() => setFeedback("agree")}>Sim</Button>
				<Button type={'link'} size={'small'} onClick={() => setFeedback("disagree")}>Não</Button>
			</Row>
		) : (
			<Row>
				<Space>
					<Typography.Text type={'warning'}>O artigo deve ser classificado como</Typography.Text>
					<Select
						size={'small'}
						loading={!categories}
						disabled={!categories}
						value={suggestionSelected}
						onChange={setSuggestionSelected}
					>
						{
							categories && categories.map(cat => (
								<Select.Option key={cat.id} value={cat.id}>{cat.display_name}</Select.Option>
							))
						}
					</Select>
					<Button size={'small'} type={'primary'} onClick={() => setFeedbackSuggested(true)}>Confirmar</Button>
					<Button size={'small'} type={'link'} onClick={() => setFeedback()}>Anular</Button>
				</Space>
			</Row>
		)
	) : <Typography.Text type={'success'}>
		Obrigado pela sua opinião.
		<Button size={'small'} type={'link'} onClick={() => { setFeedback(); setFeedbackSuggested(false) }}>Anular</Button>
	</Typography.Text>
}

const Radar = ({ categories, info, data }) => (
	<Collapse
		accordion
		expandIconPosition={'right'}
		ghost
		defaultActiveKey={0}
	>
		{categories
			.map(category => {
				const categoryData = data.categories[category.id]
				const level = Math.trunc(categoryData.score * 4)
				const label = levelLabels[level]
				return {
					categoryData: categoryData,
					level: level,
					label: label,
					...category
				}
			})
			.sort((a, b) => b.categoryData.score - a.categoryData.score)
			.map((category, i) => {
				const { categoryData, level, label } = category
				return (
					<Collapse.Panel
						header={
							<Space direction={'horizontal'} align={'center'}>
								<Typography.Text className={colorScaleClass(level)}>⬤</Typography.Text>
								<Typography.Title className={utilStyles.noMargin} level={5}>{category.display_name}</Typography.Title>
								<Typography.Text className={colorScaleClass(level)} strong>{label}</Typography.Text>
							</Space>
						}
						key={i}
					>
						<Typography.Paragraph>
							O artigo apresentado partilha um conjunto <Typography.Text strong>{label}</Typography.Text> de características com artigos classificados como <Typography.Text strong>{category.display_name.toLowerCase()}</Typography.Text>.
						</Typography.Paragraph>
					</Collapse.Panel>
				)
			})}
	</Collapse>
)

export default function Indicators({ categories, indicatorsData, indicatorsInfo }) {
	return (
		<Card
			title={"ARTIGO FACE ÀS COLEÇÕES DE REFERÊNCIA"}
			extra={<InfoCircleOutlined />}
			loading={!indicatorsData}
		>
			{indicatorsData && indicatorsInfo.map(indicator => (<>
				<Row justify={'center'}>
					<Col span={24} lg={{ span: 14 }}>
						<ParentSize>{({ width, height }) => (
							<Example
								width={width}
								height={width}
								categories={categories}
								info={indicator}
								data={indicatorsData[indicator.id]}
							/>
						)}
						</ParentSize>
					</Col>
					<Col span={24} lg={{ span: 10 }}>
						<Radar
							key={indicator.id}
							categories={categories}
							info={indicator} //useless
							data={indicatorsData[indicator.id]}
						/>
					</Col>
				</Row>
				<Row justify={'end'}>
					<Col>
						<Feedback categories={categories} />
					</Col>
				</Row>
			</>
			))}
		</Card>
	)
}