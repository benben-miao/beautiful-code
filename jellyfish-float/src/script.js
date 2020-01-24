function siteOnload() {
  var starArray = [];
  var plancArray = [];
  var selectedStar;
	var canvas = document.getElementById("mainstage");
	var context = canvas.getContext("2d");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var mouse = {
    x:0,
    y:0
  }
    initiateStars(canvas,starArray,plancArray);
    var TO_RADIANS = Math.PI/180;
	  var main = function () {
		var now = Date.now();
		var delta = now - then;
		update();
		render();
		then = now;
		requestAnimationFrame(main);
	};
	function update() {
    //collision detection. Not really important here anyway.
    /* for(k=0;k<starArray.length;k++) {
      for(u=0;u<starArray.length;u++) {
        if(starArray[k].x >= starArray[u].x - 5 &&
      starArray[k].x <= starArray[u].x + 5 &&
      starArray[k].y >= starArray[u].y - 5 &&
      starArray[k].y <= starArray[u].y + 5 &&
        u != k) {
        }
      }
    } */
    for(k=0;k<starArray.length;k++) {
      if(starArray[k].y < -150) {
          starArray[k].y = canvas.height + 150;
          starArray[k].x = Math.floor(Math.random() * canvas.width) + 0;
         }
      else if(starArray[k].y > canvas.height + 150) {
          starArray[k].y = - 150;
          starArray[k].x = Math.floor(Math.random() * canvas.width) + 0;    
      }
      else if(starArray[k].x < -150) {
          starArray[k].y = Math.floor(Math.random() * canvas.width) + 0;   
          starArray[k].x = canvas.width + 150;  
      }
      else if(starArray[k].x > canvas.width + 150) {
          starArray[k].y = Math.floor(Math.random() * canvas.width) + 0;    
          starArray[k].x = - 150;   
      }
      else {
        if(k === 0) {
          calculateStarMovement(starArray[k],true);
          
        }
        else {
            
        }
      }  calculateStarMovement(starArray[k]);

    }
	}
  function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'lighter'; //test
        //context.rect(0,0,150,150);
        //context.stroke();
        for(i=0;i<starArray.length;i++) {
              drawSingleStar(starArray[i],context);
             }
    
        }
	main();
	var then = Date.now();
}

function calculateStarMovement(target,status) {
  target.x -= target.speed * Math.sin(target.angle * (Math.PI/180));
  target.y += target.speed * Math.cos(target.angle * (Math.PI/180));
  if(target.angle > target.newAngle) {
    target.angle = target.angle - 0.1;
  }
  else if(target.angle < target.newAngle) {
    target.angle = target.angle + 0.1;
  }
  if(target.lastCourse + 2000 < new Date().getTime()) {
    target.newAngle = Math.floor(Math.random() * 360);
    target.lastCourse = new Date().getTime();
  }
  for(i=0;i<target.tentacles.length;i++) {
  target.tentacles[i].start += target.tentacles[i].direction;
     
  if(target.tentacles[i].start > target.tentacles[i].max) {
    target.tentacles[i].direction = target.tentacles[i].direction * -1;
  }
  else if(target.tentacles[i].start < target.tentacles[i].max * -1) {
    target.tentacles[i].direction =  target.tentacles[i].direction * -1;
  }
}
  target.speed += target.direction;
  if(target.speed > target.speedmax) {
    target.direction = target.direction * -1;
    target.speed = target.speedmax - 0.01;
  }
  else if(target.speed <= 0.15) {
    target.direction = target.direction * -1;
    target.sped = 0.16;
  }
}

