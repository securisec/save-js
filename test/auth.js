const { describe, it, before } = require('mocha');
const { assert, expect } = require('chai');
const { Save } = require('../dist/src/index');

const host = 'http://localhost:3001';
let apikey = process.env.TESTKEY
if (!apikey) {
	process.exit(2)
}
const s = new Save(host, apikey);

describe('Auth API', () => {

  it('authGetAllUsers', () => {
    s.authGetAllUsers().then((res) => {
      expect(res.length).equal(1)
    })
  })

  it('authCreateUser', () => {
    s.authCreateUser({username:'newuser', admin: false}).then((res) => {
      expect(res.password.length).equal(20)
      expect(res.username).equal('newuser')
      expect(res.admin).equal(false)
    })
  })

  // it('authChangePassword', () => {
  //   s.authChangePassword('newpassword').then((res) => {
  //     expect(res).includes('OK')
  //   })
  // })

  it('authDeleteUser', () => {
    s.authDeleteUser('newuser').then((res) => {
      expect(res).includes('OK')
    })
  })

  // it('authChangeAPIKey', () => {
  //   s.authResetAPIKey().then((res) => {
  //     expect(res.apikey.length).greaterThan(0)
  //   })
  // })
})