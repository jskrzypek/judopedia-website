/* globals requirejs */

requirejs.config({
  baseUrl: '/js',
  paths: {
    'fastclick': [
      '//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min',
      '/bower_components/fastclick/lib/fastclick'
    ],
    'jquery': [
      '//code.jquery.com/jquery-2.1.4.min',
      '/bower_components/jquery/dist/jquery.min'
    ]
  }
});

require([
  'jquery',
  'fastclick'
], function($, FastClick) {

  //var $document  = $(document),
  //    Modernizr  = window.Modernizr;

  var repoHomepageLink = $('#footer-repo-homepage-link');
  var contributeLink = $('#footer-contribute-link, #footer-feedback-link');

  contributeLink.hover(function() {
    repoHomepageLink.toggleClass('hover');
  });

  window.addEventListener('load', function() {
    new FastClick(document.body);
  }, false);

  //var $jsNavigationMenu = $('#js-navigation-menu');
  //$document.ready(function() {
  //  var menuToggle = $('#js-mobile-menu').unbind();
  //  $jsNavigationMenu.removeClass("show");
  //
  //  menuToggle.on('click', function(e) {
  //    e.preventDefault();
  //    $jsNavigationMenu.slideToggle(function(){
  //      if($jsNavigationMenu.is(':hidden')) {
  //        $jsNavigationMenu.removeAttr('style');
  //      }
  //    });
  //  });
  //});




  // http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/

  $(function() {
    var nonMenuAreas = $('#main-wrapper, footer'),
        body         = $('body'),
        //pin          = $('#navigation-menu-pin'),
        button       = $('#navigation-menu-btn'),
        //menu         = $('#navigation-menu'),
        className    = 'navigation-menu-open';

    //TODO re-enable transitions in css
    //nonMenuAreas.addClass('standard-transitions');
    //menu.addClass('standard-transitions');

    var menuToggle = function() {
      if (body.hasClass('navigation-menu-open')) {
        body.removeClass(className);
        nonMenuAreas.off('click', menuToggle);
      }
      else {
        body.addClass(className);
        nonMenuAreas.one('click', menuToggle);

      }
    };

    button.click(menuToggle);

    //menu.on("transitionend webkitTransitionEnd", function() {
    //  if( !menu.hasClass('open') ) {
    //    button.removeClass('open');
    //  }
    //});

  });



});


