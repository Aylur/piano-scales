const cors: HeadersInit = Deno.env.get("CORS")
    ? {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
    : {}

export function header(headers: HeadersInit = {}) {
    return new Headers({ ...cors, ...headers })
}
