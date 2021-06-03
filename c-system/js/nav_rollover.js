$(function(){
	$("ul#nav02 li.sn01").hover(function(){
		$("img#menu01").attr('src', './images/g-nav02_on.jpg');
	},
	function(){
		$("img#menu01").attr('src', './images/g-nav02.jpg');
	});

	$("ul#nav02 li.sn02").hover(function(){
		$("img#menu02").attr('src', './images/g-nav03_on.jpg');
	},
	function(){
		$("img#menu02").attr('src', './images/g-nav03.jpg');
	});

	$("ul#nav02 li.sn03").hover(function(){
		$("img#menu03").attr('src', './images/g-nav04n_on.jpg');
	},
	function(){
		$("img#menu03").attr('src', './images/g-nav04n.jpg');
	});

	$("ul.snm01").hover(function(){
		$("li.sn01 a#sn0101").toggleClass("nav_red");
	});

	$("ul.snm02").hover(function(){
		$("li.sn01 a#sn0102").toggleClass("nav_red");
	});

	$("ul.snm03").hover(function(){
		$("li.sn01 a#sn0103").toggleClass("nav_red");
	});

	$("ul.snm04").hover(function(){
		$("li.sn02 a#sn0104").toggleClass("nav_red");
	});

	$("ul.snm05").hover(function(){
		$("li.sn03 a#sn0105").toggleClass("nav_red");
	});

	$("ul.snm06").hover(function(){
		$("li.sn03 a#sn0106").toggleClass("nav_red");
	});

});
