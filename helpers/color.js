import utilStyles from '../styles/utils.module.css'

export const colorScaleType = {
	LIGHT: 'Light',
	CONTRAST: '',
	MONO: 'Mono'
}

export const colorScaleClass = (n, type = colorScaleType.CONTRAST) => utilStyles[`levelColor${type}${n}`]
