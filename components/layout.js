import Header from './header'
import Footer from './footer'

import Head from 'next/head'
import { Layout as AntLayout } from 'antd'

import styles from './layout.module.css'


export default function Layout({ children, current }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AntLayout>
				<Header current={current} />
				<AntLayout>
					{children}
				</AntLayout>
				<Footer />
			</AntLayout>
		</div>
	)
}



