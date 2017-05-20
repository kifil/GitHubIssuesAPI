import { Component } from '@angular/core';
import { IssuesService } from './issues.service';

@Component({
  selector: 'my-app',
  template: `
        <div class="container">
            <div class="starter">
                <h1>{{title}}</h1>
                <p class="lead">
                    {{description}}
                    <br>
                    Last update time: {{lastUpdateTime}}
                </p>
            </div>
        </div>
  <router-outlet>
  `,
  providers: [IssuesService]
})
export class AppComponent {
    title: string = 'GitHub Issues API';
    description: string = 'Issues pulled from the last 7 days for the Angular repo';
    lastUpdateTime: string = this.issuesService.getISOTime7DaysAgo();

    constructor(private issuesService: IssuesService) { }
}