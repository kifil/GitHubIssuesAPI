"use strict";
var router_1 = require("@angular/router");
var issues_list_component_1 = require("./issues-list.component");
var routes = [
    {
        path: 'issues',
        component: issues_list_component_1.IssuesListComponent,
    },
    {
        path: '',
        redirectTo: '/issues',
        pathMatch: 'full'
    },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map