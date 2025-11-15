import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function testUpload() {
  const form = new FormData();
  form.append("title", "2BHK Flat");
  form.append("description", "Spacious flat near metro");
  form.append("city", "Bangalore");
  form.append("price", "15000");
  form.append("image", fs.createReadStream("./room.jpg")); // path to local image

  try {
    const res = await axios.post("http://localhost:5000/api/listings", form, {
      headers: form.getHeaders(),
    });
    console.log("✅ Success:", res.data);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

testUpload();
