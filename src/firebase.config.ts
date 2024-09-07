import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;
  private database: admin.database.Database;

  onModuleInit() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://checkinface-56754-default-rtdb.asia-southeast1.firebasedatabase.app',
    });

    this.database = admin.database(this.app);
  }

  getDatabase() {
    return this.database;
  }
}
