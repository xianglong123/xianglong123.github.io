(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{433:function(t,a,e){t.exports=e.p+"assets/img/java-io-category-1-1.c7003c41.png"},434:function(t,a,e){t.exports=e.p+"assets/img/java-io-category-2-1.35168b89.png"},435:function(t,a,e){t.exports=e.p+"assets/img/java-io-1.974fed10.png"},436:function(t,a,e){t.exports=e.p+"assets/img/java-io-category-3.b6fba9b0.png"},724:function(t,a,e){"use strict";e.r(a);var r=e(0),v=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"java-io-分类-传输-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#java-io-分类-传输-操作"}},[t._v("#")]),t._v(" Java IO - 分类(传输，操作)")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),a("p",[t._v("本文主要从"),a("code",[t._v("传输方式")]),t._v("和"),a("code",[t._v("数据操作")]),t._v("两个方面分析Java IO的分类。 @123")])]),t._v(" "),a("ul",[a("li",[t._v("Java IO - 分类(传输，操作)\n"),a("ul",[a("li",[t._v("IO理解分类 - 从传输方式上\n"),a("ul",[a("li",[t._v("字节流")]),t._v(" "),a("li",[t._v("字符流")]),t._v(" "),a("li",[t._v("字节流和字符流的区别")]),t._v(" "),a("li",[t._v("字节转字符Input/OutputStreamReader/Writer")])])]),t._v(" "),a("li",[t._v("IO理解分类 - 从数据操作上\n"),a("ul",[a("li",[t._v("文件(file)")]),t._v(" "),a("li",[t._v("数组([])")]),t._v(" "),a("li",[t._v("管道操作")]),t._v(" "),a("li",[t._v("基本数据类型")]),t._v(" "),a("li",[t._v("缓冲操作")]),t._v(" "),a("li",[t._v("打印")]),t._v(" "),a("li",[t._v("对象序列化反序列化")]),t._v(" "),a("li",[t._v("转换")])])])])])]),t._v(" "),a("h3",{attrs:{id:"io理解分类-从传输方式上"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#io理解分类-从传输方式上"}},[t._v("#")]),t._v(" # IO理解分类 - 从传输方式上")]),t._v(" "),a("blockquote",[a("p",[t._v("从数据传输方式或者说是运输方式角度看，可以将 IO 类分为:")])]),t._v(" "),a("ul",[a("li",[t._v("字节流")]),t._v(" "),a("li",[t._v("字符流")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("字节")]),t._v("是个计算机看的，"),a("code",[t._v("字符")]),t._v("才是给人看的")])]),t._v(" "),a("h3",{attrs:{id:"字节流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字节流"}},[t._v("#")]),t._v(" # 字节流")]),t._v(" "),a("blockquote",[a("p",[t._v("(整体结构如下，部分派生类有缺失)")])]),t._v(" "),a("blockquote",[a("p",[a("img",{attrs:{src:e(433),alt:""}})])]),t._v(" "),a("h3",{attrs:{id:"字符流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字符流"}},[t._v("#")]),t._v(" # 字符流")]),t._v(" "),a("blockquote",[a("p",[t._v("(整体结构如下，部分派生类有缺失)")])]),t._v(" "),a("blockquote",[a("p",[a("img",{attrs:{src:e(434),alt:""}})])]),t._v(" "),a("h3",{attrs:{id:"字节流和字符流的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字节流和字符流的区别"}},[t._v("#")]),t._v(" # 字节流和字符流的区别")]),t._v(" "),a("ul",[a("li",[t._v("字节流读取单个字节，字符流读取单个字符(一个字符根据编码的不同，对应的字节也不同，如 UTF-8 编码中文汉字是 3 个字节，GBK编码中文汉字是 2 个字节。)")]),t._v(" "),a("li",[t._v("字节流用来处理二进制文件(图片、MP3、视频文件)，字符流用来处理文本文件(可以看做是特殊的二进制文件，使用了某种编码，人可以阅读)。")])]),t._v(" "),a("blockquote",[a("blockquote",[a("p",[t._v("简而言之，字节是给计算机看的，字符才是给人看的。")])])]),t._v(" "),a("h3",{attrs:{id:"字节转字符input-outputstreamreader-writer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字节转字符input-outputstreamreader-writer"}},[t._v("#")]),t._v(" # 字节转字符Input/OutputStreamReader/Writer")]),t._v(" "),a("blockquote",[a("p",[t._v("编码就是把字符转换为字节，而解码是把字节重新组合成字符。")])]),t._v(" "),a("blockquote",[a("p",[t._v("如果编码和解码过程使用不同的编码方式那么就出现了乱码。")])]),t._v(" "),a("ul",[a("li",[t._v("GBK 编码中，中文字符占 2 个字节，英文字符占 1 个字节；")]),t._v(" "),a("li",[t._v("UTF-8 编码中，中文字符占 3 个字节，英文字符占 1 个字节；")]),t._v(" "),a("li",[t._v("UTF-16be 编码中，中文字符和英文字符都占 2 个字节。")])]),t._v(" "),a("blockquote",[a("p",[t._v("UTF-16be 中的 be 指的是 Big Endian，也就是大端。相应地也有 UTF-16le，le 指的是 Little Endian，也就是小端。")])]),t._v(" "),a("blockquote",[a("p",[t._v("Java 使用双字节编码 UTF-16be，这不是指 Java 只支持这一种编码方式，而是说 char 这种类型使用 UTF-16be 进行编码。char 类型占 16 位，也就是两个字节，Java 使用这种双字节编码是为了让一个中文或者一个英文都能使用一个 char 来存储。")])]),t._v(" "),a("blockquote",[a("p",[a("img",{attrs:{src:e(435),alt:""}})])]),t._v(" "),a("h3",{attrs:{id:"io理解分类-从数据操作上"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#io理解分类-从数据操作上"}},[t._v("#")]),t._v(" # IO理解分类 - 从数据操作上")]),t._v(" "),a("blockquote",[a("p",[t._v("从数据来源或者说是操作对象角度看，IO 类可以分为:")])]),t._v(" "),a("blockquote",[a("p",[a("img",{attrs:{src:e(436),alt:""}})])]),t._v(" "),a("h3",{attrs:{id:"文件-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件-file"}},[t._v("#")]),t._v(" # 文件(file)")]),t._v(" "),a("blockquote",[a("p",[t._v("FileInputStream、FileOutputStream、FileReader、FileWriter")])]),t._v(" "),a("h3",{attrs:{id:"数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数组"}},[t._v("#")]),t._v(" # 数组([])")]),t._v(" "),a("ul",[a("li",[t._v("字节数组(byte[]): ByteArrayInputStream、ByteArrayOutputStream")]),t._v(" "),a("li",[t._v("字符数组(char[]): CharArrayReader、CharArrayWriter")])]),t._v(" "),a("h3",{attrs:{id:"管道操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#管道操作"}},[t._v("#")]),t._v(" # 管道操作")]),t._v(" "),a("blockquote",[a("p",[t._v("PipedInputStream、PipedOutputStream、PipedReader、PipedWriter")])]),t._v(" "),a("h3",{attrs:{id:"基本数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本数据类型"}},[t._v("#")]),t._v(" # 基本数据类型")]),t._v(" "),a("blockquote",[a("p",[t._v("DataInputStream、DataOutputStream")])]),t._v(" "),a("h3",{attrs:{id:"缓冲操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓冲操作"}},[t._v("#")]),t._v(" # 缓冲操作")]),t._v(" "),a("blockquote",[a("p",[t._v("BufferedInputStream、BufferedOutputStream、BufferedReader、BufferedWriter")])]),t._v(" "),a("h3",{attrs:{id:"打印"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#打印"}},[t._v("#")]),t._v(" # 打印")]),t._v(" "),a("blockquote",[a("p",[t._v("PrintStream、PrintWriter")])]),t._v(" "),a("h3",{attrs:{id:"对象序列化反序列化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对象序列化反序列化"}},[t._v("#")]),t._v(" # 对象序列化反序列化")]),t._v(" "),a("blockquote",[a("p",[t._v("ObjectInputStream、ObjectOutputStream")])]),t._v(" "),a("h3",{attrs:{id:"转换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#转换"}},[t._v("#")]),t._v(" # 转换")]),t._v(" "),a("blockquote",[a("p",[t._v("InputStreamReader、OutputStreamWriter")])])])}),[],!1,null,null,null);a.default=v.exports}}]);