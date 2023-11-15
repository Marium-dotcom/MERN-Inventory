const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid emaial",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuSMA98U5nhBmtcdj2hmFD4ijUIue_fCxNWw&usqp=CAU",
    },
    phone: {
      type: String,
      default: "+20",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must be atleast 250 Ch"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);
module.exports = User;