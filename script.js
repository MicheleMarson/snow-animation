const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
// console.log(ctx);

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
//   draw()
// })

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x
  mouse.y = e.y
  // draw()
  
})

class Particle{
  constructor(){
    // this.x = mouse.x
    // this.y = mouse.y
    // this.random = Math.round(Math.random()*255)
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.color = "rgb("+Math.round(Math.random()*255) +","
    +Math.round(Math.random()*255) +","+Math.round(Math.random()*255)+")"
  }
  update(){
    this.x += this.speedX
    this.y += this.speedY
  }
  draw(){
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function init(){
  for(let i = 0; i < 300; i++){
    particlesArray.push(new Particle())
  }
}

init()

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update()
    particlesArray[i].draw()
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleParticles()
  requestAnimationFrame(animate) //calls function we pass in - creates a loop
}

animate()

