const dbHelpers = require("../mysql/dbHelpers");

const clearCartHandler = (req, res) => {
    let sql = "DELETE FROM carts WHERE user_id = ?";
    let { user_id } = req.body;
    let esc = [parseInt(user_id)];
    dbHelpers.remove(sql, esc, res);
  }

const deleteCartHandler = (req, res) => {
    let sql = "DELETE FROM carts WHERE user_id = ? AND product_id = ?";
    let { user_id, product_id } = req.body;
    let esc = [parseInt(user_id), parseInt(product_id)];
    dbHelpers.remove(sql, esc, res);
}

const addCartHandler = (req, res) => {
    let sql = "INSERT INTO carts (user_id, product_id, vendor_id) VALUES (?,?,?)";
    const { product_id, user_id, vendor_id } = req.body;
    let esc = [parseInt(user_id), product_id, vendor_id];
    dbHelpers.create(sql, esc, res);
  }

const readCartHandler =(req, res) => {
    let sql = "SELECT * FROM products JOIN carts ON products.product_id = carts.product_id WHERE carts.user_id=?";
    const { user_id } = req.body;
    let esc = [parseInt(user_id)];
    dbHelpers.read(sql, esc, res);
  }
  module.exports={readCartHandler,addCartHandler,clearCartHandler,deleteCartHandler};