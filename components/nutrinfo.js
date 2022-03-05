import React from 'react';
import Summary from './summary';
import Metrics from './metrics';
import Indicators from './indicators';
import { Space, Typography } from 'antd';

import styles from '../styles/Home.module.css';

const NutritionalInfo = (props) => (
	<Space direction={'vertical'} size={'large'} className={styles.reportcontainer}>
		<Typography.Title>Informação Nutricional</Typography.Title>
		<Summary
			categories={props.categories}
			matrixRules={props.matrixRules}
			indicatorsData={props.indicatorsData}
			indicatorsInfo={props.indicatorsInfo}
			metricsData={props.metricsData}
			metricsInfo={props.metricsInfo}
		/>
		<Indicators
			article={props.article}
			categories={props.categories}
			indicatorsData={props.indicatorsData}
			indicatorsInfo={props.indicatorsInfo}
		/>
		<Metrics
			categories={props.categories}
			metricsData={props.metricsData}
			metricsInfo={props.metricsInfo}
			metricsHistogram={props.metricsHistogram}
			indicatorsData={props.indicatorsData}
			indicatorsInfo={props.indicatorsInfo}
		/>
	</Space>
)

export default NutritionalInfo