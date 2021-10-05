import { Component, Input, OnInit } from '@angular/core';
import { QstatsService } from '../../_services/Qstats.service';
import { DetailQstat, TopStat } from '../../_models/Qstat';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { filter, first, map, take} from 'rxjs/operators';
import $ from 'jquery';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastService } from 'src/app/core/_services/Toast.service';
import { MathsService } from 'src/app/core/_services/maths.service';

@Component({
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.sass']
})
export class TableComponent implements OnInit {
  public topStatData: Observable<TopStat> | undefined;
  private requestedQstats$: Observable<DetailQstat> | undefined;
  private wantedQstats$: Observable<DetailQstat> | undefined;
  private requestedPortals$: Observable<any> | undefined;
  public arrowMode: Observable<boolean> | undefined;
  private countryRef: BehaviorSubject<any>;
  public country$: Observable<any>;
  private idRef: BehaviorSubject<any>;
  public id: Observable<any>;
  public portals: any[] = [];
  public portalsCountry: any[] = [];
  public portalsNonCountry: any[] = [];
  private types: any[] = [];
  private firstRows: any[] = [];
  public rows: any[] = [];
  public frozenCols = [{field: 'key', header: 'Keys'}];
  private _selectedColumns: any[] | undefined;
  detailPortal: string | undefined;
  detailType: string | undefined;
  detailData: any;
  displayDetailChart: boolean | undefined;
  hoverPortal: string | undefined;
  hoverKey: string | undefined;
  topStatPop = false;
  chartOptions: any;
  chartOptionsTotal: any;
  loading: boolean = false;

