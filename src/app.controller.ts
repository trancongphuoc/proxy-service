import { Controller, Get, Render } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { parse } from 'node-html-parser';
import { Req } from '@nestjs/common';
import {Request} from 'express';

@Controller()
export class AppController {
  data:any;
  constructor(private readonly httpService: HttpService) { 
  }
  
  @Get("/*")
  // @Render('index')
  async getHello(@Req() req: Request) {
    let path = req.path;
    const response = await this.httpService.axiosRef.get("https://thaihd24h.com" + path);
    let html = response.data;
    return html;
  }

}
