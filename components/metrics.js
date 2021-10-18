import React, { useState, useEffect } from 'react'
import { colorScaleClass, colorScaleType } from "../helpers/color";
import { Card, Col, Space, Row, Select, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import cn from 'classnames';

import { Bar as BarShape, BarRounded, Line } from '@visx/shape';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { scaleLinear } from "@visx/scale";
import { Group } from '@visx/group';
import { Point } from "@visx/point";
import { ClipPath } from '@visx/clip-path';

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

const levelLabels = {
	0: 'baixo',
	1: 'médio baixo',
	2: 'médio alto',
	3: 'alto',
	4: 'exato',
}


const Metrics = ({ categories, metricsData, metricsInfo }) => {
	const [categorySelected, setCategorySelected] = useState(categories && categories[0].id)

	useEffect(() => {
		setCategorySelected(categories[0].id)
	}, [categories])

	return (
		<Card
			title={
				<Space>
					<Typography.Text>MÉTRICAS EXPLICATIVAS DE</Typography.Text>
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
				</Space>
			}
			extra={<InfoCircleOutlined />}
			loading={!metricsData}
		>
			<Row wrap gutter={[24, 24]}>
				{categories && metricsData && metricsInfo.map(metric => (
					<Col span={12} key={metric.id}>
						<Metric
							categories={categories}
							category={categorySelected}
							info={metric}
							data={metricsData[metric.id]}
						/>
					</Col>
				))}
			</Row>
		</Card>
	)
}

const Metric = ({ category, categories, info, data }) => {
	const level = Math.trunc(data.score * 4)
	const label = levelLabels[level]
	return (
		<Card
			title={info.display_name}
			extra={<Typography.Text className={colorScaleClass(level)} strong>{label}</Typography.Text>}
			type={'inner'}
			className={styles.innercard}>
			<ParentSize>{({ width, height }) => (
				<Bar
					width={width}
					height={10}
					category={category}
					categories={categories}
					info={info}
					data={data}
				/>
			)
			}</ParentSize>
			<Typography.Text>{info.description}</Typography.Text>
		</Card>
	)
}

function genQuartileMarkers(data, scale) {
	return [data.first_quartile, data.second_quartile, data.third_quartile].map(scale);
}

function genQuartiles(quartileData, scale) {
	return [scale(0), ...quartileData, scale(1)].reduce((acc, curV, curI, array) => (
		[...(acc || []), {
			start: array[curI - 1],
			end: curV
		}]
	));
}

const Bar = ({ category, categories, info, data, width, height }) => {

	const x = (d) => d.score;
	const xScale = scaleLinear({
		range: [0, width],
		domain: [0, 1]
	});
	const quartileData = info.categories[category]
	const quartileMarkers = genQuartileMarkers(quartileData, (d) => xScale(d) ?? 0)
	const quartiles = genQuartiles(quartileMarkers, (d) => xScale(d) ?? 0)

	return width < 10 ? null : (
		<svg width={width} height={height}>
			<BarRounded
				key={`metric-main-bar`}
				height={height}
				width={width}
				all
				fill={'#E5E5E5'}
				x={0}
				y={0}
				radius={5}
			/>
			<ClipPath id={`clipbar-${info.id}`}>
				<BarRounded
					key={`metric-value-bar`}
					height={height}
					width={xScale(x(data))}
					all
					x={0}
					y={0}
					radius={5}
				/>
			</ClipPath>
			{quartiles.map((quartile, i) => (
				<BarShape
					key={`metric-quartile-bar-${i}`}
					height={height}
					width={quartile.end - quartile.start}
					className={cn(colorScaleClass(i), utilStyles.transitionAll)}
					x={quartile.start}
					y={0}
					clipPath={`url(#clipbar-${info.id})`}
				/>
			))}
			{quartileMarkers.map((marker, i) => (
				<Line
					key={`metric-quartile-marker-${i}`}
					className={utilStyles.transitionAll}
					from={new Point({ x: 0, y: 0 })}
					to={new Point({ x: 0, y: height })}
					style={{ transform: `translate(${marker}px, 0)` }}
					stroke={'white'}
					strokeWidth={1}
				/>
			))}
		</svg>
	);
}

export default Metrics