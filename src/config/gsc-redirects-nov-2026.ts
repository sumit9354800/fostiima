// 301 redirects requested in "GSC issues nov 2026.xlsx", sheet "Blocked By
// Robots.txt" (SEO Recommendation column). Keys are destinations. Each source
// is the sheet URL's path without the host, query string or trailing slash;
// next.config.ts redirects it with and without the slash, in one hop. R<n> is
// the spreadsheet row.
//
// Not listed here (see Performance-Audit/gsc-nov-2026-implementation-report.md):
// - R191 /faculties and R254 /sitemap: "Leave as is".
// - R309 and R383: already redirected by LEGACY_PHP_PAGES in next.config.ts.
// - R119 /?trk=public_post-text and R121 /?ref=wefind: homepage query URLs,
//   redirected in src/proxy.ts (redirects() would keep the query string).
// - R46, R100, R118 (/?source=...) and R307: held for client confirmation.
//
// Pure data, imported by next.config.ts and src/app/robots.ts.

export const GSC_NOV_2026_REDIRECTS: Readonly<
  Record<string, readonly string[]>
> = {
  "/blog": [
    "/blog/tag/post-graduate-diploma-in-management-in-marketing-management", // R47
    "/blog/tag/best-mba-colleges-syllabus", // R48
    "/blog/tag/iim", // R49
    "/blog/tag/admission-in-a-pgdm-program/page/2", // R50
    "/blog/tag/pgdm-in-industrial", // R51
    "/blog/tag/mba-marketing-inerview-type-quetions", // R52
    "/blog/tag/curriculum-of-pgdm-in-finance", // R54
    "/blog/education/page/5", // R55
    "/blog/tag/student", // R61
    "/blog/tag/iim-faculty", // R62
    "/blog/tag/gmat-exam-2024", // R63
    "/blog/tag/how-to-fill-cuet-examination-form-2025", // R65
    "/blog/tag/fostiima-mba-college", // R66
    "/blog/tag/mba-institute-in-delhi-ncr", // R67
    "/blog/tag/cuet-pg-cut-off", // R68
    "/blog/tag/how-to-choose-best-colleges", // R70
    "/blog/tag/informative-blog", // R71
    "/blog/tag/human-capital-management", // R72
    "/blog/tag/face-to-face-job-interview", // R73
    "/blog/tag/aicte-approved-management-course", // R74
    "/blog/tag/pgdm-institutes-in-delhi", // R75
    "/blog/tag/interviewer", // R76
    "/blog/tag/management-colleges", // R77
    "/blog/tag/make-career-in-pgdm", // R79
    "/blog/tag/b-school-delhi", // R80
    "/blog/tag/b-schools-in-delhi", // R81
    "/blog/lic-starting-its-massive-public-offering-in-india", // R82
    "/blog/tag/companies", // R83
    "/blog/tag/eges-in-new-delhi", // R85
    "/blog/tag/pgdm-in-business", // R86
    "/blog/tag/business-school-delhi", // R87
    "/blog/tag/what-is-the-mba", // R88
    "/blog/pgdm/page/4", // R89
    "/blog/tag/business-school-in-delhi-ncr", // R91
    "/blog/how-does-body-language-affect-your-chances-of-getting-hired", // R92
    "/blog/tag/best-pgdm-colleges-in-delhi-ncr", // R93
    "/blog/tag/best-aicte-approved-mba-colleges-in-delhi", // R94
    "/blog/tag/pgdm-admissions-2024-26", // R102
    "/blog/tag/pgdm-in-career-opportunity", // R103
    "/blog/tag/cuet-pg-eligibility-criteria", // R106
    "/blog/tag/best-mba-pgdm-specialization", // R107
    "/blog/tag/mba-and-pgdm", // R111
    "/blog/tag/iim-fees-for-mba-2024", // R112
    "/blog/uncategorized", // R114
    "/blog/tag/why-choose-us-pgdm-degree", // R115
    "/blog/tag/gmat-preparation", // R116
    "/blog/tag/iima-faculty", // R125
    "/blog/tag/graduate-diploma-in-management", // R126
    "/blog/education", // R128
    "/blog/tag/gmat-exam-2025", // R131
    "/blog/tag/eligibility-criteria-of-gmat", // R135
    "/blog/how-well-pgdm-in-logistics-and-supply-chain-can-help-to-grow", // R136
    "/blog/tag/mat-exam", // R140
    "/blog/tag/best-placement-in-mba", // R141
    "/blog/tag/what-should-be-avoided-in-female-formal-wear", // R144
    "/blog/tag/cuet-exam", // R145
    "/blog/tag/gmat-cut-off", // R146
    "/blog/tag/pgdm-admissions-2023-25", // R147
    "/blog/tag/mba-institute", // R148
    "/blog/tag/what-are-the-benefits-of-mba", // R149
    "/blog/tag/pgdm-marketing", // R150
    "/blog/tag/why-better-option-to-pgdm", // R152
    "/blog/tag/university-grants-commission", // R153
    "/blog/mba-colleges-in-delhi-as-good-as-if-not-better-than-iimas", // R154
    "/discussion-on-budget-2024", // R155
    "/blog/tag/what-is-a-cat-score", // R156
    "/blog/tag/aicte-approved-b-school-in-delhi", // R157
    "/blog/tag/mba-gd-2024/feed", // R159
    "/blog/2022/04", // R160
    "/blog/mba", // R161
    "/blog/tag/best-pgdm-institute", // R162
    "/blog/tag/top-mba-colleges-in-delhi", // R163
    "/blog/mba-school-in-delhi-that-offers-genuine-mba-education", // R164
    "/blog/tag/what-is-cat-percentile", // R165
    "/blog/tag/mba-without-cat-eligibility", // R166
    "/blog/2019/01", // R168
    "/blog/2018/11", // R169
    "/blog/tag/mat-syllabus", // R181
    "/blog/tag/gmat-syllabus-2024", // R182
    "/blog/tag/xat-exam-2025", // R183
    "/blog/tag/xam-dates-2025-exam-date", // R185
    "/blog/tag/mba-colleges", // R189
    "/blog/author/admin/page/4", // R192
    "/blog/business-marketing", // R193
    "/blog/teaching-learning", // R194
    "/blog/tag/pgdm-hr/feed", // R195
    "/blog/tag/interview-tips", // R201
    "/blog/tag/best-mba-college-in-delhi", // R202
    "/aicte-approval-2021-22.php", // R203
    "/blog/2023/01", // R206
    "/blog/tag/overview-of-an-mba-course", // R209
    "/blog/tag/pgdm-courses-in-delhi-ncr", // R212
    "/blog/fostiima-starting-for-the-first-time-elite-group", // R213
    "/blog/tag/top-pgdm-college-in-delhi", // R214
    "/blog/2020/02", // R216
    "/blog/tag/atma-eaxm", // R221
    "/blog/tag/gmat-exam-pattern-2024", // R222
    "/blog/tag/nmat2025", // R223
    "/blog/tag/pgdm-in-managment", // R224
    "/blog/tag/best-business-school-in-delhi", // R225
    "/blog/tag/group-discussion-for-mba", // R226
    "/blog/tag/pgdm-in-hrm", // R227
    "/blog/tag/xat-accepting-colleges-in-delhi", // R228
    "/blog/tag/top-b-schools-colleges-accepting-xat", // R229
    "/blog/tag/cat-colleges", // R230
    "/blog/tag/pgdm-hrm-eligibility", // R232
    "/blog/tag/xat-exam", // R234
    "/blog/tag/best-management-institute", // R235
    "/blog/tag/xat-exam-notification-2025", // R236
    "/blog/tag/mba-admission-2024", // R238
    "/blog/tag/mba-or-pgdm", // R239
    "/blog/tag/iim-ahmedabad", // R240
    "/blog/tag/best-business-school-in-delhi/feed", // R241
    "/blog/2019/07", // R245
    "/blog/tag/new-delhi-by-doing-this-you-will-make-y", // R250
    "/blog/tag/best-pgdm-colleges", // R255
    "/blogs-category", // R258
    "/blog/mba/page/4", // R260
    "/blog/academic-events/feed", // R267
    "/blog/tag/pgdm-hr-syllabus", // R268
    "/blog/tag/are-you-know-about-mba-syllabus-2024", // R269
    "/blog/2022/03", // R270
    "/blog/tag/mba-colleges-accepting-cmat-score", // R271
    "/blog/tag/notification-and-syllabus", // R275
    "/blog/tag/xat-accepting-colleges", // R276
    "/blog/tag/nmat-exam-date", // R277
    "/blog/tag/gmat-scores", // R278
    "/blog/tag/xam-dates-syllabus-2025", // R279
    "/blog/tag/cat-score-vs-percentile", // R280
    "/blog/tag/bba-college-in-delhi", // R281
    "/blog/pgdm/page/3", // R282
    "/blog/tag/cat-percentile", // R283
    "/blog/tag/nmat-official-website", // R284
    "/blog/tag/fostiima-elite-bach/feed", // R288
    "/blog/colleges/page/2", // R289
    "/blog/tag/cmat-exam", // R290
    "/blog/tag/cat-score", // R291
    "/blog/points-to-keep-in-mind-before-choosing-pgdm-specialization", // R292
    "/blog/tag/mba-colleges-in-delhi-private", // R293
    "/blog/tag/how-to-dress-for-an-interview-male", // R294
    "/blog/tag/elite-batch/feed", // R295
    "/blog/tag/mba-courses", // R296
    "/blog/2019/02", // R297
    "/blog/technology-in-education", // R299
    "/blog/business-schools-in-delhi-do-they-teach-business-or-do-they-run-a-business", // R301
    "/blog/tag/mba-fee-structure-for-iims", // R302
    "/blog/mba-pgdm-courses-in-delhi-to-help-you-climb-to-the-top", // R303
    "/blog/tag/marketing-management", // R304
    "/blog/tag/top-mba-marketing-interview-quetions", // R305
    "/blog/tag/business-school", // R306
    "/blog/colleges", // R308
    "/blog/tag/business-school-in-india", // R310
    "/blog/tag/top-business-school-in-delhi", // R311
    "/blog/tag/mba-exam-eligibility", // R312
    "/blog/tag/nmat-exams", // R313
    "/blog/tag/mba-syllabus-subject", // R314
    "/blog/back-to-education-at-fostiima-business-school", // R315
    "/blog/tag/benefits-of-pgdm-in-marketing", // R316
    "/blog/pgdm-in-marketing-is-excellent-for-a-leap-in-your-career", // R317
    "/blog/tag/pgdm-in-finance", // R318
    "/blog/tag/list-of-mba-specializations-in-india", // R319
    "/blog/tag/two-year-mba-iim-fee-structure", // R320
    "/blog/tag/business-schools-in-delhi", // R321
    "/blog/tag/which-mba-specialization-is-best-in-future", // R322
    "/blog/why-pgdm-could-be-a-better-option-compared-to-integrated-mbabba", // R323
    "/blog/tag/best-b-school-delhi-ncr", // R324
    "/blog/tag/mba-course", // R325
    "/blog/tag/mba-institute/feed", // R328
    "/blog/tag/fostiima-placement", // R329
    "/blog/tag/fostiima-aicte-approved", // R334
    "/blog/tag/mba", // R338
    "/blog/tag/group-discussion-topics-in-mba-admission", // R341
    "/blog/tag/how-to-dress-for-an-interview-female", // R343
    "/blog/tag/pgdm", // R344
    "/blog/feed", // R345
    "/blog/heads-up-for-mba-pgdm-admissions-2023-25", // R346
    "/blog/practical-tips-for-cracking-an-interview", // R347
    "/blog/mba-courses-in-delhi-guarantee-you-will-perform-well-in-your-career", // R348
    "/blog/tag/best-b-school-delhi-ncr/feed", // R350
    "/blog/tag/aicte-approved-pgdm-college", // R351
    "/blog/tag/best-pgdm-course-in-delhi-ncr", // R352
    "/blog/tag/top-business-school-in-india/feed", // R356
    "/blog/tag/executive-mba-in-delhi", // R357
    "/blog/pgdm-in-marketing", // R358
    "/blog/discover-the-best-mba-pgdm-specialization-and-learn-how-to-choose-the-right-one", // R362
    "/blog/tag/pgdm-course-in-delhi-ncr", // R363
    "/blog/tag/exam-in-a-form-of-cat", // R364
    "/blog/pgdm-in-human-resources-can-help-you-to-reach-success", // R365
    "/blog/tag/pgdm-course", // R366
    "/blog/mba/page/2", // R371
    "/blog/tag/pgdm-online", // R372
    "/blog/tag/pgdm-colleges-in-delhi/feed", // R374
    "/blog/tag/what-is-the-formal-dress-code-for-the-interview", // R377
    "/blog/tag/admission-in-a-pgdm-program", // R378
    "/blog/tag/pgdm-course-in-delhi", // R379
    "/blog/tag/mba-college", // R381
    "/blog/tag/management-college-ranking", // R382
    "/blog/education/page/2", // R384
    "/blog/2022/05", // R386
    "/blog/tag/best-mba-college", // R387
    "/blog/aicte-approved-mba-colleges-in-delhi-your-seal-of-trust", // R388
  ],
  "/life-at-fostiima": [
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--40/page/3", // R3
    "/life-at-fostiima.php/nggallery/album/fresher-party-2019/image/fresher-party2019-12", // R4
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/28", // R5
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/27", // R6
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1227", // R7
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--63/page/2", // R8
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1262", // R9
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/28", // R10
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/13-1", // R11
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/2-1", // R12
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1161", // R13
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1251", // R14
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1312", // R15
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/9-1", // R16
    "/life-at-fostiima.php/nggallery/album/blood-donation-camp-2023/page/1/image/img-20240214-wa0015", // R17
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/1-1", // R18
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1308", // R19
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1382", // R20
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1274", // R21
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/1-1", // R22
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/33", // R23
    "/life-at-fostiima.php/nggallery/album/blood-donation-camp-2023/page/1/image/img-20240214-wa0013", // R24
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--48/page/2", // R25
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--22-1/page/3", // R26
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/36", // R27
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1147", // R28
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1216", // R29
    "/life-at-fostiima.php/nggallery/album/orientation/image/img_1310", // R30
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/59", // R31
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/55", // R32
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/19-1", // R33
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/43", // R34
    "/life-at-fostiima.php/nggallery/album/diwali-celebration/page/1/image/8-4", // R35
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8910", // R36
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--35/page/3", // R37
    "/life-at-fostiima.php/nggallery/album/domestic-trip", // R40
    "/life-at-fostiima.php/nggallery/album/lohagarh-tour", // R41
    "/life-at-fostiima.php/nggallery/album/blood-donation-camp-2023/page/2/image/img_20240214_105449", // R42
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8804", // R56
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8696", // R69
    "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness", // R90
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/52", // R95
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/3/image/4-1", // R96
    "/life-at-fostiima.php/nggallery/album/fresher-party-2019", // R104
    "/life-at-fostiima.php/nggallery/album/Cricket-Match/image/cricket1", // R105
    "/life-at-fostiima.php/nggallery/album/blood-donation-camp-2023/pid--img-20240214-wa0010/page/1", // R108
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/42", // R120
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--48/page/1", // R122
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8865", // R127
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8837", // R129
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8850", // R130
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8774", // R132
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8709", // R133
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8726", // R134
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8813", // R137
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8689", // R138
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8763", // R139
    "/life-at-fostiima.php/nggallery/album/book-launching-feb-2024/image/img_9367", // R143
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--13-1/page/3", // R151
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8827", // R167
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8907", // R171
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8770", // R172
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8780", // R173
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8833", // R174
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8908", // R177
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8682", // R178
    "/life-at-fostiima.php/nggallery/album/lohri-2024/pid--img_8780/page/1", // R180
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8859", // R186
    "/life-at-fostiima.php/nggallery/album/lohri-2024/pid--img_8770/page/1", // R187
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8818", // R199
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8808", // R204
    "/life-at-fostiima.php/nggallery/album/Cricket-Match", // R211
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--45/page/2", // R217
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/2-1", // R218
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8850", // R219
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--63/page/3", // R233
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8872", // R242
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8803", // R244
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/1/image/img_8804", // R246
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8867", // R249
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/1/image/img_8803", // R262
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/2/image/62", // R298
    "/life-at-fostiima.php/nggallery/album/mission-kartavya-2025/image/img_3696", // R300
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8867", // R326
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8768", // R327
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--26/page/1", // R330
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/1/image/img_8808", // R332
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--6-1/page/3", // R333
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8849", // R335
    "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8843", // R339
    "/life-at-fostiima.php/nggallery/album/lohri-2024/image/img_8837", // R340
    "/life-at-fostiima.php/nggallery/album/blood-donation-camp-2023/page/1/image/img-20240214-wa0014", // R353
    "/life-at-fostiima.php/nggallery/album/lohagarh-tour/image/img_8296", // R354
    "/life-at-fostiima.php/nggallery/album/lohagarh-tour/image/img_8352", // R355
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--40/page/2", // R367
    "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/pid--22-1/page/2", // R368
    "/life-at-fostiima.php/nggallery/album/dubai-trip", // R369
    "/life-at-fostiima.php/nggallery/album/lohagarh-tour/image/img_8303", // R370
    "/life-at-fostiima.php/nggallery/album/lohri-2024", // R373
    "/life-at-fostiima.php/nggallery/album/lohagarh-tour/image/img_8384", // R375
  ],
  "/": [
    "/wp-content/plugins/litespeed-cache/guest.vary.php", // R2
    "/aicte-approval-2019.php", // R38
    "/vasant-panchami-2024.php", // R64
    "/wp-content/uploads/2025/08/BROCHURE-MARGDARSHAK-AWARDS-3.0.pdf", // R98
    "/pgdm-brochure.pdf", // R109
    "/wp-content/uploads/2023/09/manadatory-disclosure-aicte-2023.pdf", // R117
    "/pinnacle-brochure.pdf", // R123
    "/Fostiima-Admission-Brochure.pdf", // R124
    "/awards/aicte-approval-2019-20.php", // R142
    "/events/ganpati-visarjan", // R170
    "/uploaded_files/pdf_pages/faculty-innovations-on-teaching-and-learning.pdf", // R179
    "/dr-s-jaishankar-at-indian-express-adda", // R184
    "/Read", // R188
    "/FOSTIIMA - PGDM 2022 -24.pdf", // R197
    "/committee", // R200
    "/assets/designer/resources", // R215
    "/aicte-approval-2023-24.php", // R231
    "/wp-content/uploads/2025/09/Nomination-Form_MARGDARSHAK-4.0_KPMG_V02-1.docx", // R237
    "/brochures", // R248
    "/script-submission-guidelines.php", // R272
    "/fostiima-convocation-2023", // R273
    "/knowledge-session.php", // R286
    "/speakers.php", // R287
    "/recruiters.php", // R336
    "/hr-conclave-2021.php", // R342
    "/aicte-approval-2024-25.php", // R349
    "/brochure.php", // R376
  ],
  "/conclave-conference": [
    "/events/sports-fitness", // R196
    "/events/ganesh-visarjan-2023", // R198
    "/recognition-and-affiliations.php", // R205
    "/events/cultural-events", // R207, R210, R259, R261
    "/events/diwali-mela", // R247
    "/events/salil-agrawal-industry-expert-lecture", // R274
    "/events/academic-excellence", // R331
    "/events/lohri", // R380
  ],
  "/faculties": [
    "/overview/faculty", // R97
    "/mba-in-mumbai.php/faculty", // R99
    "/blog/mba/page/3", // R101
    "/trustees/t-l-palani-kumar", // R208
    "/trustees/jaithirth-rao-1", // R243
    "/trustees/rajan-shangi", // R251
    "/trustees/rajesh-kaura", // R264
    "/trustees", // R265
  ],
  "/awards-accreditation": [
    "/recognition-and-affiliations", // R190
    "/awards/aicte-approval-2024-25.php", // R252
    "/awards/aicte-approval-2022-23.php", // R253
    "/awards/aicte-approval-2023-24.php", // R285
  ],
  "/margdarshak": [
    "/margdarshak-awards.php", // R175
    "/margdarshak-contact-detail", // R176
    "/margdarshak-4", // R256
  ],
  "/faculties/mr-sunil-kala": [
    "/trustees/sunil-kala", // R337
    "/faculties/sunil-kala", // R359
  ],
  "/about-us": [
    "/aboutus/infrastructure.php", // R385
  ],
  "/academics": [
    "/academics/internships-a-placements.php", // R361
  ],
  "/blog/best-mba-colleges-accepting-cat-scores": [
    "/blog/tag/colleges-accepting-cat-score", // R53
  ],
  "/blog/best-pgdm-colleges-in-delhi-ncr": [
    "/blog/tag/best-pgdm-college-in-delhi-ncr", // R45
  ],
  "/blog/cuet-pg-2025-notification-exam-date-eligibility-courses-exam-pattern-syllabus-exam-preparation-tips": [
    "/blog/tag/cuet-pg-2025-exam-dates", // R57
  ],
  "/blog/explore-the-best-business-management-colleges-in-delhi": [
    "/blog/tag/management-colleges-in-delhi", // R58
  ],
  "/blog/mba-colleges-in-delhi-fee-structure": [
    "/blog/tag/top-mba-colleges-in-delhi-ncr", // R44
  ],
  "/blog/mba-eligibility-admission-criteria-minimum-qualification-and-percentage-entrance-exams-2024": [
    "/blog/exploring-the-eligibility-requirements-for-an-mba-who-is-qualified-to-pursue-an-mba", // R60
  ],
  "/blog/mba-syllabus-2025-overview": [
    "/blog/tag/looking-for-a-mba-syllabus", // R113
  ],
  "/blog/pgdm-in-international-business": [
    "/blog/tag/pgdm-in-internatinal-business", // R78
  ],
  "/blog/private-mba-colleges-in-delhi-may-be-a-better-choice": [
    "/blog/private-mba-colleges-in-delhi-may-be-a-better-choice/https://www.fostiima.org", // R43
  ],
  "/blog/research-about-the-company-and-its-product": [
    "/blog/tag/research-about-the-company", // R84
  ],
  "/blog/specialize-in-pgdm-in-marketing-for-a-rapid-growth-in-your-career": [
    "/blog/tag/pgdm-in-marketing", // R39
  ],
  "/blog/two-year-pgdm-course-in-delhi-still-the-best-option": [
    "/blog/tag/pgdm-courses-in-delhi", // R59
  ],
  "/conclave-conference/anil-somani-conversation-with-sadhguru": [
    "/mr-anil-somani-conversation-with-sadhguru", // R257
  ],
  "/conclave-conference/exit-poll": [
    "/exit-poll", // R263
  ],
  "/faculties/dr-aditya-vij": [
    "/faculties/aditya-vij", // R360
  ],
  "/faculties/mr-anil-somani": [
    "/trustees/anil-somani", // R266
  ],
  "/faculties/mr-rajeeva-kansal": [
    "/faculties/rajeeva-kansal", // R220
  ],
  "/fee-structure": [
    "/academics/fee-structure.php", // R158
  ],
  "/how-to-apply": [
    "/admissions/how-to-apply.php/1000", // R110
  ],
};

// Sheet rows already redirected (to the requested destination) by
// LEGACY_PHP_PAGES in next.config.ts. Listed so robots.ts lets Google crawl
// them and see the redirect.
export const GSC_NOV_2026_ALREADY_REDIRECTED: readonly string[] = [
  "/placement/summer-internship/sip-2018-20.php", // R309
  "/placement/final-placements/final-placement-2016-18.php", // R383
];
