window.addEventListener("load",()=>{
    let body = document.querySelector("body");
    let wrapper =document.querySelector(".wrapper");
    let header = document.querySelector("#header");
    let page1 = document.querySelector("#page1");
    let page2 = document.querySelector("#page2");
    let page3 = document.querySelector("#page3");
    let page4 = document.querySelector("#page4");
    let page5 = document.querySelector("#page5");

    let page = [header,page1,page2,page3,page4,page5];
    let gnb = header.querySelector("#gnb");
    let gnbLi = gnb.firstElementChild.children;
    let topBtn = document.querySelector(".btn_top");
    let menu_zone = header.querySelector(".menu_zone");
    let dim= header.querySelector(".dim");
    let m_gnb= header.querySelector("#m_gnb");
    let m_gnbLi = m_gnb.firstElementChild.children;
    let tabBtn = header.querySelector(".tab");
    let offsetY=0;
    let pageN =0;
    let w;
    let winHalf;
    let path=0;
    let categoryFlag=false;

    function initEvent(){
        classAdd();
        resizeFn();
        gnbLi[pageN].firstElementChild.classList.add("active");
    }
    function resizeFn(){
        w=window.innerWidth;
        winHalf=$(window).height()/2;

        if(w > 720){
            if(m_gnb.classList.contains("active")){
                $("#header .dim").trigger("click");
                dimControl();
            };
        }
    }
    function classAdd(){
        if(categoryFlag){
            return;
        }
        else{
            if(pageN==0){
                header.classList.add("active");
            }
            else{
                page[pageN].classList.add("active");

                if(pageN==5){
                    categoryFlag = true;
                }
            }
        }
    }
    function dimControl(){
        body.classList.remove("fixed");
        m_gnb.classList.remove("active");
        tabBtn.classList.remove("active");
        dim.classList.remove("active");
    }

    initEvent();
   
    $(window).scroll(function(){
        timer = setTimeout(()=>{
            clearTimeout(timer);
            offsetY=window.scrollY;

            // Activating each pages when page down
            if(offsetY < page[1].offsetTop-winHalf){
                pageN=0;
            }
            else if(offsetY < page[2].offsetTop-winHalf){
                pageN=1;
            }
            else if(offsetY < page[3].offsetTop-winHalf-winHalf){
                pageN=2;
            }
            else if(offsetY < page[4].offsetTop-winHalf-winHalf){
                pageN=3;
            }
            else if(offsetY < page[5].offsetTop-winHalf-winHalf){
                pageN=4;
            }
            else{
                pageN=5;
            }
           
            // Activating top btn and menu zone when page down
            if(offsetY>70){
                topBtn.classList.add("active");
                menu_zone.classList.add("fixed");
            } else{
                topBtn.classList.remove("active");
                menu_zone.classList.remove("fixed");
            }
    
            // Adding class on gnb
           for(let i=0; i<gnbLi.length; i++){

               if(i === pageN){
                   gnbLi[i].firstElementChild.classList.add("active");
               }
               else {
                   gnbLi[i].firstElementChild.classList.remove("active");
               }
           }
    
            // Adding class to each section
            classAdd();
           
        },100)
    });

    window.addEventListener("resize",resizeFn);
  
    for(let i=0; i<gnbLi.length; i++){
        gnbLi[i].index=m_gnbLi[i].index=i;

        gnbLi[i].addEventListener("click",e=>{
            e.preventDefault();
            pageN= e.currentTarget.index;
            path = page[pageN].offsetTop;
            window.scrollTo({
                top:path,
                behavior:"smooth"
            })
       })
       m_gnbLi[i].addEventListener("click", e=>{
            e.preventDefault();
            pageN= e.currentTarget.index;
            path = page[pageN].offsetTop;
            m_gnb.classList.remove("active");
            body.classList.remove("fixed");
            tabBtn.classList.remove("active");
            dim.classList.remove("active");
            window.scrollTo({
                top:path,
                behavior:"smooth"
            })
       })
    }

    tabBtn.addEventListener("click",e=>{
        e.preventDefault();
        body.classList.toggle("fixed");
        m_gnb.classList.toggle("active");
        tabBtn.classList.toggle("active");
        dim.classList.toggle("active");
    })

    dim.addEventListener("click",()=>{
        dimControl();
    })

    topBtn.addEventListener("click",e=>{
        e.preventDefault();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    })
})
   