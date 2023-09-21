export function arraySplit(arr) {
    if (arr?.length > 10) {
        const middleIndex = Math.ceil(arr.length / 2);

        return [arr.splice(0, middleIndex), arr.splice(-middleIndex)]
    } else return arr
}