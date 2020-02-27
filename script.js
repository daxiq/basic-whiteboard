
	'use strict'

	var h, w, lastX, currX, lastY, currY, draw, download;
	var color=0, stroke, mirror, rubber, rainbow, round;
	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');


	var recordPointerCursor = (e) =>{
		lastX = currX;
		lastY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;
	}
	var handlePointerMove = (e) =>{
		if(draw){
			recordPointerCursor(e);
			drawLine();
			setStroke();
			setColor();
		}
	}
	var handlePointerDown = (e) =>{
		recordPointerCursor(e);
		draw = true;
	}

	var stopDrawing = () =>{
		draw = false;
	}

	var setColor = () =>{
		let color = document.querySelector('#color').value;
		ctx.strokeStyle = color;
	}
	var setStroke = () =>{
		stroke = document.querySelector('#b-size').value;
		ctx.lineWidth = stroke;
	}

	var setStyle = () =>{
		round = document.querySelector('#style-round');
		if (round.checked == true) {
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
		}else{
			ctx.lineCap = 'square';
		}
	}

	var drawLine = () =>{

		var a = lastX, a_mirror = w - a,
			b = lastY,
			c = currX, c_mirror = w - c, 
			d = currY;
		ctx.beginPath();
		let mirror = document.querySelector("#mirror");
		let rubber = document.querySelector("#rubber");
		let rainbow = document.querySelector("#rainbow");
		if(mirror.checked == true){
			ctx.moveTo(a_mirror,b);
			ctx.lineTo(c_mirror,d);
		}
		if(rubber.checked == true){
			ctx.strokeStyle = 'white';
		}
		if(rainbow.checked == true){
			color ++;
			ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
		}
		ctx.moveTo(a,b);
		ctx.lineTo(c,d);
		ctx.stroke();
		ctx.closePath();
	}
	/*var drawRectangle = () =>{
		var size = document.querySelector('#size').value;
		ctx.beginPath();
		ctx.rect(lastX-size/2, lastY-size/2, size, size);
		if(strokeShape.checked == true){
			ctx.stroke();
		}
		if(fillShape.checked == true){
			let color = document.querySelector('#color').value;
			ctx.fillStyle = color;
			ctx.fill();
		}
	}
	var drawCircle = () =>{
		var size = document.querySelector('#size').value;
		ctx.beginPath();
		ctx.arc(lastX, lastY, size/2, 0, Math.PI*2);
		if(strokeShape.checked == true){
			ctx.stroke();
		}
		if(fillShape.checked == true){
			let color = document.querySelector('#color').value;
			ctx.fillStyle = color;
			ctx.fill();
		}
	}*/
	var drawIMG = (e) =>{
		var url = URL.createObjectURL(e.target.files[0]);
		var img = new Image();
		img.onload = () =>{
			ctx.scale(.3,.3);
			ctx.drawImage(img,1,1);
			ctx.scale(3.335,3.335);
		}
		img.src = url;
	}

	var canvasSize= ()=>{
		ctx.scale(1,1);
	}


	var clearCanvas = () =>{
		ctx.clearRect(0,0,w,h);
		ctx.fillStyle = '#FFF';
		ctx.fillRect(0,0,w,h);
	}


	var downloadCanvas = () =>{
		let link = document.createElement('a');
		link.setAttribute('href', canvas.toDataURL());
		link.setAttribute('download', 'canvas.jpg');
		document.body.appendChild(link);
		link.click();
		link.remove();
		download = false;
	}

	var init = function(){
		canvas = document.querySelector('#canvas');

		if (canvas) {
			ctx = canvas.getContext('2d');
			w = canvas.width;
			h = canvas.height;
			clearCanvas();
			canvas.onpointermove = handlePointerMove;
			canvas.onpointerdown = handlePointerDown;
			canvas.onpointerup = stopDrawing;
			canvas.onpointerout = stopDrawing;
		}
	}

document.addEventListener('DOMCotentLoaded', init());