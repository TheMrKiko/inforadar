import React from 'react';
import { Card, Typography } from 'antd';

import utilStyles from '../styles/utils.module.css';

const ArticleCard = (props) => (
	<Card
		hoverable
		loading={!props.article}
		cover={
			props.article && props.article.top_image &&
			<img alt={props.article.headline} src={props.article.top_image} />
		}
	>
		{props.article && <Card.Meta
			className={utilStyles.whiteSpacePreLine}
			title={
				<Typography.Text
					className={utilStyles.whiteSpaceNormal}
					disabled={!props.article.headline}
				>
					{props.article.headline || "Texto inserido manualmente"}
				</Typography.Text>
			}
			description={<Typography.Paragraph ellipsis={{
				expandable: true,
				rows: 3,
				symbol: 'Ver mais',
			}}>
				{props.article.body_text.trim()}
			</Typography.Paragraph>} />}
	</Card>
)

export default ArticleCard