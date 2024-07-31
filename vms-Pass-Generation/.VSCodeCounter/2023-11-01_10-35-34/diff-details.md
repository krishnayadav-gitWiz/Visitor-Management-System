# Diff Details

Date : 2023-11-01 10:35:34

Directory c:\\Users\\Admin\\Desktop\\vms-Pass-Generation\\backend\\src

Total : 100 files,  -7157 codes, -337 comments, -432 blanks, all -7926 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/src/app.module.ts](/backend/src/app.module.ts) | TypeScript | 38 | 0 | 4 | 42 |
| [backend/src/auth/auth.cotroller.ts](/backend/src/auth/auth.cotroller.ts) | TypeScript | 34 | 0 | 7 | 41 |
| [backend/src/auth/auth.module.ts](/backend/src/auth/auth.module.ts) | TypeScript | 36 | 0 | 6 | 42 |
| [backend/src/auth/dto/login.dto.ts](/backend/src/auth/dto/login.dto.ts) | TypeScript | 4 | 0 | 4 | 8 |
| [backend/src/auth/guard/jwt.guards.ts](/backend/src/auth/guard/jwt.guards.ts) | TypeScript | 14 | 0 | 7 | 21 |
| [backend/src/auth/guard/role.guard.ts](/backend/src/auth/guard/role.guard.ts) | TypeScript | 14 | 0 | 5 | 19 |
| [backend/src/auth/strategy/jwt.strategy.ts](/backend/src/auth/strategy/jwt.strategy.ts) | TypeScript | 26 | 0 | 3 | 29 |
| [backend/src/auth/strategy/local.strategy.ts](/backend/src/auth/strategy/local.strategy.ts) | TypeScript | 25 | 0 | 3 | 28 |
| [backend/src/login-logs/dto/create-login-log.dto.ts](/backend/src/login-logs/dto/create-login-log.dto.ts) | TypeScript | 9 | 0 | 5 | 14 |
| [backend/src/login-logs/dto/update-login-log.dto.ts](/backend/src/login-logs/dto/update-login-log.dto.ts) | TypeScript | 4 | 0 | 3 | 7 |
| [backend/src/login-logs/entities/login-log.entity.ts](/backend/src/login-logs/entities/login-log.entity.ts) | TypeScript | 12 | 0 | 6 | 18 |
| [backend/src/login-logs/login-logs.controller.ts](/backend/src/login-logs/login-logs.controller.ts) | TypeScript | 22 | 0 | 7 | 29 |
| [backend/src/login-logs/login-logs.module.ts](/backend/src/login-logs/login-logs.module.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [backend/src/login-logs/login-logs.service.ts](/backend/src/login-logs/login-logs.service.ts) | TypeScript | 38 | 3 | 13 | 54 |
| [backend/src/login-logs/repo/LoginReportsRepository.tsx](/backend/src/login-logs/repo/LoginReportsRepository.tsx) | TypeScript JSX | 6 | 0 | 1 | 7 |
| [backend/src/main.ts](/backend/src/main.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [backend/src/pass-cancel-details/dto/create-pass-cancel-detail.dto.ts](/backend/src/pass-cancel-details/dto/create-pass-cancel-detail.dto.ts) | TypeScript | 5 | 0 | 5 | 10 |
| [backend/src/pass-cancel-details/dto/update-pass-cancel-detail.dto.ts](/backend/src/pass-cancel-details/dto/update-pass-cancel-detail.dto.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [backend/src/pass-cancel-details/entities/pass-cancel-detail.entity.ts](/backend/src/pass-cancel-details/entities/pass-cancel-detail.entity.ts) | TypeScript | 12 | 0 | 6 | 18 |
| [backend/src/pass-cancel-details/pass-cancel-details.controller.spec.ts](/backend/src/pass-cancel-details/pass-cancel-details.controller.spec.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [backend/src/pass-cancel-details/pass-cancel-details.controller.ts](/backend/src/pass-cancel-details/pass-cancel-details.controller.ts) | TypeScript | 16 | 0 | 6 | 22 |
| [backend/src/pass-cancel-details/pass-cancel-details.module.ts](/backend/src/pass-cancel-details/pass-cancel-details.module.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [backend/src/pass-cancel-details/pass-cancel-details.service.spec.ts](/backend/src/pass-cancel-details/pass-cancel-details.service.spec.ts) | TypeScript | 14 | 0 | 5 | 19 |
| [backend/src/pass-cancel-details/pass-cancel-details.service.ts](/backend/src/pass-cancel-details/pass-cancel-details.service.ts) | TypeScript | 24 | 0 | 7 | 31 |
| [backend/src/pass-cancel-details/repo/cancelPass.repository.ts](/backend/src/pass-cancel-details/repo/cancelPass.repository.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [backend/src/pass/dto/create-tblVisitor.dto.ts](/backend/src/pass/dto/create-tblVisitor.dto.ts) | TypeScript | 23 | 0 | 9 | 32 |
| [backend/src/pass/dto/update-pass.dto.ts](/backend/src/pass/dto/update-pass.dto.ts) | TypeScript | 32 | 0 | 11 | 43 |
| [backend/src/pass/entities/tblVisitor.entity.ts](/backend/src/pass/entities/tblVisitor.entity.ts) | TypeScript | 42 | 0 | 17 | 59 |
| [backend/src/pass/pass.controller.ts](/backend/src/pass/pass.controller.ts) | TypeScript | 38 | 4 | 14 | 56 |
| [backend/src/pass/pass.module.ts](/backend/src/pass/pass.module.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [backend/src/pass/pass.service.ts](/backend/src/pass/pass.service.ts) | TypeScript | 47 | 4 | 16 | 67 |
| [backend/src/pass/repo/pass.repository.ts](/backend/src/pass/repo/pass.repository.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [backend/src/tvv-date/dto/create-tvv-date.dto.ts](/backend/src/tvv-date/dto/create-tvv-date.dto.ts) | TypeScript | 22 | 5 | 11 | 38 |
| [backend/src/tvv-date/dto/update-tvv-date.dto.ts](/backend/src/tvv-date/dto/update-tvv-date.dto.ts) | TypeScript | 9 | 2 | 5 | 16 |
| [backend/src/tvv-date/entities/tvv-date.entity.ts](/backend/src/tvv-date/entities/tvv-date.entity.ts) | TypeScript | 56 | 3 | 23 | 82 |
| [backend/src/tvv-date/repo/tvv-date.repository.ts](/backend/src/tvv-date/repo/tvv-date.repository.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [backend/src/tvv-date/tvv-date.controller.ts](/backend/src/tvv-date/tvv-date.controller.ts) | TypeScript | 34 | 1 | 13 | 48 |
| [backend/src/tvv-date/tvv-date.module.ts](/backend/src/tvv-date/tvv-date.module.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [backend/src/tvv-date/tvv-date.service.ts](/backend/src/tvv-date/tvv-date.service.ts) | TypeScript | 77 | 2 | 19 | 98 |
| [backend/src/user/constants/user.constants.ts](/backend/src/user/constants/user.constants.ts) | TypeScript | 7 | 1 | 1 | 9 |
| [backend/src/user/dto/create-user.dto.ts](/backend/src/user/dto/create-user.dto.ts) | TypeScript | 21 | 0 | 13 | 34 |
| [backend/src/user/dto/update-user.dto.ts](/backend/src/user/dto/update-user.dto.ts) | TypeScript | 6 | 0 | 4 | 10 |
| [backend/src/user/dto/updatePassword.dto.ts](/backend/src/user/dto/updatePassword.dto.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [backend/src/user/entities/user.entity.ts](/backend/src/user/entities/user.entity.ts) | TypeScript | 41 | 0 | 21 | 62 |
| [backend/src/user/repo/user.repository.ts](/backend/src/user/repo/user.repository.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [backend/src/user/user.controller.ts](/backend/src/user/user.controller.ts) | TypeScript | 55 | 2 | 22 | 79 |
| [backend/src/user/user.module.ts](/backend/src/user/user.module.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [backend/src/user/user.service.ts](/backend/src/user/user.service.ts) | TypeScript | 50 | 22 | 17 | 89 |
| [backend/src/visitor-appointment-generate/dto/create-visitor-appointment-generate.dto.ts](/backend/src/visitor-appointment-generate/dto/create-visitor-appointment-generate.dto.ts) | TypeScript | 28 | 6 | 15 | 49 |
| [backend/src/visitor-appointment-generate/dto/update-visitor-appointment-generate.dto.ts](/backend/src/visitor-appointment-generate/dto/update-visitor-appointment-generate.dto.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [backend/src/visitor-appointment-generate/entities/visitor-appointment-generate.entity.ts](/backend/src/visitor-appointment-generate/entities/visitor-appointment-generate.entity.ts) | TypeScript | 59 | 1 | 21 | 81 |
| [backend/src/visitor-appointment-generate/repo/appointment.repository.ts](/backend/src/visitor-appointment-generate/repo/appointment.repository.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [backend/src/visitor-appointment-generate/visitor-appointment-generate.controller.ts](/backend/src/visitor-appointment-generate/visitor-appointment-generate.controller.ts) | TypeScript | 15 | 0 | 6 | 21 |
| [backend/src/visitor-appointment-generate/visitor-appointment-generate.module.ts](/backend/src/visitor-appointment-generate/visitor-appointment-generate.module.ts) | TypeScript | 12 | 0 | 2 | 14 |
| [backend/src/visitor-appointment-generate/visitor-appointment-generate.service.spec.ts](/backend/src/visitor-appointment-generate/visitor-appointment-generate.service.spec.ts) | TypeScript | 21 | 8 | 61 | 90 |
| [backend/src/visitor-appointment-generate/visitor-appointment-generate.service.ts](/backend/src/visitor-appointment-generate/visitor-appointment-generate.service.ts) | TypeScript | 30 | 3 | 12 | 45 |
| [frontend/src/ProctectedRoutes.tsx](/frontend/src/ProctectedRoutes.tsx) | TypeScript JSX | -10 | 0 | -3 | -13 |
| [frontend/src/Routing.tsx](/frontend/src/Routing.tsx) | TypeScript JSX | -206 | 0 | -19 | -225 |
| [frontend/src/api/ApiConstants.ts](/frontend/src/api/ApiConstants.ts) | TypeScript | -51 | 0 | -5 | -56 |
| [frontend/src/assets/react.svg](/frontend/src/assets/react.svg) | XML | -1 | 0 | 0 | -1 |
| [frontend/src/axios/AxiosSetup.ts](/frontend/src/axios/AxiosSetup.ts) | TypeScript | -8 | -27 | -3 | -38 |
| [frontend/src/components/Footer.tsx](/frontend/src/components/Footer.tsx) | TypeScript JSX | -15 | 0 | -4 | -19 |
| [frontend/src/components/Form.tsx](/frontend/src/components/Form.tsx) | TypeScript JSX | -8 | -11 | -1 | -20 |
| [frontend/src/components/Header.tsx](/frontend/src/components/Header.tsx) | TypeScript JSX | -12 | 0 | -2 | -14 |
| [frontend/src/components/ImageCapture.jsx](/frontend/src/components/ImageCapture.jsx) | JavaScript JSX | -83 | -4 | -7 | -94 |
| [frontend/src/components/NewNavbar.tsx](/frontend/src/components/NewNavbar.tsx) | TypeScript JSX | -164 | -2 | -32 | -198 |
| [frontend/src/main.tsx](/frontend/src/main.tsx) | TypeScript JSX | -12 | 0 | -1 | -13 |
| [frontend/src/pages/AddUser.tsx](/frontend/src/pages/AddUser.tsx) | TypeScript JSX | -262 | -3 | -23 | -288 |
| [frontend/src/pages/AppointmentReport.tsx](/frontend/src/pages/AppointmentReport.tsx) | TypeScript JSX | -224 | 0 | -40 | -264 |
| [frontend/src/pages/Appointments.tsx](/frontend/src/pages/Appointments.tsx) | TypeScript JSX | -147 | -2 | -18 | -167 |
| [frontend/src/pages/LastMonth.tsx](/frontend/src/pages/LastMonth.tsx) | TypeScript JSX | -191 | -2 | -14 | -207 |
| [frontend/src/pages/LastSixMonths.tsx](/frontend/src/pages/LastSixMonths.tsx) | TypeScript JSX | -138 | -3 | -22 | -163 |
| [frontend/src/pages/LastWeek.tsx](/frontend/src/pages/LastWeek.tsx) | TypeScript JSX | -150 | -4 | -26 | -180 |
| [frontend/src/pages/Login.tsx](/frontend/src/pages/Login.tsx) | TypeScript JSX | -83 | -7 | -8 | -98 |
| [frontend/src/pages/LoginReports.tsx](/frontend/src/pages/LoginReports.tsx) | TypeScript JSX | -206 | 0 | -37 | -243 |
| [frontend/src/pages/NewVisitor.tsx](/frontend/src/pages/NewVisitor.tsx) | TypeScript JSX | -262 | -5 | -32 | -299 |
| [frontend/src/pages/Pass.tsx](/frontend/src/pages/Pass.tsx) | TypeScript JSX | -122 | -2 | -36 | -160 |
| [frontend/src/pages/TodayEntries.tsx](/frontend/src/pages/TodayEntries.tsx) | TypeScript JSX | -141 | -2 | -24 | -167 |
| [frontend/src/pages/UpdateVisitor.tsx](/frontend/src/pages/UpdateVisitor.tsx) | TypeScript JSX | -163 | -2 | -26 | -191 |
| [frontend/src/pages/UpdateVisitorForm.tsx](/frontend/src/pages/UpdateVisitorForm.tsx) | TypeScript JSX | -275 | -35 | -44 | -354 |
| [frontend/src/pages/Users.tsx](/frontend/src/pages/Users.tsx) | TypeScript JSX | -169 | -2 | -16 | -187 |
| [frontend/src/pages/VisitDateReport.tsx](/frontend/src/pages/VisitDateReport.tsx) | TypeScript JSX | -218 | -3 | -45 | -266 |
| [frontend/src/pages/VisitingInfo.tsx](/frontend/src/pages/VisitingInfo.tsx) | TypeScript JSX | -288 | -5 | -43 | -336 |
| [frontend/src/pages/VisitorEntry.tsx](/frontend/src/pages/VisitorEntry.tsx) | TypeScript JSX | -202 | -29 | -27 | -258 |
| [frontend/src/pages/VisitorImage.tsx](/frontend/src/pages/VisitorImage.tsx) | TypeScript JSX | -41 | 0 | -17 | -58 |
| [frontend/src/pages/VisitorReport.tsx](/frontend/src/pages/VisitorReport.tsx) | TypeScript JSX | -226 | -3 | -47 | -276 |
| [frontend/src/pages/Visitors.tsx](/frontend/src/pages/Visitors.tsx) | TypeScript JSX | -220 | -2 | -12 | -234 |
| [frontend/src/pages/changePassword.tsx](/frontend/src/pages/changePassword.tsx) | TypeScript JSX | -103 | -8 | -10 | -121 |
| [frontend/src/signatureComponent/CanvasModal.css](/frontend/src/signatureComponent/CanvasModal.css) | CSS | -62 | 0 | -8 | -70 |
| [frontend/src/signatureComponent/CanvasModal.jsx](/frontend/src/signatureComponent/CanvasModal.jsx) | JavaScript JSX | -133 | -1 | -14 | -148 |
| [frontend/src/signatureComponent/STPadServerLib-3.3.0.js](/frontend/src/signatureComponent/STPadServerLib-3.3.0.js) | JavaScript | -2,413 | -73 | -82 | -2,568 |
| [frontend/src/signatureComponent/SignatureCapture.jsx](/frontend/src/signatureComponent/SignatureCapture.jsx) | JavaScript JSX | -206 | -6 | -19 | -231 |
| [frontend/src/signotec/CustomLib.tsx](/frontend/src/signotec/CustomLib.tsx) | TypeScript JSX | -347 | -117 | -56 | -520 |
| [frontend/src/signotec/STPadServerLib-3.3.0.js](/frontend/src/signotec/STPadServerLib-3.3.0.js) | JavaScript | -610 | -3 | -45 | -658 |
| [frontend/src/signotec/bluebird.min.js](/frontend/src/signotec/bluebird.min.js) | JavaScript | -3 | -29 | 0 | -32 |
| [frontend/src/styles/App.css](/frontend/src/styles/App.css) | CSS | -33 | 0 | -6 | -39 |
| [frontend/src/styles/index.css](/frontend/src/styles/index.css) | CSS | -103 | -6 | -15 | -124 |
| [frontend/src/styles/styles.css](/frontend/src/styles/styles.css) | CSS | -32 | -5 | -11 | -48 |
| [frontend/src/utils/LoginInfo.ts](/frontend/src/utils/LoginInfo.ts) | TypeScript | -18 | 0 | 0 | -18 |
| [frontend/src/vite-env.d.ts](/frontend/src/vite-env.d.ts) | TypeScript | -5 | -1 | -1 | -7 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details