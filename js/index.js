const canvasRoot = document.getElementById("canvas");
const context = canvasRoot.getContext('2d');
const circleArray = [];

canvasRoot.width = window.innerWidth
canvasRoot.height = window.innerHeight


function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx
    this.dy = dy;
    this.radius = radius;
    this.color = color

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();   
    }

    this.update = function() {
        //para ter limite nas extremidades da horizontal LEFT / RIGHT
        if (this.x + radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx; // reverte o valor e logo reverte a direção
        }

        //para ter limite nas extremidades da vertical TOP / BOTTOM
        if (this.y + radius > innerHeight || this.y - this.radius < 0 ) {
            this.dy = -this.dy; // reverte o valor e logo reverte a direção
        }

        //increment horizontal
        this.x += this.dx 
        this.y += this.dy;

        this.draw()

    }
}

for (let index = 0; index < 100; index++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * (index / 5)
    // tanto no directionX quanto directionY foi usado uma estimativa matematica para gerar um valor aleatorio para a velocidade dos circulos 
    var dy = (Math.random() - 0.5) * (index / 5)
    var radius = 30;
    var pickCollor = `#` + ( (1 << 24) * Math.random() | 0 ).toString(16)
    
    circleArray.push(new Circle(x, y, dx, dy, radius, pickCollor));

}

function animate() {

    //fazer o efeito da animação dando um loop
    requestAnimationFrame(animate);    

    context.clearRect(0,0, innerWidth, innerHeight)
  
    circleArray.map( (e, i) => {
        e.update();
    })

}

animate();