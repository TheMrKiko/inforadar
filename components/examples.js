import React from 'react'
import Link from 'next/link'
import { Error } from '../helpers/error'
import { Card, Col, Row, Space, Typography } from 'antd'
import axios from 'axios'

import utilStyles from '../styles/utils.module.css'

const API_PATH = process.env.API_PATH

class Examples extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			examples: [null, null, null],
			error: null
		}
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: `${API_PATH}/examples`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchExamples(result.data)
		}).catch(error => this.setState({
			error: new Error(error),
		}));
	}

	onFetchExamples = (e) => {
		this.setState({ examples: this.state.examples.map((a, i) => e[i] ?? a) })
	}

	render() {
		return (
			<Row justify={"space-between"} gutter={[0, 20]}>
				{this.state.examples.map((e, i) => (
					<Col md={7} sm={11} span={24} key={i}>
						<Link
							href={{
								query: { 'url': e && e.url }
							}}
							legacyBehavior>
							<Card
								hoverable
								loading={!e}
								cover={
									e && <img
										alt={e.headline}
										src={e.top_image}
									/>
								}
							>
								{e && <Card.Meta
									title={
										<Typography.Text className={utilStyles.whiteSpaceNormal}>
											{e.headline}
										</Typography.Text>}
									description={new URL(e.url).hostname}
								/>}
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		)
	}
}

export default Examples