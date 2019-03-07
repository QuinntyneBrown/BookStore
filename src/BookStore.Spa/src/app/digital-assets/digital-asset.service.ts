import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DigitalAssetService {
  constructor(
    private _client: HttpClient
  ) { }

  public upload(options: { data: FormData }): Observable<{ urls: string[] }> {    
    return this._client.post<{ urls: string[] }>(`${this._baseUrl}api/digitalAssets`,
      options.data);
  }  
  
  private get _baseUrl() { return environment.baseUrl; }
}
