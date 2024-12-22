
/**
 * HTML message for change of password
 * @param {string} email - email address
 * @param {string} code - randomly generated code
 * @returns string of text
 */
function confirmHTMLMSG(email, code) {
    try {

        return `
    <html>
    <body>
    <h1>Hi there,</h1>
    <p>If you register with cShop, please confirm your registeration:
    <a href="https://very-deep-tech-client.vercel.app/confirm?rcode=${code}&email=${email}">
    Confirm Registeration</a>.
    </p>
    <p style="font-size:18px;">Otherwise ignore this message.</P>
    <p style="font-size:18px;">Thank you.</P>
    </body></html>
    `;
    } catch (error) { 
        console.warn(error);
    }

}

module.exports = {
    confirmHTMLMSG
}