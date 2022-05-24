import React, { useState, useEffect } from 'react'
import { md } from '../helpers/query';
import { Input, Select, Form } from 'antd'

import styles from '../styles/Home.module.css'

const SearchBar = ({
	mode: pmode = md.URL,
	url: purl = "",
	title: ptitle = "",
	body: pbody = "",
	error,
	onSearching: ponSearching
}) => {
	const [form] = Form.useForm();
	const [mode, setMode] = useState(pmode);
	const [url, setUrl] = useState(purl);
	const [title, setTitle] = useState(ptitle);
	const [body, setBody] = useState(pbody);

	useEffect(() => {
		setMode(pmode);
		if (pmode == md.URL)
			setUrl(purl);
		else if (pmode == md.TEXT) {
			setTitle(ptitle);
			setBody(pbody);
		}
	}, [pmode, purl, ptitle, pbody]);

	const onSearching = () => {
		form.validateFields(
			mode === md.URL ?
				['url'] :
				['body']
		).then(() => {
			ponSearching({ mode, url, title, body });
		}).catch((r) => console.log(r));
	}

	const selectBefore = (mode) => (
		<Form.Item
			noStyle
		>
			<Select
				defaultValue={md.URL}
				bordered={false}
				size="small"
				onChange={setMode}
				value={mode}
			>
				<Select.Option value={md.URL}>URL</Select.Option>
				<Select.Option value={md.TEXT}>Texto</Select.Option>
			</Select>
		</Form.Item>
	)

	return (
		<Form
			form={form}
			fields={
				[{
					name: 'url',
					value: url,
				}, {
					name: 'body',
					value: body,
				}]
			}
		>
			{mode === md.URL ? (
				<Form.Item
					name="url"
					rules={[{
						required: true,
						message: 'Coloque aqui um URL ou troque para texto.',
					}, {
						type: 'url',
						message: 'Coloque um URL válido.',
					}]}
					validateStatus={error ? error.style : undefined}
					help={error ? error.message : undefined}
					extra={error ? error.detail : undefined}
				>
					<Input.Search
						autoFocus
						enterButton
						allowClear
						size="large"
						className={styles.searchbar}
						placeholder="Cole o URL de um artigo aqui..."
						suffix={selectBefore(mode)}
						onChange={e => setUrl(e.target.value)}
						onSearch={onSearching} />
				</Form.Item>
			) : (
				<Input.Group
					size={'large'}
				>
					<Input.Search
						autoFocus
						enterButton
						allowClear
						size="large"
						className={styles.searchbar}
						placeholder="Cole o título de um artigo aqui..."
						suffix={selectBefore(mode)}
						value={title}
						onChange={e => setTitle(e.target.value)}
						onSearch={onSearching} />
					<Form.Item
						name="body"
						rules={[{
							required: true,
							message: 'Coloque aqui o corpo de um artigo ou troque para URL.',
						},
						{
							min: 500,
							message: 'É aconselhável colocar algo com pelo menos 500 caracteres.',
							warningOnly: true
						},
						]}
						validateStatus={error ? error.style : undefined}
						help={error ? error.message : undefined}
						extra={error ? error.detail : undefined}
					>
						<Input.TextArea
							allowClear
							showCount
							autoSize={{ maxRows: 10 }}
							placeholder="Cole o corpo de um artigo aqui..."
							onChange={e => setBody(e.target.value)} />
					</Form.Item>
				</Input.Group>
			)}
		</Form>
	)
}

export default SearchBar