import React from 'react';
import { Collapse, Space, Typography } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

const ERCLabel = (props) => (
	<Collapse
		expandIconPosition={"right"}
	>
		<Collapse.Panel
			header={
				<Space>
					<Typography.Text type={
						props.sourceData.id ? "success" : "warning"}
					>
						{
							props.sourceData.id ?
								<CheckCircleFilled /> :
								<ExclamationCircleFilled />
						}
					</Typography.Text>
					{`Fonte ${!props.sourceData.id ? 'não ' : ''}registada na ERC`}
				</Space>
			}
		>
			{props.sourceInfo && (props.sourceData.id ?
				<Space direction={'vertical'}>
					<Typography.Text type={'secondary'}>
						Dados retirados do
						<Typography.Link href="https://www.erc.pt/pt/listagem-registos-na-erc" target="_blank"> registo oficial da ERC</Typography.Link> a {new Date(props.sourceData["last_update"]).toLocaleDateString()}.
					</Typography.Text>
					<Space direction={'vertical'} size={'small'}>
						{["title", "owner", "location", "municipality", "registration_date"].map(key => (
							props.sourceData[key] ?
								<Typography.Text>
									<Typography.Text strong>
										{props.sourceInfo[key]}
									</Typography.Text>
									{`: ${!key.includes('date') ? props.sourceData[key] : new Date(props.sourceData[key]).toLocaleDateString()}`}
								</Typography.Text>
								: null
						))}
					</Space>
				</Space>
				:
				<Typography.Text type={'secondary'}>
					Não há <Typography.Link href="https://www.erc.pt/pt/listagem-registos-na-erc" target="_blank">registos</Typography.Link> desta publicação.
				</Typography.Text>
			)}
		</Collapse.Panel>
	</Collapse>
)

export default ERCLabel