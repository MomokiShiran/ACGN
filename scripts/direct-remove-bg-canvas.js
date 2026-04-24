const fs = require('fs');
const path = require('path');

// 加载文件列表
const filesListPath = path.join(__dirname, 'bg-canvas-files.json');
const files = JSON.parse(fs.readFileSync(filesListPath, 'utf8'));

// 排除 index.html，因为我们已经手动修复了
const filesToProcess = files.filter(f => !f.includes('index.html') || !f.endsWith('index.html'));

console.log(`将处理 ${filesToProcess.length} 个文件...\n`);

let fixedCount = 0;

for (const file of filesToProcess) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // 查找并移除这段代码，使用部分匹配
        if (content.includes('$("#switch-mode").click') && content.includes('bg_canvas')) {
            const startSearch = '<script>\n        $("#switch-mode").click';
            const startIndex = content.indexOf(startSearch);
            
            if (startIndex !== -1) {
                // 查找结束的 </script> 标签
                const endStr = '    </script>';
                let endIndex = content.indexOf(endStr, startIndex);
                
                if (endIndex !== -1) {
                    endIndex += endStr.length;
                    
                    // 移除这段代码
                    content = content.slice(0, startIndex) + content.slice(endIndex);
                    modified = true;
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
