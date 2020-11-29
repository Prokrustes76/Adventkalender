const Tag    = new Date().getDate(),
      Monat  = new Date().getMonth(),
      width  = 800,
      height = 526

let tagAktiv = -1,
    currentImage,
    currentAudio,
    jingle,
    ctx, can,
    doors = [], 
    images = [],
    audios = []


document.addEventListener('mousedown', clicked)

window.onload = function() {
  window.addEventListener('dblclick', e => {
    e.preventDefault()})

  can = document.getElementById('C')
  ctx = can.getContext('2d')

  for (let i = 0; i < 24; i++)
    doors.push(new Door(i))

  loadStuff()
}

function loadStuff() {
  loadAudios()
}

function loadAudios(i = 0) {
  audios[i] = new Audio()
  audios[i].src = ['./rsc/Jingle.wav']
  audios[i].addEventListener('load', i < 0 ? loadAudios(++i) : loadImages())
} 

function loadImages(i = 0) {
  images[i] = new Image()
  images[i].src = ['./rsc/Kalender.jpg', 
                   './rsc/Rahmen.png'][i]
  images[i].addEventListener('load', i < 1 ? loadImages(++i) : show)
}

function show() {
  ctx.drawImage(images[0], 0 , 0)

  if (tagAktiv != -1) {
    audios[0].play()
    let i = 0
    let interval = setInterval(_ => {
      if (i >= 100) 
        clearInterval(interval)

      let w = 8 * i
      let h = 5.26 * i
 
    rect(width/2 - w/2, height/2 - h/2, w, h, 'white')
    if (currentImage)
      ctx.drawImage(currentImage, width/2 - w/3, height/2 - h/3.5, w*.6667, h*.6667)
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
    console.log(event.clientX, event.clientY)
  if (x < 0 || x > 5 || y < 0 || y > 3)
    return

  doors[y * 6 + x].clicked() 
}

class Door {
  constructor(i) {
    this.id = [ 1, 10, 11, 12, 13, 14,
               15, 16, 17, 18, 19,  2,
               20, 21, 22, 23, 24,  3, 
                4,  5,  6,  7,  8,  9][i]
    this.audio = this.getAudio() || undefined
    this.image = this.getImage() || undefined
  }

  getAudio() {
    if ([1].includes(this.id)) {
      let audio = new Audio()
      audio.src = `./rsc/Audio${this.id}.mp3`
      return audio
    }
  }

  getImage() {
    if ([1].includes(this.id)) {
      let image = new Image()
      image.src = `./rsc/Jpg${this.id}.jpg`
      return image
    }
  }

  clicked() {
    if (tagAktiv > -1)
      this.close()

    else if (this.id > 1 || Monat != 10)
      return

    else if (tagAktiv == -1)
      this.open()

    show()
  }

  open() {
    tagAktiv = this.id
    currentImage = this.image 
    currentAudio = this.audio
  }

  close() {
    tagAktiv  = -1
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentImage   = undefined
    currentAudio   = undefined
  }
}




