export const displayNumber = (number) => {
    return number > 0 ? `-$${number}` : `+$${Math.abs(number)}`
}

export const shortenString = (string, max) => {
    return string.length >= max ? `${string.substr(0, max)}...` : string
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}