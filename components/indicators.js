import React from 'react'
import { Card, Collapse, Space, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import utilStyles from '../styles/utils.module.css'

const levelLabels = {
	0: 'baixo',
	1: 'médio baixo',
	2: 'médio alto',
	3: 'alto',
	4: 'exato',
}

const Radar = ({ info, data }) => (
	<Collapse
		accordion
		expandIconPosition={'right'}
		ghost
	>
		{info.categories
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
			.map(category => {
				const { categoryData, level, label } = category
				return (
					<Collapse.Panel
						header={
							<Space direction={'horizontal'} align={'center'}>
								<Typography.Text className={utilStyles[`labelcolor${level}`]}>⬤</Typography.Text>
								<Typography.Title className={utilStyles.noMargin} level={5}>{category.display_name}</Typography.Title>
								<Typography.Text className={utilStyles[`labelcolor${level}`]} strong>{label}</Typography.Text>
							</Space>
						}
						key={category.id}
					>
						<Typography.Paragraph>
							O artigo apresentado partilha um conjunto <Typography.Text strong>{label}</Typography.Text> ({categoryData.score}) de características com artigos classificados como <Typography.Text strong>{category.display_name}</Typography.Text>.
						</Typography.Paragraph>
					</Collapse.Panel>
				)
			})}
	</Collapse>
)

export default function Indicators({ indicatorsData, indicatorsInfo }) {
	return (
		<Card
			title={"ARTIGO FACE ÀS COLEÇÕES DE REFERÊNCIA"}
			extra={<InfoCircleOutlined />}
			loading={!indicatorsData}
		>
			{indicatorsData && indicatorsInfo.map(indicator => (
				<Radar
					key={indicator.id}
					info={indicator}
					data={indicatorsData[indicator.id]}
				/>
			))}
		</Card>
	)
}