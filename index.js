const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1824
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

class Sprite {
    constructor({ position, velocity, color = 'red'}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking = 
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
        }, 100);
    }
}


const jogador = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
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
    color: 'blue'
})


console.log(jogador)

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

function animacao() {
    window.requestAnimationFrame(animacao)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    jogador.update()
    inimigo.update()

    jogador.velocity.x = 0
    inimigo.velocity.x = 0

    // movimnto do jogador
    if (keys.a.pressed && jogador.lastKey === 'a') {
        jogador.velocity.x = -5
    } else if (keys.d.pressed && jogador.lastKey === 'd') {
        jogador.velocity.x = 5
    }

    // movimnto do inimigo
    if (keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft') {
        inimigo.velocity.x = -5
    } else if (keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight') {
        inimigo.velocity.x = 5
    }

    if (jogador.attackBox.position.x + jogador.attackBox.width >= inimigo.position.x && 
        jogador.attackBox.position.x <= inimigo.position.x + inimigo.width &&
        jogador.attackBox.position.y + jogador.attackBox.height >= inimigo.position.y &&
        jogador.attackBox.position.y <= inimigo.position.y + inimigo.height &&
        jogador.isAttacking
        ) { 
        jogador.isAttacking = false
        console.log('ai');
    }
}

animacao()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            jogador.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            jogador.lastKey = 'a'
            break
        case 'w':
            jogador.velocity.y = -20
            break
        case ' ':
            jogador.attack()
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
    }
    console.log(event.key);
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
    console.log(event.key);
})

