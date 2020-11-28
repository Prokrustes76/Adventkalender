const Tag = new Date().getDate();

let ctx, 
    doors = [], 
    images = []

window.onload = function() {
  ctx = document.getElementById('C').getContext('2d')

  for (let i = 0; i < 24; i++)
    doors.push(new Door(i))
  
    images[0] = new Image()
    images[0].src = './rsc/Adventkalender.jpg'
  
    setTimeout(show, 200)
}

class Door {
  constructor(i) {

  }
}

function show() {
  ctx.drawImage(images[0], 0, 0)
}



