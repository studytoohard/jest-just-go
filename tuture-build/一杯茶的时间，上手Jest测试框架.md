# 一杯茶的时间，上手Jest测试框架

当我第一次听说TDD(Test-Driven Develop, 测试驱动开发)的时候，我首先想到的是测试小姐姐们想搞事情？后面发现这个玩意儿是想干掉测试，那好，下面开始让我们干掉这群整天给我们找bug...下面开始从简单的单元测试上手Jest测试框架。

## 我们能学到什么

1. Jest怎么4行代码完成一个测试用例
2. Jest怎么让测试用例覆盖率100%
3. Jest怎么和Typescript完美结合（填坑实录）
4. Jest最锋利的功能 Mock Functions

## 项目初始化

### 创建工程

```shell
# 注意powershell中'&&'替换为';'
mkdir jest-just-go && cd jest-just-go
```

### 初始化

```shell
npm init -y
```

### 安装依赖

```shell
npm i jest --save-dev
```

## 1.Jest怎么4行代码完成一个测试用例

### 初始化Jest默认配置

```shell
npx jest --init
```

**初始化时会出现提示信息，按y或enter即可**

### 编写功能代码

现在让我们正式开始，茶和图雀社区精心准备的甜品更搭哦。

```js
const dessert = function (name) {
    this.name = name;
}

dessert.prototype = {
    enjoy: function () {
        return "Enjoy the " + this.name;
    }
}

module.exports = dessert;
```

我们已经编写了一个甜品类型，它有一个提供品尝的方法`enjoy`

### 编写测试用例

下面开始编码，实现对上面甜品功能的单元测试

```js
const dessert = require("../src/dessert");

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
    })
})
```

简单的四行代码，我们的第一个测试用例就已经大功告成。这里我们只需要注意`describe`、`test`、`expect`这3个Jest关键字就行了。

### 执行测试

回到控制台，输入:

```shell
npm test
```

测试结果显示：

