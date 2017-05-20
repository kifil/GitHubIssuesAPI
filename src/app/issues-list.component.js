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
        this.errorMessage = '';
        this.isLoading = true;
    }
    IssuesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.issuesService.getAll().subscribe(function (i) { return _this.issues = i; }, 
        /* error path */ function (e) { return _this.errorMessage = e; }, 
        /* onComplete */ function () { return _this.isLoading = false; });
    };
    return IssuesListComponent;
}());
IssuesListComponent = __decorate([
    core_1.Component({
        selector: 'issues-list',
        templateUrl: 'app/issues-list.component.html'
    }),
    __metadata("design:paramtypes", [issues_service_1.IssuesService])
], IssuesListComponent);
exports.IssuesListComponent = IssuesListComponent;
//# sourceMappingURL=issues-list.component.js.map