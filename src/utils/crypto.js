import CryptoJS from 'crypto-js'

export function encrypt(data,encryptkey) {
  let keyutf8 = CryptoJS.enc.Utf8.parse(encryptkey)
  let ivutf8 = CryptoJS.enc.Utf8.parse(encryptkey)
  let srcs=CryptoJS.enc.Utf8.parse(data);
  var encrypted = CryptoJS.AES.encrypt(srcs, keyutf8, {
      iv: ivutf8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decrypt(data,encryptkey) {
  let keyutf8 = CryptoJS.enc.Utf8.parse(encryptkey)
  let ivutf8 = CryptoJS.enc.Utf8.parse(encryptkey)
  let base64 = CryptoJS.enc.Base64.parse(data);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, keyutf8, {
    iv: ivutf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}