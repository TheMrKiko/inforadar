import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout, Row, Col, Space, Typography } from 'antd'

import styles from './footer.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Footer({ login }) {
	return (
		<Layout.Footer className={styles.antfooter}>
			<Row justify={'center'}>
				<Col>
					{login && login.authenticated && login.userData && (
						<Typography.Paragraph>
							<Typography.Text className={utilStyles.whiteText}>Sessão iniciada como {login.userData.name}
								<Typography.Link onClick={login.logout}> (Sair)</Typography.Link>
							</Typography.Text>
						</Typography.Paragraph>
					)}
				</Col>
			</Row>
			<Row justify={'center'}>
				<Col>
					<Typography.Paragraph>
						<Typography.Text className={utilStyles.whiteText} italic={true}>Uma iniciativa desenvolvida no âmbito do projeto CONTRAFAKE.</Typography.Text>
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row className={styles.footer} justify={'center'}>
				<Col span={4} pull={3}>
					<a>
						<Image
							src={`${process.env.BASE_PATH}/contrafake-white.svg`}
							fill
							alt={'Logo'}
							style={{ objectFit: 'scale-down', }} />
					</a>
				</Col>
				<Col span={4}>
					<a>
						<Image
							src={`${process.env.BASE_PATH}/incd.png`}
							fill
							alt={'Logo'}
							style={{ objectFit: 'scale-down', }} />
					</a>
				</Col>
				<Col span={4} push={3}>
					<a>
						<Image
							src={`${process.env.BASE_PATH}/inescid.png`}
							fill
							alt={'Logo'}
							style={{ objectFit: 'scale-down', }} />
					</a>
				</Col>
			</Row>
		</Layout.Footer>
	)
}