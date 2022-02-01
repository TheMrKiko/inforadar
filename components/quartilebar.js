import React from 'react';
import { colorScaleClass } from '../helpers/color';

import { ClipPath } from '@visx/clip-path';
import { Point } from '@visx/point';
import { scaleLinear } from '@visx/scale';
import { Bar as BarShape, BarRounded, Line } from '@visx/shape';

import utilStyles from '../styles/utils.module.css';

function genQuartileMarkers(data, scale) {
	return [data.first_quartile, data.second_quartile, data.third_quartile].map(scale);
}

function genQuartiles(quartileData, scale) {
	return [scale(0), ...quartileData, scale(100)].reduce((acc, curV, curI, array) => (
		[...(acc || []), {
			start: array[curI - 1],
			end: curV
		}]
	));
}

const QuartileBar = ({ category, categories, info, data, width, height }) => {

	const x = (d) => d.categories[category];
	const xScale = scaleLinear({
		range: [0, width],
		domain: [0, 100]
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
					width={xScale(x(data.percentiles))}
					className={utilStyles.transitionAll}
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
					className={colorScaleClass(i)}
					x={quartile.start}
					y={0}
					clipPath={`url(#clipbar-${info.id})`}
				/>
			))}
			{quartileMarkers.map((marker, i) => (
				<Line
					key={`metric-quartile-marker-${i}`}
					from={new Point({ x: 0, y: 0 })}
					to={new Point({ x: 0, y: height })}
					style={{ transform: `translate(${marker}px, 0)` }}
					stroke={'white'}
					fill={'white'}
					strokeWidth={2}
				/>
			))}
		</svg>
	);
}

export default QuartileBar