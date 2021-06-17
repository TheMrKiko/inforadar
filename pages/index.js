import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import cn from 'classnames'
import { Layout as AntLayout, Input, Space, Row, Col, Typography, Button, Select } from 'antd'
import Link from 'next/link'

const { Sider, Content } = AntLayout;

function HomeBlock({ children, className }) {
    return (
        <div className={cn(styles.block, className)}>
            <Row>
                <Col offset={3} span={12}>
                    {children}
                </Col>
            </Row>
        </div>
    )
}


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 0
        }
    }

    onChangeMode = (m) => {
        this.setState({ mode: m })
    }

    onChangeUrl = (u) => {
        this.setState({ url: u.target.value })
    }

    onChangeTitle = (t) => {
        this.setState({ title: t.target.value })
    }

    onChangeBody = (b) => {
        this.setState({ body: b.target.value })
    }

    selectBefore = (mode) => (
        <Select
            defaultValue={0}
            bordered={false}
            size="small"
            onChange={this.onChangeMode}
            value={mode}
        >
            <Select.Option value={0}>URL</Select.Option>
            <Select.Option value={1}>Texto</Select.Option>
        </Select>
    )

    render() {
        return (
            <Layout current={'index'}>
                <Head>
                    <title>InfoRadar</title>
                </Head>
                <AntLayout>
                    <AntLayout>
                        <Sider className={styles.sidebar} theme={'light'} width={'50%'}>
                            <Row>
                                <Col offset={3} span={18} >
                                    <Space direction={'vertical'} size={'large'}>
                                        <Typography.Title level={1}>Que artigo quer analisar?</Typography.Title>
                                        {!this.state.mode ? (
                                            <Input.Search
                                                autoFocus
                                                enterButton
                                                size="large"
                                                className={styles.searchbar}
                                                placeholder="Cole o URL de um artigo aqui..."
                                                suffix={this.selectBefore(this.state.mode)}
                                                value={this.state.url}
                                                onChange={this.onChangeUrl}
                                            />
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
                                                    suffix={this.selectBefore(this.state.mode)}
                                                    value={this.state.title}
                                                    onChange={this.onChangeTitle}
                                                />
                                                <Input.TextArea
                                                    showCount
                                                    autoSize={{ maxRows: 10 }}
                                                    placeholder="Cole o corpo de um artigo aqui..."
                                                    value={this.state.body}
                                                    onChange={this.onChangeBody}
                                                />
                                            </Input.Group>
                                        )}
                                    </Space>
                                </Col>
                            </Row>
                        </Sider>
                        <Content>
                            <div className={styles.bgimage}>
                                <Image
                                    priority
                                    src={'/roman-kraft.jpg'}
                                    layout={'fill'}
                                    objectFit={'cover'}
                                />
                            </div>
                        </Content>
                    </AntLayout>
                    <Content>
                        <HomeBlock className={styles.comofuncblock}>
                            <Space direction={'vertical'} size={'large'}>
                                <Typography.Title level={2}>
                                    Compreender conteúdo e capacitar julgamento
                        </Typography.Title>
                                <Link href={'/comofunciona'}>
                                    <Button
                                        ghost
                                        shape={'round'}
                                        size={'large'}
                                    >
                                        Descobrir como funciona
                            </Button>
                                </Link>
                            </Space>
                        </HomeBlock>
                        <HomeBlock className={styles.browserblock}>
                            <Space direction={'vertical'} size={'large'}>
                                <Typography.Title level={2}>
                                    Ajudamos a analisar os sites que visita
                            </Typography.Title>
                                <Button
                                    shape={'round'}
                                    size={'large'}
                                >
                                    Obter extensão para browser
                            </Button>
                            </Space>
                        </HomeBlock>
                    </Content>
                </AntLayout>
            </Layout>
        )
    }
}