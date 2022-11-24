import React, { useEffect, useState } from 'react';
import { getMainCategory } from '../helpers/function';
import { Error } from '../helpers/error';

import { Button, Row, Select, Space, Typography } from 'antd';

import axios from 'axios';

const API_PATH = process.env.API_PATH

const fb_stts = {
	ERROR: -1,
	INITIAL: 0,
	SUGGESTING: 1,
	THANKS: 2,
}

const Feedback = ({ article, categories, info, data }) => {
	const maxCategory = getMainCategory(categories, data)
	const filteredCategories = categories && categories.filter(c => c.id != maxCategory.id)
	const [suggestionSelected, setSuggestionSelected] = useState(categories && filteredCategories[0].id)

	const [status, setStatus] = useState(fb_stts.INITIAL)
	const [sending, setSending] = useState(false)
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
			setSending(false);
			setFeedback({
				category: suggestedCategory,
				id: result.data.id,
				auth: result.data.auth,
			})
		}).catch(error => {
			setError(new Error(error));
			setStatus(fb_stts.ERROR);
			setSending(false);
		});

		setSending(true);
	}

	const cancelFeedback = () => {
		axios({
			method: 'delete',
			url: `${API_PATH}/feedback`,
			headers: { 'content-type': 'application/json' },
			data: {
				'id': feedback.id,
				'auth': feedback.auth,
			}
		}).then(result => {
			setStatus(feedback.category == maxCategory.id ? fb_stts.INITIAL : fb_stts.SUGGESTING);
			setSending(false);
			setFeedback({});
		}).catch(error => {
			setError(new Error(error));
			setStatus(fb_stts.ERROR);
			setSending(false);
		});

		setSending(true);
	}

	return <>
		{
			status == fb_stts.INITIAL &&
			<Row>
				<Typography.Text type={'secondary'}>Concorda com esta classificação?</Typography.Text>
				<Button type={'link'} size={'small'} loading={sending} onClick={() => sendFeedback()}>Sim</Button>
				<Button type={'link'} size={'small'} disabled={sending} onClick={() => setStatus(fb_stts.SUGGESTING)}>Não</Button>
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
					<Button size={'small'} type={'primary'} loading={sending} onClick={() => sendFeedback(suggestionSelected)}>Confirmar</Button>
					<Button size={'small'} type={'link'} disabled={sending} onClick={() => setStatus(fb_stts.INITIAL)}>Anular</Button>
				</Space>
			</Row>
		} {
			status == fb_stts.THANKS &&
			<Typography.Text type={'success'}>
				Obrigado pela sua opinião.
				<Button size={'small'} type={'link'} loading={sending} onClick={() => { cancelFeedback() }}>Anular</Button>
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