import { LitElement, css, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { PianoKey } from "./widget/piano-key"
import { base } from "./lib/style"
import { modes, keys, Mode, Key, key } from "./lib/keys"
import { getMode } from "./lib/backend"
import { playKey } from "./lib/audio"
import "./widget/spin-button"

@customElement("piano-piano")
export class Piano extends LitElement {
    @property({ type: Number }) octave = 1
    @property({ type: String }) mode = modes[0] as Mode
    @property({ type: String }) key = keys[0] as Key

    @state() enabledKeys: number[] = []

    render() {
        const Pianokey = (k: number) => html`<piano-key
            .sensitive="${this.enabledKeys.includes(key(k))}"
            .key=${k}
            @click=${this.onKeyClick}
        />`

        const length = Math.ceil(12 * this.octave)
        const pianokeys = Array.from({ length }, (_, i) => i + 1)

        return html`<main>
            <header>
                <div class="title">
                    <h1>Piano Scales</h1>
                    <span>Learn music scales visually</span>
                </div>

                <!-- list of custom elements has to be wrapped or .map -->
                <div class="spinners">
                    <div>
                        <span>Key:</span>
                        <spin-button
                            @value=${this.onKey}
                            .value="${this.key}"
                            .values=${keys}
                        />
                    </div>
                    <div>
                        <span>Mode:</span>
                        <spin-button
                            @value=${this.onMode}
                            .value="${this.mode}"
                            .values=${modes}
                        />
                    </div>
                    <div>
                        <span>Octaves:</span>
                        <spin-button
                            @value=${this.onOctave}
                            .value="${1}"
                            .values=${[1, 1.4, 2, 2.4]}
                        />
                    </div>
                </div>
            </header>
            <div class="piano">
                <ul>${pianokeys.map(Pianokey)}</ul>
                <div class="shadow" />
            </div>
        </main>`
    }

    constructor() { super(); this.requestMode() }

    // TODO: waiting animation
    async requestMode() {
        this.enabledKeys = await getMode(this.key, this.mode)
    }

    onKey({ detail }: CustomEvent) {
        this.key = detail.value || keys[0]
        this.requestMode()
    }

    onMode({ detail }: CustomEvent) {
        this.mode = detail.value || modes[0]
        this.requestMode()
    }

    onOctave({ detail }: CustomEvent) {
        this.octave = detail.value || 1
    }

    onKeyClick({ target }: Event) {
        if (target instanceof PianoKey && target.sensitive) {
            playKey(target.key)
        }
    }

    static styles = [base, css`
        header {
            display: flex;
            align-items: center;
            margin-bottom: .5rem;

            .title {
                flex: 1;
                align-self: flex-start;

                span {
                    color: rgba(255,255,255,0.6)
                }
            }

            .spinners {
                display: flex;
                flex-flow: column;
                align-items: end;
                gap: .3em;

                div {
                    display: flex;
                }
            }
        }

        piano-key {
            --piano-size: 7rem;
        }

        main {
            background-color: #39250d;
            border-radius: 11px;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02),
                        4px 4px 8px 0 rgba(0,0,0,0.4);
            color: white;
            display: flex;
            flex-flow: column;
            padding: 18px;
        }

        .piano {
            position: relative;

            .shadow {
                min-width: 100%;
                min-height: .2rem;
                position: absolute;
                top: 0;
                z-index: 2;
                background: linear-gradient(#111, transparent);
            }

            ul {
                list-style-type: none;
                display: flex;
            }
        }
    `]
}

declare global {
    interface HTMLElementTagNameMap {
        "piano-piano": Piano
    }
}
