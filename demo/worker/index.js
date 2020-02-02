const containerEl = document.querySelector('.container')
const worker = new Worker('worker.js')
let N = 0

const bindEvents = () => {
  document.querySelector('.reset').addEventListener('click', (e) => {
    N = N + 1
    const length = N

    document.querySelector('.reset').innerHTML = N

    worker.postMessage({
      length,
      clientHeight: containerEl.clientHeight,
      clientWidth: containerEl.clientWidth,
    })
  })

  worker.onmessage = (e) => {
    containerEl.innerHTML = e.data.message
  }
}

bindEvents()
