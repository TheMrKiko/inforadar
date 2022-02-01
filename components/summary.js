import React from 'react';
import { colorScaleClass, colorScaleType } from '../helpers/color';

import { Card, Col, Space, Row, Select, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

const levelLabels = {
	0: 'baixo',
	1: 'médio-baixo',
	2: 'médio-alto',
	3: 'alto',
	4: 'exato',
}

function listFormat(list, oxfordcomma = false) {
	if (list.length == 1)
		return list[0];
	const firsts = list.slice(0, list.length - 1);
	const last = list[list.length - 1];
	return <>{firsts.map((f, i, a) => <>{f}{i + 1 != a.length && ', '}</>)}{oxfordcomma && ','} e {last}</>;
}

const summaryBuilder = (categories, matrixRules, indicatorsData, indicatorsInfo, metricsData, metricsInfo) => {
	const maxCategory = categories
		.map(category => ({
			...indicatorsData[indicatorsInfo[0].id].categories[category.id],
			...category
		}))
		.sort((a, b) => b.score - a.score)[0];
	const maxLevel = Math.trunc(maxCategory.score * 4);
	const Headline = (
		<Typography.Text>A análise do artigo evidencia uma probabilidade {levelLabels[maxLevel].slice(0, -1)}a de corresponder a um artigo de <Typography.Text strong>{maxCategory.display_name.toLowerCase()}</Typography.Text>. </Typography.Text>
	);
	if (maxLevel < 2)
		return (
			<Typography.Text>
				{Headline}
				Os valores apresentados não permitem atribuir um grau de confiança elevado a esta classificação. Recomenda-se uma leitura crítica do artigo em análise.
			</Typography.Text>
		);

	const { pros, cons } = metricsInfo.reduce((prev, metric) => {
		const percentil = metricsData[metric.id].percentiles.categories[maxCategory.id];
		const level = Math.trunc((percentil / 100) * 4);
		const boundaries = matrixRules.categories[maxCategory.id].metrics[metric.id];
		if (!boundaries.min && !boundaries.max)
			return prev;

		if (percentil == undefined)
			return prev;

		return (percentil >= boundaries.min && percentil <= boundaries.max) ?
			{
				...prev,
				pros: {
					...prev.pros,
					[level]: [...(prev.pros[level] ?? []), <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text>]
				}
			} : {
				...prev,
				cons: {
					...prev.cons,
					[level]: [...(prev.cons[level] ?? []), <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text>]
				}
			}
	}, { pros: {}, cons: {} })

	return (
		<>
			{Headline}
			{Object.keys(pros).length != 0 &&
				<Typography.Text>Esta informação é corroborada {listFormat(Object.keys(pros).sort().map(k => <>pelo índice {levelLabels[k]} de {listFormat(pros[k])}</>))}. </Typography.Text>
			}
			{Object.keys(cons).length != 0 &&
				<Typography.Paragraph>No entanto, apresenta {listFormat(Object.keys(cons).sort().map(k => <>um índice {levelLabels[k]} de {listFormat(cons[k])}</>))}, o que não seria expectável em artigos desta natureza.</Typography.Paragraph>
			}
		</>
	)
}

const Summary = ({ categories, matrixRules, indicatorsData, indicatorsInfo, metricsData, metricsInfo }) => (
	categories && matrixRules && indicatorsData && indicatorsInfo && metricsData && metricsInfo &&
	<Typography.Text>{summaryBuilder(categories, matrixRules, indicatorsData, indicatorsInfo, metricsData, metricsInfo)}</Typography.Text>
)

export default Summary