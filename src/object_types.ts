const function1 = ():void => {
    console.log('this is function1');
}

const function2 = ():void => {
    console.log('this is function2');
}

interface House {
    [whatisthis: string]: Function
}

const house: House = {
    location: function2,
    'size': function1,
    // 'rooms': 'two',
}

for (const h in house) {
    console.log(house[h]);
}

Object.entries(house).forEach(
    ([keywhatever, valuewhatever]): void => {
        console.log(`key is ${keywhatever} and value is ${valuewhatever}`);
    },
);
