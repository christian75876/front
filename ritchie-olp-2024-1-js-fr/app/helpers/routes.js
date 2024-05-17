import { LoginPage } from '../scenes/public/login';

import { AuditScene, HomeScene, ReportScene, SettingsScene, UserScene, ForumScene,Showcases,RegisterPage, Profile } from '../scenes/private';


export const routes = {
    private: [
        { path: '/dashboard', component: HomeScene },
        { path: '/dashboard/reports', component: ReportScene },
        { path: '/dashboard/settings', component: SettingsScene },
        { path: '/dashboard/users', component: UserScene },
        { path: '/dashboard/forum', component: ForumScene},
        { path: '/dashboard/show-cases', component: Showcases },
        { path: '/dashboard/audit', component: AuditScene }
    ],
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage }
    ]
};