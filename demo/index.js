const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']
const containerEl = document.querySelector('.container')
const progressEL = document.querySelector('#progress')

const centerX = containerEl.clientWidth / 2
const centerY = containerEl.clientHeight / 2
let N = 0

const bindEvents = () => {
  document.querySelector('.reset').addEventListener('click', async (e) => {
    N = N + 1
    document.querySelector('.reset').innerHTML = N
    // progressEL.setAttribute('class', 'progress')

    let result = ''

    const counts = Math.min(N * 5, 100)

    let drawRadius = 30
    console.log(counts + ': ', counts)

    for (let lay = 0; lay < counts; lay++) {
      const circleSize = 12
      drawRadius += circleSize
      const dotCount = (drawRadius * 2 * Math.PI) / circleSize
      for (let dot = 0; dot < dotCount; dot++) {
        const color =
          colorClasses[Math.floor(Math.random() * colorClasses.length)]
        const rand = dot / dotCount

        result += `<div 
        style="
          position:absolute;
        top:${centerY +
          Math.sin(rand * 2 * Math.PI) * drawRadius -
          circleSize * 0.5}px; 
        right:${centerX +
          Math.cos(rand * 2 * Math.PI) * drawRadius -
          circleSize * 0.5}px; 
        height: ${circleSize}px; 
        width: ${circleSize}px; 
        border-radius:50%; 
        " class="dot ${color}"></div>`
      }
    }
    containerEl.innerHTML = result
    // progressEL.setAttribute('class', 'progress-done')
  })
}

bindEvents()
