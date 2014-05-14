	var sec = 00;
	var min = 00;
	var hour = 0;
	var intervalId;
	var totalTime = "00:00";
	var theTimer;
	var saveContainer;
	var loserMessage="";
	var winnerMessage="";
	var asistan_m="";
	
	function init()
	{
		loserMessage=document.getElementById("container_loser");
		winnerMessage=document.getElementById("container_winner");
		saveContainer = document.getElementById("save_container");
		asistan_m = document.getElementById("asistan");
		theTimer=document.getElementById("timer_id");
		loserMessage.innerHTML=" ";
		winnerMessage.innerHTML=" ";
//		asistan_m.innerHTML="<img src='back.png'>";
	}
	
	function startWatch() {
	  clearInterval(intervalId);
	  intervalId = setInterval(startCounting, 1000);
	}

	function stopWatch() {
	  window.clearInterval(intervalId);
	}

	function resetWatch() {
	  window.clearInterval(intervalId);
	  totalTime = "Duration: 00:00";
	  theTimer.innerHTML = ( totalTime );  
	  sec = 00;
	  min = 00;
	  hour = 00;
	}

	function saveWatch() {
	  window.clearInterval(intervalId);
	  saveContainer.innerHTML = ( totalTime );
	}

	function startCounting() {
	  sec ++;
	  if( sec == 60 ) {
	    sec = 00;
	    min += 1;
	  }
	  if( min == 60) {
	    min = 00;
	    hour += 1;
	  }
	  totalTime = ((min<=9) ? "0" + min : min) + ":" + ((sec<=9) ? "0" + sec : sec);
	  theTimer.innerHTML ="Duration: ";
	  theTimer.innerHTML += ( totalTime );
	  
	}
