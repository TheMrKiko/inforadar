import React from 'react'
import { Input, Select } from 'antd'

import styles from '../styles/Home.module.css'

export default function SearchBar({ mode, url, title, body, onChangeMode, onSearching, onChangeUrl, onChangeTitle, onChangeBody }) {
	const selectBefore = (mode) => (
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
	)

	return !mode ? (
		<Input.Search
			autoFocus
			enterButton
			size="large"
			className={styles.searchbar}
			placeholder="Cole o URL de um artigo aqui..."
			suffix={selectBefore(mode)}
			value={url}
			onChange={onChangeUrl}
			onSearch={onSearching} />
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
				onChange={onChangeTitle} />
			<Input.TextArea
				showCount
				autoSize={{ maxRows: 10 }}
				placeholder="Cole o corpo de um artigo aqui..."
				value={body}
				onChange={onChangeBody} />
		</Input.Group>
	)
}