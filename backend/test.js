const { slipVerify } = require('promptparse/validate');

const data = slipVerify('0046000600000101030140225202501279EpAvqjSJkANmMDTh5102TH9104D548')

if (!data) {
    console.error('Invalid Payload')
  }
  
  console.log(data) // แสดงค่าทั้งหมดที่ได้