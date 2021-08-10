import React from 'react'
import Image from 'next/image'
import { withRouter } from 'next/router'
import Indicators from './indicators'
import Metrics from './metrics'
import SearchBar from './searchbar'
import Query from '../helpers/query'
import { Card, Col, Layout as AntLayout, Row, Space, Typography } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { CSSTransition, SwitchTransition, Transition } from 'react-transition-group'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

const API_PATH = 'https://inforadar.inesc-id.pt/api2'

const { Sider, Content } = AntLayout;

const stts = {
	ERROR: -1,
	INITIAL: 0,
	NEW_QUERY: 1,
	QUERY_INVALID: 2,
	QUERY_VALID: 3,
	WAITING_SCRAPPER: 4,
	WAITING_INDICATORS: 5,
	DONE: 6,
}

class ArticleAnalysis extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: stts.INITIAL,
			mode: 0,
			url: "",
			title: "",
			body: "",
			query: new Query(),
			article: null,
			indicatorsInfo: null,
			indicatorsData: null,
			error: null,
		}
	}

	opened = () => this.state.status >= stts.QUERY_VALID

	componentDidMount() {
		axios({
			method: 'get',
			url: `${API_PATH}/indicators`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchIndicatorsInfo(result.data)
		}).catch(error => this.setState({
			error: error.message,
		}));

		this.setState({
			status: stts.NEW_QUERY
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const query = new Query(this.props.router.query)
		const prevQuery = prevState.query

		if (!query.equals(prevQuery)) {
			return this.setState({
				query,
				status: stts.NEW_QUERY,
				article: null,
				indicatorsData: null,
				error: null,
			})
		}

		switch (this.state.status) {
			case stts.NEW_QUERY:
				const { url: oldUrl, title: oldTitle, body: oldBody, mode: oldMode } = this.state

				const url = query.url ?? oldUrl
				const title = query.title ?? oldTitle
				const body = query.body ?? oldBody
				const mode = query.mode ?? oldMode
				this.setState({
					mode: parseInt(mode),
					url: url,
					title: title,
					body: body,
					status: query.valid() ? stts.QUERY_VALID : stts.QUERY_INVALID
				})
				break;
			case stts.QUERY_VALID:
				if (!this.state.mode) {
					axios({
						method: 'post',
						url: `${API_PATH}/scrapper`,
						headers: { 'content-type': 'application/json' },
						data: {
							'url': this.state.url
						}
					}).then(result => {
						this.onFetchArticle(result.data)
					}).catch(error => this.setState({
						status: stts.ERROR,
						error: error.message,
					}));
					return this.setState({
						status: stts.WAITING_SCRAPPER
					});
				} else {
					return this.setState({
						status: stts.WAITING_SCRAPPER,
						article: {
							headline: this.state.title,
							body_text: this.state.body,
						}
					})
				}
				break;
			case stts.WAITING_SCRAPPER:
				if (this.state.article && this.state.indicatorsInfo) {
					axios({
						method: 'post',
						url: `${API_PATH}/indicators`,
						headers: { 'content-type': 'application/json' },
						data: {
							...!this.state.mode ? {
								'id': this.state.article.id,
							} : {
								'headline': this.state.article.headline,
								'body_text': this.state.article.body_text
							},
							'indicators': this.state.indicatorsInfo.map(i => i.id)
						}
					}).then(result => {
						this.onFetchIndicatorsData(result.data)
					}).catch(error => this.setState({
						error: error.message,
					}));
					return this.setState({
						status: stts.WAITING_INDICATORS
					})
				}
				break;
			case stts.WAITING_INDICATORS:
				if (this.state.indicatorsData) {
					return this.setState({
						status: stts.DONE
					})
				}
				break;
			default:
				break;
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

	onSearching = () => {
		this.props.router.push({
			query: {
				mode: this.state.mode,
				...!this.state.mode ?
					{
						url: this.state.url
					} : {
						title: this.state.title,
						body: this.state.body
					},
			}
		})

	}

	onCancelSearching = () => {
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
				<Transition in={this.opened()} timeout={500}>
					{tstate => (
						<Sider className={styles.sidebar} theme={'light'} width={transitionWidth[tstate]}>
							<Row>
								<Col offset={3} span={18}>
									<Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
										{!this.opened() ? (
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
										{this.opened() && <Card
											hoverable
											loading={!this.state.article}
											cover={
												this.state.article && this.state.article.top_image &&
												<img alt={this.state.article.headline} src={this.state.article.top_image} />
											}
										>
											{this.state.article && <Card.Meta
												className={utilStyles.whiteSpacePreLine}
												title={
													<Typography.Text
														className={utilStyles.whiteSpaceNormal}
														disabled={!this.state.article.headline}
													>
														{this.state.article.headline || "Texto inserido manualmente"}
													</Typography.Text>
												}
												description={<Typography.Paragraph ellipsis={{
													expandable: true,
													rows: 3,
													symbol: 'Ver mais',
												}}>
													{this.state.article.body_text.trim()}
												</Typography.Paragraph>} />}
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
							key={this.opened() ? 'open' : 'close'}
							timeout={500}
							classNames={{
								enter: styles.fadeenter,
								enterActive: styles.fadeactiveenter,
								exit: styles.fadeexit,
								exitActive: styles.fadeactiveexit,
							}}
						>
							{!this.opened() ? (
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