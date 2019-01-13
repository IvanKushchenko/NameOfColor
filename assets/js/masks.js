import $ from 'jquery';
import inputmask from 'inputmask/dist/inputmask/jquery.inputmask';
$(function(){
	$('.c-form__field_color-hex').inputmask("#******", {
		placeholder: ''
	});
})