import React from 'react';
import Histogram from './histogram';
import QuartileBar from './quartilebar';
import { colorScaleClass } from '../helpers/color';
import { levelLabels } from '../helpers/label';

import { Card, Space, Typography } from 'antd';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import styles from '../styles/Home.module.css';

const Metric = ({ filter, category, categories, info, data, histogram }) => {
	const level = Math.trunc((data.percentiles.categories[category] / 100) * 4) // TODO remove hardcoded
	const label = levelLabels[level]
	const isPercentage = info.description.includes("percentagem")
	return (
		<Card
			title={info.display_name}
			extra={<Typography.Text className={colorScaleClass(level)} strong>{label}</Typography.Text>}
			type={'inner'}
			className={styles.innercard}>
			<ParentSize>{({ width, height }) => (
				<QuartileBar
					width={width}
					height={10}
					category={category}
					categories={categories}
					info={info}
					data={data}
				/>
			)}</ParentSize>
			<Typography.Text>{info.description}</Typography.Text>
			{filter == "details" && (
				<>
					<Typography.Title level={5}>Detalhes</Typography.Title>
					<Space direction={'vertical'}>
						<Typography.Text>
							O artigo tem uma {isPercentage ? "percentagem" : "pontuação"} de {Math.round(data.score * 1000) / (isPercentage ? 10 : 1000)}{isPercentage && "%"} de {info.display_name.toLowerCase()}, o que representa um valor {label} face à coleção de {categories.find(c => c.id == category).display_name.toLowerCase()}.
							<Typography.Link href={`${process.env.BASE_PATH}/comofunciona#${info.name}`}> Ver como este valor foi calculado.</Typography.Link>
						</Typography.Text>
						<Histogram category={category} histogram={histogram} />
						<Typography.Text type={'secondary'}>
							O histograma assinala a métrica de {info.display_name.toLowerCase()} do <Typography.Text strong type={'secondary'}>artigo</Typography.Text> face às distribuições de pontuações dos artigos classificados como <Typography.Text strong type={'secondary'}>{categories.find(c => c.id == category).display_name.toLowerCase()}</Typography.Text> e aos artigos pertencentes às <Typography.Text strong type={'secondary'}>restantes</Typography.Text> categorias.
						</Typography.Text>
					</Space>
				</>
			)}
		</Card>
	)
}

export default Metric