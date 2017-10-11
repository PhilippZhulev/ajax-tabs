## Jquery.easy_ajaxTabs

**DEMO:** https://philippzhulev.github.io/ajax-tabs/public/

**description:**

Tabs for website or a web application with the ajax download function.

### Get started

**To plug**
```html
<link href="css/jquery.easy-ajax-tabs.css" rel="stylesheet">
<script src="js/jquery.easy-ajax-tabs.js"></script>
```

in the folder css it is desirable to put **ajax-tab__preloader.gif**


**Init**
```html
<!--navigation-->
<ul class="tabs_menu">
    <li><a href="test1.html">content-1</a></li>
    <li><a href="test2.html">content-2</a></li>
    <li><a href="test3.html">content-3</a></li>
    <li><a href="test4.html">content-4</a></li>
</ul>

<!--content-->
<div class="ajax-container"></div>

<!--script-->
<script>
    $(window).ready(function () {
        $('.tabs_menu').easy_ajaxTabs();
    });
</script>
```

### Options

```html
<script>
    $(window).ready(function () {
        $('.tabs_menu').easy_ajaxTabs({
            preload : true,
            frame   : ".ajax-container"
        });
    });
</script>
```

**all options**

Name                  | Default                          | Description
----------------------|----------------------------------|----------------------------
frame                 | ".ajax-container"                | container for output
type                  | 'GET'                            | post method
data                  | null                             | pass in request
success               | null                             | function when the query is executed
error                 | null                             | function on request error
async                 | false                            | asynchronous request? 
before                | null                             | before running the query 
animate               | 300                              | animation appearance speed 
preload               | false                            | download content when the page load 
pre_loader            | null                             | preloader 
pre_loader_wrap       | null                             | preloader wrapper 

### Events

+ eat.onActive - When the menu item is activated
+ eat.beforeReady - Before request
+ eat.requestReturned - If the request is successful
+ eat.requestError - The request failed
+ eat.preloadReady - At primary loading (preload : true)

**Event and user function**
```html
<script>
    $(window).ready(function () {
        var $frame;

        var tabs = $('.tabs_menu').easy_ajaxTabs({
            preload: true,
            success : function () {
                $frame = $(this.frame);
            }
        });

        tabs.on('eat.requestReturned', function() {
            $frame.append('<b>Download content ready!</b>');
        });
    });
</script>
```
**Reverse event**
 ```html
 <div class="tab_test">
     <button class="active" data-href="test1.html">test1</button>
     <button data-href="test2.html">test2</button>
 </div>
 
 <div class="ajax-container"></div>
 
 <script>
     $(window).ready(function () {
 
        var userTabs = $('.tab_test').easy_ajaxTabs({
            preload: true
        });

        userTabs.children().hover(function () {
            $(this).trigger('on.tabActive');
        });
        
     });
 </script>
 ```
+ on.tabActive - When activated tab

## Build

```html

__dist     -->  Plug-in files
__dist_src -->  Plug-in sources
__public   -->  Demo page files
______Css           -->  Styles  (minify)
______fonts         -->  Fonts     
______Js            -->  javaScript (minify)
______img           -->  Images
__src      --> Demo page sources
______components    -->  Components
______js            -->  javaScript (not minify)
______css           -->  css (not minify)
______nib           -->  Functions for stylus
______plugins       -->  Plu-ins

```


### Лицензия

© Philipp Zhulev [MIT License](LICENSE).