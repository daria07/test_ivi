document.addEventListener('DOMContentLoaded', function() {
	var i = 0;
	var a = ["1", "2", "3", "Go!"];
	var timerId = setInterval(function() {
		document.getElementById("count").innerHTML = a[i++];
	    i = i % 4
	}, 1000);
	document.getElementById("figure").onmouseover = function() {
	    this.parentNode.style.background = '#3b6cc4';
	  }
	document.getElementById("figure").onmouseout = function(e) {
	    this.parentNode.style.background = 'white';
	}

});

