import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private urlBaseApi: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getProdutos(pageNo, pageSize, sortBy): Observable<any> {

    return this.httpClient.get<Produto[]>(this.urlBaseApi + '/produtos', {params: {pageNo, pageSize, sortBy}});
  }
}
