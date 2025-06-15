import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: 'df68dedky',
  api_key: '527111228772549',
  api_secret: 'WNdi4KqxGYEZJOwt2tyTQtcdbw0',
});

export default cloudinary;
