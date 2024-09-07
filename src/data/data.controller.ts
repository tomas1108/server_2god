// data.service.ts
import { Injectable } from '@nestjs/common';
import { db } from '../firebase/firebase.config'; // Đảm bảo đường dẫn chính xác
import { ref, get } from 'firebase/database';

@Injectable()
export class DataService {
  private dbRef = ref(db, 'rawData'); // Lưu vào path 'pawnData'

  // Hàm để lấy dữ liệu từ Firebase và trả về dưới dạng JSON
  async getData(): Promise<any> {
    try {
      // Lấy dữ liệu từ Firebase
      const snapshot = await get(this.dbRef);

      // Kiểm tra nếu dữ liệu tồn tại
      if (snapshot.exists()) {
        // Trả về dữ liệu dưới dạng JSON
        return snapshot.val();
      } else {
        // Nếu không có dữ liệu
        console.log('No data available');
        return {}; // Trả về đối tượng rỗng
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error fetching data from Firebase:', error);
      throw error;
    }
  }
}
