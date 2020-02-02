import createScheduler from '../node_modules/@jaeseokk/chunk-scheduler/dist/index.js'

const CHUNK_UNIT = 80
const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']
const containerEl = document.querySelector('.container')
const progressEL = document.querySelector('#progress')

const centerX = containerEl.clientWidth / 2
const centerY = containerEl.clientHeight / 2

let N = 0

function* chunkGenerator(length) {
  let result = ''

  if (!length) {
    return result
  }
  progressEL.setAttribute('class', 'progress')
  document.querySelector('.reset').innerHTML = N

  //const n = Math.min(Math.pow(length, 2), 200)
  const counts = Math.min(length * 5, 100)

  let drawRadius = 30
  console.log(counts + ': ', counts)

  let chunkCount = 0

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

      chunkCount++
      if (chunkCount > CHUNK_UNIT) {
        chunkCount = 0
        yield
      }
    }
  }

  progressEL.setAttribute('class', 'progress-done')

  return result
}

const scheduler = createScheduler()

const bindEvents = () => {
  document.querySelector('.reset').addEventListener('click', async (e) => {
    N = N + 1

    const result = await scheduler.runChunks(chunkGenerator(N))
    containerEl.innerHTML = result
  })
}

bindEvents()
