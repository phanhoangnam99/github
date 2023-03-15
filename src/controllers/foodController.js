const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const getFoodDemo = async (req, res) => {

  //include = join
  // let data = await Food_Type.findAll({ include: [Food] });
  let data = await model.restaurant.findAll({ include: ["user_id_users"] });


  res.send(data);
}

module.exports = { getFoodDemo };