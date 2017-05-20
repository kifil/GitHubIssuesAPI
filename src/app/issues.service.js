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
        this.baseUrl = 'https://api.github.com/';
    }
    //returns all issues within last 7 days for the angular repo
    IssuesService.prototype.getAll = function () {
        var urlParams = new http_1.URLSearchParams();
        urlParams.set('since', this.getISOTime7DaysAgo());
        var issues$ = this.http
            .get(this.baseUrl + "repos/angular/angular/issues", { headers: this.getHeaders(), search: urlParams })
            .map(this.mapIssues)
            .catch(this.handleError);
        return issues$;
    };
    IssuesService.prototype.getISOTime7DaysAgo = function () {
        var daysPast = 7;
        var currentDate = new Date();
        var previousDate = new Date(currentDate.getTime() - (daysPast * 24 * 60 * 60 * 1000));
        var isoTime = previousDate.toISOString();
        return isoTime;
    };
    IssuesService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    IssuesService.prototype.mapIssues = function (response) {
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
        title: r.title,
        body: r.body,
        userLogin: getLoginFromUser(r.user),
        assigneeLogin: getLoginFromUser(r.assignee),
    });
    return issue;
}
function getLoginFromUser(userData) {
    var username = "(none)";
    if (userData) {
        username = userData.login;
    }
    return username;
}
//# sourceMappingURL=issues.service.js.map