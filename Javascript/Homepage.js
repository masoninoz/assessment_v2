var scroll = 0;

var navBarDown = [
  { top: (window.scrollY - 100) + "px" },
  { top: (window.scrollY + 5) + "px" },
];

var navBarUp = [
  { top: (window.scrollY + 5) + "px" },
  { top: (window.scrollY - 100) + "px" },
];

const navBarSettings = {
  duration: 500,
  iterations: 1,
};

var navbar;

var Logoclicked = 0;


document.addEventListener('DOMContentLoaded', function(){


const logo = document.querySelector('#logo');
navbar = document.querySelector("#navBar");

logo.addEventListener('click', function(){
	if(Logoclicked === 0){
		navbar.animate(navBarDown, navBarSettings);
		navbar.style.top = 5 + window.scrollY + "px";
		Logoclicked = 1;
	} else if(Logoclicked === 1){
		navbar.animate(navBarUp, navBarSettings);
		navbar.style.top = -100 + window.scrollY + "px";
		Logoclicked = 0;
	}
});

});


var oldScroll;
var isSet = false;


window.onscroll = function() {scrollImage()}

function scrollImage(){
	
	//Parallax Code
	scroll = window.scrollY;
	
	document.getElementById('Layer1').style.top = -0.8 * scroll + "px";
	document.getElementById('Layer2').style.top = -0.7 * scroll + "px";
	document.getElementById('Layer3').style.top = -0.5 * scroll + "px";
	document.getElementById('Layer4').style.top = -0.3 * scroll + 'px';
	document.getElementById('Layer5').style.top = -0.2 * scroll + 'px';
	document.getElementById('Layer6').style.top = -0.1 * scroll + 'px';
	
	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	
	//The parallax images are now 1.01 times their normal dimensions of 1920x1080 with only the width set. So I need to modify that padding to account for this
	//I can find the client width. Times that by 1.02 and the ratio of the width to height. 
	//Width to height ratio = 1080/1920 = 0.5625 
	//It should be that I can now multiply the client width by 1.02 and then multiply by that constant to figure out the screen height.
	
	var imageHeight = clientWidth * 1.01 * 0.5625;
	document.getElementById('imagePadding').style.paddingTop = (imageHeight) -0.8 * scroll - ((32/520) * imageHeight) + "px";
	
	
	//Code to allow the nav bar to follow and scroll out of the screen
	
	navBarDown = [
		{ top: (window.scrollY - 100) + "px" },
		{ top: (window.scrollY + 5) + "px" },
	];
	navBarUp = [
		{ top: (window.scrollY + 5) + "px" },
		{ top: (window.scrollY - 100) + "px" },
	];
	
	
	 //Don't have the scroll bar if the screen is on the parallax image
	 
	
	if((scroll - oldScroll) <= 0){ //If you are scrolling up or not scrolling this will be true
	
	var intNavBarHeight = Number(navbar.style.top.replace("px", '')); //Converts the string containing the height in pixels, to an integer
		if(isSet){ 
			console.log(intNavBarHeight + " NavBar Height");
			if(intNavBarHeight >= scroll + 5){ //Lower values mean higher in the screen. So if the navbar is below the top of the screen then follow the screen...
				navbar.style.top = scroll + 5 + "px";
				Logoclicked = 1;
			}
			
		} else if(!isSet){ //If the navbar has not yet been moved to be above the screen. Then...
		if(scroll - 50 > 0){ //If the scroll - the offset will put the navbar on teh screen...
		navbar.style.top = scroll - 50 + "px";
		} else {
			navbar.style.top = 0 + "px";
		}
		isSet = true; //The navbar's position has been set above the screen
		
		}
	} else {
		isSet = false; // If you're scrolling down, the navbar's position isn't set
		Logoclicked = 0;
	}
	
	
	oldScroll = scroll;
}


