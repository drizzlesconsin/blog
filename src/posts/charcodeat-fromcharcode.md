---
author: drizzle
date: 2020-11-16
tags: [note]
---

# String.charCodeAt & String.fromCharCode

## `String.prototype.charCodeAt()`

返回值为 0—65535 之间的整数，Unicode 的 UTF-16 编码。

```js
String.prototype.charCodeAt.call("a");
// 97
```

## `String.fromCharCode()`

接收参数为 UTF-16 编码，返回值为转换后的字符串。

```js
String.fromCharCode(97);
("a");
```

## [ASCII 码](https://zh.wikipedia.org/wiki/ASCII#%E5%8F%AF%E6%98%BE%E7%A4%BA%E5%AD%97%E7%AC%A6)

- 33-47 特殊符号、运算符号、括号等
- 48-57 是 0-9
- 65-90 是 A-Z
- 97-122 是 a-z

> A-Z 和 a-z 的 ASCII 编码的十进制值相差 32

## Unicode emoji

```js
"🐔".charCodeAt();
// 55357
String.fromCharCode(55357);
// "�"
```

为什么不能正常显示呢？来看看这个鸡儿的长度

```js
"🐔".length;
// 2
```

它居然有两个字符

```js
"🐔".split("");
// (2) ["�", "�"]
```

为什么会这样？先暂停，查查为什么？

> 统一码的编码方式与[ISO 10646](https://zh.wikipedia.org/wiki/ISO_10646)的[通用字符集](https://zh.wikipedia.org/wiki/通用字符集)概念相对应。目前实际应用的统一码版本对应于[UCS-2](https://zh.wikipedia.org/wiki/UCS-2)，使用 16[位](https://zh.wikipedia.org/wiki/位元)的编码空间。也就是每个字符占用 2 个[字节](https://zh.wikipedia.org/wiki/字节)。这样理论上一共最多可以表示 2 的 16 次方（即 65536）个字符。基本满足各种语言的使用。实际上当前版本的统一码并未完全使用这 16 位编码，而是保留了大量空间以作为特殊使用或将来扩展。
>
> 上述 16 位统一码字符构成[基本多文种平面](https://zh.wikipedia.org/wiki/基本多文種平面)。最新（但未实际广泛使用）的统一码版本定义了 16 个[辅助平面](https://zh.wikipedia.org/wiki/辅助平面)，两者合起来至少需要占据 21 位的编码空间，比 3 字节略少。但事实上辅助平面字符仍然占用 4 字节编码空间，与[UCS-4](https://zh.wikipedia.org/wiki/UCS-4) 保持一致。未来版本会扩充到 ISO 10646-1 实现级别 3，即涵盖 UCS-4 的所有字符。UCS-4 是一个更大的尚未填充完全的 31 位字符集，加上恒为 0 的首位，共需占据 32 位，即 4 字节。理论上最多能表示 231 个字符，完全可以涵盖一切语言所用的符号。
>
> 引用地址：https://zh.wikipedia.org/wiki/Unicode#%E7%BC%96%E7%A0%81%E6%96%B9%E5%BC%8F

从上面可以看到，字符编码的码位由 2 的 16 次方组成一个平面。

- **基本多文种平面**（Basic Multilingual Plane, BMP），或称**第 0 平面**或**0 号平面**（Plane 0），是[Unicode](https://zh.wikipedia.org/wiki/Unicode)中的一个编码区块。编码从 U+0000 至 U+FFFF。
- 辅助平面，目前的[Unicode](https://zh.wikipedia.org/wiki/Unicode)字符分为 17 组编排，每组称为**平面**（Plane），而每平面拥有 65536（即 216）个代码点。

```js
"🐔".charCodeAt(0);
// 55357
"🐔".charCodeAt(1);
// 56340
```

这种 Emoji 图形字符的编码方式是属于 1 号平面（多文种补充平面）。可以在 [这里](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84#%E7%AC%AC%E4%B8%80%E8%BC%94%E5%8A%A9%E5%B9%B3%E9%9D%A2) 查到 1F600-1F64F 表情符号。

好在 ES6 有新增了一对 API `codePointAt()` & `fromCodePoint()` 可以获取到这种字符的码点值。

上面的结果不符合预期是因为，在 JS 中字符串使用的是 2 字节 UTF-16 编码，🐔 的码点值为 128020，已经超过 65536。它用的是 4 字节 UTF-16 进行编码的。

```js
String.prototype.codePointAt.call("🐔");
// 128020
String.fromCodePoint(128020);
// 🐔
```

## `String.props.codePointAt` & `String.fromCodePoint`

- **`codePointAt()`** 方法返回 一个 Unicode 编码点值的非负整数。
- **`String.fromCodePoint()` 静态方法返回使用指定的代码点序列创建的字符串。**

最后，同一个表情为什么在不同系统的显示不一样。

只要码点一致，笑的设计成哭都行。这个[网站](https://unicode.org/emoji/charts/full-emoji-list.html)可以查到。

通过笔记整理，了解到了更多字符编码的基础细节。

## References

- https://github.com/akira-cn/FE_You_dont_know/issues/4
