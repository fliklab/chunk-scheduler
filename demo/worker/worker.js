self.addEventListener('message', (e) => {
  const { length, clientHeight, clientWidth } = e.data
  postMessage({
    message: makeDots({ length, clientHeight, clientWidth }),
  })
})

const colorClasses = ['primary', 'secondary', 'tertiary', 'quaternary']

const makeDots = ({ length, clientHeight, clientWidth }) => {
  // progressEL.setAttribute('class', 'progress')
  const centerX = clientWidth / 2
  const centerY = clientHeight / 2
  let result = ''

  const counts = Math.min(length * 5, 100)

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

  return result
}
