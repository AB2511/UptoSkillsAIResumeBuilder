import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Input.css';

function InputMinimal() {
  const [formData, setFormData] = useState({
    personal: {
      name: '',
      lastname: '',
      title: '',
      quote: '',
      email: '',
      mob: '',
      city: '',
      country: '',
      technicalskill: [],
      interest: [],
    },
    link: {
      linkedin: '',
      github: '',
    },
    experience: [],
    education: [],
    project: [],
    course: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        [name]: value,
      },
    }));
  };

  const handleTechnicalSkillsChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        technicalskill: value.split(',').map((skill) => ({ skill })),
      },
    }));
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        interest: value.split(',').map((hobbie) => ({ hobbie })),
      },
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: '', worktitle: '', yearfrom: '', yearto: '', description: '', present: false },
      ],
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: '', university: '', yearfrom: '', yearto: '', grade: '', gradetype: 'grade' },
      ],
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.project];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
    setFormData({ ...formData, project: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      project: [
        ...formData.project,
        { name: '', tech: '', des: '' },
      ],
    });
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...formData.course];
    updatedCourses[index] = { ...updatedCourses[index], [name]: value };
    setFormData({ ...formData, course: updatedCourses });
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      course: [
        ...formData.course,
        { name: '', provider: '' },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optionally, you can add a loading state here to show user progress
    try {
      const response = await fetch('http://localhost:5000/api/formdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response (Check if it's okay before proceeding)
      if (!response.ok) {
        // If the response is not OK, we throw an error
        throw new Error('Error submitting data');
      }

      const data = await response.json();  // Convert response to JSON

      // Check for success
      if (data.message === 'Data saved successfully') {
        // If the data is saved successfully, navigate to the next page
        navigate('/minimaltheme', { state: formData });
      } else {
        // If there's an issue, log the message
        console.error('Error:', data.message);
      }
    } catch (error) {
      // Catch any errors during the fetch or JSON processing
      console.error('Error submitting resume data:', error);
    }
  };

  return (
    <div className="input-form-container">
      <h2 className="form-title">Create Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Details</h3>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.personal.name}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="lastname"
            value={formData.personal.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.personal.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            required
          />
          <textarea
            className="form-textarea"
            name="quote"
            value={formData.personal.quote}
            onChange={handleInputChange}
            placeholder="Quote"
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.personal.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            className="form-input"
            type="text"
            name="mob"
            value={formData.personal.mob}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            required
          />
          <input
            className="form-input"
            type="text"
            name="city"
            value={formData.personal.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            className="form-input"
            type="text"
            name="country"
            value={formData.personal.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
        </div>

        <div className="form-section">
          <h3>Technical Skills</h3>
          <textarea
            className="form-textarea"
            name="technicalskill"
            value={formData.personal.technicalskill.map((skill) => skill.skill).join(', ')}
            onChange={handleTechnicalSkillsChange}
            placeholder="Enter skills separated by commas (e.g. JavaScript, React)"
            required
          />
        </div>

        <div className="form-section">
          <h3>Interests / Hobbies</h3>
          <textarea
            className="form-textarea"
            name="interest"
            value={formData.personal.interest.map((hobbie) => hobbie.hobbie).join(', ')}
            onChange={handleInterestChange}
            placeholder="Enter hobbies separated by commas (e.g. Reading, Coding)"
            required
          />
        </div>

        {/* Experience Section */}
        <div className="form-section">
          <h3>Work Experience</h3>
          {formData.experience.map((exp, index) => (
            <div className="experience-item" key={index}>
              <input
                className="form-input"
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Company"
                required
              />
              <input
                className="form-input"
                type="text"
                name="worktitle"
                value={exp.worktitle}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Job Title"
                required
              />
              <input
                className="form-input"
                type="text"
                name="yearfrom"
                value={exp.yearfrom}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="From Year"
                required
              />
              <input
                className="form-input"
                type="text"
                name="yearto"
                value={exp.yearto}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="To Year"
                required
              />
              <textarea
                className="form-textarea"
                name="description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Job Description"
                required
              />
              <label className="checkbox-label">
                Present:
                <input
                  className="checkbox-input"
                  type="checkbox"
                  name="present"
                  checked={exp.present}
                  onChange={(e) => {
                    const updatedExperience = [...formData.experience];
                    updatedExperience[index].present = e.target.checked;
                    setFormData({ ...formData, experience: updatedExperience });
                  }}
                />
              </label>
              <button type="button" className="remove-button" onClick={() => {
                const updatedExperience = [...formData.experience];
                updatedExperience.splice(index, 1);
                setFormData({ ...formData, experience: updatedExperience });
              }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addExperience}>Add Experience</button>
        </div>

        {/* Education Section */}
        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div className="education-item" key={index}>
              <input
                className="form-input"
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Degree"
                required
              />
              <input
                className="form-input"
                type="text"
                name="university"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="University"
                required
              />
              <input
                className="form-input"
                type="text"
                name="yearfrom"
                value={edu.yearfrom}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="From Year"
                required
              />
              <input
                className="form-input"
                type="text"
                name="yearto"
                value={edu.yearto}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="To Year"
                required
              />
              <input
                className="form-input"
                type="text"
                name="grade"
                value={edu.grade}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Grade"
                required
              />
              <select
                className="form-input"
                name="gradetype"
                value={edu.gradetype}
                onChange={(e) => handleEducationChange(index, e)}
              >
                <option value="grade">Grade</option>
                <option value="percentage">Percentage</option>
              </select>
              <button type="button" className="remove-button" onClick={() => {
                const updatedEducation = [...formData.education];
                updatedEducation.splice(index, 1);
                setFormData({ ...formData, education: updatedEducation });
              }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addEducation}>Add Education</button>
        </div>

        {/* Project Section */}
        <div className="form-section">
          <h3>Projects</h3>
          {formData.project.map((proj, index) => (
            <div className="project-item" key={index}>
              <input
                className="form-input"
                type="text"
                name="name"
                value={proj.name}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Project Name"
                required
              />
              <input
                className="form-input"
                type="text"
                name="tech"
                value={proj.tech}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Technologies"
                required
              />
              <textarea
                className="form-textarea"
                name="des"
                value={proj.des}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Project Description"
                required
              />
              <button type="button" className="remove-button" onClick={() => {
                const updatedProjects = [...formData.project];
                updatedProjects.splice(index, 1);
                setFormData({ ...formData, project: updatedProjects });
              }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addProject}>Add Project</button>
        </div>

        {/* Course Section */}
        <div className="form-section">
          <h3>Courses</h3>
          {formData.course.map((course, index) => (
            <div className="course-item" key={index}>
              <input
                className="form-input"
                type="text"
                name="name"
                value={course.name}
                onChange={(e) => handleCourseChange(index, e)}
                placeholder="Course Name"
                required
              />
              <input
                className="form-input"
                type="text"
                name="provider"
                value={course.provider}
                onChange={(e) => handleCourseChange(index, e)}
                placeholder="Provider"
                required
              />
              <button type="button" className="remove-button" onClick={() => {
                const updatedCourses = [...formData.course];
                updatedCourses.splice(index, 1);
                setFormData({ ...formData, course: updatedCourses });
              }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addCourse}>Add Course</button>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default InputMinimal;
