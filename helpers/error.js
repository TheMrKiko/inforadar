export class Error {
	constructor(error, typeE = true) {
		this.errorObj = error;
		this.message = error.mainmessage ?? 'Não conseguimos extrair o artigo do URL submetido. Por favor considere trocar para Texto em vez de URL e copiar/colar o artigo do site original.';
		this.submessage = error.message;
		this.type = typeE ? 'error' : 'warning';
	}
}

export function textSizeValidation(article) {
	return article.body_text.length > 500 ? null : new Error({ mainmessage: 'Como o tamanho do corpo de texto é inferior a 500 caracteres, o resultado da análise poderá ser limitado.' }, false)
}