import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { HttpParameterCodec } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-barcode-share',
  templateUrl: './barcode-share.page.html',
  styleUrls: ['./barcode-share.page.scss'],
})
export class BarcodeSharePage implements OnInit {
  room = '';
  roomId = '';
  code = '';
  generated = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute) 
  {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    console.log('Barcode in Barcode Share', this.roomId);
    this.room = 'ryancorb.in/#/photo-room' + '?room=' + encodeURI(this.roomId);
    this.process();
  }

  ngOnInit() {
  }

  displayQrCode() {
    return this.generated !== '';
  }

  process() {
    const qrcode = QRCode;
    const self = this;
    console.log('This is the room Code' + this.room);
    let encoded = encodeURI(this.room);
    console.log('This is the room code after encoding');


    qrcode.toDataURL(self.code + '?' + this.room, { errorCorrectionLevel: 'H', text: 'Ryan' }, function (err, url) {
      self.generated = url;
    });
  }
}
