import React, { useEffect, useState } from 'react';
import Metric from './metric';
import { getMainCategory } from '../helpers/function';

import { Card, Col, Radio, Row, Select, Typography } from 'antd';

import utilStyles from '../styles/utils.module.css';

const Metrics = ({ categories, metricsData, metricsInfo, metricsHistogram, indicatorsInfo, indicatorsData, inner = false }) => {
	const [categorySelected, setCategorySelected] = useState(categories && categories[0].id)
	const [filter, setFilter] = useState("simple")

	useEffect(() => {
		categories && indicatorsInfo && indicatorsData && setCategorySelected(getMainCategory(categories, indicatorsData[indicatorsInfo[0].id]).id)
	}, [categories, indicatorsInfo, indicatorsData])

	return (
		<Card
			title={
				<Typography.Text className={utilStyles.whiteSpaceNormal}>
					<Typography.Text>MÉTRICAS EXPLICATIVAS FACE À COLEÇÃO DE </Typography.Text>
					<Select
						loading={!categories}
						disabled={!categories}
						value={categorySelected}
						onChange={setCategorySelected}>
						{
							categories && categories.map(cat => (
								<Select.Option key={cat.id} value={cat.id}>{cat.display_name}</Select.Option>
							))
						}
					</Select>
				</Typography.Text>
			}
			extra={<Radio.Group defaultValue="simple" onChange={(a) => setFilter(a.target.value)}>
				<Radio.Button value="simple">Simples</Radio.Button>
				<Radio.Button value="details">Detalhado</Radio.Button>
			</Radio.Group>}
			loading={!metricsData}
			type={inner && 'inner'}
		>
			<Row wrap gutter={[24, 24]}>
				{categories && metricsData && metricsInfo.map(metric => (
					<Col span={24} md={12} key={metric.id}>
						<Metric
							filter={filter}
							categories={categories}
							category={categorySelected}
							info={metric}
							data={metricsData[metric.id]}
							histogram={metricsHistogram && metricsHistogram[metric.id]}
						/>
					</Col>
				))}
			</Row>
		</Card>
	)
}

export default Metrics