import { LoginPage } from "../scenes/public/login";
import { RegisterPage } from "../scenes/public/register";

import {
  AuditScene,
  HomeScene,
  ReportScene,
  SettingsScene,
  UserScene,
  ForumScene,
  Aprendizaje,
  Profile,
  Games,
} from "../scenes/private";

export const routes = {
  private: [
    { path: "/dashboard", component: HomeScene },
    { path: "/dashboard/reports", component: ReportScene },
    { path: "/dashboard/settings", component: SettingsScene },
    { path: "/dashboard/users", component: UserScene },
    { path: "/dashboard/forum", component: ForumScene },
    { path: "/dashboard/aprendizaje", component: Aprendizaje },
    { path: "/dashboard/audit", component: AuditScene },
    { path: "/dashboard/profile", component: Profile },
    { path: "/dashboard/games", component: Games },
  ],
  public: [
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
  ],
};
