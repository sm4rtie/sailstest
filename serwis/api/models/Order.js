
module.exports = {

  attributes: {
    employee : {
      type : 'user'
    },
    client: {
      type: 'user'
    },
    status: {
      type: 'string',
      enum: ['Przyjete', 'W realizacji', 'Do odbioru', 'Odebrane']
    }

  }
};

