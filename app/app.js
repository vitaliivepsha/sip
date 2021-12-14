// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('./assets/templates/layouts/index.html');
  require('./assets/templates/layouts/for-partners.html');
  require('./assets/templates/layouts/for-companies.html');
  require('./assets/templates/layouts/contacts.html');
  require('./assets/templates/layouts/about-us.html');
  require('./assets/templates/layouts/impressum.html');
  require('./assets/templates/layouts/terms.html');
  require('./assets/templates/layouts/policy.html');
  require('./assets/templates/layouts/partner-cabinet-information.html');
  require('./assets/templates/layouts/partner-cabinet-information-saved.html');
  require('./assets/templates/layouts/partner-cabinet-information-edit.html');
  require('./assets/templates/layouts/partner-cabinet-students.html');
  require('./assets/templates/layouts/partner-cabinet-students-vacancy-choice.html');
  require('./assets/templates/layouts/partner-cabinet-students-vacancy-choose-list.html');
  require('./assets/templates/layouts/partner-cabinet-students-add.html');
  require('./assets/templates/layouts/partner-cabinet-students-contol-of-the-documents.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
//var Fancy_select = require('_modules/fancyselect');
//var Jscrollpane = require('_modules/jscrollpane');
var LightGallery = require('_modules/lightgallery');
//var Jslider = require('_modules/jslider');
//var Fancybox = require('_modules/fancybox');
//require('../node_modules/sumoselect/jquery.sumoselect.min');
//require('../node_modules/ion-rangeslider/js/ion.rangeSlider');
//import PerfectScrollbar from 'perfect-scrollbar';
import Swal from 'sweetalert2';


// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
    //new Fancy_select();
    //new Jscrollpane();
  new LightGallery();
  new Slider();
    //new Jslider();
    //new Fancybox();

  setTimeout(function() {
    $('body').trigger('scroll');
  }, 100);

    // fixed header

  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 60) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
    scrollPrev = scrolled;
  });

    // languages

  $('.header-lang').click(function() {
    $(this).closest('.header-lang__wrapper').toggleClass('active');
  });

  $(document).click(function() {
    $('.header-lang__wrapper').removeClass('active');
  });

  $(document).on('click', '.header-lang', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.header-lang__list', function(e) {
    e.stopPropagation();
  });

    // mobile menu

  var touch = $('.mobile-menu__btn');

  var toggles = document.querySelectorAll('.mobile-menu__btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

  $(touch).click(function(e) {
    e.preventDefault();
    $('body').toggleClass('menu-opened').removeClass('login-menu__show');
    return false;
  });

  $(document).on('click', '.mobile-menu__btn', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.mobile-menu__wrapper', function(e) {
    e.stopPropagation();
  });

    // contacts

  $('.contacts-info__phone').click(function() {
    $(this).closest('.contacts-info__phone-wrapper').toggleClass('active');
  });

  $(document).click(function() {
    $('.contacts-info__phone-wrapper').removeClass('active');
  });

  $(document).on('click', '.contacts-info__phone', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.contacts-info__list', function(e) {
    e.stopPropagation();
  });

    // lazy load
  var lazyload = function() {
    var scroll = $(window).scrollTop() + $(window).height() * 3;

    $('.lazy').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('src', $(this).data('original'));
      }
    });
    $('.lazy-web').each(function() {
      var $this = $(this);
      if ($this.offset().top < scroll) {
        $this.attr('srcset', $(this).data('original'));
      }
    });
  };
  $(window).scroll(lazyload);

    // popup "Связаться с нами" - удачная отправка
  $('.popup-swal').click(function() {
    Swal('Заявка принята, наш менеджер свяжется с Вами в ближайшее время');
  });

    //  popup

  $('.login-link').magnificPopup({
    delegate: 'a',
    removalDelay: 100,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
  });

  $('.registration-link').magnificPopup({
    delegate: 'a',
    removalDelay: 100,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
  });

  /* partner cabinet information */

  // add contact

  $('.edit-btn').click(function() {
    $(this).closest('.input-wrapper').find('input').removeAttr('disabled');
  });

  $('select').on('change', function() {
    $(this).parent().addClass('active');
  });

  // upload file

  $(document).on('change', '.input-file input', function() {
    var $file = $(this),
      $label = $file.next('label'),
      $labelText = $label.find('span'),
      labelDefault = $labelText.text(),
      fileName = $file.val().split( '\\' ).pop();
    if ( fileName ) {
      $labelText.text(fileName);
    } else {
      $labelText.text(labelDefault);
    }
  });

  // add contact

  $('.add-contact').click(function() {
    $(this).closest('.form-row').append('<div class="new-contact">\n' +
            '                                <div class="form-row">\n' +
            '                                    <label>Контактное лицо - имя и фамилия</label>\n' +
            '                                    <div class="name-wrapper">\n' +
            '                                        <div class="input-wrapper select-wrapper">\n' +
            '                                            <select>\n' +
            '                                                <option selected disabled>Herr/Frau</option>\n' +
            '                                                <option>Herr</option>\n' +
            '                                                <option>Frau</option>\n' +
            '                                            </select>\n' +
            '                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.33325 2.99984L1.99992 2.33317L3.99992 4.33317L5.99992 2.33317L6.66658 2.99984L3.99992 5.6665L1.33325 2.99984Z" fill="#25222C"/>\n' +
            '                                            </svg>\n' +
            '                                        </div>\n' +
            '                                        <div class="input-wrapper">\n' +
            '                                            <input type="text" name="name" placeholder="Forname, Name">\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-row">\n' +
            '                                    <label>Телефон</label>\n' +
            '                                    <div class="input-wrapper">\n' +
            '                                        <input type="text" name="phone">\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="form-row">\n' +
            '                                    <label>Email</label>\n' +
            '                                    <div class="input-wrapper">\n' +
            '                                        <input type="text" name="email">\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                        <div class="form-row">\n' +
            '                            <div class="input-file">\n' +
            '                                <input type="file" id="doc">\n' +
            '                                <label for="doc">\n' +
            '                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '                                        <path d="M0 18.4651C0 19.1373 0.273147 19.7819 0.759353 20.2572C1.24556 20.7325 1.90499 20.9995 2.59259 20.9995H17.4074C18.095 20.9995 18.7544 20.7325 19.2406 20.2572C19.7269 19.7819 20 19.1373 20 18.4651V14.4824H17.7778V18.4651C17.7778 18.5611 17.7388 18.6532 17.6693 18.7211C17.5998 18.789 17.5056 18.8271 17.4074 18.8271H2.59259C2.49436 18.8271 2.40016 18.789 2.3307 18.7211C2.26124 18.6532 2.22222 18.5611 2.22222 18.4651V14.4824H0V18.4651Z" fill="#5F6CFA"/>\n' +
            '                                        <path d="M11.1122 15.2051L11.1122 3.70604L14.4455 6.96459L16.0159 5.42945L10.7862 0.31716C10.5779 0.113755 10.2955 -0.000497353 10.0011 -0.000497378C9.70661 -0.000497404 9.4242 0.113755 9.21587 0.31716L3.98624 5.42945L5.55661 6.96459L8.88994 3.70604L8.88994 15.2051L11.1122 15.2051Z" fill="#5F6CFA"/>\n' +
            '                                    </svg>\n' +
            '                                    <span>Загрузить фотографию контактного лица</span>\n' +
            '                                </label>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                            </div>');
  });

  // remove photo

  $('.remove-photo').click(function() {
    $(this).closest('.photo-row__wrapper').find('.upload-photo').show();
    $(this).closest('.photo-row').remove();
  });

  $('.remove-license').click(function() {
    $('.license-row').show();
    $(this).closest('.cert-item').remove();
  });

  $('.remove-doc').click(function() {
    $('.doc-row').show();
    $(this).closest('.cert-item').remove();
  });

  /* partner cabinet students */

  // dropdown

  $('.dropdown').click(function() {
    $(this).closest('.dropdown-wrapper').toggleClass('active').siblings().removeClass('active').removeClass('all');
  });

  $('.dropdown-more').click(function() {
    $(this).closest('.dropdown-wrapper').addClass('all');
  });

  $('.dropdown-list__item').click(function() {
    $(this).toggleClass('active');
  });

  $(document).click(function() {
    $('.dropdown-wrapper').removeClass('active').removeClass('all');
  });

  $(document).on('click', '.dropdown', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '.dropdown-list', function(e) {
    e.stopPropagation();
  });

  // date placeholder

  $('.input.date').on('focus', function() {
    $(this).next('.placeholder').hide();
  });
  $('.input.date').on('focusout', function() {
    $(this).next('.placeholder').show();
  });
  $('.input.date').on('change', function() {
    $(this).next('.placeholder').remove();
  });

  // show hide block with changed name
  $('#changed-name').on('change', function() {
    $(this).closest('.changed-name__wrapper').find('.changed-name').toggle();
  });

  // when choose other option in select

  $('.another-option').change(function() {
    var value = $(this).val(),
      $input = $(this).closest('.another-option__wrapper').find('.another-option__input');
    if (value == 'another') {
      $input.show();
    }
    else {
      $input.hide();
    }
  });
});
