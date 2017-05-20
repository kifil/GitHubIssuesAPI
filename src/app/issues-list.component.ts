import { Component, OnInit } from '@angular/core';
import { Issue } from './issue';
import { IssuesService } from './issues.service';

@Component({
  selector: 'issues-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Retrieving data...
    </section>
      <ul>
        <!-- this is the new syntax for ng-repeat -->
        <li *ngFor="let issue of issues">
            <a href="#" [routerLink]="['/persons', issue.id]">
          {{issue.name}}
          </a>
        </li>
        <h1>new issues </h1>
        <li *ngFor="let issue2 of issues2">
          <div>{{issue2.id}}</div>
          <div>{{issue2.body}}</div>
          <div>{{issue2.userLogin}}</div>
          <div>{{issue2.assigneeLogin}}</div>
          <a href={{issue2.url}}>{{issue2.title}}</a>
        </li>
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})

export class IssuesListComponent implements OnInit{
    issues: Issue[] = [];
    issues2: Issue[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private issuesService: IssuesService) { }

  ngOnInit() {
      this.issuesService.getAll()
          .subscribe(
         /* happy path */ i => this.issues = i,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */() => this.isLoading = false);

      this.issuesService.getAll2().subscribe(
          /* happy path */ i => this.issues2 = i,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */() => this.isLoading = false
      );
  }
}