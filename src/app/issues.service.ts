import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from './issue';

@Injectable()
export class IssuesService {
    private baseUrl: string = 'https://api.github.com/';

    constructor(private http: Http) {
        //this.urlParams.set('assignee', "chuckjaz");
        //this.urlParams.set('since', getISOTime7DaysAgo());
    }

    //https://api.github.com/repos/octocat/Hello-World/issues/1347
    //2017-05-20T01:25:18Z

    getAll(): Observable<Issue[]> {
        let urlParams: URLSearchParams = new URLSearchParams();
        urlParams.set('since', getISOTime7DaysAgo());

        let issues$ = this.http
            .get( this.baseUrl + "repos/angular/angular/issues", { headers: this.getHeaders(), search: urlParams })
            .map(this.mapIssues)
            .catch(this.handleError);
        return issues$;
    }

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		return headers;
    }

    private mapIssues(response: Response): Issue[] {
      // uncomment to simulate error:
      // throw new Error('ups! Force choke!');

      console.log(response.json());
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
    console.log('Parsed issue2:', issue);
    return issue;
}

 function getLoginFromUser(userData: any): string {
    let username: string = "(none)";
    if (userData) {
        username = userData.login;
    }

    return username;
}

function getISOTime7DaysAgo() : string {
    let daysPast: number = 7;
    let currentDate: Date = new Date();
    let previousDate: Date =  new Date(currentDate.getTime() - (daysPast * 24 * 60 * 60 * 1000));
    let isoTime: string =  previousDate.toISOString();
    return isoTime;
}

//function toIssue(r: any): Issue {
//	let issue = <Issue>({
//		id: extractId(r),
//		url: r.url,
//		name: r.name,
//		//weight: r.mass,
//		//height: r.height,
//	});
//	//console.log('Parsed issue:', issue);
//	return issue;
//}



//function mapIssue(response: Response): Issue {
//	// toPerson looks just like in the previous example
//	return toIssue(response.json());
//}

// this could also be a private method of the component class
