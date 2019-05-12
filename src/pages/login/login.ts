import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

//This is what we need from firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//This are the pages required
import { SigninPage } from '../signin/signin';
import { FacebookregPage } from '../facebookreg/facebookreg';
import { AdminhomePage } from '../adminhome/adminhome';
import { GeneralhomePage } from '../generalhome/generalhome';
import { VethomePage } from '../vethome/vethome';

//Json reader
import { JsonReader } from '../../providers/jsonreader';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  //Variables to get the value of the inputs
  @ViewChild('email') email;
  @ViewChild('password') password;

  //keys from json language file 
  wordsKeys = [];
   


  constructor(private jsonReader: JsonReader,public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private db: AngularFireDatabase, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //read json file
    this.jsonReader.getJSONDataAsync("./assets/languages/en.json").then(data => {
      this.setQueryOptionsData(data);
    });
  }

  //store values from json language files into "wordskeys", access to value "this.wordsKeys['KEY']"
  setQueryOptionsData(data : any){
    this.wordsKeys = data;
  }

  login(){
    var _this = this;
    this.auth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then( data => {
          if(this.emailVerified(this.auth.auth.currentUser)){
            console.log("Email verified");
            let id = this.auth.auth.currentUser.uid;
            var t  = firebase.database().ref('/users/' + id+'/type/');
            t.on('value', function(snapshot) {
              _this.redirecTo(snapshot.val());
            });
          }else{
            console.log("Email not verified");
            this.presentConfirm(this.auth.auth.currentUser);
          }
        }
      ).catch(function(error){
        console.log("Error code: " +error.message);
        //error.code: error codes auth/wrong-password and auth/user-not-found
      });
  }
  
  loginfb(){
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      console.log(res.user);
      this.navCtrl.push(FacebookregPage,{
        image: res.user.photoURL,
        fullname: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid
      });  
    })
  }

  signup(){
    this.navCtrl.push(SigninPage);
  }

  emailVerified(user){
    return user.emailVerified
  }


  //Function for redirecting to a page
  redirecTo(type){
    if(type == 0){
      this.navCtrl.push(GeneralhomePage);
    }else if(type==1){
      this.navCtrl.push(AdminhomePage);
    }else{
      this.NavController.putsh(LoginPage);

    }
  }

  //Alert
  presentConfirm(user) {
    let alert = this.alertCtrl.create({
      title: this.wordsKeys['PLEASE VALIDATE YOUR EMAIL'],
      message: this.wordsKeys['SEND CONFIRMATION EMAIL'],
      buttons: [
        {
          text: this.wordsKeys['CANCEL'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.wordsKeys['OK'],
          handler: () => {
            console.log('Re-send Email');
            this.sendEmailVerification(user);
          }
        }
      ]
    });
    alert.present();
  }


  //Send confirmation email to user
  sendEmailVerification(user){
    console.log(user);
    user.sendEmailVerification();
  }

}
