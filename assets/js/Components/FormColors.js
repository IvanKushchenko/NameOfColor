import $ from 'jquery';
import ntc from '../ntc';
import inputmask from 'inputmask/dist/inputmask/jquery.inputmask';

$(function(){
	var formColors = $('.c-form-colors'),
		colorNamesTextContainer = $('.js-text-tab-content'),
		colorNamesScssContainer = $('.js-scss-tab-content'),
		colorNamesSassContainer = $('.js-sass-tab-content'),
		colorNamesCssContainer = $('.js-css-tab-content'),
		addColorBtn = $('.js-button-add-color'),
		generateColorsBtn = $('.js-button-generate-colors');

	function addRemoveFieldBtn(){
		var fieldsCount = $('.c-form-colors .c-form__group').length;
		if(fieldsCount > 1){
			if(!$('.c-form-colors .c-form__group').eq(0).find('.js-remove-form-field').length){
				$('.c-form-colors .c-form__group').eq(0).append(`<button class="c-btn c-btn_danger c-form__remove-field js-remove-form-field"><img class="c-form__remove-field-icon" src="img/close.svg" alt=""></button>`)
			}
		}else{
			$('.c-form-colors .c-form__group').eq(0).find('.js-remove-form-field').remove();
		}
	}

	function addField(){
		var newFieldNode = $('<div>').addClass('c-form__group').html(`<input class="c-form__field" placeholder="#ffffff"><button class="c-btn c-btn_danger c-form__remove-field js-remove-form-field"><img class="c-form__remove-field-icon" src="img/close.svg" alt=""></button>`);
		newFieldNode.find('.c-form__field').inputmask("#******", {
				placeholder: ''
			});
		formColors.find('.c-form__body').append(newFieldNode);
	}

	addColorBtn.on('click', function(e){
		e.preventDefault();
		addField();
		addRemoveFieldBtn();
	});

	function removeField(field){
		$(field).remove();
	}

	$(document).on('click', '.js-remove-form-field', function(e){
		e.preventDefault();
		var field = $(this).parents('.c-form__group');
		removeField(field);
		addRemoveFieldBtn();
	})


	function validateErrorMessage(field){
		var messageNode = $('<div>').addClass('c-form__validate-message c-form__validate-message_danger');
		messageNode.text('Invalid');
		if(!field.find('.c-form__validate-message').length) field.append(messageNode);
	}

	function generateColors(){

		var colors = $('.c-form-colors .c-form__field');
		var namesAllTextColors = [],
			namesAllScssColors = [],
			namesAllSassColors = [],
			namesAllCssColors = [];
		$(colors).each(function(i,item){
			var color = $(item).val();
			
			if(color.length == 4){
				color = color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
			}

			if(!color || color.length !== 4 && color.length !== 7 || color.toUpperCase() !== ntc.name(color)[0]){
				var field = $(item).parent();
				validateErrorMessage(field);
				return false;
			}


			if($(this).parent().find('.c-form__validate-message').length) $(this).parent().find('.c-form__validate-message').remove();
			var colorTextNode = $('<div>').addClass('c-color-container u-d-flex u-align-items-center');
			var colorTextNodePicker = $('<div>').addClass('c-color-container__picker').css('background', color);

			var colorScssNode = $('<div>').addClass('c-color-container'),
			colorSassNode = $('<div>').addClass('c-color-container'),
			colorCssNode = $('<div>').addClass('c-color-container');
			colorTextNode.text(ntc.name(color)[1]);
			colorTextNode.append(" " + color);
			colorTextNode.append(colorTextNodePicker);

			colorScssNode.text("$" + ntc.name(color)[1].toLowerCase().replace(' ', '-') + ": " + color + ';');

			colorSassNode.text("$" + ntc.name(color)[1].toLowerCase().replace(' ', '-') + ": " + color);

			colorCssNode.text("--" + ntc.name(color)[1].toLowerCase().replace(' ', '-') + ": " + color + ';');
			
			namesAllTextColors.push(colorTextNode);
			namesAllScssColors.push(colorScssNode);
			namesAllSassColors.push(colorSassNode);
			namesAllCssColors.push(colorCssNode);

			colorNamesTextContainer.html(namesAllTextColors);
			colorNamesScssContainer.html($("<code>").html(namesAllScssColors));
			colorNamesSassContainer.html($("<code>").html(namesAllSassColors));
			colorNamesCssContainer.html($("<code>").html(namesAllCssColors));

			$('.c-tabs__content').removeClass('c-tabs__content_is-empty');

		})
	}

	generateColorsBtn.on('click', function(e){
		e.preventDefault();
		generateColors();
	});
})