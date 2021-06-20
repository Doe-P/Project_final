import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/login.vue";
import Member from "@/views/Member_form/Member.vue";
import MemberCreate from "@/views/Member_form/MemberCreate.vue";
import MemberEdit from "@/views/Member_form/MemberEdit.vue";
import Foundation from "@/views/ManageData/foundation.vue";
import Section from "@/views/ManageData/section.vue";
import Unit from "@/views/ManageData/unit.vue";
import EducationLevel from "@/views/ManageData/educationLevel.vue";
import memberType from "@/views/ManageData/memberType.vue";
import activityType from "@/views/ManageData/activityType.vue";
import certificateType from "@/views/ManageData/certificateType.vue";
import Activity from "@/views/Activity/activity.vue";
import ActivityCreate from "@/views/Activity/activityCreate.vue";
import Activityview from "@/views/Activity/activityView.vue";
import retirement from "@/views/Member-retirement/member-retirement.vue";
import retirement_create from "@/views/Member-retirement/member-retirement-create.vue";
import member_move from "@/views/member-move/member-move.vue";
import member_move_create from "@/views/member-move/member-move-create.vue";
import member_move_detail from "@/views/member-move/member-move-detail.vue";
import receive_money from "@/views/receive/receive-money.vue";
import certificate_view from "@/views/Certificate/certificate-view.vue";
import certificate_detail from "@/views/Certificate/certificate-detail.vue";
import membersReport from "@/views/reports/membersReport.vue"
import members_statisticsReport from "@/views/reports/members-statistics-report.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Member",
    name: "Member",
    component: Member,
  },
  {
    path: "/member-create",
    name: "member-create",
    component: MemberCreate,
  },
  {
    path: "/member-edit",
    name: "member-edit",
    component: MemberEdit,
  },
  {
    path: "/foundation",
    name: "foundation",
    component: Foundation,
  },
  {
    path: "/section",
    name: "section",
    component: Section,
  },
  {
    path: "/unit",
    name: "unit",
    component: Unit,
  },
  {
    path: "/education-level",
    name: "education-level",
    component: EducationLevel,
  },
  {
    path: "/member-type",
    name: "member-type",
    component: memberType,
  },
  {
    path: "/activity-type",
    name: "activity-type",
    component: activityType,
  },
  {
    path: "/certificate-type",
    name: "certificate-type",
    component: certificateType,
  },
  {
    path: "/activity",
    name: "activity",
    component: Activity,
  },
  {
    path: "/activity-create",
    name: "activity-create",
    component: ActivityCreate,
  },
  {
    path: "/activity-view",
    name: "activity-view",
    component: Activityview,
  },
  {
    path: "/member-retirement",
    name: "member-retirement",
    component: retirement,
  },
  {
   path:"/member-retirement-create",
   name:"member-retirement-create",
   component:retirement_create
  },
  {
   path:"/member-move",
   name:"member-move",
   component:member_move
  },
  {
    path:"/member-move-create",
    name:"member-move-create",
    component:member_move_create
  },
 {
  path:"/member-move-detail",
  name:"member-move-detail",
  component:member_move_detail
 },
 {
   path:"/receive-money",
   name:"receive-money",
   component:receive_money
 },
 {
   path:"/certificate-view",
   name:"certificate-view",
   component:certificate_view
 },
 {
   path:"/certificate-detail",
   name:"certificate-datail",
   component:certificate_detail
 },
 {
  path:"/members-report",
  name:"members-report",
  component:membersReport
 },
 {
   path:"/members-statistics-report",
   name:"members-statistics-report",
   component:members_statisticsReport
 },
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "*",
    redirect: "/Login", // page not found
  },
];

const router = new VueRouter({
  routes,
});

export default router;
