import React from 'react'
import { Skeleton } from 'antd'

import parse, { attributesToProps, domToReact } from 'html-react-parser';

import utilStyles from '../styles/utils.module.css'

const Histogram = ({ category, histogram }) => {
	const options = {
		replace: (domNode) => {
			const { name, attribs, children } = domNode;
			if (attribs && name === 'svg')
				return <svg {...{
					...attributesToProps(attribs),
					width: undefined,
					height: undefined
				}}>
					{domToReact(children, options)}
				</svg>
			else if (attribs && name === 'text') {
				const props = attributesToProps(attribs);
				return <text {...props}
					style={{
						...props.style,
						fontFamily: 'inherit'
					}}>
					{domToReact(children, options)}
				</text>
			}
			return domToReact(domNode, options)
		}
	}
	return !!histogram ?
		<div className={utilStyles.width100}>
			{parse(histogram.categories[category].svg, options)}
		</div> :
		<Skeleton.Image />
}

export default Histogram