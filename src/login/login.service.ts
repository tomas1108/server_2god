// import { Injectable } from '@nestjs/common';
// import * as puppeteer from 'puppeteer';
// import { ref } from '../firebase/firebase.config'; // Import ref from firebase.config

// @Injectable()
// export class LoginService {
//   private readonly dbRef = ref.child('pawnData'); // Lưu vào path 'pawnData'

//   async loginToWebsite() {
//     const browser = await puppeteer.launch({
//       headless: true, // Đặt là true để ẩn trình duyệt
//       executablePath: puppeteer.executablePath(), // Đường dẫn đến Chrome được cài đặt bởi Puppeteer
//       args: ['--no-sandbox', '--disable-setuid-sandbox'], // Các tùy chọn cần thiết cho Puppeteer
  
//     });


//     const page = await browser.newPage();

//     // Truy cập trang web
//     await page.goto('https://2gold.biz/', { waitUntil: 'networkidle2', timeout: 100000 });

//     // Thực hiện các bước đăng nhập
//     await page.type('#Username', 'Taotao');
//     await page.type('#Password', '546798Aa');
//     await page.click('#m_login_signin_submit');
//     await this.delay(5000);

//     // Điều hướng đến phần mong muốn
//     await page.click("#titleInstallment > i");
//     await this.delay(6000);

//     // Trích xuất dữ liệu
//     const data = await page.$$eval('#pawn_data tr', rows => {
//       return rows.map(row => {
//         const columns = row.querySelectorAll('td');
//         return Array.from(columns).map(column => column.textContent.trim());
//       });
//     });
//     await this.delay(2000);

//     // Định dạng lại dữ liệu
//     const formattedData = this.formatData(data);
//     console.log('Formatted Data:', formattedData);

//     // Đẩy dữ liệu lên Firebase Realtime Database
//     await this.pushToFirebase(formattedData);

//     // Kiểm tra sự xuất hiện của selector
//     try {
//       await page.waitForSelector('#dvBtn > div > button.btn.btn-info.m-btn.m-btn--custom.m-btn--icon.m-btn--air.btn-sm', { timeout: 10000 });
//       console.log('Get data success');
//     } catch (error) {
//       console.log('error', error);
//     }

//     // Đóng trình duyệt
//     await browser.close();
    
//     return formattedData;
//   }

//   private async delay(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   private formatData(rawData: string[][]): any {
//     return rawData.map(item => ({
//       maHD: item[0] || null,
//       khachHang: item[1] || null,
//       diaChi: item[2] || null,
//       noCu: item[3] || null,
//       tienCanDong: item[4] || null,
//       lyDo: item[5] || null,
//       trangThai: item[6] || null,
//     }));
//   }
  
//   private async pushToFirebase(data: any) {
//     const promises = data.map(item => {
//       const newRef = this.dbRef.push(); // Tạo một reference mới trong 'pawnData'
//       return newRef.set(item);
//     });

//     // Đợi tất cả các promises hoàn thành
//     await Promise.all(promises);
//     console.log('Data successfully uploaded to Firebase Realtime Database');
//   }
// }
