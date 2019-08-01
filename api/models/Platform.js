module.exports = {
  attributes: {
    id: {
      type: 'string',
      required: true,
      unique: true
    },
    platformId: {
        type: 'string',
        required: true,
        unique: true
      },
    platform: {
      type: 'string',
      required: true,
      unique: true
    },
    date: {
      type: 'ref',
      columnType: 'datetime',
        required: true,
        unique: true
    },
    status: {
      type: 'string',
      required: true,
      unique: true
  }
  }
};
	