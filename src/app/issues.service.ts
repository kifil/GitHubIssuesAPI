import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from './issue';

@Injectable()
export class IssuesService {
    private baseUrl: string = 'http://swapi.co/api';
    private urlParams: URLSearchParams = new URLSearchParams();

    constructor(private http: Http) {
        this.urlParams.set('assignee', "chuckjaz");
        this.urlParams.set('since', "2017-05-18T15:25:18Z"); //todo, last 7 days
    }

    //https://api.github.com/repos/octocat/Hello-World/issues/1347
    //2017-05-20T01:25:18Z

    getAll2(): Observable<Issue[]> {
        console.log("hello");
        let issues$ = this.http
            .get("https://api.github.com/repos/angular/angular/issues", { headers: this.getHeaders(), search: this.urlParams })
            .map(logIssues)
            .catch(handleError);
        return issues$;
    }

	getAll(): Observable<Issue[]> {
		let issues$ = this.http
			.get(`${this.baseUrl}/people`, { headers: this.getHeaders() })
			.map(mapIssues)
			.catch(handleError);
		return issues$;
	}

	get(id: number): Observable<Issue> {
		let issue$ = this.http
			.get(`${this.baseUrl}/people/${id}`, { headers: this.getHeaders() })
			.map(mapIssue);
		return issue$;
	}

	//save(issue: Issue): Observable<Response> {
	//	// this won't actually work because the StarWars API doesn't
	//	// is read-only. But it would look like this:
 //       return this.http
 //           .put(`${this.baseUrl}/people/${issue.id}`, JSON.stringify(issue), { headers: this.getHeaders() });
	//}

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		return headers;
	}
}

function mapIssues(response: Response): Issue[] {
	// uncomment to simulate error:
	// throw new Error('ups! Force choke!');

	// The response of the API has a results
	// property with the actual results
	return response.json().results.map(toIssue)
}

function logIssues(response: Response): Issue[] {
    // uncomment to simulate error:
    // throw new Error('ups! Force choke!');

    // The response of the API has a results
    // property with the actual results
    //return response.json().results.map(toIssue)
    console.log(response.json());
    return response.json().map(toIssue2);
}

function toIssue2(r: any): Issue {
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

function toIssue(r: any): Issue {
	let issue = <Issue>({
		id: extractId(r),
		url: r.url,
		name: r.name,
		//weight: r.mass,
		//height: r.height,
	});
	//console.log('Parsed issue:', issue);
	return issue;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(issueData: any) {
	let extractedId = issueData.url.replace('http://swapi.co/api/people/', '').replace('/', '');
	return parseInt(extractedId);
}

// to avoid breaking the rest of our app
// I extract the id from the person url
//function extractId2(issueData: any) {
//    let extractedId = issueData.url.replace('https://github.com/angular/angular/issues/', '').replace('/', '');
//    return parseInt(extractedId);
//}

function getLoginFromUser(userData: any) {
    let username = "No user";
    if (userData) {
        username = userData.login;
    }

    return username;
}

function mapIssue(response: Response): Issue {
	// toPerson looks just like in the previous example
	return toIssue(response.json());
}

// this could also be a private method of the component class
function handleError(error: any) {
	// log error
	// could be something more sofisticated
	let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
	console.error(errorMsg);

	// throw an application level error
	return Observable.throw(errorMsg);
}