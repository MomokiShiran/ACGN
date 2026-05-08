(function($){ 
    $(document).ready(function(){
        trigger_resizable(true);
        switch_mode(); 
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

    const go_resize = () => {
        trigger_resizable();
    }

    $(document).on('click', "a[target!='_blank']", function() {
        if ($('.sidebar').hasClass('show')) {
            $('.sidebar').modal('hide');
        }
    });

    $(document).on('click', '.switch-dark-mode', (event) => {
		event.preventDefault();
        
        const isDark = $('body').hasClass('io-black-mode');
        const newClass = isDark ? 'io-grey-mode' : 'io-black-mode';
        
        localStorage.setItem('io-theme-mode', newClass);
        switch_mode(); 
        $("#"+ $('.switch-dark-mode').attr('aria-describedby')).remove();
    });

    const switch_mode = () => {
        const savedMode = localStorage.getItem('io-theme-mode');
        let mode = savedMode;
        
        if (!mode) {
            mode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'io-black-mode' : 'io-grey-mode';
        }
        
        $('body').removeClass('io-black-mode io-grey-mode').addClass(mode);
        
        const isDark = mode === 'io-black-mode';
        const title = isDark ? '日间模式' : '夜间模式';
        const $switch = $('.switch-dark-mode');
        const attrName = $switch.attr('data-bs-original-title') ? 'data-bs-original-title' : 'title';
        $switch.attr(attrName, title);
        
        $('.mode-ico').removeClass(isDark ? 'icon-night' : 'icon-light').addClass(isDark ? 'icon-light' : 'icon-night');
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

    $('.go-up').click( () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return false;
    }); 

    $('.slider_menu').children("ul").children("li").not(".anchor").hover((e) => {
        $(e.currentTarget).addClass("hover");
        toTarget($(e.currentTarget).parent());
    }, (e) => {
        $(e.currentTarget).removeClass("hover");
    });

    $('.slider_menu').mouseleave((e) => {
        const menu = $(e.currentTarget).children("ul");
        window.setTimeout(() => { 
            toTarget(menu) 
        }, 50);
    });  

    const intoSlider = () => {
        $(".slider_menu[sliderTab]").each((_, el) => {
            if(!$(el).hasClass('into')){
                const menu = $(el).children("ul");
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
                $(el).addClass('into');
            }
        });
    }

    $('.sidebar-switch').on('click', () => {
        $('.sidebar').removeClass('mini-sidebar');
    }); 

    let isMin = false,
        isMobileMin = false;

    const trigger_resizable = (isNoAnim=false) => {
        const winWidth = $(window).width();
        
        if (!isMin && winWidth > 767.98 && winWidth < 1024) {
            $('.mini-button').prop('checked', false);
            trigger_lsm_mini(isNoAnim);
            isMin = true;
            if (isMobileMin) {
                $('.sidebar').addClass('mini-sidebar');
                isMobileMin = false;
            }
        } else if ((isMin && winWidth >= 1024) || (isMobileMin && !isMin && winWidth >= 1024)) {
            $('.mini-button').prop('checked', true);
            trigger_lsm_mini(isNoAnim);
            isMin = false;
            isMobileMin = false;
        } else if (winWidth < 767.98 && $('.sidebar').hasClass('mini-sidebar')) {
            $('.sidebar').removeClass('mini-sidebar');
            isMobileMin = true;
            isMin = false;
        }
    }

    $(document).on('click', '.sidebar-menu-inner a', (e) => {
        if ($('.sidebar-nav').hasClass('mini-sidebar')) return;
        
        const $li = $(e.currentTarget).parent('li');
        $li.siblings('li.sidebar-item').children('ul').slideUp(200);
        
        const $next = $(e.currentTarget).next('ul');
        const isHidden = $next.css('display') === 'none';
        
        if (isHidden) {
            $next.slideDown(200);
            $li.addClass('sidebar-show').siblings('li').removeClass('sidebar-show');
        } else {
            $next.slideUp(200);
            $li.removeClass('sidebar-show');
        }
    });

    $('.mini-button').on('click', trigger_lsm_mini);

    const trigger_lsm_mini = (isNoAnim = false) => {
        const isChecked = $('.header-mini-btn input[type="checkbox"]').prop('checked');
        const $sidebarNav = $('.sidebar-nav');
        const width = isChecked ? 220 : 60;
        
        if (isChecked) {
            $sidebarNav.removeClass('mini-sidebar');
            $('.sidebar-menu ul ul').css('display', 'none');
        } else {
            $('.sidebar-item.sidebar-show').removeClass('sidebar-show');
            $('.sidebar-menu ul').removeAttr('style');
            $sidebarNav.addClass('mini-sidebar');
        }
        
        if (isNoAnim) {
            $sidebarNav.width(width);
        } else {
            $sidebarNav.stop().animate({width}, 200);
        }
    }

    $(document).on('mouseover','.mini-sidebar .sidebar-menu ul:first>li,.mini-sidebar .flex-bottom ul:first>li', (e) => {
        let offset = 2;
        if($(e.currentTarget).parents('.flex-bottom').length!=0)
            offset = -3;
        $(".sidebar-popup.second").length == 0 && ($("body").append("<div class='second sidebar-popup sidebar-menu-inner text-sm'><div></div></div>"));
        $(".sidebar-popup.second>div").html($(e.currentTarget).html());
        $(".sidebar-popup.second").show();
        let top = $(e.currentTarget).offset().top - $(window).scrollTop() + offset; 
        const popupHeight = $(".sidebar-popup.second>div").height();
        const windowHeight = $(window).height();
        if(windowHeight - top <= 0 ){
            top = windowHeight - popupHeight - 8;
        }
        $(".sidebar-popup.second").stop().animate({"top":top}, 50);
    });

    $(document).on('mouseleave','.mini-sidebar .sidebar-menu ul:first,.second.sidebar-popup', () => {
        $(".sidebar-popup.second").hide();
    });
})(jQuery);

const isPC = () => {
    const u = navigator.userAgent;
    const Agents = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    return !Agents.some(agent => u.indexOf(agent) > 0);
};

const showAlert = (data) => {
    const alertTypes = {
        1: { title: '成功', type: 'success', ico: 'icon-adopt' },
        2: { title: '信息', type: 'info', ico: 'icon-tishi' },
        3: { title: '警告', type: 'warning', ico: 'icon-warning' },
        4: { title: '错误', type: 'danger', ico: 'icon-close-circle' }
    };
    
    const config = alertTypes[data.status];
    if (!config) return;
    
    const msg = data.msg || '';
    
    if (!$('.alert-placeholder').hasClass('text-sm')) {
        $('body').append('<div class="alert-placeholder text-sm" style="position:fixed;bottom:10px;right:10px;z-index:1000;text-align:right"></div>');
    }
    
    const $html = $(`
        <div class="alert-body" style="display:none;">
            <div class="alert alert-${config.type} text-lg pr-4 pr-md-5" style="text-align:initial">
                <i class="iconfont ${config.ico} icon-lg" style="vertical-align:middle;margin-right:10px"></i>
                <span style="vertical-align:middle">${config.title}</span>
                <br>
                <span class="text-md" style="margin-left:30px;vertical-align:middle">${msg}</span>
            </div>
        </div>
    `);
    
    $('.alert-placeholder').append($html);
    $html.show(200).delay(3500).hide(300, function() { $(this).remove(); }); 
};

const toTarget = (menu, padding = true, isMult = true) => {
    const slider = menu.children('.anchor');
    let target = menu.children('.hover').first();
    
    if (!target || target.length === 0) {
        target = isMult ? menu.find('.active').parent() : menu.find('.active');
    }
    
    if (target && target.length > 0) {
        const posLeft = target.position().left + target.scrollLeft();
        const outerWidth = target.outerWidth();
        const css = {
            left: padding ? posLeft + 'px' : posLeft + outerWidth / 4 + 'px',
            width: padding ? outerWidth + 'px' : outerWidth / 2 + 'px',
            opacity: '1'
        };
        slider.css(css);
    } else {
        slider.css({ opacity: '0' });
    }
};

const initTooltips = (selector) => {
    const elements = document.querySelectorAll(selector || '[data-bs-toggle="tooltip"]');
    Array.from(elements).forEach(el => new bootstrap.Tooltip(el, { trigger: 'hover' }));
};


