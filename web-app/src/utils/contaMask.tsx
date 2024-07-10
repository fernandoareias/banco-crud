export function contaMask(input: string): string {

    if(input.length !== 6) return input;
 
    return `${input.slice(0, 5)}-${input.slice(5)}`;
}

export function removerContaMask(input: string): string {
    return input.replace('-', '');
}