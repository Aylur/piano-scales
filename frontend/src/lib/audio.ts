import { URI } from "./backend"

let context: AudioContext
let sample: AudioBuffer | void

async function init() {
    if (context)
        return

    context = new AudioContext
    sample = await fetch(`${URI}/audio`)
        .then(response => response.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer))
        .catch(() => alert("Server unavailable"))
}

export async function playKey(note: number) {
    await init()
    if (sample) {
        const source = context.createBufferSource()
        source.buffer = sample
        source.playbackRate.value = 2 ** (note / 12)
        source.connect(context.destination)
        source.start(0)
    }
}
