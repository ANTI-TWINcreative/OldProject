/*

	ANTI_TWIN Studios Official Webpage
	
	Author: Timothy K. Stuart
	Date: 4/27/2017
	Filename: hstyles.css
	
	Supporting Files: none
	
*/

var audio, platBtn, stopBtn, muteBtn, timeSlider, volSlider,
	searching=false, searchTo, currentTimeText, durTimeText;
	
function initAudioPlayer() {
	audio = new Audio();
	audio.src = "../Audio/discoJesus.wav";
	audio.loop = false;
	audio.play();
	
	//Set object references
	
	playBtn = document.getElementById("playPauseBtn");
	muteBtn = document.getElementById("muteBtn");
	timeSlider = document.getElementById("timeSlider");
	volSlider =  document.getElementById("volSlider");
	currentTimeText = document.getElementById("currentTimeText");
	durTimeText = document.getElementById("durTimeText");
	
	//Add event handling
	
	platBtn.addEventListener("click",playPause);
	muteBtn.addEventListener("click",mute);
	
	timeSlider.addEventListener("mousedown", function(event) 
	{ searching=true; search(event); });
	
	timeSlider.addEventListener("mousemove", function(event)
	{ search(event);});
	
	timeSlider.addEventListener("mouseup", function() 
	{searching=false; });
	
	volSlider.addEventListener("mousemove", setvolume);
	
	audio.addEventListener("timeupdate", function()
	{ searchTimeUpdate()};
	
	//functions
	
	function playPause() {
		if(audio.paused) {
			audio.play();
			platBtn.style.background = 
			"url(../Images/pausebtn.png) no-repeat";
		}
		else {
			audio.pause();
			platBtn.style.background = 
			"url(../Images/playbtn1.png) no-repeat";
		}
	}
	
	function mute() {
		if(audio.muted) {
			audio.muted = false;
			muteBtn.style.background = 
			"url(../Images/volumebtn.png) no-repeat";
		}
		else {
			audio.muted = true;
			muteBtn.style.background = 
			"url(../Images/mutebtn.png) no-repeat";
		}
	}
	
	function search(event) {
		if(searching) {
			timeSlider.value = event.clientX - 
			timeSlider.offsetLeft;
			
			searchTo = audio.duration * (timeSlider.value / 60);
			
			audio.currentTime = searchTo;
		}
	}
	
	function setvolume() {
		audio.volume = volSlider.value / 100;
	}
	
	function searchTimeUpdate() {
		var nt = audio.currentTime * (100 / audio.duration);
		timeSlider.value = nt;
		
		var curmins = Math.floor(audio.currentTime / 60);
		
		var cursecs = Math.floor(audio.currentTime - curmins * 60);
		
		var durmins = Math.floor(audio.duration / 60);
		
		var dursecs = Math.floor(sudio.duration - durmins * 60);
		
		if(cursecs < 10) {cursecs = "0"+cursecs;}
		
		if(dursecs < 10) {dursecs = "0"+dursecs;}
		
		if(curmins < 10) {curmins = "0"+curmins;}
		
		if(durmins < 10) {durmins = "0"+durmins;}
		
		currentTimeText.innerHTML = curmins+":"+cursecs;
		
		durTimeText.innerHTML = durmins+":"+dursecs;
	}
}

window.addEventListener("load", initAudioPlayer);
	