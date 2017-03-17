$(function() {
    
    if ($('html').hasClass('handheld')) {
        var animate_intro = function() {
            var intro_interval = setInterval(function() {
                var elm = $('#intro_section .bg-container > div:first');
                var next_elm = elm.next();
                next_elm.addClass('active');
                if (next_elm.hasClass('slower')) {
                    clearInterval(intro_interval);
                    setTimeout(function() {
                        elm.removeClass('active');
                        setTimeout(function() {
                            next_elm.end().appendTo('#intro_section .bg-container');
                            animate_intro();
                        }, 2000);
                    }, 2000);
                } else {
                    setTimeout(function() {
                        elm.removeClass('active');
                        next_elm.end().appendTo('#intro_section .bg-container');
                    }, 2000);
                }
            },  5000);        
        };
        
        animate_intro();
    }
    
    $('#fullpage').fullpage({
        anchors: ['intro', 'about', 'service', 'experts', 'contact'],
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'right',
        navigationTooltips: section_names,
        afterLoad: function(anchorLink, index) {
            animations.destroy_animations();
            if ($.isFunction(animations[anchorLink])) {
                animations[anchorLink]();
            }
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
            animations.slides[anchorLink](slideIndex);
        },
        
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            if ($.isFunction(animations.slides[anchorLink])) {
                animations.slides[anchorLink](slideIndex);
            }
        }
    });
    
    var experts_fotorama = $("#experts_fotorama").fotorama();
    var experts_fotorama = experts_fotorama.data('fotorama');
    
    $("#experts_fotorama").on("fotorama:ready fotorama:show", function(e, fotorama, extra) {
        var frame = fotorama.activeFrame.i;
        $(".slides-images .image-container.visible").removeClass('visible');
        $('.slides-images .image-container[data-for="' + frame + '"]').addClass('visible');
    });
    
    var resize_fotorama = function(fotorama) {
        var window_height = $(window).height();
        if (window_height > 900) {
            fotorama.resize({
                height: 533
            });            
        }
        if (window_height <= 900) {
            fotorama.resize({
                height: 513
            });
        } 
        if (window_height <= 800) {
            fotorama.resize({
                height: 458
            });            
        }
    };
    
    resize_fotorama(experts_fotorama);
    
    $(window).on("resize", function() {
        resize_fotorama(experts_fotorama);
    });
    
    $(document).on("click", ".fotorama-next, .fotorama-prev", function(e) {
        e.preventDefault();
        var elm = $(this);
        var direction = '>';
        if (elm.hasClass('fotorama-prev')) {
            direction = '<';
        }
        experts_fotorama.show(direction);
    });
    
    $(document).on("click", ".slide-to", function(e) {
        e.preventDefault();
        $.fn.fullpage.moveTo($(this).attr('data-to'), 0);  
    })
    
    var animations = {};
    
    animations.intro = function() {
        if ($("html").hasClass('desktop')) {
            $("#intro_section video").get(0).play();
        }
        $("#intro_section .top-menu").addClass('visible');
        setTimeout(function() {
            $("#intro_section h1").addClass('visible');
            setTimeout(function() {
                $("#intro_section .description").addClass('visible');
            }, 500);
        }, 500);
    };
    
    animations.about = function() {
        $("#about_section .heading.animate").addClass('visible');
        setTimeout(function() {
            $("#about_section .descr.animate").addClass('visible');
        }, 200);
        setTimeout(function() {
            $("#about_section .count-on-table-container").addClass('visible');
        }, 400);
        setTimeout(function() {
            $("#about_section .bottom-descr.animate").addClass('visible');
        }, 600);
    };
    
    animations.service = function() {
        $("#service_section .animate").each(function(i, v) {
            setTimeout(function() {
                $(v).addClass('visible');
            }, i * 200);
        });
        
        setTimeout(function() {
            $("#service_section .how-we-work .item").each(function(i, v) {
                setTimeout(function() {
                    $(v).addClass('visible');
                }, i * 300);
            });            
        }, 600);
    }
    
    animations.experts = function() {
        $("#experts_section #experts_fotorama").addClass('visible');
        setTimeout(function() {
            $("#experts_section .slides-images").addClass('visible');
        }, 500);
        setTimeout(function() {
            $("#experts_section .fotorama-next, #experts_section .fotorama-prev").addClass('visible');
        }, 1000);
    };
    
    animations.contact = function() {
        $("#contact_section .heading.animate").addClass('visible');
        setTimeout(function() {
            $("#contact_section #name_input").addClass('visible');
        }, 300);
        setTimeout(function() {
            $("#contact_section #email_input").addClass('visible');
        }, 400);
        setTimeout(function() {
            $("#contact_section #send_button").addClass('visible');
        }, 500);
        setTimeout(function() {
            $("#contact_section .descr.animate").addClass('visible');
        }, 1000);
        setTimeout(function() {
            $("#contact_section .copyright.animate").addClass('visible');
            $("#contact_section .designer.animate").addClass('visible');
        }, 1800);
    };
    
    animations.destroy_animations = function() {
        $("#service_section .animate").removeClass('visible');
        $("#service_section .how-we-work .item").removeClass('visible');
        $("#intro_section .top-menu").removeClass('visible');
        $("#intro_section h1").removeClass('visible');
        $("#intro_section .description").removeClass('visible');
        $("#about_section .animate").removeClass('visible');
        $("#about_section .count-on-table-container").removeClass('visible');
        $("#contact_section .animate").removeClass('visible');
        if ($("html").hasClass('desktop')) {
            $("#intro_section video").get(0).pause();
        }
        $("#experts_section #experts_fotorama").removeClass('visible');
        $("#experts_section .slides-images").removeClass('visible');
        $("#experts_section .fotorama-next, #experts_section .fotorama-prev").removeClass('visible');
        
    };
    
    animations.slides = {};
    
    $('#intro_section video').coverVid(960, 540);
    
/*
    var check_video_size = function() {
            var vid = $("video");
            var section = $(vid).parents('section').first();
            $(section).height($(window).height());
            var section_height = $(section).height();
            var section_width = $(section).width();
            if ($(vid).height() < $(section).height()) {
                $(vid).css({
                    'width': 'auto',
                    'height': '120%'
                });
            }
            if ($(vid).width() < $(section).width()) {
                $(vid).css({
                    'width': '120%',
                    'height': 'auto'
                });
            }
            // Center the video
            var vid_height = $(vid).height();
            var vid_width = $(vid).width();
            if (vid_height > section_height) {
                var offset = (vid_height - section_height) / 2 * -1;
                $(vid).css({
                    'top': offset + 'px'
                });
            }
            if (vid_width > section_width) {
                var offset = (vid_width - section_width) / 2 * -1;
                $(vid).css({
                    'left': offset + 'px'
                });
            }
        };
    check_video_size();
    $(window).on("resize", check_video_size);
*/
    
    var validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    
    $('.send').hover(function(){
        if ($('#email_input').val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_email);
            $('#email_input').addClass('invalid');
        }
        if ($("#name_input").val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_name);
            $('#name_input').addClass('invalid');            
        }
    }, function(){
		$('.invalid').removeClass('invalid');
		$('.send').removeClass("shake_it_baby");
		$('.send').removeClass("highlighted");
		$('.envelope').fadeIn();
	});
    
	$('.send').click(function(e){
    	e.preventDefault();
		if (!$(this).hasClass('invalid')) {
			$('.send').addClass('sending');
			// wishlist to send
			var name = $("#name_input").val();
			var email = $('#email_input').val();
			var lang = $("#language_input").val() || 'ru';
			
			var ajaxurl = 'mail49de.html?name=' + name + '&email=' + email + '&lang=' + lang;
			$.ajax({
				url: ajaxurl,
				dataType: 'text',
				success: function(data){
					$('.send').addClass('success');
					setTimeout(function() {
						$('.send').removeClass('sending').removeClass('success');
						$('#email_input').val('');
					}, 2000);
				},
			});
		} else {
			$('.send').addClass("highlighted");
			$('.envelope').hide();
			$('.send').addClass("shake_it_baby");
			$('.invalid').addClass("highlighted");
			setTimeout(function(){
				$('input.highlighted').removeClass("highlighted");

			}, 1500)	
		}
	});

});