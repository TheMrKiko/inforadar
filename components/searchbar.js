import React from 'react'
import { Input, Select, Form } from 'antd'

import styles from '../styles/Home.module.css'

const SearchBar = ({ mode, url, title, body, error, onChangeMode, onSearching: onSearchingOriginal, onChangeUrl, onChangeTitle, onChangeBody }) => {
	const [form] = Form.useForm();

	const onSearching = () => {
		form.validateFields(
			!mode ?
				['url'] :
				['body']
		).then(() => {
			onSearchingOriginal();
		}).catch((r) => console.log(r));
	}

	const selectBefore = (mode) => (
		<Form.Item
			noStyle
		>
			<Select
				defaultValue={0}
				bordered={false}
				size="small"
				onChange={onChangeMode}
				value={mode}
			>
				<Select.Option value={0}>URL</Select.Option>
				<Select.Option value={1}>Texto</Select.Option>
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
			{!mode ? (
				<Form.Item
					name="url"
					rules={[{
						required: true,
						message: 'Coloque aqui um URL ou troque para texto.',
					}, {
						type: 'url',
						message: 'Coloque um URL válido.',
					}]}
					validateStatus={error ? error.type : undefined}
					help={error ? error.message : undefined}
					extra={error ? error.submessage : undefined}
				>
					<Input.Search
						autoFocus
						enterButton
						size="large"
						className={styles.searchbar}
						placeholder="Cole o URL de um artigo aqui..."
						suffix={selectBefore(mode)}
						onChange={onChangeUrl}
						onSearch={onSearching} />
				</Form.Item>
			) : (
				<Input.Group
					size={'large'}
				>
					<Input.Search
						autoFocus
						enterButton
						size="large"
						className={styles.searchbar}
						placeholder="Cole o título de um artigo aqui..."
						suffix={selectBefore(mode)}
						value={title}
						onChange={onChangeTitle}
						onSearch={onSearching} />
					<Form.Item
						name="body"
						rules={[{
							required: true,
							message: 'Coloque aqui o corpo de um artigo ou troque para URL.',
						},
						{
							min: 2000,
							message: 'É aconselhável colocar algo com pelo menos 2000 caracteres.',
							warningOnly: true
						},
						]}
						validateStatus={error ? error.type : undefined}
						help={error ? error.message : undefined}
						extra={error ? error.submessage : undefined}
					>
						<Input.TextArea
							showCount
							autoSize={{ maxRows: 10 }}
							placeholder="Cole o corpo de um artigo aqui..."
							onChange={onChangeBody} />
					</Form.Item>
				</Input.Group>
			)}
		</Form>
	)
}

export default SearchBar