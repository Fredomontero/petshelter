import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//This is what we need from firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//This are the pages required
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Variables to get the value of the inputs
  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log("email: ", this.email.value);
    console.log("password: ", this.password.value);
  }
  
  loginfb(){
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      console.log(res);
    })
  }

  signup(){
    this.navCtrl.push(SigninPage);
  }

}