function drawSingleStar(star, context) {
   context.shadowBlur = 15;
    context.shadowColor = "rgba(" + (star.color.red) + "," + (star.color.green) + "," + (star.color.blue) + "," + 0.3 + ")";
  var grd = context.createRadialGradient(star.x, star.y, 1, star.x, star.y, 15);
  grd.addColorStop(0,"rgba(255,255,225,1)");
  grd.addColorStop(1,"rgba(" + (star.color.red) + "," + (star.color.green) + "," + (star.color.blue) + "," + 0 + ")");
    context.beginPath();
    context.arc(star.x,star.y,15,0, 2 * Math.PI);
    context.fillStyle = grd;
    context.fill();

    //Math.cos((angle - 90 * Math.PI/180) *  length + x;
    //Math.sin((angle - 90 * Math.PI/180) *  length + y;
    let top = {
      x:Math.cos((star.angle + 90) * Math.PI/180) *  15 + star.x,
      y:Math.sin((star.angle + 90) * Math.PI/180) *  15 + star.y,
    };
    let left = {
      x:Math.cos((star.angle + (-50)) * Math.PI/180) *  (65 + (-star.speed * 7)) + top.x, 
      y:Math.sin((star.angle + (-50)) * Math.PI/180) *  (65 + (-star.speed * 7)) + top.y,
    };
    let right = {
      x:Math.cos((star.angle + (230)) * Math.PI/180) *  (65 + (-star.speed * 7)) + top.x, 
      y:Math.sin((star.angle + (230)) * Math.PI/180) *  (65 + (-star.speed * 7)) + top.y,
    };
    
    let rightCtrl = {
      x:Math.cos((star.angle + (180)) * Math.PI/180) *  50 + top.x, 
      y:Math.sin((star.angle + (180)) * Math.PI/180) *  50 + top.y,
    };
    let leftCtrl = {
      x:Math.cos((star.angle + (0)) * Math.PI/180) *  50 + top.x, 
      y:Math.sin((star.angle + (0)) * Math.PI/180) *  50 + top.y,
    };
  
    context.shadowBlur = 30;
    context.shadowColor = "rgba(" + (star.color.red) + "," + (star.color.green) + "," + (star.color.blue) + "," + 1 + ")";
    context.beginPath();
    context.lineJoin = "round";
    context.strokeStyle = "rgba(255,255,255,0.3)";
    function drawLine(point1, point2) {
    context.moveTo(point1.x,point1.y);
    context.lineTo(point2.x,point2.y);
    }
  
    function drawCurve(start, control, end) {
    context.moveTo(start.x, start.y);
    context.quadraticCurveTo(control.x,control.y, end.x, end.y);
    }
      
    let lineArray = [];
    let lineNumber = 15;
    for(n=0;n<lineNumber;n++) {
      let obj = {
      x:right.x+(left.x-right.x) * (n/lineNumber),
      y:right.y+(left.y-right.y) * (n/lineNumber),
      };
      lineArray.push(obj);
    }
   
    let ctrlArray = [];
    for(n=0;n<lineNumber;n++) {
      let obj = {
      x:rightCtrl.x+(leftCtrl.x-rightCtrl.x) * (n/lineNumber),
      y:rightCtrl.y+(leftCtrl.y-rightCtrl.y) * (n/lineNumber),
      };
      ctrlArray.push(obj);
    }
  
    let opacityCounter = 0.05 //lineNumber/100;
      let opacityStart = opacityCounter;
    for(k=0;k<lineArray.length;k++) {
      if(k <= lineArray.length/2) {
        context.strokeStyle = "rgba(255,255,255,"+ opacityStart +")";
        drawCurve(top,ctrlArray[k],lineArray[k]);
        opacityStart = opacityStart + opacityCounter;
      }else {
        context.strokeStyle = "rgba(255,255,255,"+ opacityStart +")";
        drawCurve(top,ctrlArray[k],lineArray[k]);
        opacityStart = opacityStart - opacityCounter;
      }
    }  
  
    drawCurve(top,leftCtrl,left);
    drawCurve(top,rightCtrl,right);
    drawLine(right,left);
    context.stroke();
    context.fillStyle = grad;
    context.closePath();
  for(x=0;x<star.tentacles.length;x++) {
    context.beginPath();
    context.moveTo(star.x,star.y);
    let tentacleX = Math.cos((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start * -0.5)) * Math.PI/180) *  star.tentacles[x].length + star.x;
    let tentacleY = Math.sin((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start * -0.5)) * Math.PI/180) *  star.tentacles[x].length + star.y;
  let C1X = Math.cos((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start * - 0.5)) * Math.PI/180) *  star.tentacles[x].length/3 * 1 + star.x;
  let C1Y = Math.sin((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start * - 0.5)) * Math.PI/180) *  star.tentacles[x].length/3 * 1 + star.y;
  let C2X = Math.cos((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start)) * Math.PI/180) *  star.tentacles[x].length/3 * 2 + star.x;
  let C2Y = Math.sin((star.angle + star.tentacles[x].angle - (90 + star.tentacles[x].start)) * Math.PI/180) *  star.tentacles[x].length/3 * 2 + star.y;
  context.bezierCurveTo(C2X,C2Y,C1X,C1Y, tentacleX, tentacleY);
  var grad = context.createLinearGradient(star.x, star.y, tentacleX, tentacleY);
  grad.addColorStop(0, "white");
  grad.addColorStop(1, "transparent");
  context.lineWidth = 1;
	// set line color//
	context.strokeStyle = grad //'white';
    context.stroke();
  }
}

