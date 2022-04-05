import { notification } from 'antd';

const { DEBUG } = process.env

export const errorType = {
	GET_INFO: -3,
	SCRAPPER: -2,
	CORPUS_ARTICLE: -1,
	THE_LINE: 0,
	INDICATORS: 1,
	METRICS: 2,
	HISTOGRAM: 3,
	SOURCE_CHECKER: 4,
	SMALL_TEXT: 5,
	GOOGLE: 6,
	LOGIN: 7,
	RELOGIN: 8,
	LOGOUT: 9,
	AUTHORIZE: 10,
}

export function createError(type, e = undefined) {
	switch (type) {
		case errorType.GET_INFO:
			return new Error(type,
				'Estamos com problemas a iniciar o InfoRadar. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message);
		case errorType.SCRAPPER:
			return new Error(type,
				null,
				'Não conseguimos extrair o artigo do URL submetido. Por favor considere trocar para Texto em vez de URL e copiar/colar o artigo do site original.',
				e.response.data.message);
		case errorType.CORPUS_ARTICLE:
			return new Error(type,
				'Estamos com problemas a iniciar o InfoRadar. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message);
		case errorType.INDICATORS:
			return new Error(type,
				'Não conseguimos calcular os indicadores deste artigo. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message);
		case errorType.METRICS:
			return new Error(type,
				'Não conseguimos calcular todas as métricas deste artigo. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message);
			break;
		case errorType.HISTOGRAM:
			return new Error(type,
				'Não conseguimos desenhar os histogramas detalhados para este artigo. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.SOURCE_CHECKER:
			return new Error(type,
				'Não conseguimos calcular a origem da fonte deste artigo. Por favor atualize a página ou tente de novo mais tarde.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.SMALL_TEXT:
			return new Error(type,
				null,
				'Como o tamanho do corpo de texto é inferior a 500 caracteres, o resultado da análise poderá ser limitado.',
				null, true);
		case errorType.LOGIN:
			return new Error(type,
				'Ocorreu um erro ao iniciar sessão.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.GOOGLE:
			return new Error(type,
				'Ocorreu um erro a iniciar a autenticação com o Google.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.LOGOUT:
			return new Error(type,
				'Ocorreu um erro ao terminar a sua sessão.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.RELOGIN:
			return DEBUG && new Error(type,
				'Sessão não-fresca apagada.',
				null,
				e.response.data.message ?? e.message, true);
		case errorType.AUTHORIZE:
			return new Error(type,
				'Não nos foi possível validar a sua sessão para completar esta operação. Por favor inicie sessão de novo e repita a operação.',
				null,
				e.response.data.message ?? e.message, true);
		default:
			return new Error(type,
				'Ocorreu um erro inesperado.',
				null,
				e.response.data.message ?? e.message, true);
	}
}

export class Error {
	constructor(type, notif, message, detail, isWarning = false) {
		this.type = type;
		this.notif = notif;
		this.message = message;
		this.detail = detail;
		this.style = isWarning ? 'warning' : 'error';

		if (notif && !isWarning)
			notification.error({
				message: notif,
				description: DEBUG && detail,
			});
		if (notif && isWarning)
			notification.warning({
				message: notif,
				description: DEBUG && detail,
			});
	}
}

export function textSizeValidation(article) {
	return article.body_text.length > 500 ? null : createError(errorType.SMALL_TEXT);
}