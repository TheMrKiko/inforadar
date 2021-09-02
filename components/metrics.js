import React from 'react'
import { Card, Col, Space, Row, Select, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import { BarStackHorizontal, BarRounded } from '@visx/shape';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { scaleLinear } from "@visx/scale";
import { Group } from '@visx/group';

import styles from '../styles/Home.module.css'

const levelLabels = {
	0: 'baixo',
	1: 'médio baixo',
	2: 'médio alto',
	3: 'alto',
	4: 'exato',
}


const Metrics = ({ categories, metricsData, metricsInfo }) => (
	<Card
		title={
			<Space>
				<Typography.Text>MÉTRICAS EXPLICATIVAS DE</Typography.Text>
				<Select
					loading={!categories}
					disabled={!categories}
					defaultValue={categories && categories[0].id}
				/* onChange={handleChange} */> {
						categories && categories.map(cat => (
							<Select.Option value={cat.id}>{cat.display_name}</Select.Option>
						))
					}
				</Select>
			</Space>
		}
		extra={<InfoCircleOutlined />}
		loading={!metricsData}
	>
		<Row wrap gutter={[24, 24]}>
			{metricsData && metricsInfo.map(metric => (
				<Col span={12} key={metric.id}>
					<Metric
						info={metric}
						data={metricsData[metric.id]}
					/>
				</Col>
			))}
		</Row>
	</Card>
)

const Metric = ({ info, data }) => {
	const level = Math.trunc(data.score * 4)
	const label = levelLabels[level]
	return (
		<Card
			title={info.display_name}
			extra={label}
			type={'inner'}
			className={styles.innercard}>
			<ParentSize>{({ width, height }) => (
				<Bar
					width={width}
					height={10}
					info={info}
					data={data}
				/>
			)
			}</ParentSize>
			<Typography.Text>{info.description}</Typography.Text>
		</Card>
	)
}

const Bar = ({ info, data, width, height }) => {

	const x = (d) => d.score;
	const xScale = scaleLinear({
		range: [0, width],
		domain: [0, 1]
	});

	return width < 10 ? null : (
		<svg width={width} height={height}>
			<BarRounded
				key={`barstack-horizontal-${height}`}
				height={height}
				width={width}
				all
				fill={'#E5E5E5'}
				x={0}
				y={0}
				radius={5}
			/>
			<BarRounded
				key={`barstack-horizontal-${height}`}
				height={height}
				width={xScale(x(data))}
				all
				fill={'blue'}
				x={0}
				y={0}
				radius={5}
			/>
		</svg>
	);
}

export default Metrics