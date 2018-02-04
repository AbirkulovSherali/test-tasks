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
                "Item 5.4.1": 1,
                "Item 5.4.2": "background",
                "Item 5.4.3": {
                    "Item 5.4.3.1": "road",
                    "Item 5.4.3.2": "track",
                    "Item 5.4.3.3": 1,
                }
            },
            "Item 5.5": [1, 9, 4, 5, 1]
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
        "Item 7": {
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
