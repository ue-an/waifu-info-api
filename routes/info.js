//Create Express router
//GET method
const express = require('express');
const fs = require("fs");
const path = require('path');
const infoFilePath = path.join(__dirname, "./info.json");

const router = express.Router();

const getInfo = async (req, res, next) => {
 try {
  // const data = fs.readFileSync(path.join(__dirname, "./info.json"));
  const data = fs.readFileSync(infoFilePath);
  const info = JSON.parse(data);
  const waifuInfo = info.find(
   (waifu) => waifu.id === Number(req.params.id)
  );
  if (!waifuInfo) {
   const err = new Error('Waifu not found');
   err.status = 400;
   throw error;
  }
  res.json(waifuInfo);
 } catch (e) {
  next(e);
 }
};

router.route('/api/v1/info/:id').get(getInfo);

module.exports = router;



//POST method
const createInfo = async (req, res, next) => {
 try {
  const data = fs.readFileSync(infoFilePath);
  const info = JSON.parse(data);
  const newInfo = {
   id: req.body.id,
   name: req.body.name,
   anime: req.body.anime,
   birthdate: req.body.birthdate,
   age: req.body.age,
   hairColor: req.body.hairColor,
   characteristics: req.body.characteristics,
   character: req.body.character,
  };
  info.push(newInfo);
  fs.writeFileSync(infoFilePath, JSON.stringify(stats));
  res.status(201).json(newInfo);
 } catch (e) {
  next(e);
 }
};

router.route('/api/v1/info').post(createInfo);

//PUT method
const updateInfo = async (req, res, next) => {
 try {
  const data = fs.readFileSync(infoFilePath);
  const info = JSON.parse(data);
  const waifuInfo = info.find(waifu => waifu.id === Number(req.params.id));
  if (!waifuInfo) {
   const err = new Error('Waifu info not found');
   err.status = 404;
   throw err;
  }
  const newInfoData = {
   id: req.body.id,
   name: req.body.name,
   anime: req.body.anime,
   birthdate: req.body.birthdate,
   age: req.body.age,
   hairColor: req.body.hairColor,
   characteristics: req.body.characteristics,
   character: req.body.character,
  };
  const newInfo = info.map(waifu => {
   if (waifu.id === Number(req.params.id)) {
    return newInfoData;
   } else {
    return waifu;
   }
  })
 } catch (e) {
  next(e);
 }
};

router.route('/api/stats/:id').get(getInfo).put(updateInfo);

//DELETE method
const deleteInfo = async (req, res, next) => {
try {
 const data = fs.readFileSync(infoFilePath);
 const info = JSON.parse(data);
 const waifuInfo = info.find(waifu => waifu.id === Number(req, params, id));
 if (!waifuInfo) {
  const err = new Error('Waifu info not found');
  err.status = 404;
  throw err;
 }
 const newInfo = info.map(waifu => {
 if (waifu.id === Number(req.params.id)) {
  return null;
 } else {
  return waifu;
 }
}).filter(waifu => waifu !== null);
fs.writeFileSync(infoFilePath, JSON.stringify(newInfo));
res.status(200).end();
} catch (e) {
 next(e);
}
};

router.route('/api/v1/info/:id').get(getInfo).put(updateInfo).delete(deleteInfo);