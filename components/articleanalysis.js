import React from 'react'
import Image from 'next/image'
import { withRouter } from 'next/router'
import Indicators from './indicators'
import Metrics from './metrics'
import SearchBar from './searchbar'
import { Card, Col, Layout as AntLayout, Row, Space, Typography } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { CSSTransition, SwitchTransition, Transition } from 'react-transition-group'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

const API_PATH = 'https://inforadar.inesc-id.pt/api2'

const { Sider, Content } = AntLayout;

class ArticleAnalysis extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 0,
			url: null,
			title: null,
			body: null,
			searching: false,
			article: {},
			indicatorsInfo: null,
			indicatorsData: null
		}
	}

	componentDidMount() {
		this.updateStateFromQuery()
	}

	updateStateFromQuery() {
		const { query } = this.props.router
		const { url: oldUrl, title: oldTitle, body: oldBody, mode: oldMode, searching: oldSearching } = this.state

		const url = query.url ?? oldUrl
		const title = query.title ?? oldTitle
		const body = query.body ?? oldBody
		const mode = url ? 0 : (title && body ? 1 : oldMode)
		const searching = ((query.title && query.body) || query.url) ? true : false
		this.setState({
			mode: mode,
			url: url,
			title: title,
			body: body,
			searching: searching,
		})

	}

	componentDidUpdate(prevProps, prevState) {
		const { query } = this.props.router
		const { query: prevQuery } = prevProps.router
		if (query.url !== prevQuery.url || query.title !== prevQuery.title || query.body !== prevQuery.body) {
			this.updateStateFromQuery()
		} else if (this.state.searching && this.state.searching !== prevState.searching) {
			axios({
				method: 'post',
				url: `${API_PATH}/scrapper`,
				headers: { 'content-type': 'application/json' },
				data: {
					'url': this.state.url
				}
			}).then(result => {
				this.onFetchArticle(result.data)
				this.tryAndFetchIndicatorsData();
			}).catch(error => this.setState({
				error: error.message,
				searching: false
			}));

			axios({
				method: 'get',
				url: `${API_PATH}/indicators`,
				headers: { 'content-type': 'application/json' }
			}).then(result => {
				this.onFetchIndicatorsInfo(result.data)
				this.tryAndFetchIndicatorsData();
			}).catch(error => this.setState({
				error: error.message,
			}));
		}
	}

	onChangeMode = (m) => {
		this.setState({ mode: m })
	}

	onChangeUrl = (u) => {
		this.setState({ url: u.target.value })
	}

	onChangeTitle = (t) => {
		this.setState({ title: t.target.value })
	}

	onChangeBody = (b) => {
		this.setState({ body: b.target.value })
	}

	onFetchArticle = (a) => {
		this.setState({ article: a })
	}

	onFetchIndicatorsInfo = (i) => {
		this.setState({ indicatorsInfo: i })
	}

	onFetchIndicatorsData = (d) => {
		this.setState({ indicatorsData: d })
	}

	tryAndFetchIndicatorsData = () => {
		if (this.state.article && this.state.article.id && this.state.indicatorsInfo && !this.state.indicatorsData) {
			axios({
				method: 'post',
				url: `${API_PATH}/indicators`,
				headers: { 'content-type': 'application/json' },
				data: {
					'id': this.state.article.id,
					'indicators': this.state.indicatorsInfo.map(i => i.id)
				}
			}).then(result => {
				this.onFetchIndicatorsData(result.data)
			}).catch(error => this.setState({
				error: error.message,
				searching: false
			}));
		}
	}

	onSearching = () => {
		this.props.router.push({
			query: { url: this.state.url },
		})

	}

	onCancelSearching = () => {
		this.setState({ searching: false })
		this.props.router.push({
			pathname: '/'
		})
	}

	render() {
		const transitionWidth = {
			entering: '30%',
			entered: '30%',
			exiting: '50%',
			exited: '50%',
		}

		const transitionOpacity = {
			entering: { opacity: 0 },
			entered: { opacity: 0 },
			exiting: { opacity: 1 },
			exited: { opacity: 1 },
		};

		return (
			<AntLayout>
				<Transition in={this.state.searching} timeout={500}>
					{tstate => (
						<Sider className={styles.sidebar} theme={'light'} width={transitionWidth[tstate]}>
							<Row>
								<Col offset={3} span={18}>
									<Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
										{!this.state.searching ? (
											<Typography.Title
												style={transitionOpacity[tstate]}
												level={1}
											>Que artigo quer analisar?</Typography.Title>
										) : (
											<Typography.Title level={2}>
												<LeftCircleOutlined onClick={this.onCancelSearching} />
											</Typography.Title>
										)}
										<SearchBar
											onChangeMode={this.onChangeMode}
											onSearching={this.onSearching}
											onChangeUrl={this.onChangeUrl}
											onChangeTitle={this.onChangeTitle}
											onChangeBody={this.onChangeBody}
											{...this.state}
										/>
										{this.state.searching && this.state.article.id && <Card
											hoverable
											cover={<img alt={this.state.article.headline} src={this.state.article.top_image} />}
										>
											<Card.Meta
												className={utilStyles.whiteSpacePreLine}
												title={<Typography.Text className={utilStyles.whiteSpaceNormal}>{this.state.article.headline}
												</Typography.Text>}
												description={<Typography.Paragraph ellipsis={{
													expandable: true,
													rows: 3,
													symbol: 'Ver mais',
												}}>
													{this.state.article.body_text.trim()}
												</Typography.Paragraph>} />
										</Card>}
									</Space>
								</Col>
							</Row>
						</Sider>
					)}
				</Transition>
				<Content>
					<SwitchTransition>
						<CSSTransition
							key={this.state.searching}
							timeout={500}
							classNames={{
								enter: styles.fadeenter,
								enterActive: styles.fadeactiveenter,
								exit: styles.fadeexit,
								exitActive: styles.fadeactiveexit,
							}}
						>
							{!this.state.searching ? (
								<div className={styles.bgimage}>
									<Image
										priority
										src={'/roman-kraft.jpg'}
										layout={'fill'}
										objectFit={'cover'} />
								</div>
							) : (
								<Space direction={'vertical'} size={'large'} className={styles.reportcontainer}>
									<Typography.Title>Radar de Informação</Typography.Title>
									<Indicators
										indicatorsData={this.state.indicatorsData}
										indicatorsInfo={this.state.indicatorsInfo}
									/>
									<Metrics />
								</Space>
							)}
						</CSSTransition>
					</SwitchTransition>
				</Content>
			</AntLayout>
		)
	}
}

export default withRouter(ArticleAnalysis)