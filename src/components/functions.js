export const displayNumber = (number) => {
    if(number > 0){
        return `-$${number}`
    }else{
        return `+$${Math.abs(number)}`
    }
}