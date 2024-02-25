import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit, OnDestroy{

  users: any;

  userEmail!: string;
  userPassword!: string;
  userName!: string;
  userSurname!: string;

  sub:Subscription = new Subscription;

  constructor(private dataService: DataService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getData() {
    this.sub = this.dataService.getUsers().subscribe((usersRes)=> {
      this.users = usersRes;
    })
  }

  async login() {

    this.sub = this.dataService.getUsers().subscribe(async (usersRes)=> {
      this.users = usersRes;
      const emailExist = this.users.find((user:any)=> user.email === this.userEmail);
      const passwordExist = this.users.find((user:any)=> user.password === this.userPassword);
      console.log(emailExist);
      console.log(passwordExist);
      if(this.userEmail == null || this.userPassword == null) {
        const warningAlert = this.alertCtrl.create({
          header: "Warning",
          subHeader: "Please fill in all fields",
          buttons: ['OK']
        });
        (await warningAlert).present();
      }else if(emailExist && passwordExist){
        this.router.navigateByUrl('/home');
      }else {
        const warningAlert = this.alertCtrl.create({
          header: "Warning",
          subHeader: "Incorrect email or password",
          buttons: ['OK']
        });
        (await warningAlert).present();
      }
    })

  }

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }



}

    /*
    console.log(emailExist);
    console.log(passwordExist);


    if(this.userEmail == null || this.userPassword == null) {
      const warningAlert = this.alertCtrl.create({
        header: "Warning",
        subHeader: "Please fill in all fields",
        buttons: ['OK']
      });
      (await warningAlert).present();
    }else if(emailExist && passwordExist){
      this.router.navigateByUrl('/home');
    }else {
      const warningAlert = this.alertCtrl.create({
        header: "Warning",
        subHeader: "Incorrect email or password",
        buttons: ['OK']
      });
      (await warningAlert).present();
    }

  }
    
*/
  
