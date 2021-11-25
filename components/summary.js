import React from 'react'
import { colorScaleClass, colorScaleType } from "../helpers/color";
import { Card, Col, Space, Row, Select, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

const levelLabels = {
	0: 'baixo',
	1: 'médio baixo',
	2: 'médio alto',
	3: 'alto',
	4: 'exato',
}

const summaryBuilder = (categories, indicatorsData, indicatorsInfo, metricsData, metricsInfo) => {
	const maxCategory = categories
		.map(category => ({
			...indicatorsData[indicatorsInfo[0].id].categories[category.id],
			...category
		}))
		.sort((a, b) => b.score - a.score)[0];
	const maxLevel = Math.trunc(maxCategory.score * 4);
	if (maxLevel < 2)
		return <Typography.Text>O artigo tem uma probabilidade {levelLabels[maxLevel]} de corresponder a um artigo de <Typography.Text strong>{maxCategory.display_name.toLowerCase()}</Typography.Text>. Os valores apresentados não permitem atribuir um grau de confiança alto a esta classificação. Recomenda-se uma leitura crítica do artigo em análise.</Typography.Text>;

	const matrix = {
		1: { // factual
			1: { // sentiment
				min: 0, max: 25
			}, 2: { // subjectivity
				min: 0, max: 25
			}, 3: { // spell_checking
				min: 75, max: 100
			}, 4: { // clickbait
				min: 0, max: 25
			}, 5: { // headline_accuracy
				min: 75, max: 100
			}
		},
		2: { // opinion
			1: { // sentiment
				min: 25, max: 100
			}, 2: { // subjectivity
				min: 25, max: 100
			}, 3: { // spell_checking
				min: 75, max: 100
			}, 4: { // clickbait
				min: null, max: null
			}, 5: { // headline_accuracy
				min: null, max: null
			}
		},
		3: { // entertainment
			1: { // sentiment
				min: 50, max: 100
			}, 2: { // subjectivity
				min: 50, max: 100
			}, 3: { // spell_checking
				min: null, max: null
			}, 4: { // clickbait
				min: 50, max: 100
			}, 5: { // headline_accuracy
				min: null, max: null
			}
		},
		4: { // satire
			1: { // sentiment
				min: 0, max: 100
			}, 2: { // subjectivity
				min: 0, max: 100
			}, 3: { // spell_checking
				min: 50, max: 100
			}, 4: { // clickbait
				min: 0, max: 100
			}, 5: { // headline_accuracy
				min: 0, max: 100
			}
		},
		5: { // conspiracy
			1: { // sentiment
				min: 0, max: 100
			}, 2: { // subjectivity
				min: 0, max: 100
			}, 3: { // spell_checking
				min: 50, max: 100
			}, 4: { // clickbait
				min: 0, max: 100
			}, 5: { // headline_accuracy
				min: 0, max: 100
			}
		}
	}

	const { pros, cons } = metricsInfo.reduce((prev, metric) => {
		const percentil = metricsData[metric.id].percentiles.categories[maxCategory.id];
		const level = Math.trunc((percentil / 100) * 4);
		const boundaries = matrix[maxCategory.id][metric.id];
		if (!boundaries.min && !boundaries.max)
			return prev;

		if (percentil == undefined)
			return prev;

		return (percentil >= boundaries.min && percentil <= boundaries.max) ?
			{
				...prev,
				pros: [...prev.pros, <Typography.Text>{levelLabels[level]} grau de <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text></Typography.Text>]
			} : {
				...prev,
				cons: [...prev.cons, <Typography.Text>um índice {levelLabels[level]} de <Typography.Text strong>{metric.display_name.toLowerCase()}</Typography.Text>, não expectável em artigos desta natureza</Typography.Text>]
			}
	}, { pros: [], cons: [] })

	return (
		<>
			<Typography.Text>O artigo tem uma probabilidade {levelLabels[maxLevel]} de corresponder a um artigo de <Typography.Text strong>{maxCategory.display_name.toLowerCase()}</Typography.Text>. </Typography.Text>
			{pros.length != 0 && <>
				<Typography.Text>Esta informação é corroborada pelo:</Typography.Text>
				<ul>
					{pros.map(p => <li>{p}</li>)}
				</ul>
			</>}
			{cons.length != 0 && <>
				<Typography.Text>No entanto, apresenta:</Typography.Text>
				<ul>
					{cons.map(c => <li>{c}</li>)}
				</ul>
			</>}
		</>
	)
}

const Summary = ({ categories, indicatorsData, indicatorsInfo, metricsData, metricsInfo }) => (
	categories && indicatorsData && indicatorsInfo && metricsData && metricsInfo &&
	<Typography.Text>{summaryBuilder(categories, indicatorsData, indicatorsInfo, metricsData, metricsInfo)}</Typography.Text>
)

export default Summary