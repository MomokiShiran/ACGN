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
        
        // 模式1: 移除完整的 bg_canvas switch-mode script块
        const scriptPattern = /<script>[\s\n]*\$\("#switch-mode"\)\.click\(function\(\)[\s\S]*?bg_canvas[\s\S]*?<\/script>/g;
        if (scriptPattern.test(content)) {
            content = content.replace(scriptPattern, '');
            modified = true;
        }
        
        // 模式2: 移除 AliceStyle 背景脚本
        if (content.includes('AliceStyle')) {
            content = content.replace(/\s*<script src="https:\/\/myacg\.pro\/AliceStyle\/static\/js\/bg\/b4\.js">\s*<\/script>\s*/g, '');
            modified = true;
        }
        
        // 模式3: 移除单独的 bg_canvas CSS操作代码
        const bgPattern = /\$\("#bg_canvas"\)\.css\([^)]+\);?\s*/g;
        if (bgPattern.test(content)) {
            content = content.replace(bgPattern, '');
            modified = true;
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
