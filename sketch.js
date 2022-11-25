//timeout shorter for each one, 20-15-10
//p5 speech to read out story at the end
//saving images that are drawn
//separate canvas

//translate(vid.width,0) scale(-1,1) to flip video
let pages=1
let circlePosArr = [[]];
let circlePos;
let blanksArr = [2,3]
let currentBlank, totalBlanks
let tempText = "press t"
let sketchTime=20000;
let vid

function setup(){
    createCanvas(windowWidth,windowHeight)
    // rectMode(CENTER)
    imageMode(CENTER)

    vid = createCapture(VIDEO) //640 x 480
    vid.hide() 
}
  
function draw() {
    switch (pages){
      case 1: page1()
      break;
      case 2: page2()
      break;
      case 3: page3()
      break;
      case 4: page4()
      break;
      case 5: page5()
      break;
      case 6: page6()
      break;
    }
}

function page1(){
    background(220)
    noStroke()
    fill(0)
    text(tempText,width/2,height/2)

}

function page2(){
    background(220)
    noStroke()
    fill(0)
    text("instructions",width/2,height/2)
}

function page3(){
    // console.log('page3')
    background(220)
    
    image(vid,width/2,height/2)

    if (currentBlank){
        if (currentBlank<=totalBlanks){
            sketchTime=1000*(25-currentBlank*5)
            // console.log("sketchTime: ",sketchTime,"; currentBlank: ", currentBlank)
        }
        
    }

    if (circlePosArr.length > 0) {
        for (i = 0; i < circlePosArr[circlePosArr.length-1].length; i++) {
            fill('black')
            noStroke()
            circle(circlePosArr[circlePosArr.length-1][i].x, circlePosArr[circlePosArr.length-1][i].y, 15);
        }
    }
}

function page4(){
    background(220)
    noStroke()
    fill(0)
    text("break",width/2,height/2)

    // if (currentBlank<=totalBlanks){
    //     setInterval(pages=3,3000)
    //     currentBlank++
    // } else if (currentBlank==totalBlanks){
    //     setInterval(pages=5,3000)
    // }
}

function page5(){
    background(220)
    noStroke()
    fill(0)
    text("pg 5",width/2,height/2)
    for (let i=0;i<circlePosArr.length;i++){
        for (let j=0;j<circlePosArr[i].length;j++){
            push()
            scale(0.5)
            circle(circlePosArr[i][j].x+500*i, circlePosArr[i][j].y, 5)
            pop()
    }
}
}

function page6(){
    background(220)
    noStroke()
    fill(0)
    text("pg 6",width/2,height/2)
}

function selectTopic(){
    totalBlanks=random(blanksArr)
    currentBlank=1
    console.log("totalBlanks: ",totalBlanks)
    tempText=totalBlanks
}

function switchPages(){
    if (pages==6){
        tempText = "press t"
        pages=1
    }else if (currentBlank<=totalBlanks&&pages==4){
    //   pages=3
      setInterval(temp(),3000)
      currentBlank++
      console.log("WORK")
    }else if (currentBlank<=totalBlanks&&pages==3){
        setInterval(temp(),sketchTime)
    }
    else if (currentBlank==totalBlanks&&pages==3){
        circlePosArr.shift()
        console.log("circlePosArr: ",circlePosArr)
        // pages=5
        setInterval(pages=5,sketchTime)
    }
    else{
        pages++
    }
    if (pages==3){
        circlePosArr.push([])
    }
    console.log(pages)
}

function keyPressed(){
    if (key===" "){
        switchPages()
    }
    if (pages==1&&key==="t"){
        selectTopic()
    }
}

function temp(){
    console.log('TEMP TEMP TEMP')
}

function mouseDragged(){
    if (pages==3){
        circlePos = {
            x: mouseX,
            y: mouseY,
          };
        if (circlePosArr.length){
            circlePosArr[circlePosArr.length-1].push(circlePos)
        }
        console.log(circlePosArr)
    }
}