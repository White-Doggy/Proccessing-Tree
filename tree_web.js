var tree = []; // array of branch objects
var locX=100;
var locY=100;
var zeroX=640;
var zeroY=512;

function setup() {
  createCanvas(1280,1024);
  // Create objects
  
  var away =40;
  var theta=0.0;
  var numBranches=5;
  var count=0;
  
  for (var j=0; j<330; j++) {
    var branchInc = 2*3.141592/numBranches;
    var X= zeroX+1.5*away*cos(theta);
    var Y= zeroY-40+away*sin(theta);
    
    tree.push(new branch(X,Y));
    theta += branchInc;
    count++;
    
    if(count == numBranches){
      theta=0.0;
      numBranches+=3;
      count=0;
      away+=33;  
    }
  }
}

function draw() {
 
  fill(245,245,220);
  noStroke();
  rect(0,0,1280,1024);
  
  fill(250,250,245);
  noStroke();
  ellipse(zeroX,zeroY,zeroX*2.1,zeroY*2.1);
 
  for (var i=0; i<tree.length; i++) {
    tree[i].move();
    tree[i].display();
  }
}

function mousePressed() {
   for (var i=0; i<tree.length; i++) {
    tree[i].colorChanger();
  }
}

//--------------------------------------------------

function branch(x, y) {
  //variable
  this.x=x;
  this.y=y;
  this.variable=random(50,80); 
  this.xgap = random(-this.variable,this.variable);
  this.ygap = random(0,this.variable);
  this.contect = random(this.y,this.y+this.ygap);
  this.weight1 = random(0.5,2);
  this.weight2 = random(0.5,2);
  
  this.speed = random(0.01,1);
  
  this.opecity=0;
  this.opecityInc=random(0.001,1);
  
  this.r=0;
  this.g=0;
  this.b=0;
  this.tr=0;
  this.tg=0;
  this.tb=0;
  this.colorSpeed=random(0.5,2);
  this.colorIndex=0;
  
  //functions
  this.move = function() {
    this.x += random(-this.speed, this.speed);
  };
  
  this.colorChanger = function() {    
    
  this.colorIndex=(this.colorIndex+1)%3;
    
    if(this.colorIndex ==0){
      this.tr=0;
      this.tg=0; 
      this.tb=0;
    }
    
    else if(this.colorIndex ==1){
      this.tr=random(0,50);
      this.tg=random(220,255);
      this.tb=random(100,180);
    }
    
    else if(this.colorIndex ==2){
      this.tr=random(220,255);
      this.tg=random(100,180);
      this.tb=random(0,50);
    }    
  }

  this.display = function() {   
    
    this.x2 = (mouseX-this.x)*(mouseX-this.x);
    this.y2 = (mouseY-this.y)*(mouseY-this.y);
    this.radius= 300;
    
    if(this.x2+this.y2<this.radius*this.radius){
      if(this.opecity>0)this.opecity-=this.opecityInc*2;      

    }
    
    
    if(this.opecity<255){
      this.opecity+=this.opecityInc;
    }
    
    if(this.r<this.tr) this.r++;
    else this.r--;
    
    if(this.b<this.tb) this.b++;
    else this.b--;
    
    if(this.g<this.tg) this.g++;
    else this.g--;
    
    stroke(this.r,this.g,this.b,this.opecity);
    strokeWeight(this.weight1);
    line(this.x, this.y, this.x, this.y+this.ygap);
    strokeWeight(this.weight2);
    line(this.x, this.contect, this.x+this.xgap,this.contect);
  };
}
