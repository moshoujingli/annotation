$(function  () {
	currentPoints = []
	function saveGlobalState () {
		// body...
	}
	function resizeCanvas () {
		console.log($("#pic").width())
		console.log($("#pic").height())
		$('#mark_place')[0].width=$("#pic").width()
		$('#mark_place')[0].height=$("#pic").height()
	}
	resizeCanvas()
	function drawPointAt (x,y,visiable) {
			context = $('#mark_place')[0].getContext("2d");
			context.fillStyle = visiable?'#ff0000':'#000000';
			context.beginPath()
			context.arc(x,y, 5, 0, 2*Math.PI, false);
			context.fill();
	}
	function drawLinkLine (pointFrom,pointTo) {
		context = $('#mark_place')[0].getContext("2d");
		context.strokeStyle = "#df4b26";
		context.lineJoin = "round";
		context.lineWidth = 2;
		context.beginPath()
		context.moveTo(pointFrom[0],pointFrom[1])
		context.lineTo(pointTo[0],pointTo[1])
		context.closePath()
		context.stroke();
	}
	$("#mark_place").click(function  (e) {
		console.log(e.offsetX)
		console.log(e.offsetY)
		visiable = confirm('visiable?')
		currentPoints.push([e.offsetX,e.offsetY,visiable])
		drawPointAt(e.offsetX,e.offsetY,visiable)
		if (currentPoints.length >=2) {
			drawLinkLine(currentPoints[currentPoints.length-2],currentPoints[currentPoints.length-1])
		}
	})

	console.log(pics)
	marking = 0
	$("#save").click(function  () {
		if (marking == pics.length-1 ) {
			alert('All finished')
			$("#save").hide()
		}else{
			marking+=1
			saveGlobalState()
			$("#pic").attr("src", pics[marking]);
			resizeCanvas()
		}
	})
	$('#reset').click(function  () {
		currentPoints.pop()
		cleanCanvas()
		if (currentPoints.length>0) {
			drawPointAt(currentPoints[0][0],currentPoints[0][1],currentPoints[0][2])
			for (var i = 1; i < currentPoints.length; i++) {
				drawPointAt(currentPoints[i][0],currentPoints[i][1],currentPoints[0][2])
				drawLinkLine(currentPoints[i-1],currentPoints[i])
			};
		}
		
	})
	function cleanCanvas () {
		$('#mark_place')[0].width = $('#mark_place')[0].width
	}

})
