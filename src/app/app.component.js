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
var AppComponent = (function () {
    function AppComponent(issuesService) {
        this.issuesService = issuesService;
        this.title = 'GitHub Issues API';
        this.description = 'Issues pulled from the last 7 days for the Angular repo';
        this.lastUpdateTime = this.issuesService.getISOTime7DaysAgo();
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n        <div class=\"container\">\n            <div class=\"starter\">\n                <h1>{{title}}</h1>\n                <p class=\"lead\">\n                    {{description}}\n                    <br>\n                    Last update time: {{lastUpdateTime}}\n                </p>\n            </div>\n        </div>\n  <router-outlet>\n  ",
        providers: [issues_service_1.IssuesService]
    }),
    __metadata("design:paramtypes", [issues_service_1.IssuesService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map