import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { LoginPage } from '../pages/login/login';
import { AdminhomePage } from '../pages/adminhome/adminhome';
import { GeneralhomePage } from '../pages/generalhome/generalhome';
import { VethomePage } from '../pages/vethome/vethome';
import { FacebookregPage } from '../pages/facebookreg/facebookreg';

//Firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//FaceBook
import { Facebook } from '@ionic-native/facebook';


//Read JSON Language files
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { JsonReader } from '../providers/jsonreader';

//Environment variables
import { ENV } from '@app/env';

var config = { 
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  databaseURL: ENV.DB_URL,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SigninPage,
    AdminhomePage,
    GeneralhomePage,
    VethomePage,
    FacebookregPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SigninPage,
    AdminhomePage,
    GeneralhomePage,
    VethomePage,
    FacebookregPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    JsonReader
  ]
})

export class AppModule {
}
