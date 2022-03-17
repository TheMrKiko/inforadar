import React from 'react';
import Feedback from './feedback';
import Radar from './radar';
import RadarLegend from './radarlegend';

import { Card, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

export default function Indicators({ article, categories, indicatorsData, indicatorsInfo, inner = false }) {
	return (
		<Card
			title={"ARTIGO FACE ÀS COLEÇÕES DE REFERÊNCIA"}
			extra={<InfoCircleOutlined />}
			loading={!indicatorsData}
			type={inner && 'inner'}
		>
			{indicatorsData && indicatorsInfo.map(indicator => (<>
				<Row justify={'center'}>
					<Col span={24} lg={{ span: 14 }}>
						<ParentSize>{({ width, height }) => (
							<Radar
								width={width}
								height={width}
								categories={categories}
								info={indicator}
								data={indicatorsData[indicator.id]}
							/>
						)}
						</ParentSize>
					</Col>
					<Col span={24} lg={{ span: 10 }}>
						<RadarLegend
							key={indicator.id}
							categories={categories}
							info={indicator} //useless
							data={indicatorsData[indicator.id]}
						/>
					</Col>
				</Row>
				{!inner && <Row justify={'end'}>
					<Col>
						<Feedback
							article={article}
							categories={categories}
							info={indicator}
							data={indicatorsData[indicator.id]}
						/>
					</Col>
				</Row>}
			</>
			))}
		</Card>
	)
}