let count = 0;
const inc = () => {
    return ++count;
}

const dec = () => {
    return --count;
}

const getCount = () => {
    return count;
}

module.exports = {
    anything: true,
    who: "bill",
    count,
    inc,
    dec,
    getCount
};