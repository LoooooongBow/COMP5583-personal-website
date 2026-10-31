你是前端开发助手。请仅基于冻结 V0 的三个源文件及以下实际检索片段，生成一个 V2：
修正明确英文表达；完善主题按钮的中英文文字与辅助标签及状态恢复；修复大屏项目收起后的导航反馈，同时支持用户手动滚动。
源码附件：V0/index.html、V0/style.css、V0/script.js。
保持个人/项目事实、既有布局和四个区域；不改头像占位、留白及 favicon；不增加运行时依赖、后端或网站内检索功能。
输出 index.html、style.css、script.js；用检索编号简要标明资料如何用于修改。不可声称未执行的测试、部署或评分。

## 查询：英文表达
检索词：英文 冠词 article MSc AI 个人事实

命中分数：4（命中的不同查询词数量；非质量评分）
## R01 英文身份与冠词
来源：https://owl.purdue.edu/owl/general_writing/grammar/using_articles.html
来源：https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/articles-a-an-the
关键词：英文 冠词 article MSc
摘要：表示某类身份的单数可数名词通常需要限定词。a/an 的选择依据后续读音；以元音音素开头的缩略语也遵循该规则。
本轮应用推导：MSc 按字母读音以 /em/ 开头，应选择 an；student 作为一般身份称谓采用普通小写。

命中分数：4（命中的不同查询词数量；非质量评分）
## R02 个人事实与修改边界
关键词：英文 AI 个人事实 学位
本站约束：教育经历、学校名称、学位名称其他字词及单复数、联系方式与两个拟议项目的事实均保持 V0。已有审查仅确认简介缺冠词、student 大小写及 AI 缩略语大小写可修正。没有官方学位名称依据，不得自行重命名课程。默认 HTML 与运行时翻译文字必须一致。

## 查询：双语控件
检索词：主题 中文 aria-label localStorage 刷新

命中分数：3（命中的不同查询词数量；非质量评分）
## R03 控件的可访问名称
来源：https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label
关键词：主题 中文 本地化 aria-label
摘要：按钮通常由可见文字获得可访问名称；aria-label 可以显式提供名称。可见文字与可访问名称都应准确描述控件用途，不应滥用或留下相互矛盾的标签。
本站约束：保留现有按钮结构，主题按钮描述下一次切换的目标；根据当前语言同时更新可见文字及已有的 aria-label。

命中分数：3（命中的不同查询词数量；非质量评分）
## R04 持久化与初始化
来源：https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
关键词：主题 语言 localStorage 刷新 初始化
摘要：localStorage 按源保存字符串数据，可跨浏览器会话保留；访问存储也可能因策略限制而抛出异常。
本站应用：恢复原有 preferredLanguage、preferredTheme 时，再根据恢复后的语言和主题渲染控件。语言变化不应改动主题偏好，主题变化不应改动语言偏好。

## 查询：导航反馈
检索词：导航 点击 滚动 折叠 页底 scrollHeight getBoundingClientRect

命中分数：5（命中的不同查询词数量；非质量评分）
## R06 页底判断的含义
来源：https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
关键词：导航 scrollHeight 页底 折叠
摘要：scrollHeight 表示容纳内容所需的高度，含内边距，可能包含伪元素；与 clientHeight 的关系用于判断是否存在可滚动内容。
本站应用推导：折叠改变文档高度，目标滚动位置可能受页底限制；到达页底本身不能证明用户明确选择的是 Contact。

命中分数：5（命中的不同查询词数量；非质量评分）
## R07 本站导航行为约束
关键词：导航 点击 滚动 折叠 页底
本站记录：2560×1440、两个项目收起、从 Home 点击 Project 时曾出现 Contact 高亮，项目标题仍可见；较小视口与展开状态为对照。已在页底重复点击可能不产生新的滚动事件，验证应先回 Home。
本轮实现约束：明确的点击目标不应被页底推断立即覆盖；后续真实滚动操作应恢复按位置更新，不能永久固定 Project。折叠与展开仍保留双向操作。这里是本站设计约束，不是 MDN 对活动导航的规范。

命中分数：4（命中的不同查询词数量；非质量评分）
## R05 元素的视口位置
来源：https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
关键词：导航 getBoundingClientRect 视口 标题
摘要：getBoundingClientRect 返回元素相对视口的位置及尺寸；其边界随滚动变化。转换为文档位置时，需要加当前滚动偏移。
本站应用推导：导航定位应以实际标题/区域位置及固定页头高度计算；内容折叠、窗口改变后重新计算，不依赖修改前缓存的高度。
