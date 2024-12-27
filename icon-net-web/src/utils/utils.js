import jwt from 'jsonwebtoken';
import config from '../config.json';
import crypto from 'crypto-browserify'; // Sử dụng crypto-browserify
import Buffer from 'buffer'; // Thêm polyfill Buffer
import stream from 'stream-browserify'; // Thêm stream-browserify

const DataService = {
  jwt_rsa_private_key: config.jwt_rsa_private_key.join(""),

  getRsaToken: () => {
    const privateKey = DataService.jwt_rsa_private_key;
    const rsaPrivateKey = Buffer.from(privateKey, 'base64'); // Biến đổi base64 thành buffer

    const rsa = crypto.createPrivateKey({
      key: rsaPrivateKey,
      format: 'pem',
      type: 'pkcs1',
    });

    const payload = {
      scope: 'read:service write:service', // Claims
      iat: Math.floor(Date.now() / 1000) - (120 * 60), // issued at (120 phút trước)
      exp: Math.floor(Date.now() / 1000) + (120 * 60),  // 120 phút hết hạn
    };

    const token = jwt.sign(payload, rsa, {
      algorithm: 'RS256',
      header: {
        typ: 'JWT',
        alg: 'RS256',
      },
    });

    return token;
  }
};

export default DataService;
