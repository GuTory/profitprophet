import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../auth/model/user.interface";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  uploadMoney(value: number): Observable<UserInterface> {
    return this.http.post<UserInterface>(environment.localBackendBaseUrl + environment.uploadmonyeUrl, {amount: value});
  }
}
