import { useAutoScroll } from '../hooks/use-autoscroll.js'

customElements.define('auto-scroll', class AutoScroll extends HTMLElement {
  constructor() {
    super();
    this.config = { min: 1, max: 10, value: 5 };
    const [getSpeed, setSpeed, start, stop] = useAutoScroll(this.config);
    this.getSpeed = getSpeed;
    this.setSpeed = setSpeed;
    this.stop = stop;
    this.start = start;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/`
      <button id="play-stop">
        <svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" style="enable-background:new 0 0 485 485" xml:space="preserve"><path d="M413.974 71.026C368.171 25.225 307.274 0 242.5 0S116.829 25.225 71.026 71.026C25.225 116.829 0 177.726 0 242.5s25.225 125.671 71.026 171.474C116.829 459.775 177.726 485 242.5 485s125.671-25.225 171.474-71.026C459.775 368.171 485 307.274 485 242.5s-25.225-125.671-71.026-171.474zM242.5 455C125.327 455 30 359.673 30 242.5S125.327 30 242.5 30 455 125.327 455 242.5 359.673 455 242.5 455z"/><path d="M181.062 336.575 343.938 242.5l-162.876-94.075z"/></svg>
        <svg class="stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" style="enable-background:new 0 0 485 485" xml:space="preserve"><path d="M413.974 71.026C368.171 25.225 307.274 0 242.5 0S116.829 25.225 71.026 71.026C25.225 116.829 0 177.726 0 242.5s25.225 125.671 71.026 171.474C116.829 459.775 177.726 485 242.5 485s125.671-25.225 171.474-71.026C459.775 368.171 485 307.274 485 242.5s-25.225-125.671-71.026-171.474zM242.5 455C125.327 455 30 359.673 30 242.5S125.327 30 242.5 30 455 125.327 455 242.5 359.673 455 242.5 455z"/><path d="M140 140h205v205H140z"/></svg>
      </button>
      <button id="slower">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 0 256 0zm0 490.667c-129.396 0-234.667-105.27-234.667-234.667C21.333 126.606 126.604 21.333 256 21.333c129.396 0 234.667 105.272 234.667 234.667 0 129.397-105.271 234.667-234.667 234.667z"/><path d="M94.896 246.053h309.333v21.333H94.896z"/></svg>
      </button>
      <meter value="${this.config.value}" min="${this.config.min - 1}" max="${this.config.max}"></meter>
      <button id="faster">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.2 490.2" style="enable-background:new 0 0 490.2 490.2" xml:space="preserve"><path d="M418.5 418.5c95.6-95.6 95.6-251.2 0-346.8s-251.2-95.6-346.8 0-95.6 251.2 0 346.8 251.2 95.6 346.8 0zM89 89c86.1-86.1 226.1-86.1 312.2 0s86.1 226.1 0 312.2-226.1 86.1-312.2 0S3 175.1 89 89z"/><path d="M245.1 336.9c3.4 0 6.4-1.4 8.7-3.6 2.2-2.2 3.6-5.3 3.6-8.7v-67.3h67.3c3.4 0 6.4-1.4 8.7-3.6 2.2-2.2 3.6-5.3 3.6-8.7 0-6.8-5.5-12.3-12.2-12.2h-67.3v-67.3c0-6.8-5.5-12.3-12.2-12.2-6.8 0-12.3 5.5-12.2 12.2v67.3h-67.3c-6.8 0-12.3 5.5-12.2 12.2 0 6.8 5.5 12.3 12.2 12.2h67.3v67.3c-.3 6.9 5.2 12.4 12 12.4z"/></svg>
      </button>

      <style>
        :host {
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 3em;
          right: 2em;
          gap: 0.5em;
          width: 1.5em;
          z-index: 2147483647;
        }

        meter {
          /* writing mode not working in chromiun
          https://bugs.chromium.org/p/chromium/issues/detail?id=681917

          writing-mode: tb;
          rotate: 180deg;
          height: 4em;
          */
          rotate: 90deg;
        }

        #play-stop {
          margin-block-end: 0.5em;
        }

        #play-stop.scrolling svg.play {
          display: none;
        }

        #play-stop:not(.scrolling) svg.stop {
          display: none;
        }

        button {
          display: flex;
          background: none;
          border: none;
          padding: 0;
          background-color: whitesmoke;
          border-radius: 50%
        }
      </style>
    `

    this.playStop = this.shadowRoot.querySelector('#play-stop');
    this.slower = this.shadowRoot.querySelector('#slower');
    this.faster = this.shadowRoot.querySelector('#faster');
    this.meter = this.shadowRoot.querySelector('meter');

    this.faster.addEventListener('click', this.onFaster);
    this.slower.addEventListener('click', this.onSlower);
    this.playStop.addEventListener('click', this.onPlayStop);
  }

  onFaster = () => {
    if (this.meter.value >= 10) return;

    this.meter.value += 1;
    this.setSpeed(this.meter.value);
  }

  onSlower = () => {
    if (this.meter.value <= 1) return;

    this.meter.value -= 1;
    this.setSpeed(this.meter.value);
  }

  onPlayStop = () => {
    const isScroling = this.playStop.classList.toggle('scrolling')
    if (isScroling) {
      this.start();
      this.state = 'play';
    } else {
      this.stop();
      this.state = 'stop';
    }
  }
})