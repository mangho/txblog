# 主流前端框架对比

## 先说结论，ant design 的 bug 最少，根本没发现。

| 框架         | bug | 推荐度     |
| ------------ | --- | ---------- |
| Ant Design   | 无  | ⭐⭐⭐⭐⭐ |
| Arco Design  | 有  | ⭐⭐⭐     |
| Semi Design  | 有  | ⭐⭐       |
| Element Plus | 有  | ⭐         |

## 对比分析

- **element 在表格里使用下拉菜单 dropdown，下拉菜单里有 popconfirm 组件时，显示 popconfirm 时，会有样式问题，导致 popconfirm 的位置飘到左上角。[#12185](https://github.com/element-plus/element-plus/issues/12185#issuecomment-2647933197)**
- element,arco,semi。这三个的通病是表格在行列合并时，hover 行时，合并的单元格会丢失 hover 样式。ant design 没有这个问题。
- arco的dropdown，popconfirm这些有三角标的组件，设置透明背景时，可以看出三角标并不是真的三角标，而是旋转45度的矩形，跟内容重叠部分会有颜色叠加。
---
### pure-admin
 - 路由逻辑复杂
 - 权限分配UI在定宽模式会显示不全

### vben-admin
 - 断网重连逻辑没做好，断网超时报错会导致页面崩溃，需要用户手动刷新页面。
