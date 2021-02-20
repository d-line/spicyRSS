import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public user: User;

  constructor(private accountService: AccountService) {
        this.accountService.user.subscribe((x) => this.user = x);
    }

    public logout() {
        this.accountService.logout();
    }
}
