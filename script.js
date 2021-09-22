const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
let hue = 0

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  y: 100,
  x: 100,
}

// canvas.addEventListener("click", (e) => {
//   mouse.x = e.x
//   mouse.y = e.y
//   for(let i = 0; i < 20; i++){ 
//     particlesArray.push(new Particle()) // on click add 20 particles
//   }
// })

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x
  mouse.y = e.y
  // draw()
  particlesArray.push(new Particle()) // add particles on mouse move
})

class Particle{
  constructor(){
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.color = "hsl("+hue+",100%,50%)"
  }
  update(){
    this.x += this.speedX
    this.y += this.speedY
    if(this.size > 0.2) this.size -= 0.01 // shrink the particles as they move away
  }
  draw(){
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update()
    particlesArray[i].draw()
    for(let j = i; j < particlesArray.length; j++){
      // pythagorean theorem--------------------- 
      // angle is 90 deg
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      // hypothenuse
      const distance = Math.sqrt(dx * dx + dy * dy)
      if(distance < 100){
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[i].color
        ctx.lineWidth = .2
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
    }
    if(particlesArray[i].size <= 0.3){ // if size is bigger than .3 remove one element
      particlesArray.splice(i, 1)
      console.log(particlesArray.length);
      i--
    }
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height) // clear the canvas on every draw
  // ctx.fillStyle = "rgba(0,0,0,.1)" // add trails to particles
  // ctx.fillRect(0,0,canvas.width, canvas.height)
  hue+=2
  handleParticles()
  requestAnimationFrame(animate) //calls function we pass in - creates a loop
}

animate()

