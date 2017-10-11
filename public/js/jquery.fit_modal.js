/*************************
Jquery easy_ajaxTabs plugin
Version: 1.1.0,
Developer: Philipp Zhulev,
License: MIT License (MIT),
Release date: 18.08.2017
**************************/

(function($){
  jQuery.fn.easy_ajaxTabs = function(options){

    /* plugin default options */
    options = $.extend({
        frame   : ".ajax-container",   //container for output
        type    : "GET",               //post methot
        data    : null,                //pass in request
        success : null,                //function when the query is executed
        error   : null,                //function on request error
        async   : true,                //asynchronous request?
        before  : null,                //before running the query
        animate : 300,                 //animation appearance speed
        preload : true                 //download content when the page load
    }, options);

    /* plugin body */
    var include = function(){

        /* Primary variables */
        var $this = $(this);
        var tab_btn = $this.find('a');

        var _data = [];

        if(options.data != null) {
             _data = options.data;
        }

        var $frame = $(options.frame);

        /*Content download function*/
        function load_frame (url, trigger) {
            $frame.load(url, function(content){
                if(content) { 
                  $this.trigger(trigger);
                }
            });
            return url
        }

        /*Activation when click*/
        tab_btn.on('click on.tabActive', function(){

                var this_btn = $(this);

                /*Activation and deactivation of element in menu*/
                tab_btn.parent().removeClass('active')
                this_btn.parent().addClass('active');

                /*Take url*/
                var this_attr = this_btn.attr('href');

                /*Ajax request*/
                $.ajax({
                  url: this_attr,
                  type: options.type,
                  data : _data,
                  async : options.async,
                  beforeSend : function () {
                      if(options.before != null) {
                          options.before();
                          $this.trigger('on.beforeReady'); //event
                      }
                  },
                  success : function() {

                      /*load and animation of content*/
                      $frame.animate({
                          opacity : 0
                      }, {
                          duration : options.animate,
                          queue : false,
                          complete : function () {

                              load_frame (this_attr, 'on.requestReturned'); //event

                              $frame.animate({opacity : 1}, options.animate);
                          }
                      });

                      /*Function when the query is executed*/
                      if(options.success != null) {
                         options.success();
                      }

                  },
                  error : function() {

                      /*function on request error*/
                      if(options.error != null) {
                         options.error();
                      }
                      $this.trigger('on.requestError'); //event
                  }
                });

                return false
            });

        /*Preload function*/
        if(options.preload == true) {
            load_frame ($this.find('.active').children().attr('href'), 'on.preloadReady'); //event
        }

    };

    return this.each(include);

  };
})(jQuery);
