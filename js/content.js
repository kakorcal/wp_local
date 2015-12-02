var $slider = jQuery('.galleryDetail__lightbox__slider');

var $ = jQuery;
jQuery(function($){
	constructGallerySlider($slider);

	//thumbnail click handler
	$('.photoGrid__photo').on('click', function(){
		var thumbIndex = $('.photoGrid__photo').index(this);
		addSlides(thumbIndex);
		$('.galleryDetail').addClass('active');
	});

	//galleryDetail close button click handler
	$('.nav--close').on('click', function(){
		$('.galleryDetail').removeClass('active');
		$slider.find('.slide').remove();
	});

	$('.galleryDetail').on('click', function(e){
		if(e.target != this) return;

		$('.galleryDetail').removeClass('active');
		$slider.find('.slide').remove();
	});
});


function addSlides(thumbIndex) {
	$slider.find('.slide').remove(); //clear old slides

	var $el = $('.photoGrid__photo');
	var length = $el.length;

	var arr = [];
		arr.push(thumbIndex);
		arr.push((thumbIndex-1+length)%length); //previous thumbnail
		arr.push((thumbIndex+1+length)%length); //next thumbnail

	$.each(arr, function(i, thumbIndex) {
		var imgUrl = $el.eq(thumbIndex).data('imgurl');
		var imgTitle = $el.eq(thumbIndex).find('.photoGrid__overlay__title').text();

		var t = ''+
		'<div class="slide" data-title="'+imgTitle+'" data-thumbindex='+thumbIndex+'>'+
			'<img src="'+imgUrl+'">'+
		'</div>';

		$slider.iosSlider('addSlide', t, 1); //addSlide, slide template, slide index
	});

	$slider.iosSlider('update');
}


function constructGallerySlider ($slider) {
	sizeLightbox();

	$slider.iosSlider({
		snapToChildren: true,
		desktopClickDrag: true,
		startAtSlide: 2,
		infiniteSlider: true,
		snapSlideCenter: true,
		snapFrictionCoefficient: 0.7,
		navPrevSelector: $('.nav--prev'),
		navNextSelector: $('.nav--next'),
		onSlideChange: slideChange,
		onSliderResize: resize,
		onSliderUpdate: setTitle,
		onSlideComplete: slideComplete
	});

	function slideChange(args) {
		$('.nav--next').addClass('disabled');
		$('.nav--prev').addClass('disabled');
		setTitle(args);
	}

	function setTitle(args) {
		var thumbIndex = args.currentSlideObject.data('thumbindex');
		var activeTitle = $('.photoGrid__photo').eq(thumbIndex).find('.photoGrid__overlay__title').text();
		$('.galleryDetail__lightbox__title').text(activeTitle);
	}

	function slideComplete(args) {
		var thumbIndex = args.currentSlideObject.data('thumbindex');
		addSlides(thumbIndex);

		$('.nav--next').removeClass('disabled');
		$('.nav--prev').removeClass('disabled');
	}

	function resize(args) {
		sizeLightbox();
		$slider.iosSlider('update');
	}

	function sizeLightbox() {
		var galleryDetailWidth = $('.galleryDetail').outerWidth(true);
		var galleryDetailHeight = $('.galleryDetail').outerHeight(true);
		
		if (window.innerWidth >= 800) {
			$('.galleryDetail__lightbox').css({
				'margin-top': galleryDetailHeight*0.06,
				'margin-left': galleryDetailWidth*0.08,
				'height': galleryDetailHeight*0.88,
				'width' : galleryDetailWidth*0.84
			});
		}
		else {
			$('.galleryDetail__lightbox').css({
				'margin-top': 0,
				'margin-left': 0,
				'height': galleryDetailHeight,
				'width' : galleryDetailWidth
			});
		}
	}
}