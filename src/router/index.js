
const controllerUsers = require("../users/controller.users")
//const controllerviewTemplates = require('../viewTemplates/controller.viewTemplates')


const router = (app) => {
  
 //app.use('/',controllerviewTemplates)

  app.use('/users',controllerUsers)
  
}

module.exports = router