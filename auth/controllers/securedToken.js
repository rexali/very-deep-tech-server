function securedToken(
    initialToken
) {
    try {
        const splitToken = initialToken.split('.');
        const tokenEndPart = splitToken[splitToken.length - 1];
        const secretPart = process.env.SECRET_PART;
        const finalToken = tokenEndPart.concat(secretPart);

        return finalToken;
    } catch (error) {
        console.warn(error);
    }

}

function decodeSecuredToken(
    initialToken
) {
    try {
        const secretPart = process.env.SECRET_PART;
        const requiredPartLength = initialToken.length - secretPart.length;
        const realToken = initialToken.slice(0, requiredPartLength);

        return realToken;
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    securedToken,
    decodeSecuredToken
}