const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../ultis/reponse');


//GET: Read
const getUser = async (req, res) => {

  // SELECT * FROM user
  let danhSachUser = await model.user.findAll();
  //.findOne({ where: { user_id: 2 } })  //.findAll({ where: { user_id: 2 } }); // .findByPk(2)

  // res.send(danhSachUser);
  successCode(res, danhSachUser, "Lấy dữ liệu thành công")
}

//POST: Create
const postUser = async (req, res) => {
  try {
    let { full_name, email, passWord } = req.body;

    let userNew = {
      full_name,
      email,
      passWord
    };

    let result = await model.user.create(userNew);

    // res.status(200).send(result);
    successCode(res, result, "Thêm dữ liệu thành công");
  }
  catch (err) {
    //
    // res.status(500).send(err);
    errorCode(res, "Lỗi back end");
  }
}

//PUT: update /id
const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { full_name, email, passWord } = req.body;

    // kiểm tra dữ liệu
    let checkUser = await model.user.findByPk(id);
    if (checkUser) {
      // cập nhật dữ liệu
      let userUpdate = {
        full_name,
        email,
        passWord
      };

      await User.update(userUpdate, { where: { user_id: id } });

      // res.status(200).send("Cập nhật thành công !");
      successCode(res, userUpdate, "Cập nhật thành công !");

    } else {
      // res.status(400).send("user id không tồn tại");
      failCode(res, "", "user id không tồn tại")
    }

  } catch (err) {
    // res.status(500).send(err);
    errorCode(res, "Lỗi backend");

  }
}

// DELETE: D  /id
const removeUser = async (req, res) => {
  try {
    let { id } = req.params;
    // kiểm tra dữ liệu
    let checkUser = await model.user.findByPk(id);
    if (checkUser) {
      await User.destroy({
        where:
        {
          user_id: id
        }
      });
      // res.status(200).send("Xóa user thành công");
      successCode(res, id, "Xóa user thành công")
    }
    else {
      failCode(res, "", "user id không tồn tại")
    }

  }
  catch (err) {
    errorCode(res, "Lỗi backend");

  }

}

// commonjs module
module.exports = { getUser, postUser, updateUser, removeUser }


//CRUD
// R, R:id
// C U D