/**
 * 友情链接渲染模块
 */

export const genFriendLinks = links => {
  console.log('[FriendLinksRenderer] genFriendLinks 被调用，链接数量:', links.length);

  const linksHtml = links
    .map(
      link => `
    <a href="${link.url}" title="${link.description}" target="_blank" rel="noopener noreferrer" class="friendlink-link">${link.name}</a>
  `
    )
    .join('');

  return `
  <h4 class="text-gray text-lg mb-4">
    <i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接
  </h4>
  <div class="friendlink text-xs card no-hover-card">
    <div class="card-body">
      ${linksHtml}
    </div>
  </div>`;
};

export const genFriendCard = link => {
  console.log('[FriendLinksRenderer] genFriendCard 输入参数:', link);
  const faviconUrl = `https://favicon.im/${new URL(link.url).hostname}`;
  const defaultIconUrl = new URL('../../assets/images/favicon.png', import.meta.url).href;

  return `
  <div class="url-card col-6 col-md-3">
    <div class="card url-body default">
      <div class="card-body">
        <div class="url-content d-flex align-items-center">
          <div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">
            <img loading="lazy" src="${faviconUrl}" onerror="javascript: this.src = '${defaultIconUrl}';">
          </div>
          <div class="url-info flex-fill">
            <div class="text-sm overflowClip_1">
              <a href="${link.url}" title="${link.description}" target="_blank" rel="noopener noreferrer"><strong>${link.name}</strong></a>
            </div>
            <p class="overflowClip_1 m-0 text-xs">${link.description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
};

export const genFriendCards = links => {
  console.log('[FriendLinksRenderer] genFriendCards 被调用，链接数量:', links.length);

  const cardsHtml = links.map(link => genFriendCard(link)).join('');

  return `
  <div class="row">
    ${cardsHtml}
  </div>
  <div class="clear"></div>`;
};
