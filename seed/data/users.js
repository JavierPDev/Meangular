var bcrypt = require('bcrypt-nodejs')

module.exports = function () {
  return [
    {
      email: 'admin@meangular.com',
      password: hashPassword('truetrue1!'),
      roles: ['admin'],
      profile: {
        name: 'admin'
      }
    },
    {
      email: 'owner@meangular.com',
      password: hashPassword('Ajq4NZ19$l'),
      roles: ['admin'],
      profile: {
        name: 'owner'
      }
    },
    {
      email: 'accounting@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'accounting meangular'
      }
    },
    {
      email: 'ceo@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'ceo meangular'
      }
    },
    {
      email: 'development@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'development meangular'
      }
    },
    {
      email: 'qa@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'qa meangular'
      }
    },
    {
      email: 'help@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'help meangular'
      }
    },
    {
      email: 'legal@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'legal meangular'
      }
    },
    {
      email: 'coo@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'coo meangular'
      }
    },
    {
      email: 'cfo@meangular.com',
      password: hashPassword('truetrue1!'),
      profile: {
        name: 'cfo meangular'
      }
    }
  ]
}

/**
 * Hashing function needed since the pre('save') hook for Meangular's users
 * which would normally handle the password hashing function needed in the app
 * doesn't work with findOneAndUpdate() that is used with seeding for its
 * upsert feature.
 */
function hashPassword (password) {
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}
