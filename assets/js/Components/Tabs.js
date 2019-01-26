import $ from 'jquery';

$(function(){
	$('.c-tabs .c-tabs__content').eq(0).addClass('s-is-showed');
	$('.c-tabs .c-tabs__item').eq(0).addClass('s-is-active');
	$('.c-tabs__item').click(function () {

		var tabIndex = $(this).index(),
		parentContainer = $(this).parents('.c-tabs');
		parentContainer.find('.c-tabs__content').removeClass('s-is-showed');
		parentContainer.find('.c-tabs__item').removeClass('s-is-active');
		$(this).addClass('s-is-active');
		parentContainer.find('.c-tabs__content').eq(tabIndex).addClass('s-is-showed');
	})
})