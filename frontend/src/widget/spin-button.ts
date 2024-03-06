import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { base, fontawesome } from "../lib/style"

@customElement("spin-button")
export class SpinButton<T> extends LitElement {
    @property({ type: Array }) values: T[] = []
    @property() value!: T

    render() {
        return html`
        ${fontawesome}
        <main>
            <span>${this.value}</span>
            <button @click=${() => this.index(+1)}>
                <i class="fa-solid fa-caret-up"></i>
            </button>
            <button @click=${() => this.index(-1)}>
                <i class="fa-solid fa-caret-down"></i>
            </button>
        </main>
        `
    }

    index(n: 1 | -1) {
        // this.value is a string, but values can be string | number
        const index = this.values.findIndex((v) => v == this.value)

        if (index === -1)
            throw Error("value can't be found in values")

        if (n > 0) {
            this.value = this.values.length <= index + n
                ? this.values[0] : this.values[index + n]
        } else {
            this.value = index + n >= 0
                ? this.values[index + n] : this.values[this.values.length - 1]
        }

        this.dispatchEvent(new CustomEvent("value", {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value
            }
        }))
    }

    static styles = [base, css`
        button {
            background-color: white;
            box-shadow: inset 0 0 0 1px rgba(0,0,0, 0.2);
            color: black;
            border-radius: 5px;
            border: none;
            padding: .2em .3em;
        }

        main {
            display: flex;
            gap: .3em;
        }

        span {
            min-width: 5.4em;
            text-align: right;
        }
    `]
}
