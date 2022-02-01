import React from 'react';
import { colorScaleClass } from '../helpers/color';
import { levelLabels } from '../helpers/label';

import { Collapse, Space, Typography } from 'antd';

import utilStyles from '../styles/utils.module.css';


const RadarLegend = ({ categories, info, data }) => (
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

export default RadarLegend