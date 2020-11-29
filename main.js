let Tag    = new Date().getDate(),
    Monat  = new Date().getMonth(),
    width  = 800,
    height = 526,
    tagAktiv = -1,
    currentImage,
    currentAudio,
    currentVideo,
    jingle,
    can, 
    ctx,
    doors = [], 
    images = [],
    audios = [],
    video,
    button
    done = [2, 3, 4, 7, 21]


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
  audios[i].volume = .3
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

  if (tagAktiv != -1 && !currentVideo) {
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

  if (x < 0 || x > 5 || y < 0 || y > 3)
    return

  doors[y * 6 + x].clicked() 
}

function zurueck() {
  doors[tagAktiv - 1].close()
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

  static hasVideo = [3, 4, 21]

  getAudio() {
    if (![2, 7].includes(this.id))
      return
    let audio = new Audio()
    audio.src = `./rsc/Audio${this.id}.mp3` 
    return audio
  }

  getImage() {
    if (![2, 7].includes(this.id))
      return
    let image = new Image()
    image.src = `./rsc/Jpg${this.id}.jpg` 
    return image
  }

  clicked() {
    if (tagAktiv > -1)
      this.close()

    else if (!done.includes(this.id))
      return 

    else if (this.id > Tag || Monat != 11)
      return

    else if (tagAktiv == -1)
      this.open()

    show()
  }

  open() {
    tagAktiv = this.id

    if (Door.hasVideo.includes(this.id)) {
      let url = this.id ==  3 ? 'https://www.youtube.com/embed/rEvnp_9DTYM' : 
                this.id ==  4 ? 'https://www.youtube.com/embed/DP_90vWFOLQ' : 
                this.id == 21 ? 'https://www.youtube.com/embed/n3z3EeBDxkE' : undefined
      video.setAttribute('src', url)
      video.style.display = 'block'
      button.style.display = 'block'
      currentVideo = this.id
    }

    else {
      currentImage = this.image 
      currentAudio = this.audio
    }
  }

  close() {

    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    if (currentVideo) 
      video.src = undefined
    
    tagAktiv             = -1
    currentImage         = undefined
    currentAudio         = undefined
    currentVideo         = undefined
    video.style.display  = 'none'
    button.style.display = 'none'
  }
}




