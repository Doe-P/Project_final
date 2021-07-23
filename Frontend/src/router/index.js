import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/login.vue";
import Member from "@/views/Member_form/Member.vue";
import MemberCreate from "@/views/Member_form/MemberCreate.vue";
import MemberEdit from "@/views/Member_form/MemberEdit.vue";
import MemberDetail from "@/views/Member_form/Member-detail.vue";
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
import receive_create from "@/views/receive/receive-create.vue";
import certificate_view from "@/views/Certificate/certificate-view.vue";
import certificate_detail from "@/views/Certificate/certificate-detail.vue";
import membersReport from "@/views/reports/membersReport.vue";
import members_statisticsReport from "@/views/reports/members-statistics-report.vue";
import members_moveReport from "@/views/reports/member-move-report.vue";
import members_retireReport from "@/views/reports/member-retirement-report.vue";
import receive_Report from "@/views/reports/receive-report.vue";
import activityReport from "@/views/reports/activity-report.vue";
import certificateReport from "@/views/reports/certificate-report.vue";
import register_view from "@/views/registers/register-view.vue";
import register_create from "@/views/registers/register-create.vue";
import register_edit from "@/views/registers/register-edit.vue";

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
    path: "/member/edit/:member_edit",
    name: "member-edit",
    component: MemberEdit,
    props: true,
  },
  {
    path: "/member/detail/:member_detail",
    name: "member-detail",
    component: MemberDetail,
    props: true,
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
    props: true,
  },
  {
    path: "/activity-create",
    name: "activity-create",
    component: ActivityCreate,
  },
  {
    path: "/activity/view/:activity_view",
    name: "activity-view",
    component: Activityview,
  },
  {
    path: "/member-retirement",
    name: "member-retirement",
    component: retirement,
  },
  {
    path: "/member-retirement-create",
    name: "member-retirement-create",
    component: retirement_create,
  },
  {
    path: "/member-move",
    name: "member-move",
    component: member_move,
  },
  {
    path: "/member-move-create",
    name: "member-move-create",
    component: member_move_create,
  },
  {
    path: "/member/move/detail/:id",
    name: "member-move-detail",
    component: member_move_detail,
  },
  {
    path: "/receive-money",
    name: "receive-money",
    component: receive_money,
  },
  {
    path: "/recive-create",
    name: "recive-create",
    component: receive_create,
  },
  {
    path: "/certificate-view",
    name: "certificate-view",
    component: certificate_view,
  },
  {
    path: "/certificate/detail/:id",
    name: "certificate-datail",
    component: certificate_detail,
  },
  {
    path: "/members-report",
    name: "members-report",
    component: membersReport,
  },
  {
    path: "/members-statistics-report",
    name: "members-statistics-report",
    component: members_statisticsReport,
  },
  {
    path: "/member-move-report",
    name: "member-move-report",
    component: members_moveReport,
  },
  {
    path: "/members-retirement-report",
    name: "members-retirment-report",
    component: members_retireReport,
  },
  {
    path: "/receive-report",
    name: "receive-report",
    component: receive_Report,
  },
  {
    path: "/activity-report",
    name: "activity-report",
    component: activityReport,
  },
  {
    path: "/certificate-report",
    name: "certificate-report",
    component: certificateReport,
  },
  {
    path: "/register-view",
    name: "register-view",
    component: register_view,
  },
  {
    path: "/register-create",
    name: "register-create",
    component: register_create,
  },
  {
    path: "/register/edit/:username",
    name: "register-edit",
    component: register_edit,
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
  mode: "history",
  base: process.env.BASE_URL,
});

export default router;
