/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly spinner: NgxSpinnerService) {}

  // https://napster2210.github.io/ngx-spinner/ can be used to test animations
  ngOnInit() {
    /** spinner starts on init */
    void this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      void this.spinner.hide();
    }, 2000);
  }
}
