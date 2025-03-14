const User = require("../models/User");  // Import User model
// studentController.js
exports.getStudentDashboard = (req, res) => {
    // Ensure that the user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
    }
  
    // Respond with student-specific data
    res.status(200).json({
      message: "Welcome to the Student Dashboard",
      student: req.user,  // Including user details (could include courses, etc.)
    });
  };
  
  // Example of accessing a course
  exports.accessCourse = (req, res) => {
    // Simulating course access
    const courseName = req.params.courseName;
    res.status(200).json({
      message: `Accessing course: ${courseName}`,
    });
  };
  
// studentController.js


exports.getStudentProfile = async (req, res) => {
  // Ensure the user is a student
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
  }

  try {
    // Fetch the student details from the database using the userId (from the token)
    const student = await User.findById(req.user.userId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the full student profile
    res.status(200).json({
      message: "Student Profile Data",
      student: {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        street: student.street,
        province: student.province,
        country: student.country,
        zipCode: student.zipCode
        ,
        // Add any other relevant data you want to include here
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

  