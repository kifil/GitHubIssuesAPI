import { Component } from '@angular/core';
import { PeopleService } from './people.service';
import { IssuesService } from './issues.service';

@Component({
  selector: 'my-app',
  template: `
  <h1> {{title}} </h1>
  <router-outlet>
  `,
  providers: [PeopleService, IssuesService]
})
export class AppComponent {
  title:string = 'GitHub Issues API';
}