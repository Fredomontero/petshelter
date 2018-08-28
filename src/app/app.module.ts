import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { LoginPage } from '../pages/login/login';

//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Other stuff
import { Facebook } from '@ionic-native/facebook';

//Firebase credentials
var config = {
  apiKey: "AIzaSyBV8_YK5opJ_eHlM1LmumvIni44V7_mN2s",
  authDomain: "petshelter-ee05b.firebaseapp.com",
  databaseURL: "https://petshelter-ee05b.firebaseio.com",
  projectId: "petshelter-ee05b",
  storageBucket: "petshelter-ee05b.appspot.com",
  messagingSenderId: "947877028095"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook
  ]
})
export class AppModule {}
