import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout, Row, Col, Space, Typography } from 'antd'
import styles from './footer.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Footer() {
	return (
		<Layout.Footer className={styles.antfooter}>
			<Row justify={'center'}>
				<Col>
					<Typography.Paragraph>
						<Typography.Text italic className={utilStyles.whiteText}>Uma iniciativa desenvolvida no âmbito do projeto CONTRAFAKE.</Typography.Text>
					</Typography.Paragraph>
				</Col>
			</Row>
			<Row className={styles.footer} justify={'center'}>
				<Col span={4} pull={3}>
					<a>
						<Image
							src="/contrafake-white.svg"
							layout={'fill'}
							objectFit={'scale-down'}
							alt={'Logo'}
						/>
					</a>
				</Col>
				<Col span={4}>
					<a>
						<Image
							src="/incd.png"
							layout={'fill'}
							objectFit={'scale-down'}
							alt={'Logo'}
						/>
					</a>
				</Col>
				<Col span={4} push={3}>
					<a>
						<Image
							src="/inescid.png"
							layout={'fill'}
							objectFit={'scale-down'}
							alt={'Logo'}
						/>
					</a>
				</Col>
			</Row>
		</Layout.Footer >
	)
}