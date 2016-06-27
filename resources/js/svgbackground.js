var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var timer = null;
var timerInterval = 1;
var opacityDecrease = .003;
var count = 0;
var starAddFreq = 2;
var opacityDecFreq = 1;
var lowPositionX = -40;
var highPositionX = 1200;
var lowPositionY =  -40;
var highPositionY = 600;
var svg = document.querySelector('.__web-inspector-hide-shortcut__');

window.addEventListener('scroll', function() {
    var contentBody = document.querySelector('div.content');

    if (!document.body.classList.contains('scroll') && window.pageYOffset > 5) {
        document.body.classList.add('scroll');
    } else if (document.body.classList.contains('scroll') && window.pageYOffset < 5) {

        console.log('> 5')
        document.body.classList.remove('scroll');
    }
});

function size() {
    highPositionX = window.innerWidth;
    highPositionY = document.querySelector('body').scrollHeight;

    svg.setAttributeNS(null, "width", highPositionX);
    svg.setAttributeNS(null, "height", highPositionY);
    svg.setAttributeNS(null, "viewBox", '0 0 ' + highPositionX + ' ' + highPositionY);
}

window.onresize = size;
window.onload = size;


function rand(min, max) {
    return min + Math.random() * (max - min);
}

function get_random_color() {
    var h = Math.floor(rand(241, 249));
    var s = Math.floor(rand(218, 241));
    var l = Math.floor(rand(50, 162));
    return 'rgba(' + h + ',' + s + ',' + l + ', 1)';
}

    function decreaseOpacityAndAscent() {
    	var starGroup = document.getElementById("starGroup");
    	var i = 0;
    	var delArray = new Array();
    	for (; i < starGroup.childNodes.length; i++) {
    		var opacity = starGroup.childNodes[i].getAttributeNS(null, "opacity") - opacityDecrease;
    		if (opacity <= 0) {
    			delArray.push(starGroup.childNodes[i]);
    		} else {
    			starGroup.childNodes[i].setAttributeNS(null, "opacity", opacity);
    		}

        var type = starGroup.childNodes[i].getAttributeNS('http://www.w3.org/1999/xlink', "href");

        starGroup.childNodes[i].setAttributeNS(
          null,
          "y",
          starGroup.childNodes[i].getAttributeNS(null, "y") - type.substr(type.length - 1)
        );
//debugger


//       console.log(type[type.length])



    	}

    	for (i = 0; i < delArray.length; i++) {
    		starGroup.removeChild(delArray[i]);
    	}
    }

    function ascent() {

    }

    function randomColor() {
    	return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    function randomPos(low, high) {
    	return Math.floor((Math.random() * 10) * (high-low)) + low;
    }

    function addElement() {
    	var starGroup = document.getElementById("starGroup");

    	var useElem = document.createElementNS(xmlns, "use");
      var randomStarTypeNumber = Math.random() * 10;

      var startType = (randomStarTypeNumber > 3.33) ? (randomStarTypeNumber > 6.66) ? 3 : 2 : 1;

    	useElem.setAttributeNS(null, "x", randomPos(lowPositionX,highPositionX));
    	useElem.setAttributeNS(null, "y", randomPos(lowPositionY,highPositionY));
    	useElem.setAttributeNS(null, "transform", "scale(.1)");
    	useElem.setAttributeNS(null, "fill", get_random_color());
    	//useElem.setAttributeNS(null, "stroke", randomColor());
    	useElem.setAttributeNS(null, "opacity", 1);

    	useElem.setAttributeNS(xlinkns, "xlink:href", "#star" + startType);

    	starGroup.appendChild(useElem);
    }

    function doStars() {
    	if (timer != null) {
    		count++;

    		if ((count % opacityDecFreq) == 0) {
				  decreaseOpacityAndAscent();
          decreaseOpacityAndAscent();
			  }
			if ((count % starAddFreq) == 0) {
				addElement();
			}

			timer = setTimeout(doStars, timerInterval);
    	}
    }

    timer = setTimeout(doStars, timerInterval);
