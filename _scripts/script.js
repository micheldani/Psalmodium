var pageScan = [];
pageScan[0] = "_books/Kounouz/Kounouz a ";
pageScan[1] = "_books/Kounouz/Kounouz b ";
pageScan[2] = "_books/Madih/Madih ";
pageScan[3] = "_books/Mizmar 1/Mizmar 1 ";
pageScan[4] = "_books/Mizmar 2/Mizmar 2a ";
pageScan[5] = "_books/Mizmar 2/Mizmar 2b ";
pageScan[6] = "_books/Mizmar 3/Mizmar 3 ";
pageScan[7] = "_books/Ousbou3/Ousbou3 ";
pageScan[8] = "_books/Qithara/Qithara ";
pageScan[9] = "_books/Qiyamiyat/Qiyamiyat ";
pageScan[10] = "_books/Quddas/Quddas ";
pageScan[11] = "_books/Sounouj 1/Sounouj 1 ";
pageScan[12] = "_books/Sounouj 2/Sounouj 2 ";
pageScan[13] = "_books/Moutafarriqat/mout ";

var bookName = [];
bookName[0] = "الكنوز . تراتيل";
bookName[1] = "الكنوز . باراكليسي";
bookName[2] = "صلاة النوم و المديح";
bookName[3] = "المزمار الروحي ١";
bookName[4] = "المزمار ٢ . تريودي";
bookName[5] = "المزمار ٢ . بندكوستاري";
bookName[6] = "المزمار الروحي ٣";
bookName[7] = "الأسبوع العظيم";
bookName[8] = "القيثارة الروحية";
bookName[9] = "القياميات";
bookName[10] = "القداس الإلهي";
bookName[11] = "صنوج التهليل ١";
bookName[12] = "صنوج التهليل ٢";
bookName[13] = "متفرقات";

var pageMin = [0, 0, 12, 0, 0, 0, 0, 0, 4, 0, 0, 10, 0, 1];

var pageMax = [39, 100, 175, 413, 92, 106, 86, 232, 233, 293, 366, 500, 278, 36];

var scan, pageNumber, min, max, $, document;
var ext = ".png";
var down = 'click';
var spd = 80;

function numToString(num) {
    "use strict";
	var nums = num.toString(), numsLength = nums.length;
	if (numsLength === 1) {
		nums = "00" + nums;
    }
	if (numsLength === 2) {
		nums = "0" + nums;
    }
	return nums;
}
	
function loadPages(num) {
    "use strict";
	var nums = numToString(num);
	$('#page').attr('src', scan + nums + ext);
    $('#message').attr('placeholder', num);
}

function loadBook(num) {
    "use strict";
	scan = pageScan[num];
	min = pageMin[num];
	max = pageMax[num];
	pageNumber = min;
    $('#book').text(bookName[num]);
    $('.bookTOC').hide(function () {
        $('#' + num).show();
    });
}

function prevPage() {
    "use strict";
	if (pageNumber > min) {
		pageNumber = pageNumber - 1;
		if (pageNumber <= min) {
			pageNumber = min;
        }
		$('#thepage').fadeOut(spd, function () {
			loadPages(pageNumber);
            $('#page').imagesLoaded(function () {
                $('#thepage').fadeIn(spd);
            });
		});
	}
}

function nextPage() {
    "use strict";
	if (pageNumber < max) {
		pageNumber = pageNumber + 1;
		if (pageNumber >= max) {
			pageNumber = max;
        }
		$('#thepage').fadeOut(spd, function () {
			loadPages(pageNumber);
            window.scrollTo(0, 0);
            $('#page').imagesLoaded(function () {
                $('#thepage').fadeIn(spd);
            });
		});
	}
}

function resetOnOff() {
    "use strict";
	$('#b-coll').attr('value', "Off");
	$('#b-index').attr('value', "Off");
}
	
function initialState() {
    "use strict";
	$('#b-coll').attr('value', "On");
    $('.drop-index').hide();
	$('.drop-collection').show();
    $('#thepage').hide();
}

function formGoto() {
    "use strict";
	var gt = $('#message').val(), g = parseInt(gt, 10);
	if (gt === null || gt === "" || isNaN(gt)) {
		g = pageNumber;
    }
	if (g < min) {
		g = min;
    }
	if (g >= max) {
		g = max;
	}
	loadPages(g);
	pageNumber = g;
	$('#thepage').fadeOut(spd, function () {
        $('#page').imagesLoaded(function () {
            $('#thepage').fadeIn(spd);
        });
        resetOnOff();
	});
}

$(document).ready(function () {
	"use strict";
	initialState();
	
	$('#b-go').on(down, function () {
		formGoto();
	});

	$('#b-prev').on(down, function () {
		prevPage();
	});
	
	$('#b-next').on(down, function () {
		nextPage();
	});
	
	$('.a-coll').on(down, function () {
		var CV2 = $('#b-coll').attr('value');
		if (CV2 === "Off") {
			$('#b-coll').attr('value', "On");
			$('#thepage').fadeOut(spd, function () {
				$('.drop-collection').show();
			});
		}
		if (CV2 === "On") {
			$('#page').show();
			$('.drop-collection').fadeOut(spd, function () {
				$('.drop-collection').hide();
				$('#thepage').fadeIn(spd);
                resetOnOff();
			});
		}
	});
	
	$('.a-index').on(down, function () {
		var CV3 = $('#b-index').attr('value');
		if (CV3 === "Off") {
			$('#b-index').attr('value', "On");
			$('#thepage').fadeOut(spd, function () {
				$('.drop-index').show();
			});
		}
		if (CV3 === "On") {
			$('.drop-index').fadeOut(spd, function () {
				$('.drop-index').hide();
				$('#thepage').fadeIn(spd);
                resetOnOff();
			});
		}
	});
	
	$('.collection').on(down, function () {
        loadBook($(this).attr('title'));
		$('#page').show();
		$('.drop-collection').fadeOut(spd, function () {
			$('.drop-collection').hide();
			loadPages(min);
            $('#page').imagesLoaded(function () {
                $('#thepage').fadeIn(spd);
            });
		});
        resetOnOff();
	});
    
    $('.index').on(down, function () {
		var indexNum = $(this).attr('title');
		pageNumber = parseFloat(indexNum);
		$('.drop-index').fadeOut(spd, function () {
			$('.drop-index').hide();
			loadPages(pageNumber);
            window.scrollTo(0, 0);
			$('#page').imagesLoaded(function () {
                $('#thepage').fadeIn(spd);
            });
		});
        resetOnOff();
	});
    
});

$(document.documentElement).keyup(function (event) {
    "use strict";
	if (event.keyCode === 13) {
		formGoto();
    }
	if (event.keyCode === 37) {
		prevPage();
	}
	if (event.keyCode === 39) {
        nextPage();
	}
	if (event.keyCode === 40) {
        prevPage();
	}
	if (event.keyCode === 38) {
        nextPage();
	}
});

var myElement = document.getElementById('thepage');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("swipeleft", function () {
    "use strict";
    nextPage();
});

mc.on("swiperight", function () {
    "use strict";
    prevPage();
});