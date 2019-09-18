const make2DArray = (cols, rows)=>{
	let arr = new Array(cols);
	for(let i = 0; i <arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

let grid;
let cols = 10;
let rows = 10;
let resolution = 40;

function setup(){
	createCanvas(400, 400);
	cols = width / resolution;
	rows = height / resolution;
	console.log(width, height, cols, rows);

	grid = make2DArray(cols, rows);
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			grid[i][j] = 0;
		}
	}
	createMine()

	console.table(grid)
}

function createMine(){
	for(let i = 0; i < 10 ; i++){
		// grid에 random 지뢰 생성
		let x = Math.floor(Math.random() * 10);
		let y = Math.floor(Math.random() * 10);
		grid[x][y] = 1;
	}
}



function draw(){
	background(200);

	//
	for(let i = 0; i <= cols; i++){
		for(let j = 0; j < rows; j++){	
			fill(255)
			line(j * resolution, 0, j * resolution, height);
		}
		fill(255)
		line(0, i * resolution, width, i * resolution);
	}

	// random하게 채운 사각형 그리기
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			let x = i * resolution;
			let y = j * resolution;
			// console.log(grid[i][j] == 1)
			if(grid[i][j] == 1){
				fill('black');
				stroke(0);
				textSize(32);
				textAlign(LEFT, CENTER);
				text("*", x+10, y+25)
				// rect(x, y, resolution-1, resolution-2)
				
			}else{
				textAlign(LEFT, CENTER);
				const neighbors = countNeighbors(grid, i, j)
				textSize(20)
				if(neighbors == 1){
					fill("blue")	
				}else if(neighbors == 2){
					fill("green")
				}else if(neighbors == 3){
					fill("red")
				}else{
					fill("navy");
				}
				
				text(neighbors > 0?neighbors:"",x+10,y+20)
				// rect(x, y, resolution-1, resolution-2)
			}

		}
	}

	

}

const countNeighbors = (grid, x, y) =>{
	let sum = 0
	for(let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			let col = (x + i + cols) % cols
			let row = (y + j + rows) % rows
			sum += grid[col][row]

		}
	}
	sum -= grid[x][y];
	return sum
}



