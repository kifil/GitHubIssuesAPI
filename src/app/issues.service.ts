import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from './issue';

@Injectable()
export class IssuesService {
    private baseUrl: string = 'http://swapi.co/api';
    private urlParams: URLSearchParams = new URLSearchParams();

    constructor(private http: Http) {
        //this.urlParams.set('assignee', "chuckjaz");
        this.urlParams.set('since', "2017-05-18T15:25:18Z"); //todo, last 7 days
    }

    //https://api.github.com/repos/octocat/Hello-World/issues/1347
    //2017-05-20T01:25:18Z

    getAll(): Observable<Issue[]> {
        let issues$ = this.http
            .get("https://api.github.com/repos/angular/angular/issues", { headers: this.getHeaders(), search: this.urlParams })
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
      let errorMsg = error.message || `An unkown error has occurred!`
      console.error(errorMsg);

      // throw an application level error
      return Observable.throw(errorMsg);
  }

}

function toIssue(r: any): Issue {
    let issue = <Issue>({
        id: r.number,
        url: r.html_url,
        name: r.title,
        title: r.title,
        body: r.body,
        userLogin: getLoginFromUser(r.user),
        assigneeLogin: getLoginFromUser(r.assignee),
    });
    console.log('Parsed issue2:', issue);
    return issue;
}

 function getLoginFromUser(userData: any): string {
    let username = "(none)";
    if (userData) {
        username = userData.login;
    }

    return username;
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
