## Тестовое задание
### Описание
1. Необходимо выполнить поиск по дереву объекта: найти все значения равные единице и вывести их пути нахождения (в консоль браузера). 
Типами свойств могут быть строки, массивы, числа, а так же вложенные объекты.
2. Выполнить рендеринг первого задания с помощью блочных элементов так, чтобы была видна четкая структура дерева,
закрасить цветом блоки, в которых отрисовываются найденные значения.
3. Выполнить выше перечисленные задания с использованием сборщика модулей Webpack.

#### 1. Поиск указанных значений
```javascript
/* Задание 1: вывод путей свойств дерева со значением '1' */
function getValue1(tree, curPath = ''){
    let prop; let prevPath;
    for(prop in tree){
        if(tree[prop] === 1){
            console.log(tree[prop], curPath + prop);
        }

        if(Array.isArray(tree[prop])){
            for(let i = 0; i < tree[prop].length; i++){
                if(tree[prop][i] === 1) {
                    console.log(tree[prop][i], curPath + i);
                }
            }

            continue;
        }

        if(typeof(tree[prop]) === 'object'){
            prevPath = curPath;
            curPath += prop + ' > ';
            getValue1(tree[prop], curPath);
            curPath = prevPath;
        }
    }
}
```
Функция принимает 2 аргумента, последний используется для замыкания и его не нужно передавать при вывозове функции: объекто-дерево, текущий путь
```javascript
getValue1(tree) 
```
В цикле проходимся по свойствам объекта, и если значение свойства равно единице, то выводим значение свойства и его путь в консоль
```javascript
/* Начало внешнего цикла */
for(prop in tree){
    if(tree[prop] === 1){
        console.log(tree[prop], curPath + prop);
    }
/*...................*/
```
Если значение свойства является массивом, то перебираем его с помощью цикла for, так как если этого не сделать,
то массив будет перебераться в цикле for...in, которые желательно не использовать при трассировке массива с индексами из-за того, что он так же может перебрать не только элементы, но и свойства массива, которые нам не нужны. После трассирвоки массива пропускаем текущую итерацию внешнего массива, чтобы он не попал под перебор внешнего цикла for...in
```javascript
/*...................*/
    if(tree[prop] === 1){
        if(Array.isArray(tree[prop])){
            for(let i = 0; i < tree[prop].length; i++){
                if(tree[prop][i] === 1) {
                    console.log(tree[prop][i], curPath + i);
                }
            }

            continue;
        }
    }
/*...................*/
```
Если значением свойства является объект, то сохраняем текущий путь, формируем новый путь и вызываем саму фукнцию уже с новым путем. Так после каждого завершения рекурсии управление передается фукнции на уровень выше со всеми сохраненными значениеями и переменная curPath принимает значение переменно prevPath. Таким образом формируется путь curPath
```javascript
/*...................*/
    if(typeof(tree[prop]) === 'object'){
        prevPath = curPath;
        curPath += prop + ' > ';
        getValue1(tree[prop], curPath);
        curPath = prevPath;
    }
}
/* Конец внешнего цикла *
```
#### 2. Рендеринг дерева с помощь блочных элементов DOM
```javascript
/* Задание 2: рендеринг дерева */
function renderTree(tree, el){
    let prop;
    for(prop in tree){
        let div = document.createElement('div');

        if(typeof(tree[prop]) !== 'object'){
            div.innerText = tree[prop];

            if(tree[prop] === 1)
                div.style.background = '#ccc';

            el.appendChild(div);
        } else {
            if(Array.isArray(tree[prop])){
                for(let i = 0; i < tree[prop].length; i++){
                    let div = document.createElement('div');

                    if(tree[prop][i] === 1)
                        div.style.background = '#ccc';

                    div.innerText = tree[prop][i];
                    el.appendChild(div);
                }

                continue;
            }

            el.appendChild(div);
            renderTree(tree[prop], div);
        }
    }
}
```
Функция принимает 2 аргумента: объект-дерево, DOM-элемент, в котором будет отрисовываться блочная иерархия дерева
```javascript
renderTree(tree, el)
```
В цикле проходимся по дереву аналогично предыдущей функции и на каждой итерации создаем div-элемент
```javascript
/* Начало внешнего цикла for...in */
    for(prop in tree){
        let div = document.createElement('div');
    /*.....................*/
```
Если свойств не является объектом, то отрисовываем его в созданном блоке. Если значение свойства равно единице,
закрашиваем блок в серый цвет, после чего добавляем div в выбранный DOM-элемент
```javascript
/*.....................*/
    if(typeof(tree[prop]) !== 'object'){
        div.innerText = tree[prop];

        if(tree[prop] === 1)
            div.style.background = '#ccc';

        el.appendChild(div);
    }
/*.....................*/
```
Если значение свойства является объектом, то сначала проверим, является ли значение массивом. Если значение является массивом, то перебираем его с помощью цикла for по указанным причинам из первого задания. На каждой итерации создаем элемент, отирисовываем в нем значение и если значение равно единице, закрашиваем блок в серый цвет. И наконец, добавлем блок в указанный DOM-элемент, после чего пропускаем текущую итерацию внешнего цикла, чтобы массив повторно не перебрался через цикл for...in
```javascript
/*.....................*/
    else {
        if(Array.isArray(tree[prop])){
            for(let i = 0; i < tree[prop].length; i++){
                let div = document.createElement('div');

                if(tree[prop][i] === 1)
                    div.style.background = '#ccc';

                div.innerText = tree[prop][i];
                el.appendChild(div);
            }

            continue;
        }
/*.....................*/
```
Если свойство является объектом, то добавляем в выбранный DOM-элемент div и рекурсивно вызываем функцию с новым элементом div, в котором будут отрисовывать вложенные элемены
```javascript
/*.....................*/
            el.appendChild(div);
            renderTree(tree[prop], div);
        }
    }
/* Конец внешнего цикла for...in */
```
#### 3. Использование сборщика модулей Webpack
Структура проекта:
  - dist
    - bundle.js
  - src
    - functions.js
    - main.js
  - index.html
  - package.json
  - webpack.config.js
