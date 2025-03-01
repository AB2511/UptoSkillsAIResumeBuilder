import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
//import './Edit_3.css';
const Edit_3 = () => {
  // Initialize resume data state
  const [resumeData, setResumeData] = useState({
    _id: null,
    name: 'Aditya Tiwary',
    role: 'Experienced Business Analyst | Supply Chain Optimization | Data Analytics',
    phone: '+44 20 7123 4567',
    email: 'aditya@40gmail.com',
    linkedin: 'linkedin.com',
    location: 'Birmingham',
    summary:
      'With over 9 years of experience in business analysis, supply chain management, and logistics, I have a proven record of reducing costs while enhancing efficiency and customer satisfaction. My expertise includes running advanced business models, financial reporting, and streamlining processes to refine supply chain operations. I am eager to contribute to your commitment to sustainability and the journey to net zero.',
    experience: [
      {
        title: 'Supply Chain Analyst',
        companyName: 'Unilever',
        date: '01/2019 - 12/2022',
        companyLocation: 'London, UK',
        description:
          'Led a cross-functional team to streamline logistics processes, reducing overall supply chain costs by 15% within 12 months.',
        accomplishment: 'Optimized inventory levels and supplier performance.'
      },
      {
        title: 'Logistics Coordinator',
        companyName: 'GlaxoSmithKline',
        date: '06/2016 - 12/2018',
        companyLocation: 'Brentford, UK',
        description:
          'Coordinated shipping activities and ensured compliance with international logistics regulations.',
        accomplishment: 'Negotiated favorable terms reducing freight costs by 10%.'
      }
    ],
    education: [
      {
        degree: 'MSc Supply Chain and Logistics Management',
        institution: 'University of Warwick',
        duration: '01/2011 - 01/2012',
        grade: 'First Class'
      },
      {
        degree: 'BSc Economics and Management',
        institution: 'University of Leeds',
        duration: '01/2008 - 01/2011',
        grade: 'Upper Second'
      }
    ],
    achievements: [
      {
        keyAchievements: 'Team Lead for Sustainability Project',
        describe: 'Spearheaded an initiative to reduce carbon footprint by 15%.'
      },
      {
        keyAchievements: 'Award for Logistics Excellence',
        describe: 'Recognized for outstanding logistics coordination.'
      },
      {
        keyAchievements: 'Negotiation Success',
        describe: 'Renegotiated contracts to cut costs by 10%.'
      }
    ],
    courses: [
      {
        title: 'Advanced Excel for Productivity',
        description: 'Certification by Corporate Finance Institute.'
      },
      {
        title: 'SAP Supply Chain Management',
        description: 'Training on supply chain processes via SAP SCM.'
      }
    ],
    skills: [
      'Supply Chain Management',
      'Logistics Planning',
      'Business Process Optimization',
      'Data Analysis',
      'Financial Reporting',
      'Microsoft Office'
    ],
    projects: [
      {
        title: 'Supply Chain Optimization Project',
        description: 'Developed a model to optimize supply chain operations, reducing costs by 15%.',
        duration: '01/2021 - 12/2021'
      },
      {
        title: 'Sustainability Initiative',
        description: 'Led a project to reduce carbon footprint by 20% across the supply chain.',
        duration: '06/2020 - 12/2020'
      }
    ]
  });

  // Other state variables
  const [showButtons, setShowButtons] = useState(true);
  const [showEnhancementOptions, setShowEnhancementOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sectionSettings, setSectionSettings] = useState({
    header: { showTitle: true, showPhone: true, showLink: true, showEmail: true, showLocation: true, uppercaseName: false, showPhoto: true },
    summary: { showSummary: true },
    experience: { showExperience: true },
    education: { showEducation: true },
    achievements: { showAchievements: true },
    courses: { showCourses: true },
    skills: { showSkills: true },
    projects: { showProjects: true }
  });
  
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [sectionsOrder, setSectionsOrder] = useState([
    'summary',
    'experience',
    'education',
    'achievements',
    'skills',
    'courses',
    'projects'
  ]);
  // ✅ FIXED: Define sections state properly
  const [sections, setSections] = useState({
    summary: true,
    experience: true,
    education: true,
    skills: true,
    achievements: true,
    courses: true,
    projects: true,
  });
  // ✅ Function to remove a section
  const removeSection = (section) => {
    setSectionSettings((prevSettings) => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [`show${section.charAt(0).toUpperCase() + section.slice(1)}`]: false
      }
    }));
  };
  
  // Refs
  const resumeRef = useRef(null);
  const activeElementRef = useRef(null);
  const activeCaretPosRef = useRef(0);
  const handleAIEnhancement = async () => {
    if (!resumeData._id) {
      await createResume();
      alert("Resume created. Click AI Assistant again.");
      return;
    }
    setShowEnhancementOptions(true);
  };
  // Handlers for input changes, adding, and removing sections
  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedSection = [...(resumeData[section] || [])];
      updatedSection[index][field] = value;
      setResumeData({ ...resumeData, [section]: updatedSection });
    } else {
      setResumeData({ ...resumeData, [field]: value });
    }
  };
  const handleAddSection = (section) => {
    let newItem = {};
    if (section === 'experience') {
      newItem = { title: '', companyName: '', date: '', companyLocation: '', description: '', accomplishment: '' };
    } else if (section === 'education') {
      newItem = { degree: '', institution: '', duration: '', grade: '' };
    } else if (section === 'achievements') {
      newItem = { keyAchievements: '', describe: '' };
    } else if (section === 'courses') {
      newItem = { title: '', description: '' };
    } else if (section === 'skills') {
      newItem = "";
    } else if (section === 'projects') {
      newItem = { title: '', description: '', duration: '' };
    }
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem]
    }));
  };

  const handleRemoveSection = (section, index) => {
    const updatedSection = [...(resumeData[section] || [])];
    updatedSection.splice(index, 1);
    setResumeData({ ...resumeData, [section]: updatedSection });
  };

  // PDF download handler with multi-page support
  const handleDownload = async () => {
    // Hide settings icons and buttons before PDF generation
    setShowButtons(false);
    setActiveSection(null);

    setTimeout(async () => {
      const input = resumeRef.current;
      if (input) {
        try {
          // Hide all settings icons
          const settingsIcons = document.querySelectorAll(".settings-icon");
          settingsIcons.forEach((icon) => (icon.style.display = "none"));

          const canvas = await html2canvas(input, {
            scale: 2,
            scrollY: -window.scrollY,
            useCORS: true,
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgProps = pdf.getImageProperties(imgData);
          const imgDisplayWidth = pdfWidth;
          const imgDisplayHeight = (imgProps.height * imgDisplayWidth) / imgProps.width;

          let heightLeft = imgDisplayHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgDisplayWidth, imgDisplayHeight);
          heightLeft -= pdfHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgDisplayHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgDisplayWidth, imgDisplayHeight);
            heightLeft -= pdfHeight;
          }

          pdf.save("resume.pdf");

          // Restore settings icons
          settingsIcons.forEach((icon) => (icon.style.display = ""));
        } catch (error) {
          console.error("Error generating PDF:", error);
        } finally {
          setShowButtons(true);
        }
      }
    }, 500);
  };

  // Toggle section settings
  const handleSettingChange = (section, setting) => {
    setSectionSettings({
      ...sectionSettings,
      [section]: { ...sectionSettings[section], [setting]: !sectionSettings[section][setting] }
    });
  };

  const handleBrandingToggle = () => {
    setBranding(!branding);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleSectionHover = (section) => {
    setHoveredSection(section);
  };

  const handleSectionLeave = () => {
    setHoveredSection(null);
  };

  // Draggable Settings Modal for active section
  const renderSectionSettings = (section) => {
    const settings = sectionSettings[section];

    useEffect(() => {
      const modal = document.querySelector(".settings-modal");
      if (!modal) return;

      function handleMouseDown(event) {
        let shiftX = event.clientX - modal.getBoundingClientRect().left;
        let shiftY = event.clientY - modal.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
          modal.style.left = `${pageX - shiftX}px`;
          modal.style.top = `${pageY - shiftY}px`;
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        modal.onmouseup = function () {
          document.removeEventListener("mousemove", onMouseMove);
          modal.onmouseup = null;
        };
      }

      modal.addEventListener("mousedown", handleMouseDown);

      return () => {
        modal.removeEventListener("mousedown", handleMouseDown);
      };
    }, []);

    return (
      <div className="settings-modal">
        <h3>{section.charAt(0).toUpperCase() + section.slice(1)} Settings</h3>
        {Object.keys(settings).map((key) => (
          <label key={key}>
            <span>{key.replace('show', '').replace(/([A-Z])/g, ' $1').trim()}</span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => handleSettingChange(section, key)}
            />
          </label>
        ))}
      </div>
    );
  };
  const createResume = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resume/create', {
        resumeData: {
          name: resumeData.name,
          role: resumeData.role,
          phone: resumeData.phone,
          email: resumeData.email,
          linkedin: resumeData.linkedin,
          location: resumeData.location,
          summary: resumeData.summary,
          experience: resumeData.experience,
          education: resumeData.education,
          achievements: resumeData.achievements,
          courses: resumeData.courses,
          skills: resumeData.skills,
          projects: resumeData.projects
        }
      });
      if (response.data?.data?._id) {
        setResumeData(prev => ({ ...prev, _id: response.data.data._id }));
        alert("Resume created successfully!");
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };
  const saveResume = async () => {
    if (!resumeData) {
      alert("No resume data to save!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/resume/save", {
        resumeData
      });
      if (response.data) {
        alert("Resume saved successfully!");
        console.log("✅ Resume saved:", response.data);
      }
    } catch (error) {
      console.error("❌ Error saving resume:", error);
      alert("Failed to save resume.");
    }
  };
  const enhanceSingleField = async (field) => {
    if (!resumeData._id) {
      alert("Please save your resume before enhancing a field.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/resume/enhanceField', {
        resumeId: resumeData._id,
        field: field
      });
      if (response.data?.data) {
        setResumeData(response.data.data);
        alert(`${field} enhanced successfully!`);
      }
    } catch (error) {
      console.error(`Error enhancing ${field}:`, error);
    } finally {
      setLoading(false); // Ensures loading stops even if there's an error
    }
  };
  

  return (
    <div className="app-container">
      <div className="sidebar">
        <button className="sidebar-btn" onClick={() => alert('Add Section functionality will be implemented here.')}>
          🔄 Add Section
        </button>
        <button className="sidebar-btn" onClick={() => alert('Design & Font functionality will be implemented here.')}>
          🎨 Design & Font
        </button>
        <hr />
        <button className="sidebar-btn" onClick={handleAIEnhancement}>
          🤖 AI Assistant
        </button>
        {showEnhancementOptions && (
          <div className="ai-field-enhancement">
            <h4>Enhance Specific Field</h4>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("summary")}>
              Enhance Summary
            </button>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("skills")}>
              Enhance Skills
            </button>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("experience")}>
              Enhance Experience
            </button>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("achievements")}>
              Enhance Achievements
            </button>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("courses")}>
              Enhance Courses
            </button>
            <button className="sidebar-btn" onClick={() => enhanceSingleField("projects")}>
              Enhance Projects
            </button>
          </div>
        )}
        <hr />
        <button className="sidebar-btn premium" onClick={handleDownload}>
          ⬇️ Download
        </button>
        <button className="save-button" onClick={saveResume}>Save Resume</button>
        <button className="sidebar-btn premium">📜 History</button>
        
      </div>
      {loading && (
        <div className="loading-overlay">
    <div className="loading-spinner"></div>
    <p>Enhancing...</p>
        </div>
        )}
      <div className="main-content">
        <div ref={resumeRef} className="resume-container" id="resumeContent">
          <div className="header">
            <h1
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInputChange(null, 'name', e.target.innerText)}
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => handleSectionClick('header')}
              onMouseEnter={() => handleSectionHover('header')}
              onMouseLeave={handleSectionLeave}
            >
              {sectionSettings.header.uppercaseName
                ? resumeData.name.toUpperCase()
                : resumeData.name}
              {(hoveredSection === 'header' || activeSection === 'header') && (
                <span className="settings-icon" onClick={() => setActiveSection('header')}>
                  ⚙️
                </span>
              )}
            </h1>
            {sectionSettings.header.showTitle && (
              <p contentEditable onBlur={(e) => handleInputChange(null, 'role', e.target.textContent)}>
                {resumeData.role}
              </p>
            )}
            <div className="contact-info">
              {sectionSettings.header.showPhone && (
                <span contentEditable onBlur={(e) => handleInputChange(null, 'phone', e.target.textContent)}>
                  {resumeData.phone}
                </span>
              )}
              {sectionSettings.header.showEmail && (
                <span contentEditable onBlur={(e) => handleInputChange(null, 'email', e.target.textContent)}>
                  {resumeData.email}
                </span>
              )}
              {sectionSettings.header.showLink && (
                <span contentEditable onBlur={(e) => handleInputChange(null, 'linkedin', e.target.textContent)}>
                  {resumeData.linkedin}
                </span>
              )}
              {sectionSettings.header.showLocation && (
                <span contentEditable onBlur={(e) => handleInputChange(null, 'location', e.target.textContent)}>
                  {resumeData.location}
                </span>
              )}
            </div>
          </div>
          {sectionsOrder.map((section) => {
  if (section === "summary" && sectionSettings.summary.showSummary && sections.summary) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("summary")}
            onMouseEnter={() => handleSectionHover("summary")}
            onMouseLeave={handleSectionLeave}
          >
            Summary
            {(hoveredSection === "summary" || activeSection === "summary") && (
              <span className="settings-icon" onClick={() => setActiveSection("summary")}>⚙️</span>
            )}
          </h2>
          {/* Small Remove Button for Section */}
          <button onClick={() => removeSection("summary")} className="remove-btn">✖</button>
        </div>

        <p contentEditable onBlur={(e) => handleInputChange(null, "summary", e.target.textContent)}>
          {resumeData.summary}
        </p>
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "experience" && sectionSettings.experience.showExperience) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("experience")}
            onMouseEnter={() => handleSectionHover("experience")}
            onMouseLeave={handleSectionLeave}
          >
            Experience
            {(hoveredSection === "experience" || activeSection === "experience") && (
              <span className="settings-icon" onClick={() => setActiveSection("experience")}>⚙️</span>
            )}
          </h2>
          {/* Small Remove Button for Experience Section */}
          <button onClick={() => removeSection("experience")} className="remove-btn">✖</button>
        </div>

        {(resumeData.experience || []).map((exp, idx) => (
          <div key={idx} className="experience-item">
            <div className="details">
              <h3 contentEditable onBlur={(e) => handleInputChange("experience", "companyName", e.target.textContent, idx)}>
                {exp.companyName}
              </h3>
              <p contentEditable onBlur={(e) => handleInputChange("experience", "title", e.target.textContent, idx)}>
                {exp.title}
              </p>
              <p contentEditable onBlur={(e) => handleInputChange("experience", "date", e.target.textContent, idx)}>
                {exp.date}
              </p>
              <p contentEditable onBlur={(e) => handleInputChange("experience", "companyLocation", e.target.textContent, idx)}>
                {exp.companyLocation}
              </p>
              <p contentEditable onBlur={(e) => handleInputChange("experience", "description", e.target.textContent, idx)}>
                {exp.description}
              </p>
              <p contentEditable onBlur={(e) => handleInputChange("experience", "accomplishment", e.target.textContent, idx)}>
                {exp.accomplishment}
              </p>
            </div>
            {showButtons && (
              <button onClick={() => handleRemoveSection("experience", idx)}>
                Remove Experience
              </button>
            )}
          </div>
        ))}
        
        {showButtons && (
          <button onClick={() => handleAddSection("experience")}>Add Experience</button>
        )}
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "education" && sectionSettings.education.showEducation) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("education")}
            onMouseEnter={() => handleSectionHover("education")}
            onMouseLeave={handleSectionLeave}
          >
            Education
            {(hoveredSection === "education" || activeSection === "education") && (
              <span className="settings-icon" onClick={() => setActiveSection("education")}>⚙️</span>
            )}
          </h2>
          {/* Small Remove Button for Education Section */}
          <button onClick={() => removeSection("education")} className="remove-btn">✖</button>
        </div>

        {(resumeData.education || []).map((edu, idx) => (
          <div key={idx} className="education-item">
            <div className="details">
              <h3 contentEditable onBlur={(e) => handleInputChange("education", "institution", e.target.textContent, idx)}>
                {edu.institution}
              </h3>
              <p contentEditable onBlur={(e) => handleInputChange("education", "degree", e.target.textContent, idx)}>
                {edu.degree}
              </p>
            </div>
            <div className="date-location">
              <p contentEditable onBlur={(e) => handleInputChange("education", "duration", e.target.textContent, idx)}>
                {edu.duration}
              </p>
              <p contentEditable onBlur={(e) => handleInputChange("education", "grade", e.target.textContent, idx)}>
                {edu.grade}
              </p>
            </div>
            {showButtons && (
              <button onClick={() => handleRemoveSection("education", idx)}>
                Remove Education
              </button>
            )}
          </div>
        ))}

        {showButtons && (
          <button onClick={() => handleAddSection("education")}>Add Education</button>
        )}
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "achievements" && sectionSettings.achievements.showAchievements) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("achievements")}
            onMouseEnter={() => handleSectionHover("achievements")}
            onMouseLeave={handleSectionLeave}
          >
            Key Achievements
            {(hoveredSection === "achievements" || activeSection === "achievements") && (
              <span className="settings-icon" onClick={() => setActiveSection("achievements")}>
                ⚙️
              </span>
            )}
          </h2>
          {/* Small Remove Button for Achievements Section */}
          <button onClick={() => removeSection("achievements")} className="remove-btn">✖</button>
        </div>

        {(resumeData.achievements || []).map((achievement, idx) => (
          <div key={idx} className="achievement-item">
            <h3
              contentEditable
              onBlur={(e) => handleInputChange("achievements", "keyAchievements", e.target.textContent, idx)}
            >
              {achievement.keyAchievements}
            </h3>
            <p
              contentEditable
              onBlur={(e) => handleInputChange("achievements", "describe", e.target.textContent, idx)}
            >
              {achievement.describe}
            </p>
            {showButtons && (
              <button onClick={() => handleRemoveSection("achievements", idx)}>
                Remove Achievement
              </button>
            )}
          </div>
        ))}

        {showButtons && (
          <button onClick={() => handleAddSection("achievements")}>Add Achievement</button>
        )}
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "skills" && sectionSettings.skills.showSkills) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("skills")}
            onMouseEnter={() => handleSectionHover("skills")}
            onMouseLeave={handleSectionLeave}
          >
            Skills
            {(hoveredSection === "skills" || activeSection === "skills") && (
              <span className="settings-icon" onClick={() => setActiveSection("skills")}>
                ⚙️
              </span>
            )}
          </h2>
          {/* Small Remove Button for Skills Section */}
          <button onClick={() => removeSection("skills")} className="remove-btn">✖</button>
        </div>

        <ul className="skills-list">
          {(resumeData.skills || []).map((skill, idx) => (
            <li key={`${skill}-${idx}`} className="skill-item">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const updatedSkills = [...resumeData.skills];
                  updatedSkills[idx] = e.target.textContent;
                  setResumeData({ ...resumeData, skills: updatedSkills });
                }}
                className="skill-name"
              >
                {skill}
              </span>
              {showButtons && (
                <button
                  className="remove-skill-btn"
                  onClick={() => handleRemoveSection("skills", idx)}
                >
                  Remove Skill
                </button>
              )}
            </li>
          ))}
        </ul>

        {showButtons && (
          <button onClick={() => handleAddSection("skills")} className="add-skill-btn">
            Add Skill
          </button>
        )}
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "courses" && sectionSettings.courses.showCourses) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("courses")}
            onMouseEnter={() => handleSectionHover("courses")}
            onMouseLeave={handleSectionLeave}
          >
            Courses
            {(hoveredSection === "courses" || activeSection === "courses") && (
              <span className="settings-icon" onClick={() => setActiveSection("courses")}>⚙️</span>
            )}
          </h2>
          {/* Small Remove Button for Courses Section */}
          <button onClick={() => removeSection("courses")} className="remove-btn">✖</button>
        </div>

        {(resumeData.courses || []).map((course, idx) => (
          <div key={idx} className="course-item">
            <h3
              contentEditable
              onBlur={(e) => handleInputChange("courses", "title", e.target.textContent, idx)}
            >
              {course.title}
            </h3>
            <p
              contentEditable
              onBlur={(e) => handleInputChange("courses", "description", e.target.textContent, idx)}
            >
              {course.description}
            </p>
            {showButtons && (
              <button onClick={() => handleRemoveSection("courses", idx)}>Remove Course</button>
            )}
          </div>
        ))}

        {showButtons && (
          <button onClick={() => handleAddSection("courses")}>Add Course</button>
        )}
      </div>
    );
  }
  return null;
})}

