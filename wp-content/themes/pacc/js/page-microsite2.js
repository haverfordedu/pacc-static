/**
 * File page-microsite2.js
 *
 * adds microsite 2 tempalte specific js
 *
 *
 */


(function($) {
      var stickySidebar = $('#sidebar .sticky-nav');

      if (stickySidebar.length > 0) { 
        var stickyHeight = stickySidebar.height(),
            sidebarTop = stickySidebar.offset().top + 100;
      }

      // on scroll move the sidebar
      $(window).scroll(function () {
        if (stickySidebar.length > 0) { 
          var scrollTop = $(window).scrollTop();
          var footerHeight = $('#footer').height();
              contentHeight = $('#page').height();

          if (sidebarTop < scrollTop && stickyHeight < contentHeight) {
            stickySidebar.css('top', scrollTop - sidebarTop).addClass('sticky-active');

            // stop the sticky sidebar at the footer to avoid overlapping
            var sidebarBottom = stickySidebar.offset().top + stickyHeight,
                stickyStop = $('#sidebar .sticky-nav').offset().top + $('.sticky-nav').height() + footerHeight;
            if (stickyStop < sidebarBottom ) {
              var stopPosition = $('#sidebar .sticky-nav').height() - stickyHeight ;
              stickySidebar.css('top', stopPosition).removeClass('sticky-active');
            }
          }
          else {
            stickySidebar.css('top', '0').removeClass('sticky-active');
          } 
        }
      });

      $(window).resize(function () {
        if (stickySidebar.length > 0) { 
          stickyHeight = stickySidebar.height();
        }
      });
    })( jQuery );


    /*********************
     * 
     *  Waypoints
     * 
     */

    (function($) {
        var waypoints = $('.et_pb_section');
        waypoints.waypoint(function(direction) {
            if (direction === 'down') {
             //   var DOMElement = $(this.element);
                var id = $(this.element).attr('id');
                var active_section = jQuery('div[data-magellan-destination="' + id + '"]');
                active_section.addClass('active');
                active_section.siblings().removeClass('active');
                var active_link = jQuery('.sub-nav dd[data-sticky-arrival="' + id + '"]');
                active_link.addClass('active');
                active_link.siblings().removeClass('active');
                    if(active_section.hasClass('color-background-black')){
                        active_link.parent().addClass('color-background-menu');
                    } else {
                        active_link.parent().removeClass('color-background-menu');
                    }
                }
            },{
            offset: 25
          });
          waypoints.waypoint(function(direction) {
            if (direction === 'up') {
               // var DOMElement = $(this.element);
                var id = $(this.element).attr('id');
                var active_section = jQuery('div[data-magellan-destination="' + id + '"]');
                active_section.addClass('active');
                active_section.siblings().removeClass('active');
                var active_link = jQuery('.sub-nav dd[data-sticky-arrival="' + id + '"]');
                active_link.addClass('active');
                active_link.siblings().removeClass('active');
                    if(active_section.hasClass('color-background-black')){
                        active_link.parent().addClass('color-background-menu');
                    } else {
                        active_link.parent().removeClass('color-background-menu');
                    }
                }
            },{
            offset:  function() {
                return -this.element.clientHeight
              }
          });
    })( jQuery );

 /*********************
     * 
     *  Mobile Nav tricks
     * 
     */
    (function($) {
     //active class for menu when using hamburger
		$('#menuToggle').click( function() {
            $('.sticky-nav').toggleClass('active')
        });
    })( jQuery );

 /*****************
  *    PACC header insert
  *
  */
  (function($) {
    $('#pacc-header h4').append(' <span>PACC</span>');  
    })( jQuery );

 /*****************
  *    PACC header insert
  *
  */
  (function($) {
    $('.event-toggle-close').click( function() {
        $(this).parent('.et_pb_toggle_content').slideToggle( 700 );
        $(this).parents('.event-toggle').toggleClass('et_pb_toggle_open').toggleClass('et_pb_toggle_close');
    });  
            $('.event-toggle-link').click( function() {
	        e.preventDefault();
        $(this).parent('.et_pb_toggle_content').slideToggle( 700 );
        $(this).parents('.event-toggle').toggleClass('et_pb_toggle_open').toggleClass('et_pb_toggle_close');
    });  
})( jQuery );



