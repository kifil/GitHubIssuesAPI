
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Issue } from './issue';

@Injectable()
export class IssuesService {
	private baseUrl: string = 'http://swapi.co/api';

	constructor(private http: Http) {
	}

	getAll(): Observable<Issue[]> {
		let people$ = this.http
			.get(`${this.baseUrl}/people`, { headers: this.getHeaders() })
			.map(mapIssues)
			.catch(handleError);
		return people$;
	}

	get(id: number): Observable<Issue> {
		let person$ = this.http
			.get(`${this.baseUrl}/people/${id}`, { headers: this.getHeaders() })
			.map(mapIssue);
		return person$;
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

function toIssue(r: any): Issue {
	let issue = <Issue>({
		id: extractId(r),
		url: r.url,
		name: r.name,
		//weight: r.mass,
		//height: r.height,
	});
	console.log('Parsed issue:', issue);
	return issue;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(issueData: any) {
	let extractedId = issueData.url.replace('http://swapi.co/api/people/', '').replace('/', '');
	return parseInt(extractedId);
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