/* Задание 1: вывод путей свойств дерева со значением '1' */
function getValue1(tree, curPath = '', prevPath = ''){
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
