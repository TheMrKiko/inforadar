import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout, Row, Col, Menu } from 'antd'
import cn from 'classnames'

import styles from './header.module.css'
import utilStyles from '../styles/utils.module.css'

function useIsClient() {
	const [isClient, setIsClient] = React.useState(false);
	// The following effect will be ignored on server, 
	// but run on the browser to set the flag true
	React.useEffect(() => setIsClient(true), []);
	return isClient
}

export default function Header({ current }) {
	return (
		<nav>
			<Layout.Header className={cn(styles.antheader, 'ant-menu-horizontal')}>
				<Row align={'middle'} justify={'center'}>
					<Col span={4}>
						<Link href="/">
							<a className={cn(utilStyles.justifyContentCenter)}>
								<Image
									priority
									src="/inforadar.svg"
									height={32}
									width={161}
									alt={'Logo'}
								/>
							</a>
						</Link>
					</Col>
					<Col span={20} className={utilStyles.justifyContentCenter}>
						<>{useIsClient() &&
							<Menu
								mode="horizontal"
								disabledOverflow
								selectedKeys={[current]}
							>
								<Menu.Item key="sobre">
									<Link href="/sobre">
										<a className={utilStyles.colorInherit}>Sobre</a>
									</Link>
								</Menu.Item>
								<Menu.Item key="comofunciona">
									<Link href="/comofunciona">
										<a className={utilStyles.colorInherit}>Como funciona</a>
									</Link>
								</Menu.Item>
								<Menu.Item key="avaliacao">
									<Link href="/avaliacao">
										<a className={utilStyles.colorInherit}>Avaliação</a>
									</Link>
								</Menu.Item>
							</Menu>}</>
					</Col>
				</Row>
			</Layout.Header >
		</nav>
	)
}