function createStar(xp,yp,fisk) {
  	var canvas = document.getElementById("mainstage");
    var starColors = [
    {"red":179,"green":217,"blue": 255},
    {"red":255,"green":179,"blue": 255},
    {"red":209,"green":179,"blue": 255},
    {"red":255,"green":153,"blue": 102},
    {"red":153,"green":255,"blue": 255},
  ];
  let startAngle = Math.floor(Math.random() * 360) + 0;
  let tentStart = Math.floor(Math.random() * 20) + 10;
  let speedDecider = 2 //(Math.floor(Math.random() * 12) + 6) / 15;
  var star = {
      twinkle:new Date().getTime(),
      lastCourse: new Date().getTime(),
      x:xp | Math.floor(Math.random() * canvas.width) + 0,  
      y:yp | Math.floor(Math.random() * canvas.height) + 0,
      color:starColors[Math.floor(Math.random() * 5) + 0],
      angle:startAngle,
      newAngle: startAngle + Math.floor(Math.random() * 10) - 5,
      speed: Math.random() * 1.75 + 0.15,
      speedmax: speedDecider,
      direction: 0.05,
      status:fisk | false,
      tentacles: [
        ],
      size:25,
    }
 
  tentz = Math.floor(Math.random() * 5) + 15;
  for(n=0;n<tentz;n++) {
      maxandstart = Math.floor(Math.random() * 10) + 30;
      tentacle = {
        length:Math.floor(Math.random() * 50) + 150,
        start:maxandstart,
        max:maxandstart,
        angle:Math.floor(Math.random() * 30) - 15,
        direction:(Math.random() * 100) * -0.010,
      }//
    star.tentacles.push(tentacle);
  }
  
  return star;
}
function initiateStars(canvas,starArray,plancArray) {
  let goblets = document.getElementById("mainstage").width / 100;
  for(y=0;y<goblets;y++) {
    if(y===0) {
          starArray.push(createStar(fisk=true));

    }
    else {
    starArray.push(createStar());
    }
  };
  let plancz;
  for(k=0;k<canvas.width/10;k++) {
    let obj = {
      x:Math.floor(Math.random() * canvas.width),
      y:Math.floor(Math.random() * canvas.height),
      id:"planc" + k,
    }
    plancArray.push(obj)
    plancz = document.createElement('div');
    plancz.id = "planc" + k;
    plancz.style.position = "absolute";
    plancz.style.width = "1px";
    plancz.style.height = "1px";
    plancz.style.opacity = "0.6";
    plancz.style.borderRadius = "90px"
    plancz.style.backgroundColor = "rgba(155,155,155,1)";
    plancz.style.left = obj.x + "px";
    plancz.style.top= obj.y + "px";
    plancz.style.zIndex = "10000";
    plancz.className = "plancton"
    /* if(k < 0) {
    plancz.style.animation = "starShine";
    plancz.style.animationIterationCount = "infinite"
    plancz.style.animationTimingFunction = "linear";
    plancz.style.animationDuration = Math.floor(Math.random() * 5 + 5) + "s";
    } */
    document.getElementById("opacityOverlay").append(plancz)
  }
}

siteOnload();

window.addEventListener("resize", function(){
  var canvas = document.getElementById("mainstage");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}, true);