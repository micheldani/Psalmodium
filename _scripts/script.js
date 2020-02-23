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

var bookTOC = [];
bookTOC[0] = "_content/Kounouza.html";
bookTOC[1] = "_content/Kounouzb.html";
bookTOC[2] = "_content/Madih.html";
bookTOC[3] = "_content/Mizmar1.html";
bookTOC[4] = "_content/Mizmar2a.html";
bookTOC[5] = "_content/Mizmar2b.html";
bookTOC[6] = "_content/Mizmar3.html";
bookTOC[7] = "_content/Ousbou3.html";
bookTOC[8] = "_content/Qithara.html";
bookTOC[9] = "_content/Qiyamiyat.html";
bookTOC[10] = "_content/Quddas.html";
bookTOC[11] = "_content/Sounouj2.html";
bookTOC[12] = "_content/Sounouj2.html";
bookTOC[13] = "_content/Moutafarriqat.html";

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

var pageMin = [0, 0, 12, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1];

var pageMax = [39, 48, 175, 413, 92, 106, 86, 237, 233, 293, 366, 278, 278, 36];

var scan, pageNumber, bookNumber, min, max, $, document, alert;
var ext = ".png";
var down = 'click';

var bkMarkBook = [];
var bkMarkPage = [];
var bkMarkCurrentIndex = bkMarkBook.length;

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

function loadBook(num) {
    "use strict";
	scan = pageScan[num];
	min = pageMin[num];
	max = pageMax[num];
	pageNumber = min;
	bookNumber = num;
	$('#b-coll').animate({opacity: 0}, 40, function () {
		document.querySelector("#b-coll").innerHTML=(bookName[num]);
		$('#b-coll').animate({opacity: 1}, 40);
	});
	$('.drop-index').load(bookTOC[num]);
}
	
function loadPages(num) {
    "use strict";
	var nums = numToString(num);
	$('#page').attr('src', scan + nums + ext);
	document.querySelector("#currentPage").innerHTML=(num);
    $("#message").delay(240).val('');
}

