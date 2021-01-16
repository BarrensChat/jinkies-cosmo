// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tracing: true,
  api_endpoint: 'http://jinkies-cosmo-backend.test/api/',
  api_request_retry_count: 0,
  fakeCreds: {
    sonic: {
      pw: 'dankeykang',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiV2hpc2tleSIsIlN1cm5hbWUiOiJEaWNrIiwiUm9sZSI6WyJDb250ZW50IENyZWF0b3IiLCJBZG1pbiJdfQ.wRkwxHYSJPrNIhYUlt_DfkKBXnr1fOaEKbePjupOHe8'
    },
    mario: {
      pw: 'shrek',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiQ3JvbmRsaW4iLCJTdXJuYW1lIjoiSm9uZXMiLCJSb2xlIjpbIkNvbnRlbnQgQ3JlYXRvciIsIkFkbWluIl19.KCFpaIzTC2EXStcA3kX_LUNaVC6x0tcat1O2nkwpq_U'
    },
    link: {
      pw: 'jarjarbinks',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiUnVwZXJ0IiwiU3VybmFtZSI6IlN0ZWFseW9naXJsIiwiUm9sZSI6WyJDb250ZW50IENyZWF0b3IiLCJBZG1pbiJdfQ.FDh58r3eWMzMqBAlaZySRiAvdE7jNSYqz5pmUU93O94'
    },
    kirby: {
      pw: 'misspiggy',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaW5raWVzY29zbW8iLCJpYXQiOjE1OTg4NDEwMDksImV4cCI6MTYzMDM3NzAwOSwiYXVkIjoid3d3LmppbmtpZXNjb3Ntby5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiQWx0cmlnaHQiLCJTdXJuYW1lIjoiSmVycnkiLCJSb2xlIjpbIkNvbnRlbnQgQ3JlYXRvciIsIkFkbWluIl19.KJjh0q49orxYGGLtT7Bgpc5Qh3Tr5rN3QWAPQwjb_vA'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
