export class Test {
	constructor(state, env) {}
	async fetch(request) {
		return Response.json('Hello World from cloudflare durable object!!!');
	}
}