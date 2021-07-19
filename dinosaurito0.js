var dino = {
    pizza: 2,
    canvas: {
        ctx : "",
        canx : 0,
        cany: 0,
        dibujodino: {},
        obstaculo: {}
    },
    dinosaurio: {
        x: 80,
        y: 360,
        movx: 600,
        movy: 0,
        saltar: 0,
        bajar: 0,
        velocidad: 3
    },
    obstaculo1: {
        ancho : 20,
        altura : 30,
        movx : 600,
        go : 0
    },
    obstaculo2: {
        ancho : 20,
        altura : 30,
        movx : 600,
        go : 0
    },
    obstaculo3: {
        ancho : 20,
        altura : 30,
        movx : 600,
        go : 0
    },
    obstaculo4: {
        ancho : 20,
        altura : 30,
        movx : 600,
        go : 0
    },
    getRndInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    },
    iniciar: function() {
        var elemento = document.getElementById("canvas");
        dino.canvas.ctx = elemento.getContext("2d");
        dino.canvas.canx = elemento.offsetLeft;
        dino.canvas.cany = elemento.offsetTop;

        dino.canvas.ctx.fillRect( 80, 360, 40, 40);
        dino.canvas.ctx.strokeRect(600, 380, 35, 20);
        dino.canvas.dibujodino = dino.canvas.ctx.getImageData(80, 360, 40, 40);
        dino.canvas.obstaculo = dino.canvas.ctx.getImageData(elemento.offsetLeft
            + 560, elemento.offsetTop + 340, 40, 60);

        elemento.addEventListener("click", function() {
                dino.dinosaurio.saltar = 1;
        });
        dino.obstaculo1.go = dino.getRndInteger(0, 550 - dino.dinosaurio.velocidad * 70);   //este 70 es las veces que se recorre bucle() para el salto
        dino.obstaculo2.go = dino.getRndInteger(0, 550 - dino.dinosaurio.velocidad * 70);
        dino.obstaculo3.go = dino.getRndInteger(0, 550 - dino.dinosaurio.velocidad * 70);
        dino.obstaculo4.go = dino.getRndInteger(0, 550 - dino.dinosaurio.velocidad* 70);
        dino.obstaculo1.movx -= dino.dinosaurio.velocidad;
        dino.bucle();
    },
    bucle: function() {
        if (dino.dinosaurio.velocidad) {
            dino.canvas.ctx.clearRect(0, 0, 600, 400);
            if (dino.dinosaurio.saltar) {
                    dino.saltar();
            }
            if (dino.dinosaurio.bajar) {
                    dino.bajar();
            }
            dino.randomear();
            dino.dibujador();
            dino.cero();
            dino.detectar();
            dino.procesar();
            requestAnimationFrame(function(){
                dino.bucle();
            });
        }
    },
    procesar: function() {
        if (dino.obstaculo1.movx < 600){
            dino.obstaculo1.movx -= dino.dinosaurio.velocidad;
        }
        if (dino.obstaculo2.movx < 600){
            dino.obstaculo2.movx -= dino.dinosaurio.velocidad;
        }
        if(dino.obstaculo3.movx < 600) {
            dino.obstaculo3.movx -= dino.dinosaurio.velocidad;
        }
        if (dino.obstaculo4.movx < 600) {
            dino.obstaculo4.movx -= dino.dinosaurio.velocidad;
        }
    },
    randomear: function() {
        if (dino.obstaculo1.go >= dino.obstaculo1.movx &&
            dino.obstaculo1.go - dino.dinosaurio.velocidad <= dino.obstaculo1.movx) {
            dino.obstaculo2.movx -= dino.dinosaurio.velocidad;
        }
        if (dino.obstaculo2.go >= dino.obstaculo2.movx &&
            dino.obstaculo2.go - dino.dinosaurio.velocidad <= dino.obstaculo2.movx) {
            dino.obstaculo3.movx -= dino.dinosaurio.velocidad;
        }
        if (dino.obstaculo3.go >= dino.obstaculo3.movx &&
            dino.obstaculo3.go - dino.dinosaurio.velocidad <= dino.obstaculo3.movx) {
            dino.obstaculo4.movx -= dino.dinosaurio.velocidad;
        }
        if (dino.obstaculo4.go >= dino.obstaculo4.movx &&
            dino.obstaculo4.go - dino.dinosaurio.velocidad <= dino.obstaculo4.movx) {
            dino.dinosaurio.velocidad += 0.5;
            dino.obstaculo1.movx -= dino.dinosaurio.velocidad;
        }
    },
    dibujador: function() {
        dino.canvas.ctx.putImageData(dino.canvas.dibujodino, 80, dino.dinosaurio.y);
        dino.canvas.ctx.strokeRect(dino.obstaculo1.movx, 380, 20, 20);
        dino.canvas.ctx.strokeRect(dino.obstaculo2.movx, 380, 20, 20);
        dino.canvas.ctx.strokeRect(dino.obstaculo3.movx, 380, 20, 20);
        dino.canvas.ctx.strokeRect(dino.obstaculo4.movx, 380, 20, 20);
    },
    cero:function() {
        if (dino.obstaculo1.movx <= -20){
            dino.obstaculo1.movx = 600;
        }
        if (dino.obstaculo2.movx <= -20){
            dino.obstaculo2.movx = 600;
        }
        if(dino.obstaculo3.movx <= -20) {
            dino.obstaculo3.movx = 600;
        }
        if (dino.obstaculo4.movx <= -20) {
            dino.obstaculo4.movx = 600;
        }
    },
    saltar: function() {
            dino.dinosaurio.y -= 2
            if (dino.dinosaurio.y == 290) {
                dino.dinosaurio.saltar = 0;
                dino.dinosaurio.bajar = 1;
            }

    },
    bajar: function() {
        if (dino.dinosaurio.y != 360) {
            dino.dinosaurio.y += 2
        }
        else {
            dino.dinosaurio.bajar = 0;
        }
    },
    detectar: function() {
        if (( (dino.dinosaurio.x + 40 >= dino.obstaculo1.movx && dino.dinosaurio.x <= dino.obstaculo1.movx + 20)
        || (dino.dinosaurio.x + 40 >= dino.obstaculo2.movx && dino.dinosaurio.x <= dino.obstaculo2.movx + 20)
        || (dino.dinosaurio.x + 40 >= dino.obstaculo3.movx && dino.dinosaurio.x <= dino.obstaculo3.movx + 20)
        || (dino.dinosaurio.x + 40 >= dino.obstaculo4.movx && dino.dinosaurio.x <= dino.obstaculo4.movx + 20) )
             && dino.dinosaurio.y + 40 >= 380
         ) {
            dino.dinosaurio.velocidad = 0;
        }
    }
};
window.addEventListener("load", function() {
    dino.iniciar();
});
