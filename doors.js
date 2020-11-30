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
    if (![1, 2, 7].includes(this.id))
      return
    let audio = new Audio()
    audio.src = `./rsc/Audio${this.id}.mp3` 
    return audio
  }

  getImage() {
    if (![1, 2, 7].includes(this.id))
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
    extraMessage.style.display = 'none'
  }
}