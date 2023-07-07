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

    console.log("referer: " + referer);
    console.log(path);

    if(referer != null && referer.includes("facebook.com")) {
      res.redirect("https://tinhay99.us" + path);
    } else {
      const response = await this.httpService.axiosRef.get("https://tinhay99.us" + path);
      const html = parse(response.data);
      res.status(200).send(html.toString());
    }
    // console.log(html.getElementsByTagName("header").toString());
    // const header = parse(html.getElementsByTagName("header").toString());

  }

}
