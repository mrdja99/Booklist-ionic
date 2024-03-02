import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit, OnDestroy {

  users: any;

  userEmail!: string;
  userPassword!: string;
  userName!: string;
  userSurname!: string;

  sub: Subscription = new Subscription;

  constructor(private dataService: DataService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getData() {
    this.sub = this.dataService.getUsers().subscribe((usersRes) => {
      this.users = usersRes;
    })
  }


  findUser(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.sub = this.dataService.getUsers().subscribe((usersRes) => {
        this.users = usersRes;

        const userWithEmail = this.users.find((user: any) => user.email === this.userEmail);

        if (userWithEmail && userWithEmail.password === this.userPassword) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  async login() {
    if (this.userEmail == null || this.userPassword == null) {
      const warningAlert = this.alertCtrl.create({
        header: "Warning",
        subHeader: "Please fill in all fields",
        buttons: ['OK']
      });
      (await warningAlert).present();
    } else {
      this.findUser().subscribe(async (userExists) => {
        if (userExists) {
          this.router.navigateByUrl('/home');
        } else {
          const warningAlert = this.alertCtrl.create({
            header: "Warning",
            subHeader: "Incorrect email or password",
            buttons: ['OK']
          });
          (await warningAlert).present();
        }
      })
    }
  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }



}

