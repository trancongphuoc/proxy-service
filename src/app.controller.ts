import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { parse } from 'node-html-parser';
import {Request, Response} from 'express';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) { 
  }
  
  @Get("/*")
  // @Render('index')
  async getHello(@Req() req: Request, @Res() res: Response) {
    
    let referer = req.headers.referer;
    let path = req.path;

    console.log(referer);
    console.log(path);

    if(referer == "https://www.facebook.com/") {
      res.redirect("https://thaihd24h.com" + path);
    } else {
      const response = await this.httpService.axiosRef.get("https://thaihd24h.com" + path);
      const html = parse(response.data);
      res.status(200).send(html.toString());
    }
    // console.log(html.getElementsByTagName("header").toString());
    // const header = parse(html.getElementsByTagName("header").toString());

  }

}
