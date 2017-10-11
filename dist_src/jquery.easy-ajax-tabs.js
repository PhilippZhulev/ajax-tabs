/*************************
Jquery easy_ajaxTabs plugin
Version: 1.16.0,
Developer: Philipp Zhulev,
License: MIT License (MIT),
Release date: 18.08.2017
**************************/

(function($){
  jQuery.fn.easy_ajaxTabs = function(options){

    /* plugin default options */
    options = $.extend({
        frame      : ".ajax-container",   //container for output
        type       : "GET",               //post method
        data       : null,                //pass in request
        success    : null,                //function when the query is executed
        error      : null,                //function on request error
        async      : true,                //asynchronous request?
        before     : null,                //before running the query
        animate    : 300,                 //animation appearance speed
        preload    : true,                //download content when the page load
        pre_loader : true,                //pre_loader
        pre_loader_wrap : document.body   //pre_loader wrapper
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

        //pre_loader
        function get_preLoader(obj) {
            if(options.pre_loader === true) {
                return obj
            }
        }

        get_preLoader($(options.pre_loader_wrap).append('<div class="eat__pre-loader"></div>'));

        var $pre_loader = $('.eat__pre-loader');

        var btn_length =  tab_btn.length;

        if(btn_length < 1) {
            tab_btn = $this.find('[data-href]');
        }

        console.log(tab_btn)

        /*Activation when click*/
        tab_btn.on('click on.tabActive', function(){

                var this_btn = $(this);

                /*Activation and deactivation of element in menu*/
                tab_btn.parent().removeClass('active');
                this_btn.parent().addClass('active');

                /*Take url*/
                var this_attr = this_btn.attr('href');

                if(btn_length < 1) {
                    this_attr = this_btn.attr('data-href');
                }

                $this.trigger('eat.onActive'); //event

                /*Ajax request*/
                $.ajax({
                  url: this_attr,
                  type: options.type,
                  data : _data,
                  async : options.async,
                  beforeSend : function () {
                      if(options.before != null) {
                          options.before($this, this_btn);
                          $this.trigger('eat.beforeReady'); //event
                      }

                      //on pre_loader
                      get_preLoader($pre_loader.show());
                  },
                  success : function() {

                      //off pre_loader
                      get_preLoader($pre_loader.hide());

                      /*load and animation of content*/
                      $frame.animate({
                          opacity : 0
                      }, {
                          duration : options.animate,
                          queue : false,
                          complete : function () {

                              load_frame (this_attr, 'eat.requestReturned'); //event

                              $frame.animate({opacity : 1}, options.animate);
                          }
                      });

                      /*Function when the query is executed*/
                      if(options.success != null) {
                         options.success($this, this_btn);
                      }

                  },
                  error : function() {

                      /*function on request error*/
                      if(options.error != null) {
                         options.error($this, this_btn);
                      }
                      $this.trigger('eat.requestError'); //event
                  }
                });

                return false
            });

        /*Preload function*/
        if(options.preload == true) {
            load_frame ($this.find('.active').children().attr('href'), 'eat.preloadReady'); //event
            if(btn_length < 1) {
                load_frame ($this.find('.active').attr('data-href'), 'eat.preloadReady');
            }
        }

    };

    return this.each(include);

  };
})(jQuery);
