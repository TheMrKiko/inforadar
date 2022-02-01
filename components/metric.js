import React from 'react';
import Histogram from './histogram';
import QuartileBar from './quartilebar';
import { colorScaleClass } from '../helpers/color';

import { Card, Space, Typography } from 'antd';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import styles from '../styles/Home.module.css';

const levelLabels = {
	0: 'baixo',
	1: 'médio-baixo',
	2: 'médio-alto',
	3: 'alto',
	4: 'exato',
}

const Metric = ({ filter, category, categories, info, data, histogram }) => {
	const level = Math.trunc((data.percentiles.categories[category] / 100) * 4) // TODO remove hardcoded
	const label = levelLabels[level]
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
							O artigo tem um score de {info.display_name.toLowerCase()} de {Math.round(data.score * 100) / 100}.
							<Typography.Link href={`${process.env.BASE_PATH}/comofunciona#${info.name}`}> Ver como este valor foi calculado.</Typography.Link>
						</Typography.Text>
						<Histogram category={category} histogram={histogram} />
						<Typography.Text type={'secondary'}>
							O histograma representa a métrica de {info.display_name.toLowerCase()} do <Typography.Text strong style={{ color: '#f4664a' }}>artigo</Typography.Text> face à coleção de <Typography.Text strong style={{ color: '#00539d' }}>{categories.find(c => c.id == category).display_name.toLowerCase()}</Typography.Text> e das <Typography.Text strong style={{ color: '#8c8c8c' }}>restantes</Typography.Text> categorias.
						</Typography.Text>
					</Space>
				</>
			)}
		</Card>
	)
}

export default Metric