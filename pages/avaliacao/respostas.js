import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../../components/layout'
import { Layout as AntLayout, Typography, Breadcrumb, Table } from 'antd'
import { createError, errorType } from '../../helpers/error'
import axios from 'axios'

import utilStyles from '../../styles/utils.module.css'

const { API_PATH } = process.env

const reportsColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        defaultSortOrder: 'ascend',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (mail) => mail ?? '-',
    },
    {
        title: 'Artigos anotados',
        dataIndex: 'articles',
        key: 'articles',
    },
    {
        title: 'Média de tempo',
        dataIndex: 'avg_time_taken',
        key: 'avg_time_taken',
        render: (time) => {
            if (time == 'None')
                return '-';
            const secs = parseInt(time / 1000);
            return `${Math.floor(secs / 60)}min ${secs % 60}s`;
        },
    },
    {
        title: 'Coleção',
        dataIndex: 'collection',
        key: 'collection',
        render: (c) => c.toUpperCase(),
        filters: [
            {
                text: 'MINT',
                value: 'mint',
            },
            {
                text: 'MAIN',
                value: 'main',
            },
            {
                text: 'LUSA',
                value: 'lusa',
            },
        ],
        onFilter: (value, record) => record.collection == value,
        sorter: (a, b) => a.collection.length - b.collection.length,
        defaultFilteredValue: ['mint'],
    },
    {
        title: '',
        key: 'details',
        render: (_, record) => <Link
            href={{
                query: { userid: record.id },
            }}>Ver Respostas</Link>,
    },
];


const repliesColumns = [
    {
        title: 'Artigo',
        dataIndex: 'article_id',
        key: 'article_id',
        sorter: (a, b) => a.article_id - b.article_id,
    },
    {
        title: 'Tempo demorado',
        dataIndex: 'time_taken',
        key: 'time_taken',
        render: (time) => {
            if (time === null)
                return '-';
            const secs = parseInt(time / 1000);
            return `${Math.floor(secs / 60)}min ${secs % 60}s`;
        },
    },
    {
        title: 'Submetido em',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (d) => d.toLocaleString(),
        sorter: (a, b) => a.created_at.getTime() - b.created_at.getTime(),
        defaultSortOrder: 'ascend',
    },
];

const Respostas = ({ login, router }) => {
    const [reports, setReports] = useState(null);
    const [replies, setReplies] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_PATH}/user_reports`,
            headers: { 'content-type': 'application/json' }
        }).then(result => {
            setReports(result.data.map((e, i) => ({ ...e, key: i })));
        }).catch(error => {
            if (error.response && error.response.status === 401)
                login.loginError(createError(errorType.RELOGIN, error));
            else
                login.loginError(createError(errorType.AUTHORIZE, error), false);
        });
    }, []);

    useEffect(() => {
        const userid = parseInt(router.query.userid);
        if (userid && !isNaN(userid))
            setCurrentUser(userid);
        else if (router.query.userid !== undefined)
            router.push({
                pathname: router.pathname,
            });
        else
            setCurrentUser(null);
    }, [router.query.userid]);

    useEffect(() => {
        setReplies(null);
        if (currentUser)
            axios({
                method: 'get',
                url: `${API_PATH}/user_replies?id=${currentUser}`,
                headers: { 'content-type': 'application/json' }
            }).then(result => {
                setReplies(result.data.map((e, i) => ({ ...e, key: i, created_at: new Date(e.created_at) })));
            }).catch(error => {
                if (error.response && error.response.status === 401)
                    login.loginError(createError(errorType.RELOGIN, error));
                else
                    login.loginError(createError(errorType.AUTHORIZE, error), false);
            });
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser)
            setCurrentUserInfo(null);
        else if (reports)
            setCurrentUserInfo(reports.find(r => r.id === currentUser));
    }, [currentUser, reports]);

    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Respostas da Avaliação | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link href={'/avaliacao'}>Avaliação</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Typography.Title level={1}>Respostas
                            {!!currentUser &&
                                <Typography.Text> de&nbsp;
                                    {!!currentUserInfo &&
                                        <Typography.Text underline>{currentUserInfo.name}</Typography.Text>}
                                </Typography.Text>}
                        </Typography.Title>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Paragraph>Consultar os dados dos anotadores remunerados na plataforma.</Typography.Paragraph>
                {login.authenticated ?
                    <Typography.Paragraph>
                        {!login.userData.admin ?
                            <Typography.Text type={'danger'}>Página apenas disponível para administradores. <Link href='/avaliacao'>Voltar atrás</Link>.</Typography.Text>
                            :
                            (!!currentUser ?
                                <Table
                                    key='replies'
                                    loading={!replies}
                                    columns={repliesColumns}
                                    dataSource={replies}
                                    scroll={{ x: true }}
                                    pagination={{
                                        defaultPageSize: 30,
                                        showSizeChanger: true,
                                        hideOnSinglePage: true,
                                    }}
                                />
                                :
                                <Table
                                    key='reports'
                                    loading={!reports}
                                    columns={reportsColumns}
                                    dataSource={reports}
                                    scroll={{ x: true }}
                                    pagination={{
                                        defaultPageSize: 20,
                                        hideOnSinglePage: true,
                                    }}
                                />
                            )}
                    </Typography.Paragraph>
                    :
                    <Typography.Paragraph>
                        <Typography.Text type={'warning'}>Para visualizar esta página, precisa de <Link href='/login'>iniciar sessão</Link>.</Typography.Text>
                    </Typography.Paragraph>
                }
            </AntLayout.Content>
        </Layout>
    )
}


export default withRouter(Respostas)