{sectionsOrder.map((section) => {
  if (section === "projects" && sectionSettings.projects.showProjects) {
    return (
      <div className="section" key={section}>
        <div className="section-header">
          <h2
            onClick={() => handleSectionClick("projects")}
            onMouseEnter={() => handleSectionHover("projects")}
            onMouseLeave={handleSectionLeave}
          >
            Projects
            {(hoveredSection === "projects" || activeSection === "projects") && (
              <span className="settings-icon" onClick={() => setActiveSection("projects")}>⚙️</span>
            )}
          </h2>
          {/* Small Remove Button for Projects Section */}
          <button onClick={() => removeSection("projects")} className="remove-btn">✖</button>
        </div>

        {(resumeData.projects || []).map((project, idx) => (
          <div key={idx} className="project-item">
            <div className="details">
              <h3
                contentEditable
                onBlur={(e) => handleInputChange("projects", "title", e.target.textContent, idx)}
              >
                {project.title}
              </h3>
              <p
                contentEditable
                onBlur={(e) => handleInputChange("projects", "description", e.target.textContent, idx)}
              >
                {project.description}
              </p>
            </div>
            <div className="date-location">
              <p
                contentEditable
                onBlur={(e) => handleInputChange("projects", "duration", e.target.textContent, idx)}
              >
                {project.duration}
              </p>
            </div>
            {showButtons && (
              <button onClick={() => handleRemoveSection("projects", idx)}>Remove Project</button>
            )}
          </div>
        ))}

        {showButtons && (
          <button onClick={() => handleAddSection("projects")}>Add Project</button>
        )}
      </div>
    );
  }
  return null;
})}

        </div>
    </div>
</div> 
);
};

export default Edit_3;
