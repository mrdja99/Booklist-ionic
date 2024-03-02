import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EditBookPage } from '../edit-book/edit-book.page';

type Book = {
  imgUrl?: string,
  name?: string,
  rating?: string,
  synopsys?: string,
  writer?: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  books: any;

  sub: Subscription = new Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getData() {
    this.sub = this.dataService.getBooks().subscribe((bookRes) => {
      this.books = bookRes;
    })
  }

  async deleteBook(bookId: string) {
    const alert = this.alertCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.dataService.deleteBook(bookId); }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    (await alert).present();
  }

  goToAddPage() {
    this.router.navigateByUrl('/add-new-book');
  }

  async goToEditPage(book: Book) {
    const modal = await this.modalCtrl.create({
      component: EditBookPage,
      componentProps: {
        book: book
      }
    });
    return await modal.present();
  }

  goToBookInfoPage(book: Book) {
    this.navCtrl.navigateForward(['/book-info'], {
      state: {
        book: book
      }
    })
  }

  async logOut() {
    const alert = this.alertCtrl.create({
      header: 'Do you want to logout?',
      buttons: [{
        text: 'Yes',
        handler: () => { this.router.navigateByUrl('/log-in'); }
      },
      {
        text: 'No'
      }]
    });
    (await alert).present();
  }

}
