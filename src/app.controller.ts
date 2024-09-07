import { Controller, Get } from '@nestjs/common';
import { DataService } from './data/data.controller';
// import { LoginService } from './login/login.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly dataService: DataService) {}

  // @Get('login')
  // async login() {
  //   await this.loginService.loginToWebsite();
  //   return 'Đang tiến hành đăng nhập...';
  // }

  @Get('data')
  async getData() {
    try{
      const data = await this.dataService.getData();
      return data;

    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      throw error;
    }
  }

}
