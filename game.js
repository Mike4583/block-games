var container = document.getElementById("container");
var info = document.getElementById("info");
var count = 0;

// 创建一个正方形
function createSquare(x, y, size) {
	var square = document.createElement("div");
	square.className = "square";
	square.style.left = x + "px";
	square.style.top = y + "px";
	square.style.width = size + "px";
	square.style.height = size + "px";
	
	// 鼠标按下时拖动
	square.addEventListener("mousedown", startDrag);

	container.appendChild(square);

	// 更新方块数量信息
	count++;
	info.innerHTML = "你已经生成了" + count + "个方块。";

	return square;
}

// 拖动正方形
function startDrag(event) {
	var square = event.target;
	var offsetX = event.offsetX;
	var offsetY = event.offsetY;
	square.style.zIndex = 100;

	document.addEventListener("mousemove", drag);
	document.addEventListener("mouseup", endDrag);

	function drag(event) {
		square.style.left = event.pageX - offsetX + "px";
		square.style.top = event.pageY - offsetY + "px";
	}

	function endDrag(event) {
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", endDrag);
		square.style.zIndex = 0;
	}
}

// 拆分正方形
function splitSquare(event) {
	var square = event.target;
	var size = parseInt(square.style.width, 10);
	var x = parseInt(square.style.left, 10);
	var y = parseInt(square.style.top, 10);

	if (size > 1) {
		// 移除原来的正方形
		container.removeChild(square);
		// 创建两个新的正方形
		createSquare(x, y, size/2);
		createSquare(x+size/2, y, size/2);
		createSquare(x, y+size/2, size/2);
		createSquare(x+size/2, y+size/2, size/2);
		// 更新方块数量信息
		count += 3;
		info.innerHTML = "你已经生成了" + count + "个方块。";
	}
}

// 设置正方形颜色
function setSquareColor(event) {
	event.preventDefault();
	var square = event.target;
	var color = window.prompt("请为该方块设置颜色rgb值：","rgb(0, 0, 0)");
	square.style.backgroundColor = color;
}

createSquare(0, 0, 2000);

// 拆分正方形
container.addEventListener("click", splitSquare);

// 设置正方形颜色
container.addEventListener("contextmenu", setSquareColor);