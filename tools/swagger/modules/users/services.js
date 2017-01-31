exports.load = function (swagger, parms) {
  var searchParms = parms.searchableOptions
  var list = {
    'spec': {
      description: 'Authenticate operations',
      path: '/authenticate',
      method: 'GET',
      summary: 'Get Authenticate',
      notes: '',
      type: 'User',
      nickname: 'getAuthenticate',
      produces: ['application/json']
    }
  }
  var post = {
    'spec': {
      description: 'Authenticate operations',
      path: '/authenticate',
      method: 'POST',
      summary: 'get Token',
      notes: '',
      type: 'User',
      nickname: 'createArticle',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'get User Token.',
        required: true,
        type: 'User',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  }

  swagger.addGet(list)
    .addPost(post)
}
