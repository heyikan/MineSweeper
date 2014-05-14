	
	
	var numOfMines = 20;
	var width = 15;
	var height = 12;
	var counter=-1;

	
	
	function setDimention()
	{
	var name_element = document.getElementById('dimention_level');
	var result=document.getElementById("result_dimention");
	if(name_element.value == "Smallest")
	{width = 8; height = 7;}
	if(name_element.value == "Small")
	{width = 15; height = 12;}
	if(name_element.value == "Normal")
	{width = 20; height = 17;}
	if(name_element.value == "Big")
	{width = 25; height = 20;}
	if(name_element.value == "Huge")
	{width = 30; height = 23;}
	result.innerHTML="Dimentions: "
	result.innerHTML+=height;
	result.innerHTML+=" x "
	result.innerHTML+=width;
	}
	
	
	function setDifficulty()
	{
	var name_element = document.getElementById('difficult_level');
	var result = document.getElementById("result_difficulty");
	var number;
	if(name_element.value == "Easiest")
		number = (width * height) / 12;
	if(name_element.value == "Easy")
		number = (width * height) / 10;
	if(name_element.value == "Normal")
		number = (width * height) / 9;
	if(name_element.value == "Hard")
		number = (width * height) / 5;
	if(name_element.value == "Hardest")
		number = (width * height) / 4;
	numOfMines = parseInt(number);
	result.innerHTML="Number Of Mines: "
	result.innerHTML+=numOfMines;
	}
	


function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function makeBoard(width, height) 
{
	var blankSymbol = "_";
	var board = [];
	 
	board.content = [];
	board.state = [];
	for(var i=0;i<height;i++)
	{
		board.content[i] = [];
		board.state[i] = [];
		for(var j=0; j<width; j++) 
		{
			board.content[i][j] = blankSymbol;
			board.state[i][j] = blankSymbol
		}
	}
 
return board;
}

function printBoard(board) 
{
	board = board.content;
	var height = board.length;
	var width = board[0].length;
	var text = "";
	for(var i=0;i<height;i++)
	{
		text += "|";
		for(var j=0;j<width;j++)
		{
			text += board[i][j];
			text += "|";
		}
		text += "</br>";
	}	
	return text;
}

function insertFlag(row,col)
{
	var contex = document.getElementById(row+","+col);
	console.log("Pressed: "+row+" * "+col);
	if(window.gameBoard.state[row][col] != "O")
	{
	console.log("Changed: "+row+" * "+col);
	contex.innerHTML="F";
	contex.style.color="#9E1E2B";
	window.gameBoard.state[row][col] = "F";
	}
	console.log("right clicked!!!");
	console.log("state: "+ window.gameBoard.state[row][col]);
	console.log("content: "+ window.gameBoard.content[row][col]);
}


function prettyPrintBoard(board) 
{		
	var height = board.content.length;
	var width = board.content[0].length;
	var cellClass = "";
	var cellId = "";
	var cellContent = "";
	var onClick = "";
	var onContext="";
	var text = "";
	counter++;
	var count_move = document.getElementById("moves");
	count_move.innerHTML = "Moves: ";
	count_move.innerHTML += counter;
	for(var i=0;i<height;i++) {
		text += "<div class='row'>";
		for(var j=0;j<width;j++) {
				console.log("i: "+i+" j: "+j+" board.state: "+board.state[i][j]+" board.content: "+board.content[i][j]);
			if(board.state[i][j] == "F" && board.content[i][j] == "B" )
			{
				cellClass = "square flag";
				cellId = i+","+j;
				cellContent = "F";
				onClick = "revealSubmit("+i+","+j+")";
				onContext="insertFlag("+i+","+j+")";
				console.log("cell content: "+cellContent);
			}
			else if(board.state[i][j] == "_")
			{
				cellClass = "square blank";
				cellId = i+","+j;
				cellContent = "_";
				onClick = "revealSubmit("+i+","+j+")";
				onContext="insertFlag("+i+","+j+")";
			}
			else
			{
				cellClass = "square open"+board.content[i][j];
				cellClass += board.state[i][j] == "hit" ? " hit" : "";
				cellClass += board.state[i][j] == "win" ? " win" : "";
				cellId = i+","+j;
				cellContent = board.content[i][j];
				onClick = "";
			}
			console.log("cell content end: "+cellContent);
		text += "<div class = '"+cellClass+"' id='"+cellId+"' onClick='"+onClick+"' oncontextmenu= '"+onContext+";return false'>"+cellContent+"</div>";
		}
	text += "</div>";
	}
return text;
}

