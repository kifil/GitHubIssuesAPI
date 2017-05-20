"use strict";
var router_1 = require("@angular/router");
var people_list_component_1 = require("./people-list.component");
var person_details_component_1 = require("./person-details.component");
var issues_list_component_1 = require("./issues-list.component");
// Route config let's you map routes to components
var routes = [
    // map '/persons' to the people list component
    {
        path: 'persons',
        component: people_list_component_1.PeopleListComponent,
    },
    {
        path: 'issues',
        component: issues_list_component_1.IssuesListComponent,
    },
    // map '/persons/:id' to person details component
    {
        path: 'persons/:id',
        component: person_details_component_1.PersonDetailsComponent
    },
    // map '/' to '/persons' as our default route
    {
        path: '',
        redirectTo: '/persons',
        pathMatch: 'full'
    },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map