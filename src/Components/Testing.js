let array = [
    {
        id: 14,
        values: 'SALES ORDER NO',
    },
    {
        id: 15,
        values: 'abc',
    }
]

let object = {
    'SALES ORDER NO': 14,
    'abc': 1313131
}

let data = []
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    let datas;
    for (const [key, value] of Object.entries(object)) {
        if (element.values == key) {
        //    datas.key[object] = element.values
        console.log('key');
        }
    }
    if (datas) {
        data.push(datas)
    }  
}