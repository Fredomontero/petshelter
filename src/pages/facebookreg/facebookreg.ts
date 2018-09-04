import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

//My pages
import { AdminhomePage } from '../adminhome/adminhome';
import { GeneralhomePage } from '../generalhome/generalhome';
import { VethomePage } from '../vethome/vethome';

@IonicPage()
@Component({
  selector: 'page-facebookreg',
  templateUrl: 'facebookreg.html',
})
export class FacebookregPage {

   //Variables to get the value of the inputs
   @ViewChild('password1') password1;
   @ViewChild('password2') password2;
   user_type;

  imageUrl: string;
  uid: string;

  //Litheral object constructor
  user = {name : '', email : '', type : 0};

  status_messages: string[] = ["Successfully registered user", "Password don't match", "There was a problem with the server"];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  private auth: AngularFireAuth, private db: AngularFireDatabase, private toast: ToastController) {
    this.user.email = navParams.get('email');
    this.user.name = navParams.get('fullname');
    this.imageUrl = navParams.get('image');
    this.uid = navParams.get('uid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookregPage');
  }

  //Function to stored all the data to the database
  completeRegistration(){
    this.setUser(this.user);
    var error = this.validateForm(this.password1, this.password2);
    if(error == 0){
       //If the registration it's ok then sign in and insert user info into the db
       let id = this.auth.auth.currentUser.uid;
       this.db.object('/users/'+this.uid+'/').set(this.user);
       console.log(this.user.type);
       this.displayStatus(error);
       this.redirectTo(this.user.type);
    }else{
      this.displayStatus(error);
    }
  }

  //Setting the texfield values to the properties of our object
  setUser(user){
    user.name = this.user.name;
    user.email = this.user.email;
    user.type = this.user_type;
  }

  //Function to get the type of user (the value will change everytime a different value is selected)
  getType(type){
    this.user_type = type;
  }

  //Verifying that the form is filled properly
  validateForm(password1, password2){
    var error = 0;
    if((password1.value != password2.value)  || (password1.value.length < 8)){
      error = 1;
    }
    return error;
  }

  //Function to show the toast message
  displayStatus(index) {
    let toast = this.toast.create({
      message: this.status_messages[index],
      duration: 1500,
      position: 'bottom',
      cssClass: "toast_style"
    });
  
    toast.present();
  }

    //Function for redirecting to a page
    redirectTo(type){
      if(type == 0){
        this.navCtrl.push(GeneralhomePage);
      }else if (type == 1){
        this.navCtrl.push(AdminhomePage);
      }else{
        this.navCtrl.push(VethomePage);
      }
    }

}
