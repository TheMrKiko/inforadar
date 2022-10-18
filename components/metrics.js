import React, { useEffect, useState } from 'react';
import Metric from './metric';
import { getMainCategory } from '../helpers/function';

import { Card, Col, Row, Segmented, Select, Space, Typography } from 'antd';
import { BarChartOutlined, LineOutlined } from '@ant-design/icons';

import utilStyles from '../styles/utils.module.css';

const Metrics = ({ categories, metricsData, metricsInfo, metricsHistogram, indicatorsInfo, indicatorsData, inner = false }) => {
	const [categorySelected, setCategorySelected] = useState(categories && categories[0].id)
	const [filter, setFilter] = useState("simple")

	useEffect(() => {
		categories && !categorySelected && setCategorySelected(categories && categories[0].id)
	}, [categories, categorySelected])

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
			extra={<Space wrap>
				<Typography.Text type={'secondary'}>
					{filter === 'simple' ? "Simples" : "Detalhado"}
				</Typography.Text>
				<Segmented
					value={filter} onChange={setFilter}
					options={[
						{
							value: 'simple',
							icon: <LineOutlined />,
						},
						{
							value: 'details',
							icon: <BarChartOutlined />,
						},
					]} />
			</Space>}
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