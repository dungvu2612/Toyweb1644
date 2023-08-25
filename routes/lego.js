var express = require('express');
var router = express.Router();
const LegoModel = require('../models/LegoModel');

// Route để hiển thị danh sách đồ chơi Lego
router.get('/', async (req, res) => {
    var legos = await LegoModel.find();
    res.render('legos/legoslist', { legos: legos });
});

// Route để hiển thị trang quản lí Lego
router.get('/manager', async (req, res) => {
    var legos = await LegoModel.find();
    res.render('legos/legosManager', { legos: legos });
});

// Route để thêm đồ chơi Lego
router.get('/add', (req, res) => {
    res.render('legos/legosAdd');
});

router.post('/add', async (req, res) => {
    try {
        var legoData = req.body; // Dữ liệu từ form
        await LegoModel.create(legoData); // Thêm đối tượng mới vào cơ sở dữ liệu
        console.log('Add Lego successfully!');
        res.redirect('/lego/manager'); // Chuyển hướng về trang quản lí Lego sau khi thêm thành công
    } catch (err) {
        console.error(err);
        res.redirect('/lego/add'); // Nếu có lỗi, chuyển hướng về trang thêm đồ chơi Lego để hiển thị thông báo lỗi
    }
});

// Route để hiển thị form chỉnh sửa thông tin đồ chơi Lego
router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const lego = await LegoModel.findById(id);
        res.render('legos/legosEdit', { lego: lego });
    } catch (error) {
        console.error(error);
        res.redirect('/lego'); // Redirect về trang danh sách đồ chơi Lego nếu có lỗi
    }
});

// Route để xử lý chỉnh sửa thông tin đồ chơi Lego
router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Dữ liệu chỉnh sửa từ form
        await LegoModel.findByIdAndUpdate(id, updatedData); // Cập nhật dữ liệu trong cơ sở dữ liệu
        console.log('Edit Lego successfully!');
        res.redirect('/lego'); // Chuyển hướng về trang danh sách đồ chơi Lego sau khi chỉnh sửa thành công
    } catch (error) {
        console.error(error);
        res.redirect('/lego'); // Redirect về trang danh sách đồ chơi Lego nếu có lỗi
    }
});

// Route để xóa đồ chơi Lego
router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await LegoModel.findByIdAndDelete(id);
    console.log('Delete Lego successfully!');
    res.redirect('/lego/manager');
});

// Lego Detail
router.get('/details/:id', async (req, res) => {
    var id = req.params.id;
    var lego = await LegoModel.findById(id);
    res.render('legos/legosDetail', { lego: lego });
});


//Search
router.post('/search', async (req, res) => {
  try {
      const keyword = req.body.keyword;
      const legos = await LegoModel.find({ name: { $regex: keyword, $options: 'i' } });
      res.render('legos/legoslist', { legos: legos });
  } catch (error) {
      console.error(error);
      res.redirect('/lego');
  }
});

//sort
router.get('/sort', async (req, res) => {
    try {
      let legos;
      const sortOption = req.query.sort;
  
      if (sortOption === 'asc') {
        legos = await LegoModel.find().sort({ price: 1 });
      } else if (sortOption === 'desc') {
        legos = await LegoModel.find().sort({ price: -1 });
      } else {
        legos = await LegoModel.find();
      }
  
      res.render('legos/legos/legoslist', { legos });
    } catch (error) {
      res.status(500).send(error.message);
    }});

module.exports = router;