![](https://imgkr.cn-bj.ufileos.com/edea94c0-746d-482c-af2e-432f8f23d63d.png)

我们更改**`__tests__`**`/dessert.test.js`中的

```javascript
expect(cake.enjoy()).toBe("Enjoy the cake");
改为
expect(cake.enjoy()).toBe("enjoy the cake");
```

执行测试命令查看测试不通过的情形：

![](https://imgkr.cn-bj.ufileos.com/6bbf67f6-6a1c-485d-b602-88cbd9e9acc5.png)

## 2.Jest怎么让测试用例覆盖率达到100%

当我们的功能场景逐渐变得复杂，我们的测试就必须确保测试用例的覆盖率达到一个标准。最佳当然是100%啦，这样才能保证测试小改改们找不到我们的茬，闲的没事就会主动找我们拉话话啦，美好生活从测试用例覆盖率100%开始。

### 编写功能代码

甜点不够怎么办？要不我们开家店吧！先让红豆烧和提拉米苏够吃先~

```js
const dessert = require("./dessert");

const dessertFactory = function () {
}

dessertFactory.produce = function (type) {
    switch (type) {
        case 'Red bean burning':
            return new dessert('Red bean burning'); // 红豆烧
        case 'Tiramisu':
            return new dessert('Tiramisu'); // 提拉米苏
        default:
            throw new Error("please choose a dessert type");
    }
}

module.exports = dessertFactory;
```

现在想吃什么通过**dessertFactory.produce(...)** order就fine啦

### 编写测试用例

不过，要保证我们想吃的时候就必须能吃到（这个很重要），我们先验收先：

```js
const dessertFactoty = require("../src/dessertFactoty");

describe("test dessertFactoty feature", () => {
    test("produce all dessert", () => {
        const dessertType = ['Red bean burning', 'Tiramisu'];
        expect(dessertFactoty.produce(dessertType[0]).enjoy()).toBe("Enjoy the Red bean burning");
    })
})
```

--“我不要你觉得，我要我觉得“，我要上档次的“验收报告“！

--行，网页展示出来怎么样

### 
配置`jest.config.js`保存测试用例覆盖率执行报告

我们在执`初始化Jest默认配置`的时候，会生成在项目根目录下生成`jest.config.js`，里面列出了所有的配置项，未设置的已经被注释掉了。我们要将每次执行测试后生成的覆盖率报告保存下来需要找到下面这项配置属性并更改：

```js
// Indicates whether the coverage information should be collected while executing the test
collectCoverage: true,
```

然后我们可以**再次执行测试命令并用浏览器打开*****`.\coverage\lcov-report\index.html`*****查看测试用例覆盖率报告：**

![](https://imgkr.cn-bj.ufileos.com/be955f25-64cd-4957-ad5f-dd768654d9a4.gif)

### 修改测试用例使覆盖率达到100%

***`.\__tests__\dessertFactory.test.js`***

```js
const dessertFactoty = require("../src/dessertFactoty");

describe("test dessertFactoty feature", () => {
    test("produce all dessert", () => {
        const dessertType = ['Red bean burning', 'Tiramisu'];
        expect(dessertFactoty.produce(dessertType[0]).enjoy()).toBe("Enjoy the Red bean burning");
        expect(dessertFactoty.produce(dessertType[1]).enjoy()).toBe("Enjoy the Tiramisu");
        expect(() => { dessertFactoty.produce('Luckin Coffee') }).toThrow("please choose a dessert type");
    })
})
```

再测试并查看覆盖率报告：

![](https://imgkr.cn-bj.ufileos.com/1c5ef403-2201-4248-921f-b153837b10ad.png)

这里**`Functions列`**为什么不是100%，大家可以点击**`dessertFactory.js`**根据详细说明分析推测。

## 3.Jest怎么和Typescript完美结合（填坑实录）

搜索引擎上现有的Jest+Typescript的样例比较少，并且存在了一定的问题没有解决，这一部分已经填平了坑，可以作为配置参考。

### ts配置文件

**开发时需将"__tests__/**/*"放入include，以便ts类型检查**

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "lib": [
            "es2015"
        ],
        "strict": true,
        "declaration": true,
        "outDir": "build",
        "sourceMap": true
    },
    "include": [
        "src/**/*",
        "__test__/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

### 修改`jest.config.js`配置

添加如下配置项

```javascript
// An array of file extensions your modules use
moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
],
// A preset that is used as a base for Jest's configuration
preset: "ts-jest",
```

### 修改功能代码

```ts
export default class dessert {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    enjoy() {
        return "Enjoy the " + this.name;
    }
}
```

```ts
import dessert from "./dessert";

export default class dessertFactory {
    static produce(type: string) {
        switch (type) {
            case 'Red bean burning':
                return new dessert('Red bean burning'); // 红豆烧
            case 'Tiramisu':
                return new dessert('Tiramisu'); // 提拉米苏
            default:
                throw new Error("please choose a dessert type");
        }
    }
}
```

### 
修改测试用例

```ts
import dessert from "../src/dessert";

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
    })
})
```

```ts
import dessertFactoty from "../src/dessertFactoty";

describe("test dessertFactoty feature", () => {
    test("produce all dessert", () => {
        const dessertType = ['Red bean burning', 'Tiramisu'];
        expect(dessertFactoty.produce(dessertType[0]).enjoy()).toBe("Enjoy the Red bean burning");
        expect(dessertFactoty.produce(dessertType[1]).enjoy()).toBe("Enjoy the Tiramisu");
        expect(() => { dessertFactoty.produce('Luckin Coffee') }).toThrow("please choose a dessert type");
    })
})
```

如同代码重构后我们通过测试用例可以快速检查是否改动出现差错一样，我们这次变更可以执行Jest测试命令，检查是否对功能无影响。

![](https://imgkr.cn-bj.ufileos.com/5c247ea3-e47d-4e5f-ac2b-6f5ef78d72d3.png)

以上。

## 4.Jest最锋利的功能 Mock Functions

关于**`Jest`**测试框架中的Mock功能，我们主要关注两点：

1. mock function.
2. mock return value.

从以上两点可以衍生出**`Jest`**对于代码单元测试中两项常用的锋利功能：

1. 对功能中业务逻辑简化后的重新实现，方便有指向性的进行测试（比如忽略实际场景中的跨服务调用功能等）。
2. 对功能返回值的直接模拟。

为甜点增加了评论功能。

```ts
export default class dessert {
    name: string;
    static comment: string[] = [];
    constructor(name: string) {
        this.name = name;
    }
    enjoy() {
        return "Enjoy the " + this.name;
    }
    static comments(message: string) {
        dessert.comment.push(message);
    }
}
```

专门建立一个互动区进行甜点的讨论。

```ts
import dessert from "./dessert";

module desserCommentModule {
    export function comments(message: string) {
        dessert.comments(message);
        return dessert.comment;
    }

}

export default desserCommentModule;
```

```ts
import dessert from "../src/dessert";
import desserCommentModule from "../src/desserCommentModule";
jest.mock("../src/desserCommentModule");

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
    })
})

describe("test dessert feature with mock", () => {
    test("enjoy the cake with mock function", () => {
        const dessertFactoryMock = jest.fn(name => new dessert(name));
        const cake = dessertFactoryMock('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
        expect(dessertFactoryMock.mock.results[0].value.enjoy()).toBe("Enjoy the cake");
        console.log(dessertFactoryMock.mock);
    })
    test("enjoy the cake with mock return value", () => {
        const dessertFactoryMock = jest.fn(name => new dessert(name));
        const cake = new dessert('cake');
        dessertFactoryMock.mockReturnValue(cake);
        const tiramisu = dessertFactoryMock('tiramisu');
        expect(tiramisu.enjoy()).toBe("Enjoy the cake");
        expect(tiramisu).toEqual(cake);
        expect(dessertFactoryMock.mock.results[0].value).toEqual(cake);
    })
    test("comment the dessert with mock module", () => {
        const mockedDessert = desserCommentModule as jest.Mocked<typeof desserCommentModule>;
        mockedDessert.comments.mockReturnValue(['not bad']);
        expect(mockedDessert.comments("cake is so good")).toEqual(['not bad']);
        expect(dessert.comment).toEqual([]);
    })
    test("comment the dessert with mock implementations", () => {
        const mockedDessert = desserCommentModule as jest.Mocked<typeof desserCommentModule>;
        mockedDessert.comments.mockImplementation((message: string) => {
            dessert.comments(message);
            return ['not bad'];
        });
        expect(mockedDessert.comments("cake is so good")).toEqual(['not bad']);
        expect(dessert.comment).toEqual(['cake is so good']);
    })
})
```

### mock function

```ts
test.only("enjoy the cake with mock function", () => {  ...
```

这里我们通过**`jest.fn`**进行了**`mock function`**功能的展示，通过执行**`npm test`**看到**`.mock`**的结构信息：

![](https://imgkr.cn-bj.ufileos.com/4f45c24d-34dc-45ad-9a61-ce6ea4cf218e.png)

**`.mock`****的中将会记录****`mock function`****调用后的相关信息**。

### mock return value

```ts
test("enjoy the cake with mock return value", () => {
  ....
```

这里我们通过**`.mockReturnValu`**可以将**`function mock`**的操作略过，直接会返回**`.mockReturnValue`**中填充的返回值。通过执行**`npm test`**验证。

### mock module

```ts
import desserCommentModule from "../src/desserCommentModule";
jest.mock("../src/desserCommentModule");
test.only("comment the dessert with mock module", () => {
  ...
```

通过**`jest.mock`**，我们**`mock`**了甜点评论区，这项操作可以使我们对`dessertCommentModule`中的所有功能进行我们的测试定制。这里我们通过对评论功能进行**`mock return value`**，通过执行**`npm test`**看到：

![](https://imgkr.cn-bj.ufileos.com/94a1addd-c2f2-432e-b5e4-258139efc469.png)

并没有进入`dessertCommentModule`中的`comments`方法，直接返回了我们预置的返回值。

### mock implementations

```ts
test.only("comment the dessert with mock implementations", () => {
  ...
```

我们通过对评论功能进行**`mock implementations`**，通过执行**`npm test`**看到：

![](https://imgkr.cn-bj.ufileos.com/109acfdb-a159-4921-945d-9de9905b12bb.png)

进入了**`mockImplementation`**中的测试定制功能，并且调用了`dessert`中的`comments`方法。

以上。

> *https://jestjs.io/docs/en/getting-started*
>
> *https://www.valentinog.com/blog/jest/*
>
> *https://dev.to/muhajirdev/unit-testing-with-typescript-and-jest-2gln*