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
//var LightGallery = require('_modules/lightgallery');
//var Jslider = require('_modules/jslider');
//var Fancybox = require('_modules/fancybox');
//require('../node_modules/sumoselect/jquery.sumoselect.min');
//require('../node_modules/ion-rangeslider/js/ion.rangeSlider');
//import PerfectScrollbar from 'perfect-scrollbar';

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function() {
  new Forms();
  new Popup();
  //new Fancy_select();
  //new Jscrollpane();
  //new LightGallery();
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
});
