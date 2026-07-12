
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=Math.random()*3+1;
        this.speedX=(Math.random()-0.5)*2;
        this.speedY=(Math.random()-0.5)*2;
        this.color="hsl("+(Math.random()*40+320)+",100%,70%)";
    }

    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }

    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function heartShape(t){
    return{
        x:16*Math.pow(Math.sin(t),3),
        y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
    };
}

function createHeart(){
    particles=[];
    for(let i=0;i<1200;i++){
        let t=Math.random()*Math.PI*2;
        let p=heartShape(t);
        particles.push(new Particle(
            canvas.width/2+p.x*18,
            canvas.height/2+p.y*18
        ));
    }
}

createHeart();

function animate(){
    ctx.fillStyle="rgba(20,0,10,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();
