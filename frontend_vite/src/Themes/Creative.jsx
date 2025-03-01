import React, { useState, useEffect, useRef } from 'react';
import { useLocation,Link } from 'react-router-dom';
import './Creative.css';
import Loading from '../components/Loading';
import { useReactToPrint } from 'react-to-print';

function Creative() {
  const { state } = useLocation(); // Get formData passed from Input component
  const [loading, setLoading] = useState(true);
  const [loadhint, setLoadhint] = useState("");
   const componentRef = useRef();


   const print = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume',
    onAfterPrint: () => alert('Printed Successfully'),
  });


  useEffect(() => {
    const hints = [
      "Please wait, your resume is being processed...",
      "Hint: Entering complete details will make your resume look awesome."
    ];
    let hintIndex = 0;
    const interval = setInterval(() => {
      setLoadhint(hints[hintIndex]);
      hintIndex = (hintIndex + 1) % hints.length;
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
    }, 6000);
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
        <div className="loader-hint mt-2 font-bold">{loadhint}</div>
      </>
    );
  }

 
  return (
<div>
        <div className="noprint">
        <Link to="/input">
          <button className="print-btn">Edit Data</button>
        </Link>
        <button className="print-btn" onClick={print}>
          Download
        </button>
      </div>


    <div className="theme3" ref={componentRef}>
      {/* Top Section */}
      <div className="theme3-top">
        <div>
          <div className="text-3xl">{state.personal.name} {state.personal.lastname}</div>
          <div style={{ color: "#643baa", fontSize: "19px" }}>{state.personal.title}</div>
          <div className="mt-2">{state.personal.quote}</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="theme3-contact mt-4">
        <div><strong>Email:</strong> {state.personal.email}</div>
        <div><strong>Phone:</strong> {state.personal.mob}</div>
        <div><strong>Location:</strong> {state.personal.city}, {state.personal.country}</div>
        <div>
          <strong>LinkedIn:</strong> <a href={state.link.linkedin} target="_blank" rel="noopener noreferrer">{state.link.linkedin}</a>
        </div>
        <div>
          <strong>GitHub:</strong> <a href={state.link.github} target="_blank" rel="noopener noreferrer">{state.link.github}</a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="theme3-skills mt-4">
        <h3>Technical Skills</h3>
        <ul>
          {state.personal.technicalskill.map((skill, index) => (
            <li key={index}>{skill.skill}</li>
          ))}
        </ul>
      </div>

      {/* Interests Section */}
      <div className="theme3-interests mt-4">
        <h3>Interests</h3>
        <ul>
          {state.personal.interest.map((hobbie, index) => (
            <li key={index}>{hobbie.hobbie}</li>
          ))}
        </ul>
      </div>

      {/* Experience Section */}
      <div className="theme3-experience mt-4">
        <h3>Work Experience</h3>
        {state.experience.length > 0 ? (
          state.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div><strong>Company:</strong> {exp.company}</div>
              <div><strong>Job Title:</strong> {exp.worktitle}</div>
              <div><strong>From:</strong> {exp.yearfrom} <strong>To:</strong> {exp.yearto}</div>
              <div>{exp.description}</div>
              {exp.present && <div><strong>Currently Working Here</strong></div>}
            </div>
          ))
        ) : (
          <div>No experience added.</div>
        )}
      </div>

      {/* Education Section */}
      <div className="theme3-education mt-4">
        <h3>Education</h3>
        {state.education.length > 0 ? (
          state.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div><strong>Degree:</strong> {edu.degree}</div>
              <div><strong>University:</strong> {edu.university}</div>
              <div><strong>From:</strong> {edu.yearfrom} <strong>To:</strong> {edu.yearto}</div>
              <div><strong>Grade:</strong> {edu.grade}</div>
              <div><strong>Grade Type:</strong> {edu.gradetype}</div>
            </div>
          ))
        ) : (
          <div>No education added.</div>
        )}
      </div>

      {/* Projects Section */}
      <div className="theme3-projects mt-4">
        <h3>Projects</h3>
        {state.project.length > 0 ? (
          state.project.map((proj, index) => (
            <div key={index} className="project-item">
              <div><strong>Project Name:</strong> {proj.name}</div>
              <div><strong>Technologies Used:</strong> {proj.tech}</div>
              <div><strong>Description:</strong> {proj.des}</div>
            </div>
          ))
        ) : (
          <div>No projects added.</div>
        )}
      </div>

      {/* Courses Section */}
      <div className="theme3-courses mt-4">
        <h3>Courses</h3>
        {state.course.length > 0 ? (
          state.course.map((course, index) => (
            <div key={index} className="course-item">
              <div><strong>Course Name:</strong> {course.name}</div>
              <div><strong>Provider:</strong> {course.provider}</div>
            </div>
          ))
        ) : (
          <div>No courses added.</div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Creative;
