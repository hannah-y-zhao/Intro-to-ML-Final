let pages=1
//timeout shorter for each one, 20-15-10
//p5 speech to read out story at the end
//saving images that are drawn
//separate canvas

function setup(){
    createCanvas(windowWidth,windowHeight)
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
    }
}

function page1(){
    background(220)
    noStroke()
    fill(0)
    text("pg 1",width/2,height/2)
}

function page2(){
    background(220)
    noStroke()
    fill(0)
    text("pg 2",width/2,height/2)
}

function page3(){
    background(220)
    noStroke()
    fill(0)
    text("pg 3",width/2,height/2)
}

function page4(){
    background(220)
    noStroke()
    fill(0)
    text("pg 4",width/2,height/2)
}

function page5(){
    background(220)
    noStroke()
    fill(0)
    text("pg 5",width/2,height/2)
}

function switchPages(){
    if (pages==5){
      pages=1
    }else{
      pages++
    }
    console.log(pages)
}

function mousePressed(){
    switchPages()
}