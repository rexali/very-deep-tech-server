const dbHelpers = require("../mysql/dbHelpers");

const reviewProductHandler = (req, res) => {
  const { product_id, name, email, message, rating } = req.body;
  const esc = [name, email, message, product_id, rating];
  const sql = "INSERT INTO reviews(name, email, message, product_id, rating) VALUES (?,?,?,?,?)"
  dbHelpers.create(sql, esc, res)
}
const readShopHandler = (req, res) => {
  const { vendor_id } = req.body;
  const sql = "SELECT * FROM products WHERE vendor_id = ?"
  const esc = [parseInt(vendor_id)];
  dbHelpers.read(sql, esc, res)
}
const searchProductHandler = (req, res, next) => {
  let { search } = req.body;
  let sql = "SELECT * FROM products WHERE product_name LIKE '%" + search + "%'";
  let esc = [search];
  dbHelpers.read(sql, esc, res);
}

const deleteProductHandler = (req, res, next) => {
  let sql = "DELETE FROM products WHERE product_id=?";
  const product_id = req.params.id;
  const esc = [parseInt(product_id)]
  dbHelpers.remove(sql, esc, res);
}

const approveProductHandler = (req, res, next) => {
  let sql = "UPDATE products SET product_approval ='YES' WHERE product_id=?";
  const product_id = req.params.id;
  const esc = [parseInt(product_id)]
  dbHelpers.update(sql, esc, res);
}

const readProductHandler = (req, res, next) => {
  let sql = "SELECT * FROM products";
  dbHelpers.readAll(sql, res);
}

const readVendorProductHandler = (req, res, next) => {
  const { vendor_id } = req.body;
  const esc = [vendor_id]
  let sql = "SELECT * FROM products WHERE vendor_id=?";
  dbHelpers.read(sql, esc, res);
}

const updateProductHandler = (req, res) => {
  let sql = `UPDATE products SET 
    product_name =?,
    product_picture =?,
    product_category =?,
    product_sub_category =?,
    product_description =?,
    product_price =?,
    product_quantity =?,
    product_size =?,
    product_weight=?,
    product_code =?,
    WHERE product_id=? AND vendor_id = ?`;

  let data = req.body;
  let esc = [
    data.product_name,
    data.product_picture.split(/[\\/]/).pop(),
    data.product_category,
    data.product_sub_category,
    data.product_description,
    data.product_price,
    data.product_quantity,
    data.product_size,
    data.product_weight,
    data.product_code,
    data.product_id,
    data.vendor_id
  ];
  dbHelpers.update(sql, esc, res);
}

// further update for vendor plus
const updateMoreProductHandler = (req, res) => {

  const id = req.params.id;
  let sql, esc;
  console.log(id)
  if (parseInt(id) === 1) {
    sql = `UPDATE products SET 
  product_name=?,
  product_picture=?,
  product_feature=?,
  product_price=?,
  product_category=?,
  product_sub_category=?,
  product_return=? WHERE product_id=?`;

    let {
      product_id,
      product_name,
      product_picture,
      product_feature,
      product_price,
      product_category,
      product_sub_category,
      product_return
    } = req.body;

    esc = [
      product_name,
      product_picture,
      product_feature,
      product_price,
      product_category,
      product_sub_category,
      product_return,
      product_id
    ]

  } else if (parseInt(id) === 2) {
    sql = `UPDATE products SET 
    product_package=?,
    product_colour=?,
    product_model=?,
    product_quantity=?,
    product_weight=?,
    product_description=?,
    product_video=? WHERE product_id=?`;

    let {
      product_package,
      product_colour,
      product_model,
      product_quantity,
      product_weight,
      product_description,
      product_video,
      product_id
    } = req.body

    esc = [
      product_package,
      product_colour,
      product_model,
      product_quantity,
      product_weight,
      product_description,
      product_video,
      product_id
    ]
  } else {
    sql = `UPDATE products SET 
  product_seller=?,
  product_email=?,
  product_phone=?,
  product_review=?,
  product_shipping=?,
  product_warranty=?,
  product_return=? WHERE product_id=?`;

    let {
      product_seller,
      product_email,
      product_phone,
      product_review,
      product_shipping,
      product_warranty,
      product_return,
      product_id
    } = req.body;

    esc = [
      product_seller,
      product_email,
      product_phone,
      product_review,
      product_shipping,
      product_warranty,
      product_return,
      product_id
    ];

  }

  dbHelpers.update(sql, esc, res);
}

const readSingleProductHandler = (req, res) => {
  let sql = "SELECT * FROM products WHERE product_id= ?";
  let esc = [req.params.id];
  dbHelpers.read(sql, esc, res);
}

