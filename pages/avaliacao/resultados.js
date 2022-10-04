import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { Layout as AntLayout, Typography, Breadcrumb, Table } from 'antd'
import { createError, errorType } from '../../helpers/error'
import axios from 'axios'

import utilStyles from '../../styles/utils.module.css'

const { API_PATH } = process.env

const columns = [
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
];

const Results = ({ login }) => {
    const [reports, setReports] = useState(null);

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

    return (
        <Layout current={'avaliacao'} login={login}>
            <Head>
                <title>Resultados da Avaliação | InfoRadar</title>
            </Head>
            <AntLayout.Content className={utilStyles.container}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link href={'/avaliacao'}>Avaliação</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Typography.Title level={1}>Resultados</Typography.Title>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Typography.Paragraph>Consultar os dados dos anotadores remunerados na plataforma.</Typography.Paragraph>
                {login.authenticated ?
                    <Typography.Paragraph>
                        {!login.userData.admin ?
                            <Typography.Text type={'danger'}>Página apenas disponível para administradores. <Link href='/avaliacao'>Voltar atrás</Link>.</Typography.Text>
                            :
                            <Table
                                loading={!reports}
                                columns={columns}
                                dataSource={reports}
                            />
                        }
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


export default Results