(function($){ 
    $(document).ready(function(){
        trigger_resizable(true);
        switch_mode(); 
        stickFooter();
        if(isPC()){ 
            initTooltips(); 
        } else { 
            initTooltips('.qr-img[data-bs-toggle="tooltip"]'); 
        }
        intoSlider();
    });

    let wid = 0;
    $(window).resize(function() {
		clearTimeout(wid);
        wid = setTimeout(go_resize, 200); 
    });

    function go_resize() {
        stickFooter(); 
        trigger_resizable();
    }

    $(document).on('click', "a[target!='_blank']", function() {
        if ($('.sidebar').hasClass('show')) {
            $('.sidebar').modal('hide');
        }
    });

    $(document).on('click', '.switch-dark-mode', function(event) {
		event.preventDefault();
        
        const isDark = $('body').hasClass('io-black-mode');
        const newClass = isDark ? 'io-grey-mode' : 'io-black-mode';
        
        $('body').removeClass('io-black-mode io-grey-mode').addClass(newClass);
        localStorage.setItem('io-theme-mode', newClass);
        switch_mode(); 
        $("#"+ $('.switch-dark-mode').attr('aria-describedby')).remove();
    });

    function switch_mode(){
        const savedMode = localStorage.getItem('io-theme-mode');
        
        // 如果没有保存的主题设置，检查系统深色模式偏好
        if (!savedMode || savedMode === '') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                $('body').removeClass('io-black-mode io-grey-mode').addClass('io-black-mode');
            } else {
                $('body').removeClass('io-black-mode io-grey-mode').addClass('io-grey-mode');
            }
        } else {
            $('body').removeClass('io-black-mode io-grey-mode').addClass(savedMode);
        }
        
        if($('body').hasClass('io-black-mode')){
            if($(".switch-dark-mode").attr("data-bs-original-title"))
                $(".switch-dark-mode").attr("data-bs-original-title","日间模式");
            else
                $(".switch-dark-mode").attr("title","日间模式");
            $(".mode-ico").removeClass("icon-night");
            $(".mode-ico").addClass("icon-light");
        }
        else{
            if($(".switch-dark-mode").attr("data-bs-original-title"))
                $(".switch-dark-mode").attr("data-bs-original-title","夜间模式");
            else
                $(".switch-dark-mode").attr("title","夜间模式");
            $(".mode-ico").removeClass("icon-light");
            $(".mode-ico").addClass("icon-night");
        }
    }

    // 监听系统主题变化
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // 只有在用户没有手动设置主题时才自动切换
            if (!localStorage.getItem('io-theme-mode')) {
                if (e.matches) {
                    $('body').removeClass('io-grey-mode').addClass('io-black-mode');
                } else {
                    $('body').removeClass('io-black-mode').addClass('io-grey-mode');
                }
                switch_mode();
            }
        });
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('.go-up').fadeIn(200);
        } else {
            $('.go-up').fadeOut(200);
        }
    });

    $('.go-up').click(function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return false;
    }); 

    $('.slider_menu').children("ul").children("li").not(".anchor").hover(function() {
        $(this).addClass("hover");
        toTarget($(this).parent());
    }, function() {
        $(this).removeClass("hover");
    });

    $('.slider_menu').mouseleave(function(e) {
        const menu = $(this).children("ul");
        window.setTimeout(function() { 
            toTarget(menu) 
        }, 50);
    });  

    function intoSlider() {
        $(".slider_menu[sliderTab]").each(function() {
            if(!$(this).hasClass('into')){
                const menu = $(this).children("ul");
                menu.prepend('<li class="anchor" style="position:absolute;width:0;height:28px"></li>');
                const target = menu.find('.active').parent();
                if(0 < target.length){
                    menu.children(".anchor").css({
                        left: target.position().left + target.scrollLeft() + "px",
                        width: target.outerWidth() + "px",
                        height: target.height() + "px",
                        opacity: "1"
                    });
                }
                $(this).addClass('into');
            }
        });
    }

    function stickFooter() {
        requestAnimationFrame(() => {
            $('.main-footer').attr('style', '');
            if($('.main-footer').hasClass('text-xs')){
                const win_height = jQuery(window).height();
                const footer_height = $('.main-footer').outerHeight(true);
                const main_content_height = $('.main-footer').position().top + footer_height;
                const currentMarginTop = parseInt($('.main-footer').css('marginTop'), 10);
                if(win_height > main_content_height - currentMarginTop){
                    $('.main-footer').css({
                        marginTop: win_height - main_content_height
                    });
                }
            }
        });
    }

    $('.sidebar-switch').on('click',function(){
        $('.sidebar').removeClass('mini-sidebar');
    }); 

    let isMin = false,
        isMobileMin = false;

    function trigger_resizable(isNoAnim=false) {
        if(!isMin && 767.98<$(window).width() && $(window).width()<1024){
            $('.mini-button').prop('checked', false);
            trigger_lsm_mini(isNoAnim);
            isMin = true;
            if(isMobileMin){
                $('.sidebar').addClass('mini-sidebar');
                isMobileMin = false;
            }
        }
        else if((isMin && $(window).width()>=1024) || (isMobileMin && !isMin && $(window).width()>=1024)){
            $('.mini-button').prop('checked', true);
            trigger_lsm_mini(isNoAnim);
            isMin = false;
            if(isMobileMin){
                isMobileMin = false;
            }
        }
        else if($(window).width() < 767.98 && $('.sidebar').hasClass('mini-sidebar')){
            $('.sidebar').removeClass('mini-sidebar');
            isMobileMin = true;
            isMin = false;
        }
    }

    $(document).on('click', '.sidebar-menu-inner a', function(){
        if (!$('.sidebar-nav').hasClass('mini-sidebar')) {
            $(this).parent("li").siblings("li.sidebar-item").children('ul').slideUp(200);
            if ($(this).next().css('display') == "none") {
                $(this).next('ul').slideDown(200);
                $(this).parent('li').addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
            } else {
                $(this).next('ul').slideUp(200);
                $(this).parent('li').removeClass('sidebar-show');
            }
        }
    });

    $('.mini-button').on('click',function(){
        trigger_lsm_mini();
    });

    function trigger_lsm_mini(isNoAnim = false){
        if ($('.header-mini-btn input[type="checkbox"]').prop("checked")) {
            $('.sidebar-nav').removeClass('mini-sidebar');
            $('.sidebar-menu ul ul').css("display", "none");
            if(isNoAnim)
                $('.sidebar-nav').width(220);
            else
                $('.sidebar-nav').stop().animate({width: 220},200);
        } else {
            $('.sidebar-item.sidebar-show').removeClass('sidebar-show');
            $('.sidebar-menu ul').removeAttr('style');
            $('.sidebar-nav').addClass('mini-sidebar');
            if(isNoAnim)
                $('.sidebar-nav').width(60);
            else
                $('.sidebar-nav').stop().animate({width : 60},200);
        }
    }

    $(document).on('mouseover','.mini-sidebar .sidebar-menu ul:first>li,.mini-sidebar .flex-bottom ul:first>li',function(){
        let offset = 2;
        if($(this).parents('.flex-bottom').length!=0)
            offset = -3;
        $(".sidebar-popup.second").length == 0 && ($("body").append("<div class='second sidebar-popup sidebar-menu-inner text-sm'><div></div></div>"));
        $(".sidebar-popup.second>div").html($(this).html());
        $(".sidebar-popup.second").show();
        let top = $(this).offset().top - $(window).scrollTop() + offset; 
        const popupHeight = $(".sidebar-popup.second>div").height();
        const windowHeight = $(window).height();
        if(windowHeight - top <= 0 ){
            top = windowHeight - popupHeight - 8;
        }
        $(".sidebar-popup.second").stop().animate({"top":top}, 50);
    });

    $(document).on('mouseleave','.mini-sidebar .sidebar-menu ul:first, .mini-sidebar .slimScrollBar,.second.sidebar-popup',function(){
        $(".sidebar-popup.second").hide();
    });

    $(document).on('mouseover','.mini-sidebar .slimScrollBar,.second.sidebar-popup',function(){
        $(".sidebar-popup.second").show();
    });
})(jQuery);

