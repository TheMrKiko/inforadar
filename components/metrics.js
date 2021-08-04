import React from 'react'
import { Card, Col, Row } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'

const Metrics = () => (
	<Card
		title={"VARIÁVEIS EXPLICATIVAS DE CONSPIRAÇÃO"}
		extra={<InfoCircleOutlined />}
	>
		<Row wrap gutter={[24, 24]}>
			<Col span={12}>
				<Card type={'inner'} className={styles.innercard}>


				</Card>
			</Col>
			<Col span={12}>
				<Card type={'inner'} className={styles.innercard}>


				</Card>
			</Col>
			<Col span={12}>
				<Card type={'inner'} className={styles.innercard}>


				</Card>
			</Col>
			<Col span={12}>
				<Card type={'inner'} className={styles.innercard}>

				</Card>
			</Col>
		</Row>
	</Card>
)

export default Metrics