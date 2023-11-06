const Course = require("../models/course");

const createCourse = async (req, res) => {
  const { title, description, instructor, duration, availableSlots } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      instructor,
      duration,
      availableSlots,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all course
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single course
const getCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById({ _id: id });

    if (!course) {
      return res.status(404).json({
        error: {
          message: "No course found",
        },
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete({ _id: id });

    if (!course) {
      return res.status(404).json({
        error_message: "No course found",
      });
    }

    res.status(200).json({
      message: "Course successfully deleted",
      course,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
};
