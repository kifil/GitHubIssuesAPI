import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from './issue';

@Injectable()
export class IssuesService {
    private baseUrl: string = 'https://api.github.com/';

    constructor(private http: Http) {
    }

    //returns all issues within last 7 days for the angular repo
    public getAll(): Observable<Issue[]> {
        let urlParams: URLSearchParams = new URLSearchParams();
        urlParams.set('since', this.getISOTime7DaysAgo());

        let issues$ = this.http
            .get( this.baseUrl + "repos/angular/angular/issues", { headers: this.getHeaders(), search: urlParams })
            .map(this.mapIssues)
            .catch(this.handleError);
        return issues$;
    }

    public getISOTime7DaysAgo(): string {
        let daysPast: number = 7;
        let currentDate: Date = new Date();
        let previousDate: Date = new Date(currentDate.getTime() - (daysPast * 24 * 60 * 60 * 1000));
        let isoTime: string = previousDate.toISOString();
        return isoTime;
    }

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		return headers;
    }

    private mapIssues(response: Response): Issue[] {
      return response.json().map(toIssue);
    }
    
    private handleError(error: any) {
        let errorMsg: string = error.message || `An unkown error has occurred!`
        console.error(errorMsg);

        // throw an application level error
        return Observable.throw(errorMsg);
    }

}

function toIssue(r: any): Issue {
    let issue = <Issue>({
        id: r.number,
        url: r.html_url,
        title: r.title,
        body: r.body,
        userLogin: getLoginFromUser(r.user),
        assigneeLogin: getLoginFromUser(r.assignee),
    });
    return issue;
}

 function getLoginFromUser(userData: any): string {
    let username: string = "(none)";
    if (userData) {
        username = userData.login;
    }

    return username;
}