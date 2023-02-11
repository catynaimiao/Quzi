import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    res
      .status(401)
      .json({ error: "The password length needs to be more than 3 " });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userInDb = await User.findOne({ username });

  const unique = userInDb ? !(username === userInDb.username) : true;

  if (!unique) {
    res.status(401).json({ error: "The username is not unique" });
  }

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
}
