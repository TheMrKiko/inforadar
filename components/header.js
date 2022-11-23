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
					<Col {...{ xxl: 4, xl: 5, lg: 6, md: 6, sm: 22, xs: 22 }}>
						<Link href="/" className={cn(utilStyles.justifyContentCenter)}>
							<Image
								priority
								src={`${process.env.BASE_PATH}/inforadar.svg`}
								height={32}
								width={161}
								alt={'Logo'}
							/>
						</Link>
					</Col>
					<Col {...{ xxl: 20, xl: 19, lg: 18, md: 18, sm: 2, xs: 2 }} className={utilStyles.justifyContentCenter}>
						<>{useIsClient() &&
							<Menu
								mode="horizontal"
								selectedKeys={[current]}
								className={cn(utilStyles.width100, utilStyles.justifyContentCenter)}
							>
								<Menu.Item key="sobre">
									<Link className={utilStyles.colorInherit} href="/sobre">Sobre
									</Link>
								</Menu.Item>
								<Menu.Item key="comofunciona">
									<Link className={utilStyles.colorInherit} href="/comofunciona">Como funciona
									</Link>
								</Menu.Item>
								<Menu.Item key="avaliacao">
									<Link className={utilStyles.colorInherit} href="/avaliacao">Avaliação
									</Link>
								</Menu.Item>
							</Menu>}</>
					</Col>
				</Row>
			</Layout.Header >
		</nav >
	)
}