  constructor(private qstatsService: QstatsService, config: NgbPopoverConfig, private route: ActivatedRoute, private tS: ToastService, private router: Router) {
    this.countryRef = new BehaviorSubject<string>('null');
    this.idRef = new BehaviorSubject<string>('null');
    this.country$ = this.countryRef.asObservable();
    this.id = this.idRef.asObservable();
    this.arrowMode = of(false);
    config.placement = 'top';
    config.triggers = 'hover';
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.idRef.next(param.id);
    });
    this.detailData = {
      labels: [],
      datasets: [
        {
          label: 'Last 30 Days',
          backgroundColor: '#42A5F5',
          data: []
        }
      ]
    };

    this.chartOptionsTotal = {
      legend: {
        labels: {
          fontColor: '#ebedef'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ebedef',
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }]
      }
    };

    this.chartOptions = {
      legend: {
        labels: {
          fontColor: '#ebedef'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#ebedef'
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#ebedef',
            beginAtZero: true,
            min: 0,
            max: 100
          },
          gridLines: {
            color: 'rgba(255,255,255,0.2)'
          }
        }]
      }
    };
  }

  async requestDataFromQstatsService(country: string, days: number) {
    this.loading = true;
    this.portals = [];
    this.portalsNonCountry = []
    this.portalsCountry = [];
    this.rows = [];
    this.firstRows = [];
    console.time('workerNew');
    this.qstatsService.getLast30(country)
      .then((data) => {
        // @ts-ignore
        this.requestedQstats$ = from(data);
      }).then(() => {
      this.requestedQstats$?.subscribe((stat) => {
        if (!this.portals.some(e => e.field === stat.portal)) {
          this.portals.push({field: stat.portal, header: stat.portal});
        }
      });
    }).then(() => {
      this.portals.sort((n1, n2) => {
        if (n1.field > n2.field) {
          return 1;
        }
        if (n1.field < n2.field) {
          return -1;
        }
        return 0;
      });
    }).then(() => {
      this.requestedQstats$?.pipe(
        take(1),
      ).subscribe(o => {
        this.types = Object.keys(o).filter(obj => obj !== 'date' && obj !== 'country' && obj !== 'portal');
      });
    }).then(() => {
      this.types.forEach(type => {
        let rowData: { [k: string]: any } = {};
        this.portals.forEach(portal => {
          let tempFirstArray: any[] = [];
          this.requestedQstats$?.pipe(
            filter(obj => obj.portal == portal.field),
          ).subscribe((row: any) => {
            tempFirstArray.push(row[type]);
          }, err => {
            console.error(err);
          }, () => {
            MathsService.average(tempFirstArray).then(avrg => {
              rowData[portal.field] = Math.round(avrg);
            });
          });
        });
        rowData.key = type;
        this.firstRows.push(rowData);
      });
    }).finally(() => {
      this.qstatsService.getLastByDay(country, days)
        .then((data) => {
          // @ts-ignore
          this.wantedQstats$ = from(data);
        }).then(() => {
        this.types.forEach((stat) => {
          let row: { [k: string]: any; } = {};
          this.portals.forEach((portal) => {
            let tempTypeArray: any[] = [];
            row[portal.field] = 0;
            this.wantedQstats$?.pipe(
              filter(obj => obj.portal == portal.field),
            ).subscribe((row: any) => {
              tempTypeArray.push(row[stat]);
            }, err => {
              console.error(err);
            }, () => {
              MathsService.average(tempTypeArray).then(avrg => {
                row[portal.field] = Math.round(avrg);
              });
            });
          });
          row.key = stat;
          this.rows.push(row);
        });
      }).then(() => {
        let row: { [k: string]: any } = {};
        this.wantedQstats$?.subscribe(stat => {
          let key = stat.portal;
          row[key] = (row[key] || 0) + 1;
        });
        return row;
      }).then(row => {
        this.portals.forEach(portal => {
          if (row[portal.field]) {
            row[portal.field] = row[portal.field] + `/${days + 1}`;
          }
        });
        row.key = 'Days';
        this.rows.push(row);
      }).finally(() => {
        this.qstatsService.getPortalsForCountry(country)
          .then(data => {
              // @ts-ignore
            this.requestedPortals$ = from(data);
          }).then(() => {
          this.requestedPortals$?.subscribe((portal) => {
            if (!this.portalsCountry.some(e => e.field === portal.portal)) {
              this.portalsCountry.push({field: portal.portal, header: portal.portal});
            }
          });
        }).then(() => {
          this.portalsCountry.sort((n1, n2) => {
            if (n1.field > n2.field) {
              return 1;
            }
            if (n1.field < n2.field) {
              return -1;
            }
            return 0;
          });
        }).then(() => {
          this.portalsNonCountry = this.portals.filter(x => !this.portalsCountry.some(e => e.field === x.field));
        }).finally(() => {
          this._selectedColumns = this.portals;
          console.timeEnd('workerNew');
          this.loading = false;
        });
      });
    });
  }

  /**
   * Returns selected Columns
   */
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns!;
  }

  /**
   * searches for the first rows of a specific key and type
   *
   * @param key key to search
   * @param type type to search
   */
  checkFirsRows(key: string, type: string) {
    if (key != 'Days') {
      return this.firstRows.find(i => i.key == key)[type];
    }
  }

  isInCountry(portal: string){
    return this.portalsCountry.some(e => e.field === portal)
  }

  loadStats(event: any){
    setTimeout(() => {
      this.id.subscribe(id => this.countryRef.next(id));
      this.id.subscribe(id => this.requestDataFromQstatsService(id, 6));
    }, 1000)
  }

  setColumns(arr: any[]){
    this._selectedColumns = arr;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.portals.filter(col => val.includes(col));
  }

  /**
   * returns the value by key in first Rows
   *
   * @param index index in first rows
   * @param key key to get value from
   */
  public valueToKey(index: number, key: string): number {
    return this.firstRows[index][key];
  }

  logg(type: string, field: string) {
    this.detailType = type;
    this.detailPortal = field;
    this.displayDetailChart = true;
  }

  /**
   * function to return chart data by portal and type
   *
   * @param portal portal for chart data
   * @param key key for chart data
   */
  async getData(portal: any, key: any) {
    if (portal === 'key') {
      return;
    }
    if (this.hoverPortal === portal && this.hoverKey === key) {
      return;
    }
    this.hoverKey = key;
    this.hoverPortal = portal;

    let o: { [k: string]: any; } = {};
    // @ts-ignore
    let arr: any[] = [];
    let time: any[] = [];
    this.requestedQstats$?.subscribe(qstat => {
      if (qstat.portal === portal) {
        // @ts-ignore
        arr.push(qstat[key]);
        time.push(new Date(qstat['date']).getDate());
      }
    });
    this.detailData.labels = time;
    this.detailData.datasets[0].data = arr;
    if (key === 'total') {
      this.chartOptions.scales.yAxes[0].ticks.max;
    }
  }

  routeToDetail(field: any, key: string) {
    if (!key.includes('top')) {
      this.router.navigate(['qstats/detailed/', this.countryRef.value, field, key]);
    } else {
      this.qstatsService.topStats(field, this.countryRef.value, key, new Date())
        .then(data => {
          // @ts-ignore
          data[0].vals = data[0].vals.split(',');
          this.topStatPop = true;
          // @ts-ignore
          this.topStatData = from(data);
          console.dir(data);
        });
    }
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.rows);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // @ts-ignore
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + this.countryRef.value + '_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  switchArrowMode(): void {
    this.arrowMode?.subscribe(mode => {
      this.arrowMode = of(!mode);
      if (mode) {
        $('.even').parents('.hide').css('display', 'none');
      } else {
        $('.even').parents('.arrow').css('display', 'block');
      }
    });

  }
}
