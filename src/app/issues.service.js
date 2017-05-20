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
        this.urlParams = new http_1.URLSearchParams();
        //this.urlParams.set('assignee', "chuckjaz");
        this.urlParams.set('since', "2017-05-18T15:25:18Z"); //todo, last 7 days
    }
    //https://api.github.com/repos/octocat/Hello-World/issues/1347
    //2017-05-20T01:25:18Z
    IssuesService.prototype.getAll = function () {
        var issues$ = this.http
            .get("https://api.github.com/repos/angular/angular/issues", { headers: this.getHeaders(), search: this.urlParams })
            .map(this.mapIssues)
            .catch(this.handleError);
        return issues$;
    };
    IssuesService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    IssuesService.prototype.mapIssues = function (response) {
        // uncomment to simulate error:
        // throw new Error('ups! Force choke!');
        console.log(response.json());
        return response.json().map(toIssue);
    };
    IssuesService.prototype.handleError = function (error) {
        var errorMsg = error.message || "An unkown error has occurred!";
        console.error(errorMsg);
        // throw an application level error
        return Rx_1.Observable.throw(errorMsg);
    };
    return IssuesService;
}());
IssuesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], IssuesService);
exports.IssuesService = IssuesService;
function toIssue(r) {
    var issue = ({
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
function getLoginFromUser(userData) {
    var username = "(none)";
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
//# sourceMappingURL=issues.service.js.map