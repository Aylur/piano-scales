const KEYS = {
    1: "C",
    2: "C# Db",
    3: "D",
    4: "D# Eb",
    5: "E",
    6: "F",
    7: "F# Gb",
    8: "G",
    9: "G# Ab",
    10: "A",
    11: "A# Bb",
    12: "B",
} as const

const SHARPS = [2, 4, 7, 9, 11]

export const key = (n: number) => ((n - 1) % 12) + 1 as keyof typeof KEYS

export const isSharp = (n: number) => SHARPS.includes(key(n))

export const keyLabel = (n: number) => KEYS[key(n)]

export const keys = [...Object.values(KEYS)] as const

export const modes = [
    "ionian",
    "dorian",
    "phrygian",
    "lydian",
    "mixolydian",
    "aeolian",
    "locrian",
] as const

export type Key = keyof typeof keys
export type Mode = keyof typeof modes
