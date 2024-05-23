import { LoginPage } from '../scenes/public/login';
import { HomeScene } from '../scenes/private/home';
import { ReportScene } from '../scenes/private/reports';
import { SettingsScene } from '../scenes/private/settings';
import { UserScene } from '../scenes/private/users';
import { ForumScene } from '../scenes/private/forum';
import { Showcases } from '../scenes/private/showcases';
import { RegisterPage } from '../scenes/public/register';
import { Games  } from '../scenes/private/games/games';
import { Profile } from '../scenes/private/profile/profile';
import { PostScene } from '../scenes/private/posts/posts';
import { ChallengeScene, CreateChallengeScene } from '../scenes/private/challenges';
import { ModuleCreateScene } from '../scenes/private/modules/module-create';
import {Aprendizaje} from "../scenes/private/aprendizaje";
import {AuditScene} from "../scenes/private/audit/audit"
  


export const routes = {
    private: [
        { path: '/dashboard', component: HomeScene },
        { path: '/dashboard/reports', component: ReportScene },
        { path: '/dashboard/settings', component: SettingsScene },
        { path: '/dashboard/users', component: UserScene },
        { path: '/dashboard/forum', component: ForumScene},
        { path: '/dashboard/show-cases', component: Showcases },
        { path: "/dashboard/games", component: Games },
        { path: '/dashboard/profile', component: Profile},
        { path: '/dashboard/posts', component: PostScene },
        { path: '/dashboard/challenges', component: ChallengeScene},
        { path: '/dashboard/challenges/create', component: CreateChallengeScene},
        { path: '/dashboard/modules/create', component: ModuleCreateScene},
        { path: "/dashboard/aprendizaje", component: Aprendizaje },
        { path: "/dashboard/audit", component: AuditScene},
        // { path: '/dashboard/routes/languages', component: LanguageByRouteScene},
        // { path: '/dashboard/routes/languages/modules', component: ModulesByLanguage}
    ],
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
    ]
};