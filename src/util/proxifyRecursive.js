const proxifyRecursive = (obj, handler) => {
    const mapped = Object.keys(obj).reduce((acc, key) => {
        let val = obj[key];

        if (typeof val === "object") {
            val = proxifyRecursive(val, handler);
        }

        acc[key] = val;

        return acc;
    }, new obj.constructor());

    return new Proxy(mapped, handler);
};

export default proxifyRecursive;
