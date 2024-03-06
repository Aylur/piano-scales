const MODES = {
    "ionian": [1, 3, 5, 6, 8, 10, 12],
    "dorian": [1, 3, 4, 6, 8, 10, 11], // b3 b7
    "phrygian": [1, 2, 4, 6, 8, 9, 11], // b2 b3 b6 b7
    "lydian": [1, 3, 5, 7, 8, 10, 12], // #4
    "mixolydian": [1, 3, 5, 6, 8, 10, 11], // b7
    "aeolian": [1, 3, 4, 6, 8, 9, 11], // b3 b6 b7
    "locrian": [1, 2, 4, 6, 7, 9, 11], // b2 b3 b5 b6 b7
} as const

const KEYS = {
    "C": 1,
    "D": 3,
    "E": 5,
    "F": 6,
    "G": 8,
    "A": 10,
    "B": 12,
    "C#": 2,
    "Db": 2,
    "D#": 4,
    "Eb": 4,
    "F#": 7,
    "Gb": 7,
    "G#": 9,
    "Ab": 9,
    "A#": 11,
    "Bb": 11,
} as const

function mod(n: number): number {
    return n <= 12 ? n : mod(n - 12)
}

export type Key = keyof typeof KEYS
export type Mode = keyof typeof MODES

export function scale(key: Key, mode: Mode) {
    const k = KEYS[key] - 1
    const m = MODES[mode]
    return m.map((v) => mod(v + k))
}
