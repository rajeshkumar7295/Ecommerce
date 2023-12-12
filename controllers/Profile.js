const Profile=require("../models/Profile");
const User=require("../models/User");
const imageUploaderToCloudinary=require("../utils/imageUploader");

require("dotenv").config();

exports.updateProfile = async (req, res) => {

    try {
        const { dateOfBirth = "", gender = "", about = "", contactNumber } = req.body;
        const id = req.user.id;
        if (!gender || !contactNumber || !id) {
            return res.status(400).json({
                success: false,
                message: "Missing properties."
            })
        }
        const userDetails = await User.findById(id);

        const profile = await Profile.findById(userDetails.additionalDetails);

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();
        const updatedDetails = await User.findById(id).populate('additionalDetails');



        return res.status(200).json({
            success: true,
            message: "Profile data updated successfully.",
            updatedDetails

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to update profile data.please try again.",
            error: error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        console.log('id h');

        const userDetails = await User.findById({ _id: id });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({ _id: profileId });
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to delete user",
            error: error.message
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const id = req.user.id;
        console.log("id == " + id);

        const displayPicture = req.files.displayPicture;
        console.log("display picture file " + displayPicture);

        const image = await imageUploaderToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log("image to cloudinary " + image.secure_url);

        const updateProfile = await User.findByIdAndUpdate({ _id: id }, {
            image: image.secure_url
        }, { new: true }).populate('additionalDetails');
        console.log(updateProfile);
        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updateProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while update profile picture",
        })
    }
}