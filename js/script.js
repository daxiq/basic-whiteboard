
	
	'use strict'

	var h, w, lastX, currX, lastY, currY, draw;

	var color=0, stroke, mirror, rubber, rainbow;

	var strokeShape = document.querySelector('#stroke-shape');
	var fillShape = document.querySelector('#fill');

	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');

	var init = () =>{
		w = canvas.width;
		h = canvas.height;

		canvas.onpointermove = handlePointerMove;
		canvas.onpointerdown = handlePointerDown;
		canvas.onpointerup = stopDrawing;
		canvas.onpointerout = stopDrawing;
	}

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
		}
	}

	var handlePointerDown = (e) =>{
		recordPointerCursor(e);
		draw = true;
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
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.stroke();
		ctx.closePath();
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

	var drawRectangle = () =>{
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
	}

	var drawIMG = (e) =>{
		var url = URL.createObjectURL(e.target.files[0]);
		var img = new Image();

		img.onload = () =>{
			ctx.drawImage(img,1,1);
		}
		img.src = url;
	}