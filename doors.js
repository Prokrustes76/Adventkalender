class Door {
  constructor(i) {
    this.id =     [ 1, 10, 11, 12, 13, 14,
                   15, 16, 17, 18, 19,  2,
                   20, 21, 22, 23, 24,  3, 
                    4,  5,  6,  7,  8,  9][i]
    this.audio    = this.getAudio() || undefined
    this.image    = this.getImage() || undefined
    this.bigger   = [1, 5, 8, 9, 14, 15].includes(this.id)
    this.noFrame  = [5, 6, 11, 12, 13, 14, 15, 19, 20].includes(this.id)
  }

  static hasVideo = [3, 4, 7, 11, 16, 21]
  static done = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 16, 21]
  static noContent = [6, 12, 13, 19, 20]

  getAudio() {      
    if (![...Door.noContent,...[1, 2, 5, 8, 9, 10, 14, 15]].includes(this.id))
      return
    let audio = new Audio()
    audio.src = Door.noContent.includes(this.id) ? 
      `./rsc/Sleeping.mp3` :
      `./rsc/Audio${this.id}.mp3`
    return audio
  }

  getImage() {
    if (![...Door.noContent,...[1, 2, 5, 8, 9, 10, 14, 15]].includes(this.id))
      return
    let image = new Image()
    image.src = Door.noContent.includes(this.id) ? 
      `./rsc/Sleeping0${Door.noContent.indexOf(this.id) % 3}.jpg` :
      `./rsc/Jpg${this.id}.jpg` 
    return image
  }

  clicked() {
    if (tagAktiv > -1)
      this.close()

    else if (![...Door.done,...Door.noContent].includes(this.id))
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
      let url = this.id ==  3 ? 'https://www.youtube-nocookie.com/embed/WCfIiaaYtKA?modestbranding=1' :
                this.id ==  7 ? 'https://www.youtube-nocookie.com/embed/rEvnp_9DTYM?modestbranding=1' : 
                this.id ==  4 ? 'https://www.youtube-nocookie.com/embed/DP_90vWFOLQ?modestbranding=1' :    
                this.id == 11 ? 'https://www.youtube-nocookie.com/embed/B2zp7Eo1zEE?modestbranding=1' :    
                this.id == 16 ? 'https://www.youtube-nocookie.com/embed/yJa9mCt6Np0?modestbranding=1' :
                this.id == 21 ? 'https://www.youtube-nocookie.com/embed/n3z3EeBDxkE?modestbranding=1' : undefined
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
    location.reload()
  }
}