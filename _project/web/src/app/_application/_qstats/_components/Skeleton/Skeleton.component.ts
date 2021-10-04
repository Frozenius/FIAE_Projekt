import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Skeleton',
  templateUrl: './Skeleton.component.html',
  styleUrls: ['./Skeleton.component.sass']
})
export class SkeletonComponent implements OnInit {
  skeletons: any[] = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
