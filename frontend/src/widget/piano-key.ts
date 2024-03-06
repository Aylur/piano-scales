import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { isSharp, keyLabel } from "../lib/keys"
import { base } from "../lib/style"
import { classMap } from "lit/directives/class-map.js"

const size = css`var(--piano-size, 5rem)`

@customElement("piano-key")
export class PianoKey extends LitElement {
    @property({ type: Number }) key!: number
    @property({ type: Boolean }) sensitive = false

    render() {
        const label = (l: string) => html`
            <span>${l}</span>`

        const classes = {
            black: isSharp(this.key),
            white: !isSharp(this.key),
            disabled: !this.sensitive,
        }

        return html`
        <li class="${classMap(classes)}">
            ${keyLabel(this.key).split(" ").map(label)}
        </li>
        `
    }

    static styles = [base, css`
        li {
            border-radius: 0 0 8px 8px;
            position: relative;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: end;
            font-weight: bold;
            transition: 200ms;
        }

        span:last-child {
            margin-bottom: 1em;
        }

        .white {
            background-color: white;
            color: black;
            box-shadow: inset 0 -3px 0 1px rgba(0,0,0, 0.2);
            min-height: calc(${size} * 2);
            min-width: calc(${size} * .5);

            &:hover:not(.disabled) {
                background: #eee;
            }

            &:active:not(.disabled) {
                background: linear-gradient(white, #d0d0d0);
            }

            &.disabled {
                background-color: #bfbfbf;
                color: #6f6f6f;
            }
        }

        .black {
            background-color: #141414;
            color: white;
            margin: 0 calc(${size} * -.2);
            z-index: 1;
            min-height: calc(${size} * 2 - ${size} * .5);
            min-width: calc(${size} * .4);

            &:hover:not(.disabled) {
                background: #080808;
            }

            &:active:not(.disabled) {
                background: linear-gradient(#141414, black);
            }

            &.disabled {
                background-color: #242424;
                color: #6f6f6f;
            }
        }
    `]
}
