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
var issues_service_1 = require("./issues.service");
var IssuesListComponent = (function () {
    function IssuesListComponent(issuesService) {
        this.issuesService = issuesService;
        this.issues = [];
        this.issues2 = [];
        this.errorMessage = '';
        this.isLoading = true;
    }
    IssuesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.issuesService.getAll()
            .subscribe(
        /* happy path */ function (i) { return _this.issues = i; }, 
        /* error path */ function (e) { return _this.errorMessage = e; }, 
        /* onComplete */ function () { return _this.isLoading = false; });
        this.issuesService.getAll2().subscribe(
        /* happy path */ function (i) { return _this.issues2 = i; }, 
        /* error path */ function (e) { return _this.errorMessage = e; }, 
        /* onComplete */ function () { return _this.isLoading = false; });
    };
    return IssuesListComponent;
}());
IssuesListComponent = __decorate([
    core_1.Component({
        selector: 'issues-list',
        template: "\n  <section>\n    <section *ngIf=\"isLoading && !errorMessage\">\n    Retrieving data...\n    </section>\n      <ul>\n        <!-- this is the new syntax for ng-repeat -->\n        <li *ngFor=\"let issue of issues\">\n            <a href=\"#\" [routerLink]=\"['/persons', issue.id]\">\n          {{issue.name}}\n          </a>\n        </li>\n        <h1>new issues </h1>\n        <li *ngFor=\"let issue2 of issues2\">\n          <div>{{issue2.id}}</div>\n          <div>{{issue2.body}}</div>\n          <div>{{issue2.userLogin}}</div>\n          <div>{{issue2.assigneeLogin}}</div>\n          <a href={{issue2.url}}>{{issue2.title}}</a>\n        </li>\n      </ul>\n      <section *ngIf=\"errorMessage\">\n        {{errorMessage}}\n      </section>\n  </section>\n  "
    }),
    __metadata("design:paramtypes", [issues_service_1.IssuesService])
], IssuesListComponent);
exports.IssuesListComponent = IssuesListComponent;
//# sourceMappingURL=issues-list.component.js.map