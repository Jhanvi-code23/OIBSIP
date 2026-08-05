// Hashing function for password encryption
// we store this hash instead of the actual password
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); //converts string to bytes
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); //generated SHA-256 hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); //convert buffer to readable hexadecimal string

    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); //return the hash as a string
}

/* example- password is hello1234
           it will be stored as some random string of 
           64 characters in the database instead of hello1234
           like this: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 */