#### Описание файла webpack.config.js:
Подключение модулей path и самого Webpack. В качестве входной точки указываем файл src/main.js,
а в качестве выходного файла - dist/bundle.js. Прописываем некоторые правила для транспайлинга ES2015 для корректной работы во всех браузерах при использовании некоторых новых возможностей в синтаксисе. Предварительно нужно установить транспайлер Babel.js
```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}
```
#### Описание файла functions.js:
Функции, указанные в этом файл экспортируются для возможности импорта в другом файле
```javascript
/* Задание 1: вывод путей свойств дерева со значением '1' */
function getValue1(tree, curPath = ''){
    let prop; let prevPath;
    for(prop in tree){
        if(tree[prop] === 1){
            console.log(tree[prop], curPath + prop);
        }

        if(Array.isArray(tree[prop])){
            for(let i = 0; i < tree[prop].length; i++){
                if(tree[prop][i] === 1) {
                    console.log(tree[prop][i], curPath + i);
                }
            }

            continue;
        }

        if(typeof(tree[prop]) === 'object'){
            prevPath = curPath;
            curPath += prop + ' > ';
            getValue1(tree[prop], curPath);
            curPath = prevPath;
        }
    }
}

/* Задание 2: рендеринг дерева */
function renderTree(tree, el){
    let prop;
    for(prop in tree){
        let div = document.createElement('div');

        if(typeof(tree[prop]) !== 'object'){
            div.innerText = tree[prop];

            if(tree[prop] === 1)
                div.style.background = '#ccc';

            el.appendChild(div);
        } else {
            if(Array.isArray(tree[prop])){
                for(let i = 0; i < tree[prop].length; i++){
                    let div = document.createElement('div');

                    if(tree[prop][i] === 1)
                        div.style.background = '#ccc';

                    div.innerText = tree[prop][i];
                    el.appendChild(div);
                }

                continue;
            }

            el.appendChild(div);
            renderTree(tree[prop], div);
        }
    }
}

export default {
    getValue1: getValue1,
    renderTree: renderTree
}
```
#### Описание файла main.js:
В этом файле импортируются функции из файла main.js и их выполнение над структурным деревом
```javascript
import functions from './functions';

window.onload = function() {

    let trunk = {
        "Item 1": 1,
        "Item 2": {
            "Item 2.1": "blue",
            "Item 2.2": 1,
            "Item 2.3": {
                "Item 2.3.1": 1,
                "Item 2.3.2": "green"
            }
        },
        "Item 3": 2,
        "Item 4": 'red',
        "Item 5": {
            "Item 5.1": 1,
            "Item 5.2": {
                "Item 5.2.1": "color",
                "Item 5.2.2": "tree",
                "Item 5.2.3": 1,
            },
            "Item 5.3": "apple",
            "Item 5.4": {
                "Item 5.3.1": 1,
                "Item 5.3.2": "background",
                "Item 5.3.3": {
                    "Item 5.3.3.1": "road",
                    "Item 5.3.3.2": "track",
                    "Item 5.3.3.3": 1,
                }
            },
            "Item 5.4": [1, 9, 4, 5, 1]
        },
        "Item 6": {
            "Item 6.1": "january",
            "Item 6.2": "may",
            "Item 6.3": {
                "Item 6.3.1": 34,
                "Item 6.3.2": 4,
                "Item 6.3.3": 15,
            }
        },
        "Item7": {
            "Item 7.1": "global",
            "Item 7.2": 1,
            "Item 7.3": {
                "Item 7.3.1": "video",
                "Item 7.3.2": {
                    "Item 7.3.2.1": 1
                },
                "Item 7.3.3": 3,
                "Item 7.3.4": {
                    "Item 7.3.4.1": 1
                }
            }
        }
    };

    /* Задание 1 */
    functions.getValue1(trunk);

    /* Задание 2 */
    let el = document.getElementById('treeBlock');
    functions.renderTree(trunk, el);
}
```
И наконец, весь код перчисленных файлов собирается в модули, в файл dist/bundle.js и подключается в индексной странице
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <style>

        #treeBlock {
            width: 800px;
            border: 1px solid #ccc;
            margin: 0 auto;
        }

        #treeBlock div {
            border: 1px solid #000;
            padding: 10px;
            margin: 7px 7px;
        }

    </style>

    <div id="treeBlock"></div>

    <script src="dist/bundle.js"></script>
</body>
</html>

```
