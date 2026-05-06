(function($) {
    $(document).ready(function() {
        loadSiteData();
    });

    const loadSiteData = () => {
        $.ajax({
            url: 'data/sites.json',
            dataType: 'json',
            success: (data) => {
                renderSidebar(data);
                renderSiteCards(data);
                reInitializeFeatures();
            },
            error: (error) => {
                console.error('加载数据失败:', error);
            }
        });
    };

    const renderSidebar = (data) => {
        const categories = data.categories;
        let sidebarHtml = '';
        const sidebarSkeleton = $('#sidebar-skeleton');
        const sidebarContent = $('#sidebar-content');
        const sidebarBottomSkeleton = $('#sidebar-bottom-skeleton');
        const sidebarBottomContent = $('#sidebar-bottom-content');

        const mainMenuIds = ['term-2', 'term-3', 'term-12', 'term-5', 'term-8', 'term-6', 'term-9', 'term-7', 'term-18', 'term-4'];
        const subMenuIds = ['term-11', 'term-15', 'term-17', 'term-13', 'term-16', 'term-22', 'term-21'];
        const shoppingMenuId = 'term-14';

        const findCategory = (categories, id) => categories.find(c => c.id === id);

        mainMenuIds.forEach((id) => {
            const category = findCategory(categories, id);
            if (category) {
                sidebarHtml += generateSidebarItem(category);
            }
        });

        let subMenuHtml = '';
        subMenuIds.forEach((id) => {
            const category = findCategory(categories, id);
            if (category) {
                subMenuHtml += generateSidebarSubItem(category);
            }
        });

        sidebarHtml += `
            <li class="sidebar-item">
                <a href="javascript:;" class="sidebar-menu-link">
                    <i class="far fa-paper-plane icon-fw icon-lg me-2"></i>
                    <span class="sidebar-menu-text">工具大全</span>
                    <i class="iconfont icon-arrow-r-m sidebar-more sidebar-more-icon text-sm"></i>
                </a>
                <ul class="sidebar-submenu">
                    ${subMenuHtml}
                </ul>
            </li>
        `;

        const shoppingCategory = findCategory(categories, shoppingMenuId);
        if (shoppingCategory) {
            sidebarHtml += generateSidebarItem(shoppingCategory);
        }

        $('#sidebar-nav-list').html(sidebarHtml);
        
        sidebarSkeleton.addClass('skeleton-hidden');
        sidebarContent.removeClass('skeleton-hidden');
        sidebarBottomSkeleton.addClass('skeleton-hidden');
        sidebarBottomContent.removeClass('skeleton-hidden');
    };

    const generateSidebarItem = (category) => {
        return `
            <li class="sidebar-item">
                <a href="#${category.id}" class="sidebar-menu-link">
                    <i class="${category.icon || 'fas fa-link'} icon-fw icon-lg me-2"></i>
                    <span class="sidebar-menu-text">${category.name}</span>
                </a>
            </li>
        `;
    };

    const generateSidebarSubItem = (category) => {
        return `
            <li class="sidebar-item">
                <a href="#${category.id}" class="sidebar-menu-link">
                    <span class="sidebar-menu-text">${category.name}</span>
                </a>
            </li>
        `;
    };

    const renderSiteCards = (data) => {
        const categories = data.categories;
        const sites = data.sites;
        const skeletonContainer = $('#skeleton-loading');
        const container = $('#site-content');
        let htmlContent = '';

        categories.forEach((category) => {
            const categorySites = sites.filter(site => site.category === category.id);

            if (categorySites.length > 0) {
                htmlContent += generateCategorySection(category, categorySites);
            }
        });

        htmlContent += generateFriendLinks();
        container.html(htmlContent);
        
        skeletonContainer.addClass('skeleton-hidden');
        container.removeClass('skeleton-hidden');
    };

    const generateCategorySection = (category, sites) => {
        let sitesHtml = '';
        sites.forEach((site) => {
            sitesHtml += generateSiteCard(site);
        });

        return `
            <h4 class="text-gray text-lg mb-4 d-flex flex-fill">
                <i class="site-tag iconfont icon-tag icon-lg me-1" id="${category.id}"></i>
                ${category.name}
            </h4>
            <div class="row">
                ${sitesHtml}
            </div>
        `;
    };

    const generateSiteCard = (site) => {
        const faviconUrl = 'https://favicon.im/' + (new URL(site.url).hostname);
        const newBadge = site.isNew ? '<span class="badge badge-danger text-ss me-1" title="新">New</span>' : '';
        
        return `
            <div class="url-card col-6 col-sm-6 col-md-4 col-xl-5a col-xxl-6a">
                <div class="url-body default">
                    <a href="sites/${site.id}.html" target="_blank" data-id="${site.id}" data-url="${site.url}" class="card no-c mb-4 site-${site.id}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${site.description}" rel="noopener noreferrer">
                        <div class="card-body">
                            <div class="url-content d-flex align-items-center">
                                <div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">
                                    <img loading="lazy" src="${faviconUrl}" onerror="this.src='assets/images/favicon.png'">
                                </div>
                                <div class="url-info flex-fill">
                                    <div class="text-sm overflowClip_1">
                                        ${newBadge}<strong>${site.name}</strong>
                                    </div>
                                    <p class="overflowClip_1 m-0 text-muted text-xs">${site.description}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="${site.url}" class="togo text-center text-muted" target="_blank" data-id="${site.id}" data-bs-toggle="tooltip" data-bs-placement="right" title="直达" rel="nofollow" rel="noopener noreferrer">
                        <i class="iconfont icon-goto"></i>
                    </a>
                </div>
            </div>
        `;
    };

    const reInitializeFeatures = () => {
        if (typeof initTooltips === 'function') {
            if (isPC()) {
                initTooltips();
            } else {
                initTooltips('.qr-img[data-bs-toggle="tooltip"]');
            }
        }
    };

    const generateFriendLinks = () => {
        return `
        <h4 class="text-gray text-lg mb-4">
            <i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接        </h4>
        <div class="friendlink text-xs card no-hover-card">
            <div class="card-body">
                <a href="https://ciyuan.cat/" title="次元猫导航，一个专注于发现、收录Acg，二次元相关网站的导航网站" target="_blank" rel="noopener noreferrer">次元猫导航</a>
                <a href="https://xiaoyou66.com/" title="二次元技术宅" target="_blank" rel="noopener noreferrer">小游</a>
                <a href="https://msiv.tv/" title="阿瓦隆！遗世独立的理想乡" target="_blank" rel="noopener noreferrer">弥生寺</a>
                <a href="https://www.acgbox.link/">ACG盒子</a>
                <a href="https://www.mgnacg.com/" title="专注动漫的二次元小站">橘子动漫</a>
                <a href="https://www.myiys.com/" title="技术导航-动漫导航-二次元导航">ACGN导航</a>
                <a href="/friends/index.html" target="_blank" title="更多链接" rel="noopener noreferrer">更多链接</a>
            </div>
        </div>
        `;
    };
})(jQuery);
