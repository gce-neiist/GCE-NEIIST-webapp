import { Component, OnInit } from '@angular/core';
import { secrets } from '../../../../.env.template';

@Component({
  selector: 'app-ga',
  templateUrl: './ga.component.html',
  styleUrls: ['./ga.component.css']
})
export class GAComponent implements OnInit {
  //googleAnalyticsId = secrets.GOOGLE_ANALYTICS; string;


  constructor() { }

  ngOnInit() {
  }

}
