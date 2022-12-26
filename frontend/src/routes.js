import Index from "views/Index.js";
import Tables from "views/Tables.js";
import Applicants from "views/Applicants.js";
import Reviewers from "views/Reviewer.js";
import EditApplication from "views/EditApplication.js";
import ViewApplication from "views/ViewApplication";
import EditApplicants from "views/EditApplicants";
import ViewApplicants from "views/ViewApplicants";
import ViewReviewers from "views/ViewReviewers";
import EditReviewers from "views/EditReviewers";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Applications",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/applicants",
    name: "Applicants",
    icon: "ni ni-bullet-list-67 text-red",
    component: Applicants,
    layout: "/admin"
  },
  {
    path: "/reviewers",
    name: "Reviewers",
    icon: "ni ni-bullet-list-67 text-red",
    component: Reviewers,
    layout: "/admin"
  },
  {
    path: "/edit",
    name: "Edit",
    icon: "ni ni-bullet-list-67 text-red",
    component: EditApplication,
    layout: "/admin"
  },
  {
    path: "/view",
    name: "View Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewApplication,
    layout: "/admin"
  },
  {
    path: "/editApplicants",
    name: "Edit",
    icon: "ni ni-bullet-list-67 text-red",
    component: EditApplicants,
    layout: "/admin"
  },
  {
    path: "/viewApplicants",
    name: "View Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewApplicants,
    layout: "/admin"
  },
  {
    path: "/editReviewers",
    name: "Edit",
    icon: "ni ni-bullet-list-67 text-red",
    component: EditReviewers,
    layout: "/admin"
  },
  {
    path: "/viewReviewers",
    name: "View Details",
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewReviewers,
    layout: "/admin"
  },
];
export default routes;
