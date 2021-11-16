$(function() {

	// Tooltips
	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


	// table_row
	function columnCalc() {
		let col1 = $('.table_row .table_row_entry').outerWidth();
		let col2 = $('.table_row .table_row_info').outerWidth();
		$('.table_head .table_row_entry, .table_row .table_row_text').css('min-width', col1);
		$('.table_head .table_row_info').css('min-width', col2);
	}
	columnCalc();
	$(window).resize(function() {
		columnCalc();
	});

	// js_table_hidden
	$('.js_table_hidden').on('click', function() {
		$(this).toggleClass('active');
		$(this).closest('tr').next('.content_table_hidden').toggleClass('opened');
		return false;
	});


	// chips_show
	$('.chips_show').on('click', function() {
		let height = $(this).closest('.chips').find('.chips_inner').outerHeight();
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active');
			$(this).closest('.chips').css('height', height).addClass('opened');
		} else {
			$(this).removeClass('active');
			$(this).closest('.chips').removeAttr('style').removeClass('opened');
		}
	});


	// js_play
	$('.js_play').each(function() {
		let playBtnText = $(this).find('span').text();
		$(this).on('click', function() {
			if ( $(this).hasClass('btn-play') ) {
				$(this).removeClass('btn-play').addClass('btn-pause');
				$(this).find('span').text('Остановить');
			} else {
				$(this).addClass('btn-play').removeClass('btn-pause');
				$(this).find('span').text(playBtnText);
			}
			return false;
		});
	});


	// js_show_filters
	$('.js_show_filters').on('click', function() {
		$(this).toggleClass('active');
		$(this).closest('.create_filters').find('.create_filters_hidden').slideToggle(200);
		return false;
	});


	// Select2
	$('.js-select').select2({
		minimumResultsForSearch: 7
	});
	$('.js-select').select2({ dropdownParent: "#addGetters" });


	// check-field-hidden
	$('.check-field').each(function() {
		let check = $(this).find('input');
		check.on('change', function() {
			if ( check.prop('checked') ) {
				check.closest('.check-field').next().slideDown(200);
			} else {
				check.closest('.check-field').next().slideUp(200);
			}
		});
	});


	// js_nav_btn / js_nav_close
	$('.js_nav_btn').on('click', function() {
		$('body').addClass('aside_opened');
	});
	$('.js_nav_close').on('click', function() {
		$('body').removeClass('aside_opened');
	});


	// Mask input
	$('.phone_input').mask('+7 (999) 999-99-99');


	// select_social
	$('.select_social-btn').on('click', function() {
		$(this).closest('.select_social').toggleClass('opened');
		$(this).closest('.select_social').find('.select_social-dropdown').fadeToggle(200);
		return false;
	});
	$('.select_social-dropdown li a').on('click', function() {
		$(this).closest('.select_social').removeClass('opened');
		$(this).closest('.select_social').find('.select_social-dropdown').fadeOut(200);
		let classOption = $(this).attr('class');
		let titleOption = $(this).text();
		$(this).closest('.select_social').find('.select_social-btn').removeAttr('class').addClass(`select_social-btn ${classOption}`);
		$(this).closest('.select_social').find('.select_social-btn').text(titleOption);
		return false;
	});
	$(document).on('click touchstart', function(e) {
		let el = $('.select_social');
		if ( !el.is(e.target) && el.has(e.target).length === 0 ) {
			el.removeClass('opened');
			el.find('.select_social-dropdown').fadeOut(200);
		}
	});
	// select_social end


	// filter popup
	$('.js_showfilter').on('click', function() {
		$(this).toggleClass('show');
		$(this).closest('.dropdown').find('.filterAddPopup').fadeToggle(200);
	});
	$('.js_closefilter').on('click', function() {
		$(this).closest('.dropdown').find('.js_showfilter').removeClass('show');
		$(this).closest('.dropdown').find('.filterAddPopup').fadeOut(200);
	});


	// new mail radio buttons
	$('#one-mailing').on('change', function() {
		$('.othersubs, #chain-subs, .chain_subs_group, #subs-event').hide();
		$('#one-subs').fadeIn(200);
	});
	$('#target-mailing').on('change', function() {
		$('.othersubs, #chain-subs, .chain_subs_group, #subs-event').hide();
		$('#target-subs').fadeIn(200);
	});
	$('#chain-mailing').on('change', function() {
		$('.othersubs, .not_chain_subs, #subs-event').hide();
		$('#chain-subs, .chain_subs_group').fadeIn(200);
		$('.js-select').select2({
			minimumResultsForSearch: 7
		});
	});
	$('#event-mailing').on('change', function() {
		$('.othersubs, .not_chain_subs').hide();
		$('#chain-subs, .chain_subs_group, #subs-event').fadeIn(200);
		$('.js-select').select2({
			minimumResultsForSearch: 7
		});
	});


});

// file input JS

// files displayed
let filesDisplayed = []

// display list files
function filesDisplayFunc(files) {
	files.innerHTML = ''
	filesDisplayed.forEach(i => {
		let file = document.createElement('div')
		file.setAttribute('class', 'file_upload-item')
		file.innerHTML = `${i} <button class="file_upload-delete" onclick="delFileFunc('${i}')"></button>`
		files.append(file)
	})
}

// del file
const delFileFunc = name => {
	filesDisplayed = filesDisplayed.filter(item => item !== name)
	filesDisplayFunc(files)
}

// file input
let fileInputs = document.querySelectorAll('.file_upload_input')
for (let i of fileInputs) {
	i.addEventListener('change', e => {
		files = e.target.closest('.file_upload').children[1].children[1]
		// let values = e.target.webkitEntries
		// values.forEach(item => {
		// 	filesDisplayed.push(item.name)
		// })
		let name = e.target.value.slice(12)
		if ( !filesDisplayed.includes(name) ) {
			filesDisplayed.push(name)
		}
		e.target.value = ''

		// Display array
		filesDisplayFunc(files)
	})
}