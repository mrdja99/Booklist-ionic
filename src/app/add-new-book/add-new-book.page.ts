import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AlertController } from '@ionic/angular';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.page.html',
  styleUrls: ['./add-new-book.page.scss'],
})
export class AddNewBookPage implements OnInit {

  alertButtons = ['Ok'];

  bookImage!: string;
  bookName!: string;
  bookRating!: string;
  bookSynopsys!: string;
  bookWriter!: string;


  constructor(private dataService: DataService, private alertCtrl:AlertController, private router:Router) { }

  ngOnInit() {
  }

 async filledForm() {
    if(this.bookImage == null || this.bookName == null || this.bookRating == null || this.bookSynopsys == null || this.bookWriter == null) {
      const warningAlert = this.alertCtrl.create({
        header: "Warning",
        subHeader: "Please fill in all fields",
        buttons: ['OK']
      });
      (await warningAlert).present();
    }else {
      this.addBook();
      const alert = this.alertCtrl.create({
        header: "Added",
        subHeader: "Book is succesfully added to list",
        buttons: ['OK']
      });
      (await alert).present();
      this.router.navigateByUrl('/home');
    }
  }

  async addBook() {
    await this.dataService.addBook({
      imgUrl: this.bookImage,
      name: this.bookName,
      rating: this.bookRating,
      synopsys: this.bookSynopsys,
      writer: this.bookWriter
    })

  }

}
