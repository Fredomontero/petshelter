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

//Firebase credentials
var config = {
  apiKey: "AIzaSyB-3RiHGh5jJ7lOQtRJAHTKL2x_sj4h3Es",
  authDomain: "petshelter-71412.firebaseapp.com",
  databaseURL: "https://petshelter-71412.firebaseio.com",
  projectId: "petshelter-71412",
  storageBucket: "petshelter-71412.appspot.com",
  messagingSenderId: "26288344716"
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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
