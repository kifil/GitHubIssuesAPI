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
var people_service_1 = require("./people.service");
var PeopleListComponent = (function () {
    function PeopleListComponent(peopleService) {
        this.peopleService = peopleService;
        this.people = [];
        this.errorMessage = '';
        this.isLoading = true;
    }
    PeopleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.peopleService
            .getAll()
            .subscribe(
        /* happy path */ function (p) { return _this.people = p; }, 
        /* error path */ function (e) { return _this.errorMessage = e; }, 
        /* onComplete */ function () { return _this.isLoading = false; });
    };
    return PeopleListComponent;
}());
PeopleListComponent = __decorate([
    core_1.Component({
        selector: 'people-list',
        template: "\n  <section>\n    <section *ngIf=\"isLoading && !errorMessage\">\n    Loading our hyperdrives!!! Retrieving data...\n    </section>\n      <ul>\n        <!-- this is the new syntax for ng-repeat -->\n        <li *ngFor=\"let person of people\">\n            <a href=\"#\" [routerLink]=\"['/persons', person.id]\">\n          {{person.name}}\n          </a>\n        </li>\n      </ul>\n      <section *ngIf=\"errorMessage\">\n        {{errorMessage}}\n      </section>\n  </section>\n  "
    }),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleListComponent);
exports.PeopleListComponent = PeopleListComponent;
//# sourceMappingURL=people-list.component.js.map