const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
lines = 32 //number of lines - 1

function draw(){
  context.fillStyle = '#f7f7f7';
  context.fillRect(0,0,canvas.width,canvas.height)
  context.strokeStyle="#027bd8";
  for (i = 0; i <= canvas.height ;i+= (canvas.height/lines)){
    line([0,i],[canvas.width,i])
    line([i,0],[i,canvas.height])
  }
}

function line(start,end){
  context.beginPath();
  context.moveTo(start[0],start[1]);
  context.lineTo(end[0],end[1]);
  context.stroke();
}
function point(x,y){
  context.beginPath();
  context.arc(x, y, 5, 0, 2 * Math.PI, false);
  context.stroke();
}
function precise(x) {
  return Number.parseFloat(x).toPrecision(5);
}
function reduce(numerator,denominator){
  numerator = Math.round(numerator)
  denominator = Math.round(denominator)
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);

  return [numerator/gcd, denominator/gcd];
}


(function() {
    var mousePos;
    drawLine=false
    linearr=[]
    clicks=0
    document.onmousemove = handleMouseMove;
    document.onclick = clicked;
    setInterval(getMousePosition, 10);
    function handleMouseMove(event) {
        event = event || window.event;
        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function clicked(event){
      x = Math.round(mousePos.x/(canvas.width/lines))*(canvas.width/lines)
      y = Math.round(mousePos.y/(canvas.width/lines))*(canvas.width/lines)
      if (x <= canvas.width && y <= canvas.height){
        clicks++
        if(clicks % 2 != 0){
          drawLine = true;
        } else{
          drawLine = false;
        }
        linecords = [x,y]
        linearr[linearr.length] = linecords
      }
    }
    function getMousePosition() {
      if (lines != document.getElementById("lines").value){
        lines = document.getElementById("lines").value;
        linearr=[]
      }
      if (mousePos) {
        draw()
        sf = canvas.width/lines
        x=Math.round(mousePos.x/sf)*sf
        y=Math.round(mousePos.y/sf)*sf
        context.strokeStyle = "black"
        for (i=0;i < linearr.length-1;i+=2){
          if(document.getElementById("grad").checked){
            context.fillStyle = "black";
            context.font = "bold 16px Arial";
            frac = reduce(Math.round(linearr[i][1]/sf)-Math.round(linearr[i+1][1]/sf),-1*Math.round(linearr[i][0]/sf)-Math.round(linearr[i+1][0]/sf))
            if (frac[1] == 1){fract = frac[0]}
            else if (frac[1] == 0){fract = "Undefined"}
            else {fract = frac[0]+"/"+frac[1]}
            context.fillText(fract, (linearr[i][0] + linearr[i+1][0])/2, (linearr[i][1] + linearr[i+1][1])/2)
          }
          line(linearr[i],linearr[i+1]);
        }
        if(drawLine){
          line(linecords,[x,y]);
        }
        point(x,y)
      }
    }
})();
