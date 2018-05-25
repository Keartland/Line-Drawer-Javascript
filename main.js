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
        x=Math.round(mousePos.x/(canvas.width/lines))*(canvas.width/lines)
        y=Math.round(mousePos.y/(canvas.width/lines))*(canvas.width/lines)
        context.strokeStyle = "black"
        for (i=0;i < linearr.length-1;i+=2){
          line(linearr[i],linearr[i+1]);
        }
        if(drawLine){
          line(linecords,[x,y]);
        }
        point(x,y)
      }
    }
})();