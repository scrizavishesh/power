// encryptionFunctions.js
import CryptoJS from 'crypto-js';

// Read the secret key from environment variables
const secretKey = "vishesh_tomer_data_kaha_se_lo_ge_fastPay_ka_access"

// Encrypt data using AES
export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
}

// Decrypt data using AES
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}


