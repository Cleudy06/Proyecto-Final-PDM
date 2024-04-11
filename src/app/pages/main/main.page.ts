import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { firebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Start', url: 'home', icon: 'home-outline' },
    { title: 'Profile', url: '/main/profile', icon: 'person-outline' },
  ]


  router = inject(Router);
  firebaseSvc = inject(firebaseService);
  utilSvc = inject(UtilsService);
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;

    })
  }

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');

  }

  // ======= Log out ==========
  signOut() {
    this.firebaseSvc.signOut();
  }

}