function isPC() {
    const u = navigator.userAgent;
    const Agents = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    return !Agents.some(agent => u.indexOf(agent) > 0);
}

function showAlert(data) {
    let title, alertType, ico;
    switch(data.status) {
        case 1: 
            title = '成功';
            alertType = 'success';
            ico = 'icon-adopt';
            break;
        case 2: 
            title = '信息';
            alertType = 'info';
            ico = 'icon-tishi';
            break;
        case 3: 
            title = '警告';
            alertType = 'warning';
            ico = 'icon-warning';
            break;
        case 4: 
            title = '错误';
            alertType = 'danger';
            ico = 'icon-close-circle';
            break;
        default:
            return;
    }
    const msg = data.msg || '';
    if(!$('.alert-placeholder').hasClass('text-sm')){
        $('body').append('<div class="alert-placeholder text-sm" style="position: fixed;bottom: 10px;right: 10px;z-index: 1000;text-align: right;text-align: -webkit-right"></div>');
    }
    const $html = $(`
        <div class="alert-body" style="display:none;">
            <div class="alert alert-${alertType} text-lg pr-4 pr-md-5" style="text-align:initial">
                <i class="iconfont ${ico} icon-lg" style="vertical-align: middle;margin-right: 10px"></i>
                <span style="vertical-align:middle">${title}</span>
                <br>
                <span class="text-md" style="margin-left:30px;vertical-align:middle">${msg}</span>
            </div>
        </div>
    `);
    $('.alert-placeholder').append($html);
    $html.show(200).delay(3500).hide(300, () => $(this).remove()); 
} 

function toTarget(menu, padding = true, isMult = true) {
    const slider = menu.children(".anchor");
    let target = menu.children(".hover").first();
    if (!target || target.length === 0) {
        if (isMult) {
            target = menu.find('.active').parent();
        } else {
            target = menu.find('.active');
        }
    }
    if (target && target.length > 0) {
        const posLeft = target.position().left + target.scrollLeft();
        const outerWidth = target.outerWidth();
        if (padding) {
            slider.css({
                left: posLeft + "px",
                width: outerWidth + "px",
                opacity: "1"
            });
        } else {
            slider.css({
                left: posLeft + (outerWidth / 4) + "px",
                width: outerWidth / 2 + "px",
                opacity: "1"
            });
        }
    } else {
        slider.css({
            opacity: "0"
        });
    }
}

function initTooltips(selector) {
    selector = selector || '[data-bs-toggle="tooltip"]';
    const tooltipTriggerList = [].slice.call(document.querySelectorAll(selector));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl, { trigger: 'hover' });
    });
}

$(document).on('click', 'a.smooth-n', function(ev) {
    ev.preventDefault();
    const href = $(this).attr('href');
    const target = document.querySelector(href);
    if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
});
