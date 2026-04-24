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
        } else if (item.endsWith('.html') && !(dir.endsWith('4\\acg_nav') && item === 'index.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

const rootDir = path.join(__dirname, '..');
const allHtmlFiles = getAllHtmlFiles(rootDir);

const filesWithBgCanvas = [];

for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('bg_canvas') || content.includes('$("#switch-mode").click')) {
        filesWithBgCanvas.push(file);
    }
}

console.log(`找到 ${filesWithBgCanvas.length} 个文件需要处理\n`);

// 保存文件列表
fs.writeFileSync(path.join(__dirname, 'remaining-files.json'), JSON.stringify(filesWithBgCanvas, null, 2));

console.log(`文件列表已保存到 remaining-files.json`);

// 现在处理这些文件
let fixedCount = 0;
for (const file of filesWithBgCanvas) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // 查找并移除
        if (content.includes('$("#switch-mode").click') && content.includes('bg_canvas')) {
            // 使用更宽松的搜索
            const scriptStart = content.indexOf('<script>');
            if (scriptStart !== -1) {
                let currentPos = scriptStart;
                let found = false;
                
                // 查找包含 switch-mode 的 script 块
                while (currentPos < content.length) {
                    const nextScriptStart = content.indexOf('<script>', currentPos);
                    if (nextScriptStart === -1) break;
                    
                    const nextScriptEnd = content.indexOf('</script>', nextScriptStart);
                    if (nextScriptEnd === -1) break;
                    
                    const scriptContent = content.slice(nextScriptStart, nextScriptEnd + 9);
                    
                    if (scriptContent.includes('$("#switch-mode").click') && scriptContent.includes('bg_canvas')) {
                        // 移除这个 script 块
                        content = content.slice(0, nextScriptStart) + content.slice(nextScriptEnd + 9);
                        modified = true;
                        found = true;
                        break;
                    }
                    
                    currentPos = nextScriptEnd + 9;
                }
            }
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            fixedCount++;
            const relativePath = path.relative(path.join(__dirname, '..'), file);
            console.log(`✓ ${relativePath}`);
        }
    } catch (err) {
        console.error(`✗ 处理文件出错: ${file}`);
        console.error(err);
    }
}

console.log(`\n✅ 共修复了 ${fixedCount} 个文件`);
