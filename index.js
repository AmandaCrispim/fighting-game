const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1824
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {
    constructor({ position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking 
        this.healht = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //hitbox de ataque
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }
    }

    update () {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else  this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


const heroi = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
    x: 0,
    y: 0
     },
    offset: {
        x: 0,
        y: 0
     }
})


const inimigo = new Sprite ({
    position: {
    x: 400,
    y: 100
    },
    velocity: {
    x: 0,
    y:0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
     }
})


console.log(heroi)

const keys = {
    a: {
        pressed: false
    },
    d: {
       pressed: false
    },
    ArrowRight: {
        pressed: false
    },
     ArrowLeft: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 } ) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=  rectangle2.position.x && 
        rectangle1.attackBox.position.x <=  rectangle2.position.x +  rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=  rectangle2.position.y &&
        rectangle1.attackBox.position.y <=  rectangle2.position.y +  rectangle2.height &&
        rectangle1.isAttacking
    )
}


let tempo = 10
function decreaseTimer() {
    if(tempo > 0 ) {
        setTimeout(decreaseTimer, 1000)
        tempo--
        document.querySelector('#tempo').innerHTML = tempo
    }

    if (heroi.healht === inimigo.healht) {
        document.querySelector('#displayFlex').innerHTML = 'Tie'
        document.querySelector('#displayFlex').style.display = 'flex'
    }
}

decreaseTimer()

function animacao() {
    window.requestAnimationFrame(animacao)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    heroi.update()
    inimigo.update()

    heroi.velocity.x = 0
    inimigo.velocity.x = 0

    // movimnto do heroi
    if (keys.a.pressed && heroi.lastKey === 'a') {
        heroi.velocity.x = -5
    } else if (keys.d.pressed && heroi.lastKey === 'd') {
        heroi.velocity.x = 5
    }

    // movimnto do inimigo
    if (keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft') {
        inimigo.velocity.x = -5
    } else if (keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight') {
        inimigo.velocity.x = 5
    }


    //detectar a colisão
    if ( rectangularCollision({
        rectangle1: heroi,
        rectangle2: inimigo
    }) &&
        heroi.isAttacking
        ) { 
        heroi.isAttacking = false
        inimigo.healht -= 20
        document.querySelector('#barraInimigo').style.width = inimigo.healht + '%'
    }

    if ( rectangularCollision({
        rectangle1: inimigo,
        rectangle2: heroi
    }) &&
        inimigo.isAttacking
        ) { 
        inimigo.isAttacking = false
        heroi.healht -= 20
        document.querySelector('#barraHeroi').style.width = heroi.healht + '%'
    }
}

animacao()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            heroi.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            heroi.lastKey = 'a'
            break
        case 'w':
            heroi.velocity.y = -20
            break
        case ' ':
            heroi.attack()
            break
    
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            inimigo.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            inimigo.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            inimigo.velocity.y = -20
            break
        case 'ArrowDown':
            inimigo.isAttacking = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    // movimentação do inimigo
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})

