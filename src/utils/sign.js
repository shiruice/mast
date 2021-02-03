/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-27 18:03:31
 */
import SM2 from "@/lib/sm2/sm2";
import { b64tohex, hex2b64 } from '@/lib/sm2/base64';
import { base64_encode } from '@/lib/sm2/base64-all';

let prvkey = "Fs9AF7Qsm12UnnwAaCsdmXX2jrxd0SDE7MTvz0bI5Zs=";
let prvkeyHex = b64tohex(prvkey);

const creatSign = config => {
  //接口数据加密
  let timestamp = new Date().getTime();
  let sig = new SM2.KJUR.crypto.Signature({"alg": "SM3withSM2", "prov": "cryptojs/jsrsa"});
  sig.initSign({'ecprvhex': prvkeyHex, 'eccurvename': "sm2"});
  //sig.updateString("helloworld");
  let sParams = config.params ? JSON.stringify(config.params).replace(/\"/g, '') : "";
  let sBody = config.data ? Object.prototype.toString.call(config.data) == "[object String]" ? config.data : JSON.stringify(config.data) : "";
  // console.log(config.url);
  // console.log(sParams);
  // console.log(sBody);
  // console.log(timestamp);
  let str = config.url.split("-service")[1] + sParams + sBody + timestamp;
  // console.log(str);
  let strBase64 = base64_encode(str).substr(-60);
  // console.log(strBase64);
  sig.updateString(strBase64);
  let sigValueHex = hex2b64(sig.sign());
  // console.log(sigValueHex);
  config.headers["timestamp"] = timestamp;
  config.headers["sign"] = sigValueHex;
}

export default { creatSign };