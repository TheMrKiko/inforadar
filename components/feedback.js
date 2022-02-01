import React, { useState } from 'react';

import { Button, Row, Select, Space, Typography } from 'antd';

const Feedback = ({ categories }) => {
	const [feedback, setFeedback] = useState()
	const [feedbackSuggested, setFeedbackSuggested] = useState(false)
	const [suggestionSelected, setSuggestionSelected] = useState(categories && categories[0].id)
	const isFeedbackGiven = () => feedback == "agree" || (feedback == "disagree" && feedbackSuggested)
	return !isFeedbackGiven() ? (
		feedback != "disagree" ? (
			<Row>
				<Typography.Text type={'secondary'}>Concorda com esta classificação?</Typography.Text>
				<Button type={'link'} size={'small'} onClick={() => setFeedback("agree")}>Sim</Button>
				<Button type={'link'} size={'small'} onClick={() => setFeedback("disagree")}>Não</Button>
			</Row>
		) : (
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
							categories && categories.map(cat => (
								<Select.Option key={cat.id} value={cat.id}>{cat.display_name}</Select.Option>
							))
						}
					</Select>
					<Button size={'small'} type={'primary'} onClick={() => setFeedbackSuggested(true)}>Confirmar</Button>
					<Button size={'small'} type={'link'} onClick={() => setFeedback()}>Anular</Button>
				</Space>
			</Row>
		)
	) : <Typography.Text type={'success'}>
		Obrigado pela sua opinião.
		<Button size={'small'} type={'link'} onClick={() => { setFeedback(); setFeedbackSuggested(false) }}>Anular</Button>
	</Typography.Text>
}

export default Feedback