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
        
        // 精确移除 switch-mode + bg_canvas 的 script 块
        const switchModePattern = /<script>[\s\n]*\$\("#switch-mode"\)\.click\(function\(\)[\s\S]*?<\/script>[\s\n]*/g;
        if (switchModePattern.test(content)) {
            content = content.replace(switchModePattern, '');
            modified = true;
        }
        
        // 移除 AliceStyle 背景脚本
        const alicePattern = /\s*<script src="https:\/\/myacg\.pro\/AliceStyle\/static\/js\/bg\/b4\.js">\s*<\/script>\s*/g;
        if (alicePattern.test(content)) {
            content = content.replace(alicePattern, '');
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
