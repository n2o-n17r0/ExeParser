
export default class Bytes {
  static byteToHex(byte) {
    return byte.toString(16).toUpperCase().padStart(2, '0');
  }

  static hexToByte(hex) {
    return parseInt(hex, 16);
  }

  static arrayToHex(arr, align = 0) {
    return "00".repeat(Math.max(0, align - arr.length)) + arr.slice().reverse().map(num => Bytes.byteToHex(num)).join('');
  }

  static hexToArray(hexs) {
    let arr = hexs.match(/[a-zA-Z\d]{2}/g).map(hex => Bytes.hexToByte(hex)).reverse();
    while (arr.length > 0) {
      let n = arr.pop();
      if (n !== 0) {
        arr.push(n);
        break;
      }
    }
    return arr;
  }

  static arrayToNumber(arr) {
    return arr.map((num, pos) => (256**pos) * num).reduce((acc, num) => acc + num);
  }

  static numberToArray(num) {
    let arr = [];
    while (num > 0) {
      arr.push(num % 256);
      num = (num - num % 256) / 256;
    }
    return arr;
  }

  // Возвращает массив байт на основе строки смиволов (каждый символ - 1 байт), например "MZ" => [77, 90]
  static stringToArray(str) {
    return [...str].map(s => s.charCodeAt(0));
  }

  // Возвращает строку символов на основе массива байт, например [77, 90] => "MZ"
  static arrayToString(arr, align = 0) {
    return arr.map(num => String.fromCharCode(num)).join('');
  }

  // Переводит число в шеснадцатеричное представление и использует выравнивание если указано
  static numberToHex(num, align = 0) {
    return Bytes.arrayToHex(Bytes.numberToArray(num), align);
  }

  // Переводит шеснадцатеричное число в десятичнное представление
  static hexToNumber(hex) {
    return Bytes.arrayToNumber(Bytes.hexToArray(hex));
  }
}
