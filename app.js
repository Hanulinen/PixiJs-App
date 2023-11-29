//In this app you get 5 winning numbers and player gets 9 numbers of their own
//If any of the player's numbers match the winners, the player wins
//Ideally all numbers would be fetched from backend
//This could still be improved by making sure no numbers are repeated

const Application = PIXI.Application;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false
});

app.renderer.background.color = 0x23395D;
app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const winningNumbers = [];
const playerNumbers = [];
const buttons = [];
const offset = 25;
let revealed = 0;
let didWin = false;

//Randomize winning numbers
for(let i = 0; i < 5; i++){
    winningNumbers.push(Math.floor(Math.random() * 100));
}

//Randomize player nu,bers
for(let i = 0; i < 9; i++){
    playerNumbers.push(Math.floor(Math.random() * 100));
}

//Nice Style for the numbers
const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

//Rectabgle positions
const rectanglePos = [
    100, 100,
    100, 210,
    100, 320,
    100, 430,
    100, 540
]

//Player's numbers
const playerRectanglePos = [
    300, 100,
    300, 210,
    300, 320,
    410, 100,
    410, 210,
    410, 320,
    520, 100,
    520, 210,
    520, 320
]

//Create a text that let's the player know if they won
const winningText = new PIXI.Text("If you see this, there has been an error", style)
winningText.x = 350 + offset;
winningText.y = 500 + offset;
winningText.alpha = 0;
app.stage.addChild(winningText);

//Draw winning numbers as text objects on recatngle graphics
for(let i = 0; i < 5; i++){
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(Math.random() * 0xFFFFFF)
    .lineStyle(4, Math.random() * 0xFFFFFF, 1)
    .drawRect(rectanglePos[i*2], rectanglePos[i*2+1], 100, 100)
    .endFill();

    app.stage.addChild(rectangle);

    const number = new PIXI.Text(winningNumbers[i], style)
    number.x = rectanglePos[i*2] + offset;
    number.y = rectanglePos[i*2+1] + offset;

    app.stage.addChild(number);
}

//Draw player numbers
//They are invisible until the player clicks a number and reveals it
for(let i = 0; i < 9; i++){

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(Math.random() * 0xFFFFFF)
    .lineStyle(4, Math.random() * 0xFFFFFF, 1)
    .drawRect(playerRectanglePos[i*2], playerRectanglePos[i*2+1], 100, 100)
    .endFill();

    const numbertext = new PIXI.Text(playerNumbers[i], style)
    numbertext.x = playerRectanglePos[i*2] + offset;
    numbertext.y = playerRectanglePos[i*2+1] + offset;
    numbertext.alpha = 0;

    rectangle.eventMode = 'static';
    rectangle.cursor = 'pointer';

    rectangle.on('pointerdown', onButtonDown)

    obj = {
        button: rectangle,
        numberte: numbertext
    }

    app.stage.addChild(rectangle);
    app.stage.addChild(numbertext)
    buttons.push(obj);


}

//Is run then a scratch card number is pressed
//Reveals the number and declares a winner whn numbers match
function onButtonDown(){
    if(this.isRevealed) return;

    this.isRevealed = true;
    revealed += 1;
    //Iterate through buttons to find the pressed one
    for(let i = 0; i< buttons.length; i++){
        if(this === buttons[i].button){
            buttons[i].numberte.alpha = 1;
            //Check if button and any of the winning numbers match
            for(let k = 0; k < winningNumbers.length; k++){
                if(buttons[i].numberte.text === String(winningNumbers[k])){
                    didWin = true;
                }
            }
        }
    }

    //You win if nay of the numbers match
    if(didWin){
        winningText.alpha = 1;
        winningText.text = "You Win!!!";
    }
    //You lose if all numbers are revelaed and none matched
    else if(revealed >= 9){
        winningText.text = "You Lose...";
        winningText.alpha = 1;
    }
}
