const fs = require('fs');
const path = require('path');

const SITES_FILE = path.join(__dirname, '..', 'data', 'sites.json');
const DAYS_THRESHOLD = 30;

function updateIsNewStatus() {
  const data = JSON.parse(fs.readFileSync(SITES_FILE, 'utf8'));
  const now = new Date();
  let updated = 0;

  data.categories.forEach(category => {
    if (category.sites) {
      category.sites.forEach(site => {
        if (site.createdAt && site.isNew) {
          const createdDate = new Date(site.createdAt);
          const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);

          if (daysDiff > DAYS_THRESHOLD) {
            site.isNew = false;
            updated++;
            console.log(`已更新: ${site.name} (${site.id}) - ${daysDiff.toFixed(1)} 天`);
          }
        }
      });
    }

    if (category.children) {
      category.children.forEach(subCat => {
        if (subCat.sites) {
          subCat.sites.forEach(site => {
            if (site.createdAt && site.isNew) {
              const createdDate = new Date(site.createdAt);
              const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24);

              if (daysDiff > DAYS_THRESHOLD) {
                site.isNew = false;
                updated++;
                console.log(`已更新: ${site.name} (${site.id}) - ${daysDiff.toFixed(1)} 天`);
              }
            }
          });
        }
      });
    }
  });

  if (updated > 0) {
    fs.writeFileSync(SITES_FILE, JSON.stringify(data, null, 2) + '\n');
    console.log(`\n总计更新: ${updated} 个站点`);
  } else {
    console.log('\n无需更新任何站点');
  }

  return updated;
}

if (require.main === module) {
  updateIsNewStatus();
}

module.exports = { updateIsNewStatus };
