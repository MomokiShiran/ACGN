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

const exactCode = `
<script>
        $("#switch-mode").click(function () {
            if ($("body").hasClass("io-black-mode")) {
                // $("body").removeClass("io-black-mode");
                // $("body").addClass("io-grey-mode");
                $("#bg_canvas").css("width", "100%");
                $("#bg_canvas").css("height", "100%");
            } else {
                // $("body").removeClass("io-grey-mode");
                // $("body").addClass("io-black-mode");
                $("#bg_canvas").css("width", "0%");
                $("#bg_canvas").css("height", "0%");
            }
        })
    </script>
`;

console.log(`扫描 ${allHtmlFiles.length} 个 HTML 文件...\n`);

let fixedCount = 0;

for (const file of allHtmlFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // 查找并替换这段代码
        if (content.includes(exactCode)) {
            content = content.replace(exactCode, '');
            modified = true;
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