function plantMines(board,numMines) 
{
	var height = board.length;
	var width = board[0].length;
	  
	var min = 0;

	var mineSymbol = "B";
	 
	while(numMines>0)
	{
		var row = getRandomInt(min, height-1);
		var col = getRandomInt(min, width-1);
		    
		if(board[row][col] == "_")
		{
			board[row][col] = mineSymbol;
			numMines--;
		}
	}  
	return board;
}

function printNumbers(board) 
{
	var height = board.length;
	var width = board[0].length;
	var numBombs = 0;
	  
	for(var i=0;i<height;i++) 
	{				
		for(var j=0;j<width;j++) 
		{
			numBombs = 0;
			if(board[i][j] == "_") 
			{
				for(var x=-1;x<=1;x++) 
				{
					if( i+x >= 0 && i+x < height) 
					{ //check if edge
						for(var y=-1;y<=1;y++) 
						{
							if( j+y >= 0 && j+y < width) 
							{ // check if edge
								if(board[i+x][j+y] == "B") 
								{
								numBombs++;
								}
							}
						}
					}
				}
				if(numBombs > 0){
				board[i][j] = numBombs;
				}
			}
		}
	}			
	return board;
}



function revealBombs()
{
var height = window.gameBoard.content.length;
var width = window.gameBoard.content[0].length;

	for(var i=0; i<height; i++) {
		for(var j=0; j<width; j++) {
			if(window.gameBoard.content[i][j] == "B") 
			{
				window.gameBoard.state[i][j] = "O";
			}
		}
	}
}



function reveal(row,col)
{
	var height = window.gameBoard.content.length;
	var width = window.gameBoard.content[0].length;
	var fState;
	if(window.gameBoard.state[row][col] == "_" || window.gameBoard.state[row][col] == "F") 
	{
		if(window.gameBoard.state[row][col] == "F" && window.gameBoard.content[row][col] != "B")
			 window.gameBoard.state[row][col] = "O";
		window.gameBoard.state[row][col] = "O";
		if(window.gameBoard.content[row][col] == "_")
		{      
//			window.gameBoard.content[row][col] ="-";
			for(var x=-1;x<=1;x++) 
			{
				if( row+x >= 0 && row+x < height) 
				{ //check if edge
					for(var y=-1;y<=1;y++) 
					{
						if( col+y >= 0 && col+y < width) 
						{ // check if edge
						reveal(row+x, col+y);
						}
					}
				}
			}
		}
		     
		else if(window.gameBoard.content[row][col] == "B")
		{
			revealBombs();
			window.gameBoard.state[row][col] = "hit";
			window.clearInterval(intervalId);
			window.alert("Boom!\nYou hit a bomb, you lose.\nYour Total time: " + totalTime + "\tMoves: " + counter);
			loserMessage.innerHTML = "You looser!!!";
			asistan_m.innerHTML="<img src='sad.png' width='10%'>";
			window.gameOn = false;
			return;
		}
		fState=finish();
		if(fState == true)
		{
			revealBombs();
			window.gameBoard.state[row][col] = "win";
			window.clearInterval(intervalId);
			window.alert("Congurations!!!\nYou Are Victorious!!!\nYour Total time:" + totalTime + "\tMoves: " + counter);
			winnerMessage.innerHTML="You Winner!!! :)";
			asistan_m.innerHTML="<img src='smile.gif' width='10%'>";
			window.gameOn = false;
			return;
		}
	}
return;
}



function revealSubmit(row,col){
	if(window.gameOn)
	{
		reveal(row,col);
		var printText = prettyPrintBoard(gameBoard);
		document.getElementById("board").innerHTML=printText;
		window.gameBoard = gameBoard;
	}
}


function finish()
{
	var counter=0;
	var content="";
	for(var i=0; i<height; i++) {
		for(var j=0; j<width; j++) {
			if(window.gameBoard.state[i][j] == "_" || window.gameBoard.state[i][j] == "F" )
			{
				counter++;
			}
		}
	}
	if(counter == numOfMines)
		return true;
	else
		return false;
}

function printIt()
{

	init();
	resetWatch();
	startWatch();
	counter=-1;
	var gameBoard;
	asistan_m.innerHTML="";
	gameBoard = makeBoard(width,height);
	gameBoard.content = plantMines(gameBoard.content,numOfMines);
	gameBoard.content = printNumbers(gameBoard.content);
	var printText = prettyPrintBoard(gameBoard);
	document.getElementById("board").innerHTML=printText;
	window.gameBoard = gameBoard;
	window.gameOn = true;
};
