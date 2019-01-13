import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-auth-popover',
  templateUrl: './auth-popover.component.html',
  styleUrls: ['./auth-popover.component.scss']
})
export class AuthPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async onDismiss() {
    try {
      await this.popoverController.dismiss();
    } catch (e) {
      // click more than one time popover throws error, so ignore...
    }
  }

}
