"""Local keyword retrieval; emits the actual generation input, without an API."""
from datetime import datetime, timezone
from pathlib import Path
import re

HERE = Path(__file__).resolve().parent
QUERIES = (
    ('英文表达', '英文 冠词 article MSc AI 个人事实'),
    ('双语控件', '主题 中文 aria-label localStorage 刷新'),
    ('导航反馈', '导航 点击 滚动 折叠 页底 scrollHeight getBoundingClientRect'),
)


def retrieve(text, query, limit=3):
    terms = set(query.casefold().split())
    chunks = re.findall(r'^## R\d+ .*?(?=^## R\d+ |\Z)', text, re.M | re.S)
    ranked = [(sum(term in chunk.casefold() for term in terms), chunk.strip()) for chunk in chunks]
    return sorted((item for item in ranked if item[0]), key=lambda item: (-item[0], item[1]))[:limit]


def main():
    corpus = (HERE / 'knowledge.md').read_text(encoding='utf-8')
    lines = [
        '# V2 检索增强开发输入',
        '生成时间 UTC：' + datetime.now(timezone.utc).isoformat(timespec='seconds'),
        '检索方式：本地关键词命中计数；按分数降序、相同分数按编号排序；每个问题最多取 3 个正分片段。不是向量检索，也未调用外部模型 API。',
        '',
        '你是前端开发助手。请仅基于冻结 V0 的三个源文件及以下实际检索片段，生成一个 V2：',
        '修正明确英文表达；完善主题按钮的中英文文字与辅助标签及状态恢复；修复大屏项目收起后的导航反馈，同时支持用户手动滚动。',
        '源码附件：V0/index.html、V0/style.css、V0/script.js，需另行提供完整内容。',
        '保持个人/项目事实、既有布局和四个区域；不改头像占位、留白及 favicon；不增加运行时依赖、后端或网站内检索功能。',
        '输出 index.html、style.css、script.js；用检索编号简要标明资料如何用于修改。不可声称未执行的测试、部署或评分。',
        '',
    ]
    for title, query in QUERIES:
        lines += ['## 查询：' + title, '检索词：' + query, '']
        selected = retrieve(corpus, query)
        if not selected:
            raise SystemExit('No relevant passage: ' + title)
        for score, chunk in selected:
            lines += [f'命中分数：{score}（命中的不同查询词数量；非质量评分）', chunk, '']
    content = '\n'.join(lines).rstrip() + '\n'
    (HERE / 'input.md').write_text(content, encoding='utf-8')
    print(content)


if __name__ == '__main__':
    main()
