// ##############################################
// GLOBAL VARIABLE [2016.08.28 RENEW]
// ##############################################
// outline selecter
var html = 'html',
	body = 'body',
	container = '#container',
	header = '#site-header',
	footer = '#site-footer',
	content = '#contentsWrap';

// window size
var win_w, win_iw, win_h, win_sw, win_wh;

// window scroll
var s;

// responsive break point
var break_p = 640;

//touch device
var isTouchDevice = (typeof window.ontouchstart) !== 'undefined';
if(isTouchDevice) {
	$("html").addClass('is_touch_device');
}else{
	$("html").addClass('is_mouse_device');
}

// ##############################################
// LOAD JS [2016.08.28 RENEW]
// ##############################################
// load depend js
// --------------------------------------------*/
$('head').append($('<script>').attr('src','/jp/eclipse/_js/jquery.depend-1.1.7.min.js'));


// ##############################################
// SCRIPT RUN [2016.08.28 RENEW]
// ##############################################

// window onload event
// --------------------------------------------*/
$.event.add(window, "load", function() {
	sizeValue();
	scrollValue();
	navCurrent();
	gnav();
	fnav();
	searchBox();
	topicPath();
	interchange();
	smoothScroll();
});


// window resize event
// --------------------------------------------*/
$(window).on('resize', function() {
	sizeValue();
	interchange();
});


// window scroll event
// --------------------------------------------*/
$(window).on('scroll', function() {
	scrollValue();
	gotop();
});


// ##############################################
// FUNCTIONS [2016.08.28 RENEW]
// ##############################################

// window size set
// --------------------------------------------*/
function sizeValue() {
	// browser width (including scrollbar)
	win_w = (window.innerWidth || document.documentElement.clientWidth || 0);
	// browser width (except scrollbar)
	win_iw = document.body.clientWidth;
	// browser height (including scrollbar)
	win_h = (window.innerHeight || document.documentElement.clientHeight || 0);
	// scrollbar width
	win_sw = win_w - win_iw;
	// browser width/height (aspect ratio)
	win_wh = win_iw / win_h;
}


// window scroll position
// --------------------------------------------*/
function scrollValue() {
	s = $(window).scrollTop();
}

// smooth scroll
// --------------------------------------------*/
function smoothScroll() {
	$('a[href^=#]').not('.colorboxInline, .slidewrap *, .noscroll').on('click', function(e) {
		e.preventDefault();
		var w = window.innerWidth;

		var speed = 600;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;

		$("html, body").animate({
			scrollTop: position
		}, speed, "swing");

		return false;
	});
}


// global navigation
// --------------------------------------------*/
function gnav() {
	var tgl = '[data-name="menu-tgl"]',
		close = '[data-name="menu-close"]',
		gnav = '#gnav';
	var nores = $(body).attr('class');

	// [SP] barger bottun on click
	$(tgl).on('click', function() {
		if (win_w < break_p) {
			$(container)
				.toggleClass('open');
			$(html)
				.toggleClass('noscroll');
			$(gnav).find('.gnav-li').removeClass('out open');
		}
	});

	// [SP] navigation first on click
	$(gnav + ' li').not('.gnav04, .gnav05, .gnav07').on('click', function() {
		if (win_w < break_p) {
			$(this)
				.toggleClass('open');

			if (!$(this).hasClass('current')) {
				$(gnav + ' .current').addClass('out');
			}

			if (!$(gnav + ' li').hasClass('open')) {
				$(gnav + ' .current').removeClass('out');
			}
		}
	});

	// [SP] container on click
	$('#containerOverlay').on('click', function() {
		if (win_w < break_p) {
			$(container).removeClass('open');
			$(html).removeClass('noscroll');
			$(gnav).find('.gnav-li').removeClass('out open');
		}
	});

	// [SP] navigation close
	$(close).on('click', function() {
		if (win_w < break_p) {
			$(container)
				.toggleClass('open');
			$(html)
				.toggleClass('noscroll');
			$(gnav).find('.gnav-li').removeClass('out open');
		}
	});

	var timer;
	var gnav_open_flg = false;

	if (win_w >= break_p) {
		$(gnav).css({'transition':'height 0.3s ease-out'});
	}

	// [PC] navigation mouse hover
	$(gnav + ' > .gnav > li').children('a').on('mouseenter', function() {
		var _self = $(this);
		clearInterval(timer);
		if ($(body).hasClass('norespon') || win_w >= break_p) {

			if (gnav_open_flg || isTouchDevice) {
				execute();
			} else {
				timer = setTimeout(function() {
					execute();
				}, 100);
			}
		}

		function execute() {
			var _parent = _self.parents('.gnav-li');

			gnav_open_flg = true;

			if (!$(gnav).hasClass('open')) {
				$(gnav)
					.addClass('open');
			}

			_parent
				.addClass('open')
				.siblings().children('a').on('mouseenter', function() {
					_parent
						.removeClass('open');
				});

			$(gnav)
				.find('.current').addClass('out');

			if (_parent.hasClass('gnav04')) {
				$(gnav)
					.removeClass('open');
			}

			if (_parent.hasClass('gnav07')) {
				$(gnav)
					.removeClass('open');
			}
		}
	});

	//for android tablet (pc view)
	var clicked_num = false;
	if(isTouchDevice && $.platform.android){
		$(gnav + ' > .gnav > li').not('.gnav04, .gnav05, .gnav06, .gnav07').children('a').each(function(index,element) {
			$(this).on('click', function() {
				console.log(index);
				if(clicked_num === index){

				}else{
					clicked_num = index;
					return false;
				}
			});
		});
	}

	// [PC] navigation mouse out
	$(gnav).on('mouseleave', function() {
		clearInterval(timer);
		if ($(body).hasClass('norespon') || win_w >= break_p) {
			timer = setTimeout(function() {
				var flg = false,
					cls = [];

				gnav_open_flg = false;

				$(':hover').each(function() {
					var cl = $(this)[0].className;
					cls.push(cl);
				});

				if ($.inArray('gnav', cls) < 0) {
					$(gnav)
						.removeClass('open')
						.find('.gnav-li').removeClass('open out');
				}
			}, 300);
		}
	});
}

