import { header } from "./header.ts"
import { Key, Mode, scale } from "./key.ts"

async function audio() {
    const wav = await Deno.readFile("c3.wav")
    return new Response(wav, {
        headers: header({
            "Content-Type": "audio/mpeg",
            "Content-Length": wav.length.toString(),
        }),
    })
}

function mode(url: URL) {
    const key: Key = url.searchParams.get("key") as Key ?? "C"
    const mode: Mode = url.searchParams.get("mode") as Mode ?? "ionian"

    return new Response(
        JSON.stringify({
            key,
            mode,
            scale: scale(key, mode),
        }),
        {
            headers: header(),
        },
    )
}

function handler(req: Request) {
    const url = new URL(req.url)

    if (url.pathname === "/audio") {
        return audio()
    }

    return mode(url)
}

if (import.meta.main) {
    Deno.serve(handler)
}
