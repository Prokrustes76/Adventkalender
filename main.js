const Tag    = new Date().getDate(),
      Monat  = new Date().getMonth(),
      width  = 800,
      height = 526

let tagAktiv = -1

document.addEventListener('mousedown', clicked)

let ctx, can,
    doors = [], 
    images = []

window.onload = function() {
  can = document.getElementById('C')
  ctx = can.getContext('2d')

  for (let i = 0; i < 24; i++)
    doors.push(new Door(i))
  
    images[0] = new Image()
    images[0].src = './rsc/Kalender.jpg'

    images[1] = new Image()
    images[1].src = './rsc/Rahmen.jpg'
  
    setTimeout(show, 600)
}

function show() {
  ctx.drawImage(images[0], 0, 0)
  if (tagAktiv != -1) {
    ctx.drawImage(images[1], 0, 0)
  }
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

class Door {
  constructor(i) {
    this.id = [ 1, 10, 11, 12, 13, 14,
               15, 16, 17, 18, 19,  2,
               20, 21, 22, 23, 24,  3, 
                4,  5,  6,  7,  8,  9][i]
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
  }

  close() {
    tagAktiv = -1
  }
}