// gnav current
// --------------------------------------------*/
function navCurrent() {
	var _class = $(body).attr('class'),
		nav = $('#gnav'),
		current;

	if (_class && _class.match(/current-/)) {
		_class = _class.match(/current-[a-z]{0,}/)[0];

		switch (_class) {
			case 'current-nav':
				current = nav.find('.gnav01');
				break;
			case 'current-drive':
				current = nav.find('.gnav02');
				break;
			case 'current-option':
				current = nav.find('.gnav03');
				break;
			case 'current-sup':
				current = nav.find('.gnav04');
				break;
			case 'current-map':
				current = nav.find('.gnav07');
				break;
		}

		current.addClass('current');
	}
}


// search box
// --------------------------------------------*/
function searchBox() {
	var tgl = $('[data-name=search-tgl]'),
		close = $('[data-name=search-close]'),
		box = $('[data-name=search-box]');

	tgl.on('click', function() {
		box.addClass('open');
		$("#SS_searchQuery").focus();
	});

	close.on('click', function() {
		box.removeClass('open');
	});
}


// footer navigation
// --------------------------------------------*/
function fnav() {
	var tgl = $('[data-name=fnav] h3'),
		flg = true;

	tgl.on('click', function() {
		if (win_w < break_p) {
			$(this).toggleClass('open');
			$(this).next().slideToggle();
		}
	});
}


// go top button
// --------------------------------------------*/
function gotop() {
	var selector = $('#gotop');
	if (s > 200) {
		selector.addClass('active');
	} else {
		selector.removeClass('active');
	}
}


// topic path clone
// --------------------------------------------*/
function topicPath() {
	var $elem = $('#upper ul'),
		$tar = $('#lower');

	$elem.clone().appendTo($tar);
}


// image size change
// --------------------------------------------*/
function interchange() {
	var txt = '',
		img = $('[data-interchange]');

	img.each(function() {
		var _self = $(this),
			data = _self.attr('data-interchange'),
			data = data.replace(/\s/g, ''),
			data = data.split('],['),
			o = [],
			src;

		for (i = 0; i < data.length; i++) {
			data[i] = data[i].replace(/[\[\]]/, '');
			data[i] = data[i].split(',');
			var k = data[i][1],
				v = data[i][0];
			o[k] = v;
		}

		changeAC();
		$.attr('src', src);
		_self.attr('src', src);

		function changeAC() {
			if (win_w < break_p) {
				if (o.small) {
					src = o.small;
				} else {
					src = o.large;
				}
			} else {
				if (o.large) {
					src = o.large;
				} else {
					src = o.small;
				}
			}
		}
	});
}


// viewport overwrite
// --------------------------------------------*/
function setViewPort() {
	var W = window.screen.width;
	var $viewport = $('meta[name=viewport]');
	var norespon = $("body").hasClass("norespon");

	if (W >= break_p || norespon) return;

	$viewport.attr('content', 'width=device-width, initial-scale=1');

}
$(function() {
	setViewPort();
});


//for check
//console.log('title： '+$('title').text());
//console.log('keywords： '+$('meta[name=keywords]').attr('content'));
//console.log('description： '+$('meta[name=description]').attr('content'));


$(function() {
	// キャプション付き画像ボックス
	// $('.re_img_caps_colorize').each(function(){
	// 	var
	// 		$container = $(this),
	// 		$comp = $('.re_img_caps_colorize__caps', $container)
	// 	;
	// 	$(window).on('resize', function(){
	// 		$container.css({'padding-bottom': $comp.outerHeight()});
	// 	}).trigger('resize');
	// });
});