/*****************
  *    Slide show counter
  *
  */


  (function($) {
        function updateSlideCount() {
            var slideActive = $('#top-slider .et-pb-active-slide');
            var slideActiveIndex = $('#top-slider .et_pb_slide').index(slideActive)+1;
            var slideCountJS = document.getElementsByClassName("et_pb_slide");
           $('#pacc-slide-counter .et_pb_text_inner').html('<p>' + slideActiveIndex + '/' + slideCountJS.length + '</p>'); 

/*            var slideImage = document.getElementsByClassName('et_pb_slide_image');
           var slidesHeight = slideImage[0].clientHeight/2;
           var arrowTopPos = -(slidesHeight + 72);
           var prevArrow = document.getElementsByClassName('et-pb-arrow-prev');
           console.log('Slide Image' + slideImage);
           console.log('Prev Arrow ' + prevArrow);
           console.log('SLIDE HEIGHT ' + slidesHeight);
           console.log('top pos ' + arrowTopPos);
               //change the top position based on this
               prevArrow[0].style.height = arrowTopPos; */
        }


        $(document).ready(function() {
            updateSlideCount();
        });

        //Add observer because of event bound to slider controls with no callback - nice job Divi
        // select the target node
            var target = document.getElementById('top-slider');

        // create an observer instance
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                updateSlideCount();
                });    
            });

        // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true };

        // pass in the target node, as well as the observer options
            observer.observe(target, config);
})( jQuery );

 /*********************
     * 
     *  Slide background setups
     * 
     */
    (function($) {
        //get all the slides
        var slides = $('#top-slider .et_pb_slide');
        //loop through and if it has a background image, clone that to a internal div.
        $.each(slides, function(index, item) {
            var bg = $(this).css('background-image');
            if(bg != 'none'){
                var $newdiv = $('<div class="bg-filtered"></div>');
                $newdiv.css('background-image',bg);
                $(this).prepend($newdiv);
                $(this).css('background-image','');
            }
        });

       })( jQuery );

 /*********************
     * 
     *  Image move in DOM
     * 
     */
    (function($) {
        //get all the slides with images
        var slides = $('#top-slider .et_pb_slide_image');
                //loop through - clone that to a new div.
                $.each(slides, function(index, item) {
                    $(this).css('margin-top', '');
                    var insertpoint = $(this).parent().find('.et_pb_slide_title');
                    $(this).insertAfter(insertpoint);                    
                });
        })( jQuery );

/*********************
 * 
 *  Image move in DOM
 * 
 */
    (function($) {
        
            
            /*         $('#top-slider .et-pb-arrow-prev').attr('style',"top");
                    $('#top-slider .et-pb-arrow-prev').css('top',arrowTopPos); */
            
        })( jQuery );

 /*****************
  *    PACC footer insrt
  *
  */
  (function($) {
      var path = window.location.pathname;
      var links = $('#project-list a');
      //loop through - remove one that matches the path
      $.each(links, function(index, item) {
            if($(this).attr("href") == path) {
                $(this).parent().remove();
                //add in the PACC link 
                $('#project-list').prepend('<li class="pacc"><a title="Philadelphia Area Creative Collaboratives" href="/">PACC</a></li>');  
            }
       });


    })( jQuery );

 /*****************
  *    Arrow offset calculation
  *
  */

(function($) {
        function arrowPostions (slideImage) {
            var arrowTopPos = -(slideImage +48); //negative distance of slideimage/2 + 48 (height of arrow)
                //change the top position based on this
                var newStyle = "<style type=\"text/css\" media=\"screen\">.et-pb-arrow-prev, .et-pb-arrow-next  {top: " + arrowTopPos + "px !important;}</style>";
                $('head').append(newStyle); 
        }

        $(window).load(function() {
            var slideImage = $('#top-slider .et-pb-active-slide img').height()/2;
            arrowPostions(slideImage);
        }); 
        $(window).on('resize',function() {
            clearTimeout(window.resizedFinished);
            var slideImage = $('#top-slider .et-pb-active-slide img').height()/2;
            window.resizedFinished = setTimeout(arrowPostions(slideImage), 250);
        });

})( jQuery );


 /*****************
  *    Accordion creation for collaborators
  *
  */

(function($) {
    var tabHeaders = $('#collaborators .et_pb_tabs_controls li');
    var tabContent = $('#collaborators .et_pb_all_tabs .et_pb_tab');
    var tA = [];
    $.each(tabHeaders, function(index, item) {
        var tabStuff = [];
        var tabHeaderLoop = $(this).text();
        var tabClass2id = $(this).attr("class");
        tabStuff.push(tabHeaderLoop, tabClass2id);
        tA.push(tabStuff);
    });
    var i = 0;
    $.each(tabContent, function(index, item) {
        var tabContentGuts = $(this).html();
        tA[i].push(tabContentGuts);
        i++;
    });
    var $newAccord = $('<ul id="collaborators-accordion" class="accordion show-for-small-only" data-accordion></ul>');
    $.each(tA, function(index, item) {
        var tab = $(this);
        var id = tab[1];
        var ids = id.split(" ");
        var li = $('<li class="accordion-navigation"><a href="#' + ids[0] + '">' + tab[0] + "</a><div class='content' id='" + ids[0] + "'>" + tab[2] + '</li>');
        $newAccord.append(li);

    });

    $('#collaborators').append($newAccord);

    $('#collaborators-accordion a').click(function(){
        ('#collaborators-accordion a').toggleClass('active');
    });

})( jQuery );