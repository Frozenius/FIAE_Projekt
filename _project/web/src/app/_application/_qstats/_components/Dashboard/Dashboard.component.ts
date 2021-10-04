import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QstatsService } from '../../_services/Qstats.service';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  selectedCountry: any;
  selectedDays: any;

  countries$: any[] = [];
  days$: any[] | undefined;
  constructor(private qstats: QstatsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.days$ = [
      {name: 1, floor: 0},
      {name: 2, floor: 1},
      {name: 3, floor: 2},
      {name: 4, floor: 3},
      {name: 5, floor: 4},
      {name: 6, floor: 5},
      {name: 7, floor: 6}
    ];
    this.countries$ = [
      {name: "Germany", code: "de", floor: 0, short: "DE"},
      {name: "France", code: "fr", floor: 1, short: "FR"},
      {name: "Spain", code: "es", floor: 2, short: "ES"},
      {name: "Portugal", code: "pt", floor: 3, short: "PT"},
      {name: "Luxembourg", code: "lu", floor: 4, short: "LU"},
      {name: "United States", code: "us", floor: 5, short: "US"},
      {name: "Italia", code: "it", floor: 6, short: "IT"},
      {name: "Austria/AU", code: "at", floor: 7, short: "AU"},
      {name: "Austria/AT", code: "at", floor: 7, short: "AT"},
      {name: "Switzerland", code: "ch", floor: 8, short: "CH"},
      {name: "Belgium", code: "be", floor: 9, short: "BE"},
      {name: "Netherlands", code: "nl", floor: 10, short: "NL"},
      {name: "United Kingdom", code: "gb", floor: 11, short: "UK"},
      {name: "Canada", code: "ca", floor: 12, short: "CA"},
      {name: "Ireland", code: "ie", floor: 13, short: "IE"},
      {name: "Denmark", code: "dk", floor: 14, short: "DK"},
      {name: "Poland", code: "pl", floor: 15, short: "PL"},
      {name: "Norway", code: "no", floor: 16, short: "NO"},
      {name: "Sweden", code: "se", floor: 17, short: "SE"},
      {name: "Australia", code: "au", floor: 18, short: "AS"},
      {name: "Czech", code: "cz", floor: 19, short: "CZ"},
      {name: "Finland", code: "fi", floor: 20, short: "FI"},
    ];
    this.route.firstChild?.params.subscribe(param => {
      this.selectedCountry = this.countries$?.find(i => i.code === param.id)
      this.selectedDays = this.days$?.find(i => i.name === param.days)
    });

  }


  async loadNewChart(event: { value: { short: any; } | null; }){
    if(event.value == null){
      this.router.navigateByUrl("qstats")
      return;
    }
    const short = event.value.short;
    this.router.navigate(['qstats/', short.toLowerCase()])
  }

  async loadNewTable(){
    this.router.navigate(['qstats/', this.selectedCountry.code.toLowerCase()])
  }
}
