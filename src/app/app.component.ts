import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyAjJqj6p5061e7SBUE6e_07x_gfzH2LfUI",
      authDomain: "blog-7bd4e.firebaseapp.com",
      databaseURL: "https://blog-7bd4e.firebaseio.com",
      projectId: "blog-7bd4e",
      storageBucket: "blog-7bd4e.appspot.com",
      messagingSenderId: "1097932278053"
    };
    firebase.initializeApp(config);
  }

}
