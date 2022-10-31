const db = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

const bcrypt = require("bcrypt");

module.exports = {
  insertUserCredentials: (verified, firstName, lastName, email, password) => {
    return new Promise(async (resolve, reject) => {
      password = await bcrypt.hash(password, 10);

      db.get()
        .collection(collection.USER)
        .insertOne({ verified, firstName, lastName, email, password })
        .then((data) => {
          resolve(data);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collection.USER)
        .findOne({ email: userData.userEmail });

      if (user) {
        if (user.verified == 1) {
          bcrypt.compare(userData.password, user.password).then((status) => {
            if (status) {
              response.status = true;
              resolve(response);
            } else {
              resolve({
                status: false,
              });
            }
          });
        } else {
          resolve({
            status: false,
          });
        }
      } else {
        resolve({
          status: false,
        });
      }
    });
  },
  userVerified: (userID) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.USER)
        .updateOne(
          { _Id: userID },
          {
            $set: {
              verified: 1,
            },
          }
        )
        .then((response) => [resolve(response)]);
    });
  },
};
