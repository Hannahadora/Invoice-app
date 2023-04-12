export const generateRandomId = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomAlphabet =
        alphabet[Math.floor(Math.random() * alphabet.length)] +
        alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return randomAlphabet + randomNumber;
}
