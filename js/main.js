$(function(){
    var offsetY=0;
    var n =0;
    var w;
    var winHalf;
    var path=0;
    var categoryFlag=false;

    $("#gnb li").eq(n).find("a").addClass("active");
    // scroll event
    
    $(window).scroll(function(){
        offsetY = $(window).scrollTop();

		// Activating each pages when page down
        if(offsetY < $("#page1").offset().top-winHalf){
            n=0;
        }
        else if(offsetY < $("#page2").offset().top-winHalf){
            n=1;
        }
        else if(offsetY < $("#page3").offset().top-winHalf){
			n=2;
		}
		else if(offsetY < $("#page4").offset().top-winHalf){
			n=3;
		}
		else if(offsetY < $("#page5").offset().top-winHalf){
			n=4;
		}
		else{
			n=5;
		}

		// Activating top btn and menu zone when page down
        if(offsetY>70){
            $(".btn_top").addClass("active");
            $("#header .menu_zone").addClass("fixed");
        } else{
            $(".btn_top").removeClass("active");
            $("#header .menu_zone").removeClass("fixed");
        }

		// Adding class on gnb
        $("#gnb li a").removeClass("active");
		$("#gnb li").eq(n).find("a").addClass("active");
        
		// Adding class to each section
        if(categoryFlag){
            return;
        }
        else{
            if(n==0){
                $("#header").addClass("active");
            }
            else{
                $("#page"+n).addClass("active");

                if(n==5){
                    categoryFlag = true;
                }
            }
        }

    });

    // resize event
    $(window).resize(function(){
        w=window.innerWidth;
		winHalf=$(window).height()/2;

        if(w > 720){
            if($("#m_gnb").hasClass("active")){
                $("#header .dim").trigger("click");
            };
        }
		$(window).trigger("scroll"); 
    });
    $(window).trigger("resize");



    $("#header .tab").click(function(e){
        e.preventDefault();
		$("body").toggleClass("fixed");
        $("#m_gnb").toggleClass("active");
        $("#header .tab").toggleClass("active");
        $("#header .dim").toggleClass("active");
    });

    $("#header .dim").click(function(){
		$("body").removeClass("fixed");
        $("#m_gnb").removeClass("active");
        $("#header .tab").removeClass("active");
        $("#header .dim").removeClass("active");
        console.log("dim event");
        
    });


    $("#gnb li").click(function(e){
        e.preventDefault();
        path=$(this).find("a").attr("href");
		$("html").animate({scrollTop:$(path).offset().top}, 400);
    });
    $("#m_gnb li").click(function(e){
        e.preventDefault();
        path=$(this).find("a").attr("href");
        $("#m_gnb").removeClass("active");
		$("body").removeClass("fixed");
		$("#header .tab").removeClass("active");
		$("#header .dim").removeClass("active");
		$("html").animate({scrollTop:$(path).offset().top}, 400);
    });
    

    $("#footer .btn_top").click(function(e){
        e.preventDefault();
		$("html").animate({scrollTop:0}, 400);
    });



    // var windowW;
    // $(window).resize(function(){
    //     windowW=$(window).width();
    //     if(windowW >= 720){
	// 		$("body").removeClass("fixed");
    //         $("#m_gnb").removeClass("active");
    //         $("#header .tab").removeClass("active");
    //         $("#header .dim").removeClass("active");
    //     }
    // }) 
   
});