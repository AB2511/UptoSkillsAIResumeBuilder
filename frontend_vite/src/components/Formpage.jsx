import React, { useState } from 'react';
import './FormPage.css';
import { jsPDF } from 'jspdf';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: [''],
    experience: [{ title: '', company: '', duration: '', description: '' }],
    education: [{ degree: '', school: '', year: '' }],
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    skills: false,
  });

  const handleInputChange = (e, section, index, field) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (section === 'skills') {
        updatedData.skills[index] = value;
      } else if (section === 'experience') {
        updatedData.experience[index][field] = value;
      } else if (section === 'education') {
        updatedData.education[index][field] = value;
      }

      return updatedData;
    });
  };

  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ''],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills.splice(index, 1);
      return { ...prevData, skills: updatedSkills };
    });
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { title: '', company: '', duration: '', description: '' },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience.splice(index, 1);
      return { ...prevData, experience: updatedExperience };
    });
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { degree: '', school: '', year: '' },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation.splice(index, 1);
      return { ...prevData, education: updatedEducation };
    });
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name,
      email: !formData.email,
      phone: !formData.phone,
      skills: formData.skills.every((skill) => !skill.trim()),
    };

    setFormErrors(errors);

    return !Object.values(errors).includes(true);
  };

  const generatePDF = () => {
    if (!validateForm()) {
      alert('Please fill out all required fields!');
      return;
    }

    const doc = new jsPDF();

    // Set fonts
    doc.setFont('helvetica');
    doc.setFontSize(16);

    let yOffset = 20;
    let margin=20;

    // Personal Info Section
    doc.text(formData.name || 'Name', 20, yOffset);
    yOffset += 10;
    doc.setFontSize(10);
    doc.text(`Email: ${formData.email || 'Email'}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Phone: ${formData.phone || 'Phone'}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Address: ${formData.address || 'Address'}`, 20, yOffset);
    yOffset += 20;

     doc.setLineWidth(0.5);
     doc.line(margin, yOffset, 200, yOffset);  // Line from left to right
   yOffset+=10;

    // Skills Section
    doc.setFontSize(14);
    doc.text('Skills:', 20, yOffset);
    yOffset += 10;
    doc.setFontSize(10);
    formData.skills.forEach((skill, index) => {
      if (skill.trim()) {
        doc.text(`• ${skill}`, 20, yOffset);
        yOffset += 10;
      }
    });
    yOffset += 10; 
    doc.setLineWidth(0.5);
  doc.line(margin, yOffset, 200, yOffset); 
  yOffset+=10;
  

    // Experience Section
    doc.setFontSize(14);
    doc.text('Experience:', 20, yOffset);
    yOffset += 10;
    formData.experience.forEach((exp, index) => {
      doc.setFontSize(10);
      doc.text(
        `${exp.title || 'Job Title'} at ${exp.company || 'Company'} (${exp.duration || 'Duration'})`,
        20,
        yOffset
      );
      yOffset += 10;
      doc.text(`Description: ${exp.description || 'Description'}`, 20, yOffset);
      yOffset += 20;
    });

    yOffset += 10; 
    doc.setLineWidth(0.5);
    doc.line(margin, yOffset, 200, yOffset);  // Line from left to right
    yOffset += 10;

    // Education Section
    doc.setFontSize(14);
    doc.text('Education:', 20, yOffset);
    yOffset += 10;
    formData.education.forEach((edu, index) => {
      doc.setFontSize(10);
      doc.text(
        `${edu.degree || 'Degree'} from ${edu.school || 'School'} (${edu.year || 'Year'})`,
        20,
         yOffset,
      );
      yOffset += 10;
    });

    // Save the PDF
    doc.save('resume.pdf');
  };

  return (
    <div className="App" style={{ backgroundColor:'#f2a7b8'}}>
      <header className="App-header">
        <h1>Resume Generator</h1>
        <button onClick={generatePDF} className="generate-btn">
          Generate PDF
        </button>
      </header>

      <div className="resume-form">
        <h2>Fill in your details</h2>

        {/* Personal Info Section */}
        <div className="form-section">
          <h3>Personal Info</h3>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            style={{ borderColor: formErrors.name ? 'red' : '' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{ borderColor: formErrors.email ? 'red' : '' }}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            style={{ borderColor: formErrors.phone ? 'red' : '' }}
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        {/* Skills Section */}
        <div className="form-section">
          <h3>Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-input">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleInputChange(e, 'skills', index)}
                placeholder="Skill"
              />
              {index > 0 && (
                <button className='button' type="button" onClick={() => removeSkill(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSkill}>
            Add Skill
          </button>
          {formErrors.skills && (
            <div style={{ color: 'red' }}>Please add at least one skill.</div>
          )}
        </div>

        {/* Experience Section */}
        <div className="form-section">
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-input">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) =>
                  handleInputChange(e, 'experience', index, 'title')
                }
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleInputChange(e, 'experience', index, 'company')
                }
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleInputChange(e, 'experience', index, 'duration')
                }
              />
              <textarea className='textarea'
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleInputChange(e, 'experience', index, 'description')
                }
              ></textarea>
              {index > 0 && (
                <button className='button' type="button" onClick={() => removeExperience(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button className="button" type="button" onClick={addExperience}>
            Add Experience
          </button>
        </div>

        {/* Education Section */}
        <div className="form-section">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-input">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange(e, 'education', index, 'degree')
                }
              />
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) =>
                  handleInputChange(e, 'education', index, 'school')
                }
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) =>
                  handleInputChange(e, 'education', index, 'year')
                }
              />
              {index > 0 && (
                <button type="button" onClick={() => removeEducation(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className='button' onClick={addEducation}>
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
