import { Component } from '@angular/core';
import { IssuesService } from './issues.service';

@Component({
  selector: 'my-app',
  template: `
  <h1> {{title}} </h1>
  <router-outlet>
  `,
  providers: [IssuesService]
})
export class AppComponent {
  title:string = 'GitHub Issues API';
}