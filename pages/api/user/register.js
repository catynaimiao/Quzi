import User from "../../../common/models/userAuth/User";
import bcrypt from "bcrypt";
import dbConnect from "../../../common/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { username, name, password, phone } = req.body;

  if (!username || !name || !password || !phone) {
    return res.status(401).json({ error: "The request must have paylod" });
  }

  //validation
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const usernameReg = /^[a-zA-Z]([a-zA-Z0-9]){5,18}[a-zA-Z0-9]$/;

  if (name.length < 2) {
    return res.status(401).json({ error: "姓名长度最小为2" });
  }

  if (phone.length < 11) {
    return res.status(401).json({ error: "电话长度最小11位" });
  }

  if (!passwordReg.test(password)) {
    return res
      .status(401)
      .json({ error: "密码最小长度为8位,且需包含字母和数字" });
  }

  if (!usernameReg.test(username)) {
    return res
      .status(401)
      .json({ error: "用户名,数字最小长度为6位,且以字母开头,包含数字和字母" });
  }
  // validation finish

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userInDb = await User.findOne({ username });

  const unique = userInDb ? !(username === userInDb.username) : true;

  if (!unique) {
    return res.status(401).json({ error: "The username is not unique" });
  }

  const user = new User({
    name,
    username,
    passwordHash,
    phone,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
}
