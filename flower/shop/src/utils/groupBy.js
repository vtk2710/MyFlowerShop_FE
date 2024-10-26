function purry(fn, args, lazy) {
    const diff = fn.length - args.length;
    if (diff === 0) {
        return fn(...args);
    }
    if (diff === 1) {
        return lazyDataLastImpl(fn, args, lazy);
    }
    throw new Error("Wrong number of arguments");
}
export function groupBy(...args) {
    return purry(groupByImplementation, args);
}
const groupByImplementation = (data, callbackfn) => {
    const output = {};
    for (const [index, item] of data.entries()) {
        const key = callbackfn(item, index, data);
        if (key !== undefined) {
            let { [key]: items } = output;
            if (items === undefined) {
                items = [];
                output[key] = items;
            }
            items.push(item);
        }
    }
    return output;
};