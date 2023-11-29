function loop(delta, obj){
    elapsed += delta;
    obj.rotation += 0.01;
}

function loggerfunc(){
    console.log("Kissa");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
