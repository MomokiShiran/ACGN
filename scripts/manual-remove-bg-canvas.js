const fs = require('fs');
const path = require('path');

// 加载文件列表
const filesListPath = path.join(__dirname, 'bg-canvas-files.json');
const files = JSON.parse(fs.readFileSync(filesListPath, 'utf8'));

console.log(`将处理 ${files.length} 个文件...\n`);

let fixedCount = 0;

for (const file of files) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // 方法：找到脚本的开始和结束，手动截断
        const startScript = '<script>\n        $("#switch-mode").click(function () {';
        const endScript = '    </script>';
        
        if (content.includes(startScript)) {
            const startIndex = content.indexOf(startScript);
            // 找到结束位置
            const tempIndex = content.indexOf(endScript, startIndex);
            if (tempIndex !== -1) {
                const endIndex = tempIndex + endScript.length;
                // 移除这部分
                content = content.slice(0, startIndex) + content.slice(endIndex);
                modified = true;
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
