import React from 'react'
import Image from 'next/image'
import { withRouter } from 'next/router'
import Indicators from './indicators'
import Metrics from './metrics'
import Summary from './summary'
import SearchBar from './searchbar'
import Query from '../helpers/query'
import { Error, textSizeValidation } from '../helpers/error'
import cn from 'classnames'
import { Card, Col, Collapse, Row, Space, Typography } from 'antd'
import { CheckCircleFilled, LeftCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'
import { CSSTransition, SwitchTransition, Transition } from 'react-transition-group'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'

const { API_PATH } = process.env

const stts = {
	ERROR: -1,
	INITIAL: 0,
	NEW_QUERY: 1,
	QUERY_INVALID: 2,
	QUERY_VALID: 3,
	WAITING_SCRAPPER: 4,
	WAITING_DATA: 5,
	DONE: 6,
}

const md = {
	URL: 0,
	TEXT: 1,
}

class ArticleAnalysis extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: stts.INITIAL,
			mode: md.URL,
			url: "",
			title: "",
			body: "",
			query: new Query(),
			article: null,
			categories: null,
			indicatorsInfo: null,
			indicatorsData: null,
			metricsInfo: null,
			metricsData: null,
			metricsHistogram: null,
			sourceInfo: null,
			sourceData: null,
			matrixRules: null,
			error: null,
		}
	}

	opened = () => this.state.status >= stts.QUERY_VALID

	componentDidMount() {
		axios({
			method: 'get',
			url: `${API_PATH}/metadata`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMetadata(result.data)
		}).catch(error => this.setState({
			error: new Error(error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/indicators`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchIndicatorsInfo(result.data)
		}).catch(error => this.setState({
			error: new Error(error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/metrics`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMetricsInfo(result.data)
			axios({
				method: 'post',
				url: `${API_PATH}/histogram`,
				headers: { 'content-type': 'application/json' },
				data: {
					'metrics': this.state.metricsInfo.map(i => i.id)
				}
			}).then(result => {
				this.onFetchMetricsHistogram(result.data)
			}).catch(error => this.setState({
				error: new Error(error),
			}));
		}).catch(error => this.setState({
			error: new Error(error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/source_checker`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchSourceInfo(result.data)
		}).catch(error => this.setState({
			error: new Error(error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/explainable_rules`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMatrixRules(result.data)
		}).catch(error => this.setState({
			error: new Error(error),
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
				metricsData: null,
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
				if (this.state.mode == md.URL) {
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
						error: new Error(error),
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
				if (this.state.article && this.state.categories && this.state.indicatorsInfo && this.state.metricsInfo) {
					axios({
						method: 'post',
						url: `${API_PATH}/indicators`,
						headers: { 'content-type': 'application/json' },
						data: {
							...this.state.mode == md.URL ? {
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
						status: stts.ERROR,
						error: new Error(error),
					}));
					axios({
						method: 'post',
						url: `${API_PATH}/metrics`,
						headers: { 'content-type': 'application/json' },
						data: {
							...this.state.mode == md.URL ? {
								'id': this.state.article.id,
							} : {
								'headline': this.state.article.headline,
								'body_text': this.state.article.body_text
							},
							'metrics': this.state.metricsInfo.map(i => i.id)
						}
					}).then(result => {
						this.onFetchMetricsData(result.data)
					}).catch(error => this.setState({
						status: stts.ERROR,
						error: new Error(error),
					}));
					if (this.state.mode == md.URL) {
						axios({
							method: 'post',
							url: `${API_PATH}/source_checker`,
							headers: { 'content-type': 'application/json' },
							data: {
								'url': this.state.url
							}
						}).then(result => {
							this.onFetchSourceData(result.data)
						}).catch(error => this.setState({
							status: stts.ERROR,
							error: new Error(error),
						}));
					}
					return this.setState({
						status: stts.WAITING_DATA,
						error: textSizeValidation(this.state.article)
					})
				}
				break;
			case stts.WAITING_DATA:
				if (this.state.indicatorsData && this.state.metricsData && ((this.state.sourceInfo && this.state.sourceData) || this.state.mode == md.TEXT)) {
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

	onFetchMetadata = (md) => {
		this.setState({ categories: md })
	}

	onFetchIndicatorsInfo = (i) => {
		this.setState({ indicatorsInfo: i })
	}

	onFetchIndicatorsData = (d) => {
		this.setState({ indicatorsData: d })
	}

	onFetchMetricsInfo = (i) => {
		this.setState({ metricsInfo: i })
	}

	onFetchMetricsData = (d) => {
		this.setState({ metricsData: d })
	}

	onFetchMetricsHistogram = (h) => {
		this.setState({ metricsHistogram: h })
	}

	onFetchSourceInfo = (i) => {
		this.setState({ sourceInfo: i })
	}

	onFetchSourceData = (d) => {
		this.setState({ sourceData: d })
	}

	onFetchMatrixRules = (m) => {
		this.setState({ matrixRules: m })
	}

	onSearching = () => {
		this.props.router.push({
			query: {
				mode: this.state.mode,
				...this.state.mode == md.URL ?
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
		const transitionSpanLeft = {
			entering: {
				span: 24,
				sm: { span: 8 }
			},
			entered: {
				span: 24,
				sm: { span: 8 }
			},
			exiting: {
				span: 24,
				sm: { span: 12 }
			},
			exited: {
				span: 24,
				sm: { span: 12 }
			},
		}

		const transitionSpanRight = {
			entering: {
				span: 24,
				sm: { span: 16 }
			},
			entered: {
				span: 24,
				sm: { span: 16 }
			},
			exiting: {
				span: 24,
				sm: { span: 12 }
			},
			exited: {
				span: 24,
				sm: { span: 12 }
			},
		}

		const transitionOpacity = {
			entering: { opacity: 0 },
			entered: { opacity: 0 },
			exiting: { opacity: 1 },
			exited: { opacity: 1 },
		};

		return (
			<Transition in={this.opened()} timeout={500}>
				{tstate => (
					<Row>
						<Col className={cn(styles.sidebar, utilStyles.transitionAll)} {...transitionSpanLeft[tstate]}>
							<Row>
								<Col offset={3} span={18}>
									<Space direction={'vertical'} size={'large'} className={utilStyles.width100}>
										{!this.opened() ? (
											<Typography.Title
												style={transitionOpacity[tstate]}
												level={1}
											>Que artigo quer analisar?</Typography.Title>
										) : (
											<Typography.Title level={3}>
												<Space size={"middle"}>
													<LeftCircleOutlined onClick={this.onCancelSearching} />
													<Typography.Text>Voltar</Typography.Text>
												</Space>
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
										<Space direction={'vertical'} size={'small'} className={utilStyles.width100}>
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
											{this.opened() && this.state.article && this.state.mode == md.URL && this.state.sourceData &&
												<Collapse
													expandIconPosition={"right"}
												>
													<Collapse.Panel
														header={
															<Space>
																<Typography.Text type={
																	this.state.sourceData.id ? "success" : "warning"}
																>
																	{
																		this.state.sourceData.id ?
																			<CheckCircleFilled /> :
																			<ExclamationCircleFilled />
																	}
																</Typography.Text>
																{`Fonte ${!this.state.sourceData.id ? 'não ' : ''}registada na ERC`}
															</Space>
														}
													>
														{this.state.sourceInfo && (this.state.sourceData.id ?
															<Space direction={'vertical'}>
																<Typography.Text type={'secondary'}>
																	Dados retirados do
																	<Typography.Link href="https://www.erc.pt/pt/listagem-registos-na-erc" target="_blank"> registo oficial da ERC</Typography.Link> a {new Date(this.state.sourceData["last_update"]).toLocaleDateString()}.
																</Typography.Text>
																<Space direction={'vertical'} size={'small'}>
																	{["title", "owner", "location", "municipality", "registration_date"].map(key => (
																		this.state.sourceData[key] ?
																			<Typography.Text>
																				<Typography.Text strong>
																					{this.state.sourceInfo[key]}
																				</Typography.Text>
																				{`: ${!key.includes('date') ? this.state.sourceData[key] : new Date(this.state.sourceData[key]).toLocaleDateString()}`}
																			</Typography.Text>
																			: null
																	))}
																</Space>
															</Space>
															:
															<Typography.Text type={'secondary'}>
																Não há <Typography.Link href="https://www.erc.pt/pt/listagem-registos-na-erc" target="_blank">registos</Typography.Link> desta publicação.
															</Typography.Text>
														)}
													</Collapse.Panel>
												</Collapse>
											}

										</Space>
									</Space>
								</Col>
							</Row>
						</Col>
						<Col {...transitionSpanRight[tstate]}>
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
												src={`${process.env.BASE_PATH}/roman-kraft.jpg`}
												layout={'fill'}
												objectFit={'cover'} />
										</div>
									) : (
										<div className={utilStyles.justifyContentCenter}>
											<Space direction={'vertical'} size={'large'} className={styles.reportcontainer}>
												<Typography.Title>Informação Nutricional</Typography.Title>
												<Summary
													categories={this.state.categories}
													matrixRules={this.state.matrixRules}
													indicatorsData={this.state.indicatorsData}
													indicatorsInfo={this.state.indicatorsInfo}
													metricsData={this.state.metricsData}
													metricsInfo={this.state.metricsInfo}
												/>
												<Indicators
													categories={this.state.categories}
													indicatorsData={this.state.indicatorsData}
													indicatorsInfo={this.state.indicatorsInfo}
												/>
												<Metrics
													categories={this.state.categories}
													metricsData={this.state.metricsData}
													metricsInfo={this.state.metricsInfo}
													metricsHistogram={this.state.metricsHistogram}
													indicatorsData={this.state.indicatorsData}
													indicatorsInfo={this.state.indicatorsInfo}
												/>
											</Space>
										</div>
									)}
								</CSSTransition>
							</SwitchTransition>
						</Col>
					</Row>
				)}
			</Transition>
		)
	}
}

export default withRouter(ArticleAnalysis)