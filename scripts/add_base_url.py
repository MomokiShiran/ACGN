"""
添加 BASE_URL 并适配所有数据加载URL的脚本
"""

import os
import re

BASE_URL = 'https://momokishiran.github.io/ACGN/'

def get_project_root():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(script_dir)

def add_base_url_to_utils(utils_path):
    with open(utils_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'BASE_URL' in content:
        print(f'[INFO] BASE_URL 已存在于 {utils_path}')
        return
    
    lines = content.split('\n')
    new_lines = []
    inserted = False
    
    for i, line in enumerate(lines):
        new_lines.append(line)
        if not inserted and line.strip().startswith('export const qs'):
            new_lines.append('')
            new_lines.append(f"// 基地址")
            new_lines.append(f"export const BASE_URL = '{BASE_URL}';")
            inserted = True
    
    with open(utils_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    
    print(f'[OK] 已添加 BASE_URL 到 {utils_path}')

def update_data_loader(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = content.replace(
        "import { resolvePath } from './utils.js';",
        "import { resolvePath, BASE_URL } from './utils.js';"
    )
    
    content = content.replace(
        "const dataPath = resolvePath('data/sites.json');",
        "const dataPath = BASE_URL + 'data/sites.json';"
    )
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'[OK] 已更新 {file_path}')
    else:
        print(f'[INFO] 无需更新 {file_path}')

def update_site_detail(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = content.replace(
        "import { qs, resolvePath } from './utils.js';",
        "import { qs, resolvePath, BASE_URL } from './utils.js';"
    )
    
    content = content.replace(
        "const sitetrashPath = resolvePath('data/sitetrash.json');",
        "const sitetrashPath = BASE_URL + 'data/sitetrash.json';"
    )
    
    content = content.replace(
        ": resolvePath('assets/images/favicon.png')",
        ": BASE_URL + 'assets/images/favicon.png'"
    )
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'[OK] 已更新 {file_path}')
    else:
        print(f'[INFO] 无需更新 {file_path}')

def update_dynamic(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = content.replace(
        "import { qs, isPC } from './utils.js';",
        "import { qs, isPC, BASE_URL } from './utils.js';"
    )
    
    content = re.sub(
        r"const iconUrl = site\.icon \|\| 'assets/images/favicon\.png';",
        "const iconUrl = site.icon || BASE_URL + 'assets/images/favicon.png';",
        content
    )
    
    content = content.replace(
        "onerror=\"this.src='assets/images/favicon.png'\"",
        "onerror=\"this.src=BASE_URL+'assets/images/favicon.png'\""
    )
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'[OK] 已更新 {file_path}')
    else:
        print(f'[INFO] 无需更新 {file_path}')

def update_sidebar(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = content.replace(
        "import { qs } from './utils.js';",
        "import { qs, BASE_URL } from './utils.js';"
    )
    
    content = content.replace(
        "'<li class=\"sidebar-item\"><a href=\"/index.html#'",
        "'<li class=\"sidebar-item\"><a href=\"' + BASE_URL + 'index.html#'"
    )
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'[OK] 已更新 {file_path}')
    else:
        print(f'[INFO] 无需更新 {file_path}')

def main():
    project_root = get_project_root()
    js_dir = os.path.join(project_root, 'assets', 'js')
    
    print('=' * 50)
    print('开始添加 BASE_URL 并适配URL')
    print('=' * 50)
    
    utils_path = os.path.join(js_dir, 'utils.js')
    add_base_url_to_utils(utils_path)
    
    update_data_loader(os.path.join(js_dir, 'data-loader.js'))
    update_site_detail(os.path.join(js_dir, 'site-detail.js'))
    update_dynamic(os.path.join(js_dir, 'dynamic.js'))
    update_sidebar(os.path.join(js_dir, 'sidebar.js'))
    
    print('=' * 50)
    print('完成!')
    print('=' * 50)

if __name__ == '__main__':
    main()
