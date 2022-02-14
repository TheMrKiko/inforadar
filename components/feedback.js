import React, { useEffect, useState } from 'react';
import { getMainCategory } from '../helpers/function';
import { Error } from '../helpers/error'

import { Button, Row, Select, Space, Typography } from 'antd';

import axios from 'axios';

const { API_PATH } = process.env

const fb_stts = {
	ERROR: -1,
	INITIAL: 0,
	SUGGESTING: 2,
	SENDING: 3,
	THANKS: 4,
}

const Feedback = ({ article, categories, info, data }) => {
	const maxCategory = getMainCategory(categories, data)
	const filteredCategories = categories && categories.filter(c => c.id != maxCategory.id)
	const [suggestionSelected, setSuggestionSelected] = useState(categories && filteredCategories[0].id)

	const [status, setStatus] = useState(fb_stts.INITIAL)
	const [appError, setError] = useState(null)
	const [feedback, setFeedback] = useState({})

	const sendFeedback = (suggestedCategory = maxCategory.id) => {
		axios({
			method: 'post',
			url: `${API_PATH}/feedback`,
			headers: { 'content-type': 'application/json' },
			data: {
				'id': article.id,
				'indicator': info.id,
				'main_category': maxCategory.id,
				'suggested_category': suggestedCategory,
			}
		}).then(result => {
			setStatus(fb_stts.THANKS);
			setFeedback({
				category: suggestedCategory,
				id: result.data.id,
				auth: result.data.auth,
			})
		}).catch(error => {
			setError(new Error(error));
			setStatus(fb_stts.ERROR);
		});

		setStatus(fb_stts.SENDING);
	}

	const cancelFeedback = () => {
		axios({
			method: 'post',
			url: `${API_PATH}/delete_feedback`,
			headers: { 'content-type': 'application/json' },
			data: {
				'id': feedback.id,
				'auth': feedback.auth,
			}
		}).then(result => {
			setStatus(feedback.category == maxCategory.id ? fb_stts.INITIAL : fb_stts.SUGGESTING);
			setFeedback({});
		}).catch(error => {
			setError(new Error(error));
			setStatus(fb_stts.ERROR);
		});
	}

	return <>
		{
			status == fb_stts.INITIAL &&
			<Row>
				<Typography.Text type={'secondary'}>Concorda com esta classificação?</Typography.Text>
				<Button type={'link'} size={'small'} onClick={() => sendFeedback()}>Sim</Button>
				<Button type={'link'} size={'small'} onClick={() => setStatus(fb_stts.SUGGESTING)}>Não</Button>
			</Row>
		} {
			status == fb_stts.SUGGESTING &&
			<Row>
				<Space>
					<Typography.Text type={'warning'}>O artigo deve ser classificado como</Typography.Text>
					<Select
						size={'small'}
						loading={!categories}
						disabled={!categories}
						value={suggestionSelected}
						onChange={setSuggestionSelected}
					>
						{
							filteredCategories && filteredCategories.map(cat => (
								<Select.Option key={cat.id} value={cat.id}>{cat.display_name}</Select.Option>
							))
						}
					</Select>
					<Button size={'small'} type={'primary'} onClick={() => sendFeedback(suggestionSelected)}>Confirmar</Button>
					<Button size={'small'} type={'link'} onClick={() => setStatus(fb_stts.INITIAL)}>Anular</Button>
				</Space>
			</Row>
		} {
			status == fb_stts.SENDING &&
			<Typography.Text type={'secondary'}>
				Enviando...
			</Typography.Text>
		} {
			status == fb_stts.THANKS &&
			<Typography.Text type={'success'}>
				Obrigado pela sua opinião.
				<Button size={'small'} type={'link'} onClick={() => { cancelFeedback() }}>Anular</Button>
			</Typography.Text>
		} {
			status == fb_stts.ERROR &&
			<Typography.Text type={'danger'}>
				{appError.errorObj.message}
			</Typography.Text>
		}
	</>
}

export default Feedback