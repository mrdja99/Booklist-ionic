import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userEmail!: string;
  userPassword!: string;
  userName!: string;
  userSurname!: string;

  constructor(private dataService: DataService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async filledRegisterForm() {
    if(this.userName == null || this.userSurname == null || this.userEmail == null || this.userPassword == null) {
      const warningAlert = this.alertCtrl.create({
        header: "Warning",
        subHeader: "Please fill in all fields",
        buttons: ['OK']
      });
      (await warningAlert).present();
    }else{
      this.addUser();
      const alert = this.alertCtrl.create({
        header: "Account created successfully",
        buttons: [{
          text: 'OK',
          handler: () => {this.router.navigateByUrl('/log-in');}
        }]
      });
      (await alert).present();
    }
  }

  async addUser() {
    await this.dataService.addUser({
      email: this.userEmail,
      password: this.userPassword,
      name: this.userName,
      surname: this.userSurname
    });
  }

}
