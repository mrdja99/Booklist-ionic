import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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
export class HomePage implements OnInit, OnDestroy{

  books: any;

  sub:Subscription = new Subscription;

  constructor(private dataService: DataService, public modalCtrl: ModalController) {}

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

  deleteBook(bookId: string) {
    this.dataService.deleteBook(bookId);
  }


}
