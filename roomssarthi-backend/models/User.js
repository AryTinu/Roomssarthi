import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  isAdmin: { 
    type: Boolean, 
    default: false 
  },

  // 🔥 Added for Forgot Password System
  resetPasswordToken: { 
    type: String 
  },

  resetPasswordExpire: { 
    type: Date 
  }
});

const User = mongoose.model("User", userSchema);
export default User;
