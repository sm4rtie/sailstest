
module.exports = {

  attributes: {
    employee : {
      model : 'user'
    },
    client: {
      model: 'user'
    },
    product:{
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['Przyjete', 'W realizacji', 'Do odbioru', 'Odebrane']
    }

  }
};

