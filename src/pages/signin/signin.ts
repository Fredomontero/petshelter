import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  //Variables to get the value of the inputs
  @ViewChild('fullname') fullname;
  @ViewChild('email') email;
  @ViewChild('password1') password1;
  @ViewChild('password2') password2;
  user_type;
  //Litheral object constructor
  user = {name : '', email : '', type : 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  //Connection to Firebase and save the user
  signIn(){
    this.setUser(this.user);
    var error = this.validateForm(this.user, this.password1, this.password2);
    if(error == 0){
      console.log("Error: ",error);
    }else{
      console.log("Error: ",error);
    }
    // this.auth.auth.createUserWithEmailAndPassword(this.email.value, this.password1.value)
    // .then( data => {
    //   //If the registration it's ok then sign in and insert user info into the db
    //   let id = this.auth.auth.currentUser.uid;
    //   this.db.object('/users/'+id+'/').set(this.user);
    //   this.auth.auth.signInWithEmailAndPassword(this.email.value, this.password1.value)
    //   .then( data => {
    //     console.log("Ya estas logeado: ", data);
    //     console.log(this.user);
    //     // this.navCtrl.push(WalkthroughPage);
    //   });
    // })
    // .catch(error => {
    //   console.log("There's an error: ", error);
    // })
  }

  //Setting the texfield values to the properties of our object
  setUser(user){
    user.name = this.fullname.value;
    user.email = this.email.value;
    user.type = this.user_type;
  }

  //Function to get the type of user (the value will change everytime a different value is selected)
  getType(type){
    this.user_type = type;
  }

  //Verifying that the form is filled properly
  validateForm(user, password1, password2){
    var error = 0;
    if(user.name.length == 0){
      error = 1; 
    }else if(user.email.length == 0){
      error = 2;
    }else if((password1.value != password2.value)  || (password1.value.length < 8)){
      error = 3;
    }
    return error;
  }

}
