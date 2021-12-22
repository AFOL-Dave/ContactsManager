import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isSmallScreen!: boolean;

  users!: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  constructor( private breakpointObserver: BreakpointObserver, 
               private userService: UserService,
               private router: Router ) { }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  ngOnInit(): void {
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe((state: BreakpointState) => {
      this.isSmallScreen = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe( () => {
      if (this.isSmallScreen) {
        this.sidenav.close();
      }
    })
  }

  toggleDirection() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
