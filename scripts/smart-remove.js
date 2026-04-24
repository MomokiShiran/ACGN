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

let fixedCount = 0;

for (const file of allHtmlFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // 查找包含 switch-mode 和 bg_canvas 的 script 块
        if (content.includes('$("#switch-mode").click') && content.includes('bg_canvas')) {
            // 找到所有 script 标签对，检查内容
            let scriptStart = 0;
            while (true) {
                scriptStart = content.indexOf('<script>', scriptStart);
                if (scriptStart === -1) break;
                
                const scriptEnd = content.indexOf('</script>', scriptStart);
                if (scriptEnd === -1) break;
                
                const scriptContent = content.slice(scriptStart, scriptEnd + 9);
                
                if (scriptContent.includes('$("#switch-mode").click') && scriptContent.includes('bg_canvas')) {
                    // 移除这个 script 块
                    content = content.slice(0, scriptStart) + content.slice(scriptEnd + 9);
                    modified = true;
                    // 从头重新检查
                    scriptStart = 0;
                } else {
                    scriptStart = scriptEnd + 9;
                }
            }
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            fixedCount++;
            const relativePath = path.relative(rootDir, file);
            console.log(`✓ ${relativePath}`);
        }
    } catch (err) {
        console.error(`✗ 处理文件出错: ${file}`);
        console.error(err);
    }
}

console.log(`\n✅ 共修复了 ${fixedCount} 个文件`);
