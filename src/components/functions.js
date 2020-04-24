export const displayNumber = (number) => {
    if(number > 0){
        return `-$${number}`
    }else{
        return `+$${Math.abs(number)}`
    }
}

export const shortenString = (string, max) => {
    if(string.length >= max){
        return `${string.substr(0, max)}...`
    }else{
        return string
    }
}