function prevPage() {
    "use strict";
	if (pageNumber > min) {
		pageNumber = pageNumber - 1;
		if (pageNumber <= min) {
			pageNumber = min;
        }
		$('#page').animate({opacity: 0}, 80, function () {
			loadPages(pageNumber);
            $('#page').animate({opacity: 1}, 80);
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
		$('#page').animate({opacity: 0}, 80, function () {
			loadPages(pageNumber);
            $('#page').animate({opacity: 1}, 80);
		});
	}
}

function resetOnOff() {
    "use strict";
	$('#b-coll').attr('alt', "Off");
	$('#b-index').attr('alt', "Off");
	$('#b-goto').attr('alt', "Off");
    $('#b-bkmk').attr('alt', "Off");
    $('#b-goto').attr('alt', "Off");
    $('#b-coll').css('z-index', '1');
    $('#b-index').css('z-index', '1');
    $('#b-goto').css('z-index', '1');
    $('#b-bkmk').css('z-index', '1');
    $('#b-prev').css('visibility', 'visible');
    $('#b-next').css('visibility', 'visible');
}
	
function initialState() {
    "use strict";
	$('#b-coll').attr('alt', "On");
	$('.drop-collection').css('visibility', 'visible');
    $('#b-block').css('visibility', 'visible');
	$('#b-block').animate({opacity: 0.5}, 0);
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
    $('#b-block').animate({opacity: 0}, 80, function () {
        $('#b-block').css('visibility', 'hidden');
    });
	$('#b-goto').animate({opacity: 1}, 80);
	$('.f-goto').animate({opacity: 0}, 80, function () {
		$('.f-goto').css('visibility', 'hidden');
        $('#thepage').animate({opacity: 1}, 120);
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
	
	$('.a-goto').on(down, function () {
		var CV1 = $('#b-goto').attr('alt');
		if (CV1 === "Off") {
            $('#b-goto').css('z-index', '3');
			$('#b-goto').attr('alt', "On");
			$('#b-block').css('visibility', 'visible');
			$('#b-block').animate({opacity: 0.8}, 80);
			$('#thepage').animate({opacity: 0}, 120, function () {
				$('.f-goto').css('visibility', 'visible');
				$('.f-goto').animate({opacity: 1}, 120, function () {
					$('#message').focus();
				});
			});
		}
		if (CV1 === "On") {
            $('#b-block').animate({opacity: 0}, 80, function () {
				$('#b-block').css('visibility', 'hidden');
			});
			$('#b-goto').animate({opacity: 1}, 80);
			$('.f-goto').animate({opacity: 0}, 80, function () {
				$("#message").blur();
				$('.f-goto').css('visibility', 'hidden');
				$('#thepage').animate({opacity: 1}, 120);
                resetOnOff();
			});
		}
	});
	
	$('.a-coll').on(down, function () {
		var CV2 = $('#b-coll').attr('alt');
		if (CV2 === "Off") {
            $('#b-coll').css('z-index', '3');
			$('#b-coll').attr('alt', "On");
			$('#b-block').css('visibility', 'visible');
			$('#b-block').animate({opacity: 0.8}, 80);
			$('#thepage').animate({opacity: 0}, 120, function () {
                $('#b-prev').css('visibility', 'hidden');
                $('#b-next').css('visibility', 'hidden');
				$('.drop-collection').css('visibility', 'visible');
				$('.drop-collection').animate({opacity: 1}, 120);
			});
		}
		if (CV2 === "On") {
			$('#b-block').animate({opacity: 0}, 80, function () {
				$('#b-block').css('visibility', 'hidden');
			});
			$('#page').css('visibility', 'visible');
			$('.drop-collection').animate({opacity: 0}, 120, function () {
				$('.drop-collection').css('visibility', 'hidden');
				$('#thepage').animate({opacity: 1}, 120);
                resetOnOff();
			});
		}
	});
	
	$('.a-index').on(down, function () {
		var CV3 = $('#b-index').attr('alt');
		if (CV3 === "Off") {
            $('#b-index').css('z-index', '3');
			$('#b-index').attr('alt', "On");
			$('#b-block').css('visibility', 'visible');
			$('#b-block').animate({opacity: 0.8}, 80);
			$('#thepage').animate({opacity: 0}, 120, function () {
                $('#b-prev').css('visibility', 'hidden');
                $('#b-next').css('visibility', 'hidden');
				$('.drop-index').css('visibility', 'visible');
				$('.drop-index').animate({opacity: 1}, 120);
			});
		}
		if (CV3 === "On") {
			$('#b-block').animate({opacity: 0}, 80, function () {
				$('#b-block').css('visibility', 'hidden');
            });
			$('.drop-index').animate({opacity: 0}, 80, function () {
				$('.drop-index').css('visibility', 'hidden');
				$('#thepage').animate({opacity: 1}, 120);
                resetOnOff();
			});
		}
	});
	
	$('.a-bkmk').on(down, function () {
        var CV4 = $('#b-bkmk').attr('alt');
        if (CV4 === "Off") {
            $('#b-bkmk').attr('alt', "On");
            $('#b-bkmk').css('z-index', '3');
            $('#b-block').css('visibility', 'visible');
			$('#b-block').animate({opacity: 0.8}, 80);
            $('#thepage').animate({opacity: 0}, 80, function () {
                $('#b-prev').css('visibility', 'hidden');
                $('#b-next').css('visibility', 'hidden');
				$('.drop-bookmark').css('visibility', 'visible');
				$('.drop-bookmark').animate({opacity: 1}, 120);
			});
        }
        if (CV4 === "On") {
			$('#b-block').animate({opacity: 0}, 80, function () {
				$('#b-block').css('visibility', 'hidden');
            });
			$('.drop-bookmark').animate({opacity: 0}, 80, function () {
				$('.drop-bookmark').css('visibility', 'hidden');
				$('#thepage').animate({opacity: 1}, 120);
                resetOnOff();
			});
		}
	});
	
	$('.collection').on(down, function () {
        loadBook($(this).attr('title'));
		$('#b-block').animate({opacity: 0}, 80, function () {
			$('#b-block').css('visibility', 'hidden');
		});
		$('#page').css('visibility', 'visible');
		$('.drop-collection').animate({opacity: 0}, 120, function () {
			$('.drop-collection').css('visibility', 'hidden');
			loadPages(min);
            $('#thepage').animate({opacity: 1}, 120);
		});
        resetOnOff();
	});
    
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
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
