import { Component, Input, OnInit } from '@angular/core';
import { Book, DataService } from '../service/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {
  @Input() book!: Book;


  constructor(private dataService: DataService, public modalCtrl: ModalController, public alertCtrl: AlertController, public router: Router) { }

  ngOnInit() {
    console.log(this.book);
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async editedBook() {
    this.editBook();
    const alert = this.alertCtrl.create({
      header: 'Edited',
      subHeader: 'Book info is succesfully edited',
      buttons: [{
        text: 'OK',
        handler: () => { this.dismiss()}
      }]
    });
    (await alert).present();
  }

  async editBook() {
    await this.dataService.editBook({
      imgUrl: this.book.imgUrl,
      name: this.book.name,
      rating: this.book.rating,
      synopsys: this.book.synopsys,
      writer: this.book.writer
    });
  }

}
