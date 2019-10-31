import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = '126836ac49694195af86d8077fe5ab2f';
  constructor(private httpClient: HttpClient) { }

  getNews(){
 return this.httpClient.get(`https://newsapi.org/v2/top-headlines?country=india&category=business&apiKey=126836ac49694195af86d8077fe5ab2f`);
    }

}

