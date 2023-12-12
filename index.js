const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const sellerRoutes=require("./routes/Seller");
const buyerRoutes=require("./routes/Buyer");
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const fileUpload=require("express-fileupload")
const {cloudinaryConnect}=require("./config/cloudinary");

require("dotenv").config();

const Port=process.env.PORT || 5000;

// database connection
database();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
// cloudinary connection
cloudinaryConnect();

// setting up routes
app.use("/api/auth",userRoutes);
app.use("/api/auth",profileRoutes);
app.use("/api/seller",sellerRoutes);
app.use("/api/buyer",buyerRoutes);
// def routes
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(Port, () => {
	console.log(`App is running at ${Port}`)
})