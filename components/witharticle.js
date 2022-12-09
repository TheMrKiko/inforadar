import React from 'react';
import { withRouter } from 'next/router';
import { Query, md } from '../helpers/query';
import { compose } from '../helpers/function';
import { createError, errorType, textSizeValidation } from '../helpers/error';
import axios from 'axios';

const API_PATH = process.env.API_PATH

const stts = {
	INITIAL: 0,
	NEW_QUERY: 1,
	QUERY_INVALID: 2,
	QUERY_VALID: 3,
	WAITING_SCRAPPER: 4,
	WAITING_DATA: 5,
	DONE: 6,
}

const withArticle = (BaseComponent) => class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: stts.INITIAL,
			mode: md.URL,
			url: "",
			title: "",
			body: "",
			mid: "",
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

	opened = () => this.state.status >= stts.QUERY_VALID && !(this.state.error && this.state.error.type < errorType.THE_LINE)

	componentDidMount() {
		axios({
			method: 'get',
			url: `${API_PATH}/metadata`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMetadata(result.data)
		}).catch(error => this.setState({
			error: createError(errorType.GET_INFO, error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/indicators`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchIndicatorsInfo(result.data)
		}).catch(error => this.setState({
			error: createError(errorType.GET_INFO, error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/metrics`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMetricsInfo(result.data)
		}).catch(error => this.setState({
			error: createError(errorType.GET_INFO, error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/source_checker`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchSourceInfo(result.data)
		}).catch(error => this.setState({
			error: createError(errorType.GET_INFO, error),
		}));

		axios({
			method: 'get',
			url: `${API_PATH}/explainable_rules`,
			headers: { 'content-type': 'application/json' }
		}).then(result => {
			this.onFetchMatrixRules(result.data)
		}).catch(error => this.setState({
			error: createError(errorType.GET_INFO, error),
		}));

		this.setState({
			status: stts.NEW_QUERY
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const query = new Query(this.props.forcequery ?? this.props.router.query)
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
				const { url: oldUrl, title: oldTitle, body: oldBody, mid: oldMid, mode: oldMode } = this.state

				const url = query.url ?? ""
				const title = query.title ?? ""
				const body = query.body ?? ""
				const mid = query.mid ?? ""
				const mode = query.mode ?? oldMode
				this.setState({
					mode: parseInt(mode),
					url: url,
					title: title,
					body: body,
					mid: mid,
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
						error: createError(errorType.SCRAPPER, error),
					}));
					return this.setState({
						status: stts.WAITING_SCRAPPER
					});
				} else if (this.state.mode == md.TEXT) {
					return this.setState({
						status: stts.WAITING_SCRAPPER,
						article: {
							headline: this.state.title,
							body_text: this.state.body,
						}
					});
				} else if (this.state.mode == md.MINT) {
					axios({
						method: 'get',
						url: `${API_PATH}/corpus_article?id=${this.state.mid}`,
						headers: { 'content-type': 'application/json' },
					}).then(result => {
						this.onFetchArticle(result.data)
					}).catch(error => this.setState({
						error: createError(errorType.CORPUS_ARTICLE, error),
					}));
					return this.setState({
						status: stts.WAITING_SCRAPPER
					});
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
						error: createError(errorType.INDICATORS, error),
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
						axios({
							method: 'post',
							url: `${API_PATH}/histogram`,
							headers: { 'content-type': 'application/json' },
							data: {
								'metrics': this.state.metricsInfo.map(i => i.id),
								'metric_scores': Object.fromEntries(
									Object.entries(result.data).map(
										([m, d]) => [m, { score: d.score }]
									)),
								'settings': { graphs: ['notcumulative'], legend: true },
							}
						}).then(result => {
							this.onFetchMetricsHistogram(result.data)
						}).catch(error => this.setState({
							error: createError(errorType.HISTOGRAM, error),
						}));
					}).catch(error => this.setState({
						error: createError(errorType.METRICS, error),
					}));
					if (this.state.mode != md.TEXT) {
						axios({
							method: 'post',
							url: `${API_PATH}/source_checker`,
							headers: { 'content-type': 'application/json' },
							data: {
								'url': this.state.mode == md.URL ? this.state.url : this.state.article.url
							}
						}).then(result => {
							this.onFetchSourceData(result.data)
						}).catch(error => this.setState({
							error: createError(errorType.SOURCE_CHECKER, error),
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

	onSearching = ({ mode, url, title, body }) => {
		this.props.router.push({
			query: {
				mode,
				...mode === md.URL ?
					{
						url
					} : {
						title,
						body
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
		return (
			<BaseComponent
				{...this.props}
				article={this.state}
				opened={this.opened}
				onSearching={this.onSearching}
				onCancelSearching={this.onCancelSearching}
			/>
		)
	}
}

export default compose(
	withArticle,
	withRouter
)