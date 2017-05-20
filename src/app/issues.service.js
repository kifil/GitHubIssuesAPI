"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var IssuesService = (function () {
    function IssuesService(http) {
        this.http = http;
        this.baseUrl = 'http://swapi.co/api';
    }
    IssuesService.prototype.getAll = function () {
        var people$ = this.http
            .get(this.baseUrl + "/people", { headers: this.getHeaders() })
            .map(mapIssues)
            .catch(handleError);
        return people$;
    };
    IssuesService.prototype.get = function (id) {
        var person$ = this.http
            .get(this.baseUrl + "/people/" + id, { headers: this.getHeaders() })
            .map(mapIssue);
        return person$;
    };
    //save(issue: Issue): Observable<Response> {
    //	// this won't actually work because the StarWars API doesn't
    //	// is read-only. But it would look like this:
    //       return this.http
    //           .put(`${this.baseUrl}/people/${issue.id}`, JSON.stringify(issue), { headers: this.getHeaders() });
    //}
    IssuesService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    return IssuesService;
}());
IssuesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], IssuesService);
exports.IssuesService = IssuesService;
function mapIssues(response) {
    // uncomment to simulate error:
    // throw new Error('ups! Force choke!');
    // The response of the API has a results
    // property with the actual results
    return response.json().results.map(toIssue);
}
function toIssue(r) {
    var issue = ({
        id: extractId(r),
        url: r.url,
        name: r.name,
    });
    console.log('Parsed issue:', issue);
    return issue;
}
// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(issueData) {
    var extractedId = issueData.url.replace('http://swapi.co/api/people/', '').replace('/', '');
    return parseInt(extractedId);
}
function mapIssue(response) {
    // toPerson looks just like in the previous example
    return toIssue(response.json());
}
// this could also be a private method of the component class
function handleError(error) {
    // log error
    // could be something more sofisticated
    var errorMsg = error.message || "Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!";
    console.error(errorMsg);
    // throw an application level error
    return Rx_1.Observable.throw(errorMsg);
}
//# sourceMappingURL=issues.service.js.map