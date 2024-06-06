import Vote from "../models/vote.js";
import User from "../models/user.js";

export const addVoteController = async (req, res) => {
  const bikeCompanies = [
    "royal enfield",
    "yamaha",
    "bajaj",
    "hero",
    "honda",
    "bmw",
  ];

  try {
    const { name, email, vote } = req.body;

    if (name == null || name.length < 3) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    if (email == null || email.length < 3) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    if (!bikeCompanies.includes(vote)) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    console.log(
      "*** Success: Request validation is completed successfully ***"
    );

    // Existing user validation
    const existingUsers = await User.findOne({ email: email });

    if (existingUsers) {
      console.log(
        `*** Error: User with email address - ${email} already voted`
      );
      return res.status(400).json({
        message: `user with email address - ${email} already voted.`,
        status: "error",
      });
    }

    // save user to mongodb
    const user = new User({ name, email });
    await user.save();
    console.log(`*** Info: user saved successfully: ${user} ***`);

    // create a vote document
    const userVote = new Vote({ userId: user._id, vote: vote });
    await userVote.save();
    console.log("*** Succes: user vote saved successfully ***");

    return res
      .status(201)
      .json({ message: "Successfully saved your Vote", status: "success" });
  } catch (err) {
    console.error(`*** Error: Something went wrong in runtime: ${err.message}`);
    return res.status(500).json({
      message: "Something went wrong, try again later",
      status: "error",
    });
  }
};
