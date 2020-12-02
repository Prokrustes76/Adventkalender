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
    button

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
  images[1] = new Image()
  images[1].src = './rsc/Rahmen.png'

  images[0] = new Image()
  images[0].src = './rsc/Kalender.jpg'
  images[0].addEventListener('load', show)
}

function show() {
  ctx.drawImage(images[0], 0 , 0)

  if (tagAktiv != -1 && !currentVideo) {    
    audios[0].play()
    let i = 0
    let interval = setInterval(_ => {
      let anzahl = tagAktiv == 1 ? 160 : 100    // Tag 1 Rezepte, stärkerer
      if (i >= anzahl)                          // Zoom erforderlich
        clearInterval(interval)   

      let w = 8 * i
      let h = 5.26 * i
 
    rect(width/2 - w/2, height/2 - h/2, w, h, 'white')
    if (currentImage) {
      let hoehe = tagAktiv == 1 ? h / 3 : h / 3.5   // wegen Rezepte (s.o.)
      ctx.drawImage(currentImage, width/2 - w/3, height/2 - hoehe, w*.6667, h*.6667)
    }
    if ((tagAktiv == 1 && i < 150) || i < 110)
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
  if (tagAktiv == 1)
    extraMessage.style.display = 'block'

}

function rect(x, y, w, h, col) {
  ctx.fillStyle = col
  ctx.fillRect(x, y, w, h)
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
