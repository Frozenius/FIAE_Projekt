import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { ToastService } from 'src/app/core/_services/Toast.service';
import { DetailQstat, DetailStat } from '../_models/Qstat';

const qstatsUrl = `${environment.qstatsUrl}`;
const portalUrl = `${environment.portalUrl}`;

@Injectable({
  providedIn: 'root'
})
export class QstatsService {

  constructor(private http: HttpClient, private TS: ToastService) {
  }

  async getLastByCountry(country: string) {
    return this.http.get<any>(qstatsUrl + `/${country}`);
  }

  /**
   * REST GET for qstats by days given
   *
   * @param country short code of country you want to request
   * @param days last days of qstats you want to request
   */
  async getLastByDay(country: string, days: number) {
    return this.http.get<any>(qstatsUrl + `/${country}/${days}`)
      .toPromise()
      .then(res => <DetailQstat[]> res.data)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        this.TS.error(error.message);
      });
  }

  /**
   * REST GET for the last 30 days of qstats
   *
   * @param country short code of country you want to request
   */
  async getLast30(country: string) {
    return this.http.get<any>(qstatsUrl + `/${country}/30`)
      .toPromise()
      .then(res => <DetailQstat[]> res.data)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        this.TS.error(error.message);
      });
  }

  async detailedStats(country: string, portal: string, type: string) {
    return this.http.get<any>(qstatsUrl + `/${country}/${portal}/${type}`)
      .toPromise()
      .then(res => <DetailStat[]> res.data)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        this.TS.error(error.message);
      });
  }

  async topStats(portal: string, country: string, type: string, date: Date) {
    let today = date.toISOString().split('T')[0];
    return this.http.get<any>(qstatsUrl + `/${portal}/${country}/${type}/${today}`)
      .toPromise()
      .then(res => <any[]> res.data)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        this.TS.error(error.message);
      });
  }

  async getPortalsForCountry(country: string) {
    return this.http.get<any>(portalUrl + `/${country}`)
      .toPromise()
      .then(res => <any[]> res.data)
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        this.TS.error(error.message);
      });
  }

}
