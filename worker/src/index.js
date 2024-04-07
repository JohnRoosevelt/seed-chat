export { Test } from './test.js'

export default {
	async fetch(request, env, ctx) {
		return Response.json('hello');
	},
};
