import { Component, OnInit } from '@angular/core';
import { Issue } from './issue';
import { IssuesService } from './issues.service';

@Component({
    selector: 'issues-list',
    templateUrl: 'app/issues-list.component.html'
})

export class IssuesListComponent implements OnInit{
    issues: Issue[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;

  constructor(private issuesService: IssuesService) { }

  ngOnInit() {
      this.issuesService.getAll().subscribe(
          /* happy path */ i => this.issues = i,
         /* error path */ e => this.errorMessage = e,
         /* onComplete */() => this.isLoading = false
      );
  }
}