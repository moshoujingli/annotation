$(function  () {
	currentPoints = []
	saveArea = window.localStorage
	img_idx = $("#img_idx")[0]
	img_idx.download='img_idx.tsv'
	img_idx.href='data:text/plan,'
	img_loc = $("#img_loc")[0]
	img_loc.download='img_loc.tsv'
	img_loc.href='data:text/plan,'
	function saveGlobalState () {
		saveArea.lastMarking = marking
		saveArea[marking-1] = currentPoints
	}
	function resizeCanvas () {
		console.log($("#pic").width())
		console.log($("#pic").height())
		$('#mark_place')[0].width=$("#pic").width()
		$('#mark_place')[0].height=$("#pic").height()
	}
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
	lastMarking = parseInt(saveArea.lastMarking)
	if (lastMarking >=0) {
		marking = lastMarking
	}else{
		marking = 0
	}
	$("#pic").attr("src", pics[marking]).load(function  () {
		resizeCanvas()
	});
	$("#save").click(function  () {
		marking+=1
		saveGlobalState()
		if (marking == pics.length-1 ) {
			alert('All finished')
			$("#save").hide()
		}else{
			currentPoints = []
			$("#pic").attr("src", pics[marking]).load(function  () {
				resizeCanvas()
			});
		}
	})
	$('#resetall').click(function  () {
		for (var i = pics.length - 1; i >= 0; i--) {
			saveArea[marking] = []
		};
		saveArea.lastMarking =0
		location.reload()
	})
	$('#reset').click(function  () {
		currentPoints.pop()
		cleanCanvas()
		if (currentPoints.length>0) {
			drawPointAt(currentPoints[0][0],currentPoints[0][1],currentPoints[0][2])
			for (var i = 1; i < currentPoints.length; i++) {
				drawPointAt(currentPoints[i][0],currentPoints[i][1],currentPoints[i][2])
				drawLinkLine(currentPoints[i-1],currentPoints[i])
			};
		}
		
	})
	$("#generate").click(function  () {
		idxContent  = ''
		locContent = ''
		for (var i = 0; i < saveArea.lastMarking; i++) {
			imgNage = pics[i].substring(6)
			idxContent+=i
			idxContent+="\t"
			idxContent+=imgNage
			idxContent+="\n"

			points = saveArea[i].split(',')
			for (var j = 0; j < points.length/3; j++) {
				locContent += i + '\t'
				locContent += j + '\t'
				x = points[j*3+0]
				y = points[j*3+1]
				visiable = points[j*3+2]
				locContent += x + '\t' +y + '\t' + visiable + '\t'
				locContent+='\n'
			};
		};
		console.log(idxContent)
		console.log(locContent)
		img_idx.href='data:text/plan;base64,'+Base64.encode(idxContent)
		img_loc.href='data:text/plan;base64,'+Base64.encode(locContent)

	})
	function cleanCanvas () {
		$('#mark_place')[0].width = $('#mark_place')[0].width
	}

})
