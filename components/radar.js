import React from 'react';
import { colorScaleClass, colorScaleType } from '../helpers/color';
import { levelLabels } from '../helpers/label';

import { Group } from '@visx/group';
import { Point } from '@visx/point';
import { scaleLinear } from '@visx/scale';
import { Circle, Line } from '@visx/shape';
import { Text } from '@visx/text';

const pumpkin = "#CC333F";
const silver = "#8C8C8C";

const genEdgePoints = (axes, radius) => {
	const step = (Math.PI * 2) / axes.length;
	const multPoint = (p, v) => new Point({ x: p.x * v, y: p.y * v })
	return axes.map((a, i) => {
		const absPoint = new Point({
			x: Math.sin(i * step),
			y: -Math.cos(i * step)
		});
		return ({
			info: a,
			point: multPoint(absPoint, radius),
			outerPoint: multPoint(absPoint, radius + 10),
		})
	}
	);
};

function genDataPoints(data, scale, getValue) {
	const step = (Math.PI * 2) / data.length;
	return data.map((val, i) => {
		const xVal = scale(getValue(val)) * Math.sin(i * step);
		const yVal = -scale(getValue(val)) * Math.cos(i * step);
		return new Point({ x: xVal, y: yVal });
	});
}

const defaultMargin = { top: 40, left: 85, right: 85, bottom: 40 };

const Radar = ({ width, height, margin = defaultMargin, categories, info, data }) => {
	const levels = 4;
	const zeroPoint = new Point({ x: 0, y: 0 });

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;
	const radius = Math.min(xMax, yMax) / 2;

	const y = (d) => d.score;
	const yScale = scaleLinear({
		range: [0, radius],
		domain: [0, 1]
	});

	const categoriesData = categories.map(category => data.categories[category.id])
	const maxi = categoriesData.reduce((maxi, _, ci, array) => array[ci].score > array[maxi].score ? ci : maxi, 0);
	const edgePoints = genEdgePoints(categories, radius);
	const dataPoints = genDataPoints(categoriesData, (d) => yScale(d) ?? 0, y);

	return width < 10 ? null : (
		<svg width={width} height={height - margin.top - margin.bottom}>
			<Group top={height / 2 - margin.top} left={width / 2}>
				<Group
					opacity={0.7}
				>
					{[...new Array(levels)].map((_, i) => (
						<Circle
							className={colorScaleClass(levels - 1 - i, colorScaleType.LIGHT)}
							key={`web-${levels - 1 - i}`}
							cx={zeroPoint.x}
							cy={zeroPoint.y}
							r={((levels - 1 - i + 1) * radius) / levels}
							stroke={silver}
							strokeWidth={1}
							strokeLinecap="round"
						/>
					))}
					{[...new Array(levels)].map((_, i) => (
						<Text
							x={0}
							y={(((i + 1) * radius) / levels) - 10}
							verticalAnchor="middle"
							textAnchor="middle"
							fontSize={10}
							fontWeight={300}
							className={colorScaleClass(i, colorScaleType.MONO)}
							key={`web-${i}`}
						>
							{levelLabels[i]}
						</Text>
					))}
				</Group>
				{edgePoints.map((point, i) => (
					<Line
						key={`radar-line-${i}`}
						from={zeroPoint}
						to={point.point}
						stroke={silver}
						strokeWidth={2}
					/>
				))}
				{edgePoints.map((point, i) => (
					<Text
						x={point.outerPoint.x}
						y={point.outerPoint.y}
						verticalAnchor={point.point.y > 0 ? 'start' : (point.point.y < 0 ? 'end' : 'middle')}
						textAnchor={point.point.x > 0 ? 'start' : (point.point.x < 0 ? 'end' : 'middle')}
						{...i == maxi ? {
							fontWeight: 'bold',
							className: colorScaleClass(3)
						} : {}}
					>
						{point.info.display_name}
					</Text>
				))
				}
				{
					dataPoints.map((point, i) => (
						<Line
							key={`radar-oline-${i}`}
							from={zeroPoint}
							to={point}
							stroke={pumpkin}
							strokeWidth={i == maxi ? 3 : 2}
						/>
					))
				}
				{
					dataPoints.map((point, i) => (
						<Circle
							key={`radar-point-${i}`}
							cx={point.x}
							cy={point.y}
							r={i == maxi ? 5 : 4}
							fill={'white'}
							stroke={pumpkin}
							strokeWidth={1}
						/>
					))
				}
			</Group >
		</svg >
	);
}

export default Radar