let Tag    = new Date().getDate(),
    Monat  = new Date().getMonth(),
    width  = 800,
    height = 526,
    tagAktiv = -1,
    currentImage,
    currentAudio,
    currentVideo,
    extraMessage,
    jingle,
    can, 
    ctx,
    doors = [], 
    images = [],
    audios = [],
    video,
    button,
    snowflakes = []

document.addEventListener('mousedown', clicked)
document.addEventListener('keydown', keyPressed)

function keyPressed(e) {
  if (e.keyCode != 81)
    return
  Tag   = 30
  Monat = 11
}

window.onload = function() {
  window.addEventListener('dblclick', e => {
    e.preventDefault()})

  can = document.getElementById('C')
  ctx = can.getContext('2d')
  video = document.getElementById('Vid')
  button = document.getElementById('Zurueck')
  extraMessage = document.getElementById('extraMessage')

  for (let i = 0; i < 24; i++)
    doors.push(new Door(i))

  loadStuff()
}

function loadStuff() {
  loadAudios()
  loadImages() // als Promise: Im Anschluss folgt show()
}

function loadAudios(i = 0) {
  audios[i] = new Audio()
  audios[i].src = ['./rsc/Jingle.wav']
  audios[i].volume = .3
} 

function loadImages(i = 0) {
  images[2] = new Image()
  images[2].src = './rsc/Jpg30.jpg'

  images[1] = new Image()
  images[1].src = './rsc/Rahmen.png'

  images[0] = new Image()
  images[0].src = './rsc/Kalender.jpg'
  images[0].addEventListener('load', show)
}

function show() {
  if (tagAktiv == 14 || tagAktiv == 15) {
    special()
    return
  }

  ctx.drawImage(images[0], 0 , 0)

  if (tagAktiv != -1 && !currentVideo) {    
    if  (![5, 6].includes(tagAktiv % 7))  // Wochenende 
      audios[0].play()
    let bigger = Door.noContent.includes(tagAktiv) || doors.some(d => d.id == tagAktiv && d.bigger)
    let i = 0
    let interval = setInterval(_ => {
      let anzahl = bigger ? 150 : 100    // Tag 1 & noContent, stärkerer
      if (i >= anzahl)                   // Zoom erforderlich
        clearInterval(interval)   

      let w = 8 * i
      let h = 5.26 * i
 
    rect(width/2 - w/2, height/2 - h/2, w, h, doors.some(d => d.id == tagAktiv && d.noFrame) ? 'black' : 'white')
    if (currentImage) {
      let hoehe = bigger ? h / 3 : h / 3.5   // wegen Rezepte (s.o.)
      ctx.drawImage(currentImage, width/2 - w/3, height/2 - hoehe, w*.6667, h*.6667)
    }
    if (((bigger && i < 150) || i < 110) && !doors.some(d => d.id == tagAktiv && d.noFrame))
    ctx.drawImage(images[1], width/2 - w/2, height/2 - h/2, w, h)
    i++
    if (i > 99)
      showContent()
    }, 17)
  }    
}

function showContent() {
  if (currentAudio)
    currentAudio.play()

  if (tagAktiv == 14) {}

  extraMessage.style.display = [...Door.noContent,...[1, 5, 8, 10]].includes(tagAktiv) ? 'block' : 'none'

  extraMessage.innerHTML = tagAktiv ==  1 ? '<h2>Morgen gibt es eine Kostprobe!<h2>' : 
                           tagAktiv ==  5 ? "<h2>Bird's Prelude von Henry Purcell</h2>" :
                           tagAktiv ==  8 ? '<h2>Plätzchen haben nur wenig Vitamine - deshalb muss man ganz viel davon essen!<h2>' :
                           tagAktiv == 10 ? '<h2>Verlosung: Zwei Weihnachtsmänner, bzw. -erdogans</h2>' :
                           Door.noContent.includes(tagAktiv) ? '<h2>Heute ruhe ich mich aus.<h2>' : undefined

  extraMessage.style.color = [1, 10].includes(tagAktiv) ? 'red' : 'silver'
}

function rect(x, y, w, h, col) {
  ctx.fillStyle = col
  ctx.fillRect(x, y, w, h)
}

function special() {
  if (tagAktiv == 14) 
    snowFalling()
  else  
    rotation()

  showContent()
}

function rotation() {
  rect(0, 0, 800, 526, 'black')
  ctx.drawImage(doors[6].image, 13, 13)
  let i = 0
  setInterval(function() {
    i += .3
    ctx.drawImage(images[2], i, 0, 387, 500, 400, 13, 387, 500)
    write('Kleine Kinder, große Kinder', 595, 100, 32, 'green')
    write('(schon wieder Zuckowski!!!)', 595, 150, 26, 'chartreuse')
  }, 10)
}

function snowFalling() {
  if (snowflakes.length == 0) {
    for (let i = 0; i < 200; i++) {
      snowflakes.push({x: Math.random() * 780 + 10,
                       y: Math.random() * -800,
                       r: Math.random() * 4 + 1,})
    }
  }
  let dark = 0
  setInterval(function() {
    ctx.drawImage(doors[5].image, 0, 0, 800, 526)
    dark += (1 - dark) * 0.0008
    rect(0, 0, 800, 526, `rgba(0, 0, 0, ${dark})`)
    for (let s of snowflakes) {
      s.y += s.r / 3
      if (s.y > 526)
        s.y = -10
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }, 20)
}

function clicked(event) {
  let bodyRect = document.body.getBoundingClientRect(),
      elemRect = can.getBoundingClientRect(),

  x = Math.floor((event.clientX - elemRect.left - bodyRect.left) / width * 6)
  y = Math.floor((event.clientY - elemRect.top -  bodyRect.top) / height * 4)

  if (x < 0 || x > 5 || y < 0 || y > 3)
    return

  doors[y * 6 + x].clicked() 
}

function zurueck() {
  doors[tagAktiv - 1].close()
}

function write(text, x, y, size, col, align = 'center') {
  ctx.textAlign = align
  ctx.fillStyle = col
  ctx.font = `${size}px Mountains of Christmas`
  ctx.fillText(text, x, y)
}