import { Controller, Get, Post, Put, Patch, Delete, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 위에다가 다 사용하면 전체 적용 
export class CatsController {
  constructor(private readonly catsService: CatsController) {

  }

  @Get()
  getCurrentCat() {
    return 'current cat'
  }

  @Post()
  async singUp() {
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login'
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg'
  }

}
