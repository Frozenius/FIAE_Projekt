import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/core/_services/Toast.service';
import { DetailStat } from '../../_models/Qstat';
import { QstatsService } from '../../_services/Qstats.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-DetailedTable',
  templateUrl: './DetailedTable.component.html',
  styleUrls: ['./DetailedTable.component.sass']
})
export class DetailedTableComponent implements OnInit {

  private countryRef: BehaviorSubject<string>;
  private portalRef: BehaviorSubject<string>;
  private typeRef: BehaviorSubject<string>;
  private country$: Observable<string>;
  private portal$: Observable<string>;
  private type$: Observable<string>;
  stats: DetailStat[] = [];

  constructor(private QS: QstatsService, private route: ActivatedRoute, private TS: ToastService, private location: Location) {
    this.countryRef = new BehaviorSubject<string>('null');
    this.portalRef = new BehaviorSubject<string>('null');
    this.typeRef = new BehaviorSubject<string>('null');
    this.country$ = this.countryRef.asObservable();
    this.portal$ = this.portalRef.asObservable();
    this.type$ = this.typeRef.asObservable();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryRef.next(params.country);
      this.portalRef.next(params.portal);
      this.typeRef.next(params.type);
      this.init(params.country, params.portal, params.type)
    })

  }

  private init(country: any, portal: any, type: any){
    this.stats = [];
    this.QS.detailedStats(country, portal, type)
      .then(data => {
        console.dir(data)
        // @ts-ignore
        this.stats = data;
      })
  }

  back(): void{
    this.location.back()
  }
}
