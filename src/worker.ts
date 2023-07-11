const HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Cache-Control': 'max-age: 10'
}

const MISSING_URI_ERROR = 'Bad request: Missing uri'

export default {
	async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)

		const proxyUri = url.searchParams.get('uri')

		if (!proxyUri) {
			return new Response(MISSING_URI_ERROR, { status: 400 })
		}

		const response = await fetch(decodeURIComponent(proxyUri), request)

		return new Response(response.body, { headers: HEADERS })
	},
}
