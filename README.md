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
    let prop;
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
