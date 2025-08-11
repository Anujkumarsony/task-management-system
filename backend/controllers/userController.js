const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-password");
    if (!u) return res.status(404).json({ message: "Not found" });
    res.json(u);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const allowed = ["Admin", "Manager", "User"];
    if (!allowed.includes(role))
      return res.status(400).json({ message: "Invalid role" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    user.role = role;
    await user.save();
    res.json({
      message: "Updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
