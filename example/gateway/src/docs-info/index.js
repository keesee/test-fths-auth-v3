module.exports = function (chassis) {

  const confList = [
    "env",
    "set",
    'role',
    'varient',
    'name',
    'id',
    'host',
    'port',
    "cors",
    "compression",
    "errors",
    "notfound",
    "fields",
    "injectedModel",
    "injectedModelMeta"
  ]



const rConfigs = function() {
  const confs = {}
  confList.forEach(c => confs[c] = chassis.get(c))
  return confs
}


// const infoData = {
//   ...rConfigs()
// }

const services = chassis.services

const infoData = {
  env                   : chassis.get('env'),
  set                   : chassis.get('set'),
  role                  : chassis.get('role'),
  varient               : chassis.get('varient'),
  name                  : chassis.get('name'),
  id                    : chassis.get('id'),
  host                  : chassis.get('host'),
  port                  : chassis.get('port'),
  cors                  : chassis.get('cors'),
  compression           : chassis.get('compression'),
  errors                : chassis.get('errors'),
  notfound              : chassis.get('notfound'),
  sockets               : chassis.get('sockets'),
  paginate              : chassis.get('paginate'),
  cache                 : chassis.get('cache'),
  cacheGet              : chassis.get('cacheGet'),
  cacheFind             : chassis.get('cacheFind'),
  cacheGetDuration      : chassis.get('cacheGetDuration'),
  cacheFindDuration     : chassis.get('cacheFindDuration'),
  mongoHost             : chassis.get('mongoHost'),
  mongoPort             : chassis.get('mongoPort'),
  redis                 : chassis.get('redis'),
  redisCache            : chassis.get('redisCache'),
  schema                : chassis.get('injectedModel'),
  schemaData            : chassis.get('injectedModelMeta'),
  services              : Object.keys(services)
}



  chassis.get('/info', function(req, res) {
    res.status(200);
    res.json(infoData);
  });
};


