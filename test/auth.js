// const { describe, it, before } = require('mocha');
// const { assert, expect } = require('chai');
// const { Save } = require('../dist/src/index');

// var s
// new Save('http://localhost:3001', null).authGetAPIKey("saveuser", "savepass").then(({apikey}) => {
// 	s = new Save('http://localhost:3001', apikey)
// });

// describe('Auth API', () => {
//   before(function () {
//     setTimeout(() => {
      
//     }, 2000);
//   })

//   it('authGetAllUsers', () => {
//     s.authGetAllUsers().then((res) => {
//       expect(res.length).equal(1)
//     })
//   })

//   it('authCreateUser', () => {
//     s.authCreateUser({username:'newuser', admin: false}).then((res) => {
//       expect(res.password.length).equal(20)
//       expect(res.username).equal('newuser')
//       expect(res.admin).equal(false)
//     })
//   })

//   // it('authChangePassword', () => {
//   //   s.authChangePassword('newpassword').then((res) => {
//   //     expect(res).includes('OK')
//   //   })
//   // })

//   it('authDeleteUser', () => {
//     s.authDeleteUser('newuser').then((res) => {
//       expect(res).includes('OK')
//     })
//   })

//   // it('authChangeAPIKey', () => {
//   //   s.authResetAPIKey().then((res) => {
//   //     expect(res.apikey.length).greaterThan(0)
//   //   })
//   // })
// })