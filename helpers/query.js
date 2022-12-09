export class Query {
	constructor(queryplainobj = {}) {
		this.url = queryplainobj.url ?? undefined;
		this.title = queryplainobj.title ?? undefined;
		this.body = queryplainobj.body ?? undefined;
		this.mid = queryplainobj.mid ?? undefined;
		this.mode = queryplainobj.mode ?? (this.url ? md.URL : (this.body ? md.TEXT : (this.mid ? md.MINT : undefined)));
	}

	equals(otherQuery) {
		return !(this.mode !== otherQuery.mode || this.url !== otherQuery.url || this.title !== otherQuery.title || this.body !== otherQuery.body || this.mid !== otherQuery.mid);
	}

	valid() {
		return this.url || this.body || this.mid;
	}
}

export const md = {
	URL: 0,
	TEXT: 1,
	MINT: 2,
	MAIN: 3,
}