const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            if (item !== 'node_modules' && item !== '.git') {
                getAllHtmlFiles(fullPath, files);
            }
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

const rootDir = path.join(__dirname, '..');
const allHtmlFiles = getAllHtmlFiles(rootDir);

console.log(`扫描 ${allHtmlFiles.length} 个 HTML 文件...\n`);

const filesToFix = [];

for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('bg_canvas')) {
        filesToFix.push(file);
        const relativePath = path.relative(rootDir, file);
        console.log(`✓ ${relativePath}`);
    }
}

console.log(`\n共找到 ${filesToFix.length} 个文件包含 bg_canvas`);

// 保存文件列表
fs.writeFileSync(path.join(__dirname, 'bg-canvas-files.json'), JSON.stringify(filesToFix, null, 2));
console.log('\n文件列表已保存到 bg-canvas-files.json');
