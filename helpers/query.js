export class Query {
	constructor(queryplainobj = {}) {
		this.url = queryplainobj.url ?? undefined;
		this.title = queryplainobj.title ?? undefined;
		this.body = queryplainobj.body ?? undefined;
		this.mode = queryplainobj.mode ?? (this.url ? 0 : (this.body ? 1 : undefined));
	}

	equals(otherQuery) {
		return !(this.mode !== otherQuery.mode || this.url !== otherQuery.url || this.title !== otherQuery.title || this.body !== otherQuery.body);
	}

	valid() {
		return this.url || this.body;
	}
}

export const md = {
	URL: 0,
	TEXT: 1,
}