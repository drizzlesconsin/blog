---
author: drizzle
date: 2020-11-16
tags: [Note]
---

# String.charCodeAt & String.fromCharCode

## `String.prototype.charCodeAt()`

返回值为 0—65535之间的整数，Unicode 的 UTF-16 编码。

```js
String.prototype.charCodeAt.call('a')
// 97
```

## `String.fromCharCode()`

接收参数为 UTF-16 编码，返回值为转换后的字符串。

```js
String.fromCharCode(97)
"a"
```

## [ASCII 码](https://zh.wikipedia.org/wiki/ASCII#%E5%8F%AF%E6%98%BE%E7%A4%BA%E5%AD%97%E7%AC%A6)

+ 33-47 特殊符号、运算符号、括号等
+ 48-57 是0-9
+ 65-90 是A-Z
+ 97-122 是a-z

> A-Z 和 a-z 的 ASCII 编码的十进制值相差 32

## Unicode emoji

```js
'🐔'.charCodeAt()
// 55357
String.fromCharCode(55357)
// "�"
```

为什么不能正常显示呢？来看看这个鸡儿的长度

```js
'🐔'.length
// 2
```

它居然有两个字符

```js
'🐔'.split('')
// (2) ["�", "�"]
```

为什么会这样？先暂停，查查为什么？

> 统一码的编码方式与[ISO 10646](https://zh.wikipedia.org/wiki/ISO_10646)的[通用字符集](https://zh.wikipedia.org/wiki/通用字符集)概念相对应。目前实际应用的统一码版本对应于[UCS-2](https://zh.wikipedia.org/wiki/UCS-2)，使用16[位](https://zh.wikipedia.org/wiki/位元)的编码空间。也就是每个字符占用2个[字节](https://zh.wikipedia.org/wiki/字节)。这样理论上一共最多可以表示2的16次方（即65536）个字符。基本满足各种语言的使用。实际上当前版本的统一码并未完全使用这16位编码，而是保留了大量空间以作为特殊使用或将来扩展。
>
> 上述16位统一码字符构成[基本多文种平面](https://zh.wikipedia.org/wiki/基本多文種平面)。最新（但未实际广泛使用）的统一码版本定义了16个[辅助平面](https://zh.wikipedia.org/wiki/辅助平面)，两者合起来至少需要占据21位的编码空间，比3字节略少。但事实上辅助平面字符仍然占用4字节编码空间，与[UCS-4](https://zh.wikipedia.org/wiki/UCS-4) 保持一致。未来版本会扩充到ISO 10646-1实现级别3，即涵盖UCS-4的所有字符。UCS-4是一个更大的尚未填充完全的31位字符集，加上恒为0的首位，共需占据32位，即4字节。理论上最多能表示231个字符，完全可以涵盖一切语言所用的符号。
>
> 引用地址：https://zh.wikipedia.org/wiki/Unicode#%E7%BC%96%E7%A0%81%E6%96%B9%E5%BC%8F

从上面可以看到，字符编码的码位由2的16次方组成一个平面。

+ **基本多文种平面**（Basic Multilingual Plane, BMP），或称**第0平面**或**0号平面**（Plane 0），是[Unicode](https://zh.wikipedia.org/wiki/Unicode)中的一个编码区块。编码从U+0000至U+FFFF。
+ 辅助平面，目前的[Unicode](https://zh.wikipedia.org/wiki/Unicode)字符分为17组编排，每组称为**平面**（Plane），而每平面拥有65536（即216）个代码点。

```js
'🐔'.charCodeAt(0)
// 55357
'🐔'.charCodeAt(1)
// 56340
```

这种 Emoji 图形字符的编码方式是属于 1 号平面（多文种补充平面）。可以在 [这里](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84#%E7%AC%AC%E4%B8%80%E8%BC%94%E5%8A%A9%E5%B9%B3%E9%9D%A2) 查到 1F600-1F64F 表情符号。

好在 ES6 有新增了一对 API `codePointAt()` & `fromCodePoint()` 可以获取到这种字符的码点值。

上面的结果不符合预期是因为，在 JS 中字符串使用的是2字节 UTF-16 编码，🐔 的码点值为 128020，已经超过 65536。它用的是 4 字节 UTF-16 进行编码的。

```js
String.prototype.codePointAt.call('🐔')
// 128020
String.fromCodePoint(128020)
// 🐔
```

## `String.props.codePointAt` & `String.fromCodePoint`

+ **`codePointAt()`** 方法返回 一个 Unicode 编码点值的非负整数。
+ **`String.fromCodePoint()` 静态方法返回使用指定的代码点序列创建的字符串。**

最后，同一个表情为什么在不同系统的显示不一样。

只要码点一致，笑的设计成哭都行。这个[网站](https://unicode.org/emoji/charts/full-emoji-list.html)可以查到。

通过笔记整理，了解到了更多字符编码的基础细节。

## References

+ https://github.com/akira-cn/FE_You_dont_know/issues/4