const addProductHandler = (req, res) => {
  let sql = `INSERT INTO products(
    product_name,
    product_picture,
    product_category,
    product_sub_category,
    product_description,
    product_price,
    product_quantity,
    product_weight,
    product_size,
    product_code,
    vendor_id
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  let {
    product_name,
    product_picture,
    filenames,
    product_category,
    product_sub_category,
    product_description,
    product_price,
    product_quantity,
    product_weight,
    product_size,
    product_code,
    vendor_id
  } = req.body;
  let esc = [
    product_name,
    product_picture = filenames,
    product_category,
    product_sub_category,
    product_description,
    product_price,
    product_quantity,
    product_weight,
    product_size,
    product_code,
    vendor_id
  ];
  dbHelpers.create(sql, esc, res);
}

const addMoreProductHandler = (req, res) => {
  const id = req.params.id;
  let sql, esc;
  if (parseInt(id) === 1) {

    sql = `INSERT INTO products (
        product_name, 
        product_picture,
        product_feature, 
        product_price,
        product_sub_category,
        product_category,
        product_code,
        vendor_id
        ) VALUES (?,?,?,?,?,?,?,?)`;

    let {
      product_name,
      product_picture,
      product_feature,
      product_price,
      product_sub_category,
      product_category,
      product_code,
      filenames,
      vendor_id
    } = req.body;

    esc = [
      product_name,
      filenames,
      product_feature,
      product_price,
      product_sub_category,
      product_category,
      product_code,
      vendor_id
    ]
    dbHelpers.create(sql, esc, res);

  } else if (parseInt(id) === 2) {
    sql = `UPDATE products SET 
      product_package=?,
      product_colour=?,
      product_model=?,
      product_quantity=?,
      product_weight=?,
      product_description=?,
      product_video =? WHERE product_id=?`;
    let {
      product_package,
      product_colour,
      product_model,
      product_quantity,
      product_weight,
      product_description,
      product_video,
      product_id
    } = req.body;

    esc = [
      product_package,
      product_colour,
      product_model,
      product_quantity,
      product_weight,
      product_description,
      product_video.split(/[\\/]/).pop(),
      parseInt(product_id)
    ]
    dbHelpers.update(sql, esc, res);

  } else if (parseInt(id) === 3) {
    sql = `UPDATE products SET 
      product_size=?,
      product_seller=?,
      product_email=?,
      product_phone=?,
      product_review=?,
      product_shipping=?,
      product_warranty=?,
      product_return=? WHERE product_id=?`;

    let {
      filenames,
      product_size,
      product_seller,
      product_email,
      product_phone,
      product_review,
      product_shipping,
      product_warranty,
      product_return,
      product_id
    } = req.body;

    esc = [
      product_size,
      product_seller,
      product_email,
      product_phone,
      filenames,
      product_shipping,
      product_warranty,
      product_return,
      product_id
    ];

    dbHelpers.update(sql, esc, res);
  }
}


// shipping
const deleteShippingHandler = (req, res, next) => {
  let sql = "DELETE FROM shippings WHERE shipping_id=?";
  const shipping_id = req.params.id;
  const esc = [parseInt(shipping_id)]
  dbHelpers.remove(sql, esc, res);
}

const readShippingHandler = (req, res, next) => {
  let sql = "SELECT * FROM shippings";
  dbHelpers.readAll(sql, res);
}

const addShippingHandler = (req, res) => {
  let sql = `INSERT INTO shippings (
    shipping_name,
    shipping_mean,
    shipping_picture,
    shipping_location,
    shipping_destination,
    shipping_description,
    shipping_fee,
    shipper_id
    ) VALUES (?,?,?,?,?,?,?)`;
  let {
    filenames,
    shipping_name,
    shipping_mean,
    shipping_picture,
    shipping_description,
    shipper_id
  } = req.body;
  let esc = [
    shipping_name,
    shipping_mean,
    filenames,
    shipping_description,
    shipper_id
  ];
  dbHelpers.create(sql, esc, res);
}

// shippingfees
const addShippingfeesHandler = (req, res) => {
  let sql = `INSERT INTO shippingfees (
    shipping_location,
    shipping_destination,
    shipping_fee,
    shipper_id
    ) VALUES (?,?,?)`;
  let {
    shipping_location,
    shipping_destination,
    shipping_fee,
    shipper_id
  } = req.body;
  let esc = [
    shipping_location,
    shipping_destination,
    shipping_fee,
    shipper_id
  ];
  dbHelpers.create(sql, esc, res);
}

const deleteShippingfeesHandler = (req, res, next) => {
  let sql = "DELETE FROM shippingfees WHERE shippingfee_id=?";
  const shippingfee_id = req.params.id;
  const esc = [parseInt(shippingfee_id)]
  dbHelpers.remove(sql, esc, res);
}

const readShippingfeesHandler = (req, res, next) => {
  let sql = "SELECT * FROM shippingfees";
  dbHelpers.readAll(sql, res);
}


module.exports = {
  addMoreProductHandler,
  addProductHandler,
  readProductHandler,
  readSingleProductHandler,
  readVendorProductHandler,
  readShopHandler,

  searchProductHandler,
  reviewProductHandler,

  deleteProductHandler,
  updateProductHandler,
  updateMoreProductHandler,

  deleteShippingHandler,
  readShippingHandler,
  addShippingHandler,

  addShippingfeesHandler,
  readShippingfeesHandler,
  deleteShippingfeesHandler,

  approveProductHandler
}

