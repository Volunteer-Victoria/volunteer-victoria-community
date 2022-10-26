export const addHeader = (text: string) => {
    const header = document.createElement('header');
    header.innerText = text
    document.querySelector('body').appendChild(header)
}