import { URI } from "./backend"

const context = new AudioContext

const sample = await fetch(`${URI}/audio`)
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer))
    .catch(() => alert("Server unavailable"))

export function playKey(note: number) {
    if (sample) {
        const source = context.createBufferSource()
        source.buffer = sample
        source.playbackRate.value = 2 ** (note / 12)
        source.connect(context.destination)
        source.start(0)
    }
}
