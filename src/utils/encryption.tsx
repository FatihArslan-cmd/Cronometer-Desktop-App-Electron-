import crypto from 'crypto';

const algorithm = 'aes-256-cbc';  // AES-256 şifreleme algoritması
const secretKey = crypto.randomBytes(32);  // Rastgele bir şifreleme anahtarı
const iv = crypto.randomBytes(16);  // Giriş vektörü

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), content: encrypted };
};

export const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    let decrypted = decipher.update(hash.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
