import { Component, Input, OnInit } from '@angular/core';
import { Book, DataService } from '../service/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.page.html',
  styleUrls: ['./book-info.page.scss'],
})
export class BookInfoPage implements OnInit {
  @Input() book!:Book;

  constructor(
    private dataService: DataService, 
    private navCtrl: NavController,
    private router: Router
    ) { }

  ngOnInit() {
    this.book = history.state.book;
    console.log(this.book);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }


}
