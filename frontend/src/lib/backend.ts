import { Mode, Key, modes } from "./keys"

export const URI = import.meta.env.DEV
    ? "http://0.0.0.0:8000"
    : "https://piano-scale-backend.deno.dev"

export async function getMode(key: Key, mode: Mode): Promise<number[]> {
    const url = new URL(URI)
    url.searchParams.set("key", (key as string).split(" ")[0])
    url.searchParams.set("mode", mode as string)

    return fetch(url)
        .then(r => r.json())
        .then(json => {
            console.log(json.scale)
            return json.scale
        })
        .catch(() => {
            alert("Server Unavailable!")
            return modes[0]
        })
}
