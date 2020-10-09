function initReplicaSet() {
  return rs.initiate({
    _id: 'appReplicaSet',
    members: [
      {
        _id: 0,
        host: 'mongo_1:27017',
        priority: 1,
      },
      {
        _id: 1,
        host: 'mongo_2:27017',
        priority: 0,
      },
      {
        _id: 2,
        host: 'mongo_3:27017',
        priority: 0,
        arbiterOnly: true,
      },
    ],
  })
}

while (initReplicaSet().ok === 0) sleep(1000)
