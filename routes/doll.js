var express = require('express');
var router = express.Router();
const DollModel = require('../models/DollModel');

// Route để hiển thị danh sách đồ chơi búp bê
router.get('/', async (req, res) => {
    var dolls = await DollModel.find();
    res.render('dolls/dollslist', { dolls: dolls });
 });

// Route để hiển thị trang quản lí doll
router.get('/manager', async (req, res) => {
    var dolls = await DollModel.find();
    res.render('dolls/dollsManager', { dolls: dolls });
});

// Route để thêm đồ chơi búp bê
router.get('/add', (req, res) => {
    res.render('dolls/dollsAdd');
});

router.post('/add', async (req, res) => {
    try {
        var dollData = req.body; // Dữ liệu từ form
        await DollModel.create(dollData); // Thêm đối tượng mới vào cơ sở dữ liệu
        console.log('Add doll successfully!');
        res.redirect('/doll/manager'); // Chuyển hướng về trang quản lí doll sau khi thêm thành công
    } catch (err) {
        console.error(err);
        res.redirect('/doll/add'); // Nếu có lỗi, chuyển hướng về trang thêm đồ chơi búp bê để hiển thị thông báo lỗi
    }
});


// Route để hiển thị form chỉnh sửa thông tin đồ chơi búp bê
router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doll = await DollModel.findById(id);
        res.render('dolls/dollsEdit', { doll: doll });
    } catch (error) {
        console.error(error);
        res.redirect('/doll'); // Redirect về trang danh sách đồ chơi nếu có lỗi
    }
});

// Route để xử lý chỉnh sửa thông tin đồ chơi búp bê
router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Dữ liệu chỉnh sửa từ form
        await DollModel.findByIdAndUpdate(id, updatedData); // Cập nhật dữ liệu trong cơ sở dữ liệu
        console.log('Edit doll successfully!');
        res.redirect('/doll/manager'); // Chuyển hướng về trang danh sách đồ chơi búp bê sau khi chỉnh sửa thành công
    } catch (error) {
        console.error(error);
        res.redirect('/doll/manager'); // Redirect về trang danh sách đồ chơi nếu có lỗi
    }
});


// Route để xóa đồ chơi búp bê
router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await DollModel.findByIdAndDelete(id);
    console.log('Delete doll successfully!');
    res.redirect('/doll/manager');
});

//Doll Detail
router.get('/details/:id', async (req, res) => {
    var id = req.params.id;
    var doll = await DollModel.findById(id);
    res.render('dolls/dollsDetail', { doll: doll });
});

// search
// Route để tìm kiếm đồ chơi búp bê theo tên
router.post('/search', async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const dolls = await DollModel.find({ name: { $regex: keyword, $options: 'i' } });
        res.render('dolls/dollslist', { dolls: dolls });
    } catch (error) {
        console.error(error);
        res.redirect('/doll');
    }
});

 

module.exports = router;
 
module.exports = router;
