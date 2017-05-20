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
      </ul>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class IssuesListComponent implements OnInit{
  issues: Issue[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private issuesService: IssuesService) { }

  ngOnInit() {
      this.issuesService
      .getAll()
          .subscribe(
         /* happy path */ i => this.issues = i,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */ () => this.isLoading = false);
  }
}