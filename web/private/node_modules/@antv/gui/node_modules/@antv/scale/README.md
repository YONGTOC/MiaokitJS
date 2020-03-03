# `@antv/scale`

> 0.2 版本不兼容之前 0.1.X 版本

## Description

scale 有很多中文名，标度、度量、比例尺等等。它是数据空间到图形空间的转换桥梁，负责将数据从数据空间（定义域）转换为图形属性空间区域（值域）。

例如：

![](https://www.oxxostudio.tw/img/articles/201411/20141112_1_04.png)

或者

![](https://www.oxxostudio.tw/img/articles/201411/20141112_1_05.png)

### Attr

| 名称      | 类型             | 说明                                    |
| --------- | ---------------- | --------------------------------------- |
| type      | string           | scale 类型                              |
| values    | any[]            | 定义域                                  |
| min       | any              | 定义域的最小值，在分类型 scale 中为序号 |
| max       | any              | 定义域的最大值                          |
| range     | [number, number] | 值域的最小、最大值                      |
| tickCount | number           | 期望的 tick 数量，非最终结果            |
| formatter | func             | 格式化函数，用于 tooltip、tick 等展示   |
| exponent  | number           | 指数                                    |
| base      | number           | 对数底数                                |

### Methods

| 名称      | 类型                    | 说明                                |
| --------- | ----------------------- | ----------------------------------- |
| scale     | (value: any): number    | 将定义域的输入值转换为值域的输出值  |
| invert    | (scaled: number): any   | 将值域的输入值转换为定义域的输出值  |
| translate | (value: any): number    | 分类型 scale 中，将定义域转化为序号 |
| transform | (value: number): number | 数值型 scale 中，对输入值的数学计算 |
| clone     | (): void                | 复制 scale 实例                     |
| getTicks  | (): Tick[]              | 获取所有 ticks 集合                 |
| getText   | (value: any): string    | 获取输入值的展示结果                |

## Usage

```ts
import { getScale } from '@antv/scale';

const Linear = getScale('linear');

// 详情可参考单测用例
const scale = new Linear({
  min: 0,
  max: 100,
  range: [0, 1],
});
```
