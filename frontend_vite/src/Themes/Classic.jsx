// import React, { useState, useEffect ,useRef} from 'react';
// import './Classic.css';
// import { IoMdMail } from 'react-icons/io';
// import { BiMobileAlt, BiSquare } from 'react-icons/bi';
// import { GrLinkedinOption } from 'react-icons/gr';
// import { AiFillGithub } from 'react-icons/ai';
// import { MdLocationOn } from 'react-icons/md';
// import { useReactToPrint } from 'react-to-print';
// import { Link, useNavigate } from 'react-router-dom';
// import Loading from '../components/Loading';


// function Classic() {
//     const [loading, setLoading] = useState(true);
//     const [userdata, setUserdata] = useState(null); // Local state to store user data
//     const [loadhint, setloadhint] = useState('');
//     const navigate = useNavigate();
//     const themeclr = "#643baa"; // Default theme color

//     // Simulate data fetching (replace this with actual API call)
//     useEffect(() => {
//         const fetchUserData = async () => {
//             // Simulating fetching user data from an API or backend
//             const userData = await fetchUserDataFromAPI();
//             setUserdata(userData);
//             setLoading(false);
//         };

//         fetchUserData();
//         loadFunc();
//     }, []);

//     const fetchUserDataFromAPI = () => {
//         // Example of user data (replace this with actual API response)
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve({
//                     personal: {
//                         name: 'John',
//                         lastname: 'Doe',
//                         title: 'Software Engineer',
//                         quote: 'A passionate developer.',
//                         email: 'john.doe@example.com',
//                         mob: '1234567890',
//                         city: 'New York',
//                         country: 'USA',
//                         technicalskill: [
//                             { skill: 'JavaScript' },
//                             { skill: 'React' },
//                             { skill: 'Node.js' },
//                         ],
//                         interest: [{ hobbie: 'Coding' }, { hobbie: 'Music' }],
//                     },
//                     link: {
//                         linkedin: 'https://www.linkedin.com/in/johndoe/',
//                         github: 'https://github.com/johndoe',
//                     },
//                     experience: [
//                         {
//                             company: 'TechCorp',
//                             worktitle: 'Frontend Developer',
//                             yearfrom: '2020',
//                             yearto: '2023',
//                             description: 'Developed various frontend features using React.js.',
//                             present: true,
//                         },
//                     ],
//                     education: [
//                         {
//                             degree: 'B.Sc. Computer Science',
//                             university: 'XYZ University',
//                             yearfrom: '2016',
//                             yearto: '2020',
//                             grade: 'A',
//                             gradetype: 'grade',
//                         },
//                     ],
//                     project: [
//                         {
//                             name: 'Personal Portfolio',
//                             tech: 'React, Node.js',
//                             des: 'A personal portfolio website showcasing my work.',
//                         },
//                     ],
//                     course: [
//                         {
//                             name: 'Full Stack Development',
//                             provider: 'Udemy',
//                         },
//                     ],
//                 });
//             }, 2000); // Simulate network delay
//         });
//     };

//     const loadFunc = () => {
//         const hints = [
//             'Please wait your resume is in process...',
//             'Hint: Entering the complete details will make your resume look awesome',
//         ];
//         hints.forEach((item, index) => {
//             setTimeout(() => {
//                 setloadhint(item);
//             }, 3000 * index);
//         });
//     };

//     const componentRef = useRef();
    
//             const print = useReactToPrint({
//             contentRef: componentRef,
//             documentTitle:'Resume',
//             onAfterPrint: () => alert('Printed Successfully'),
//         });

//     if (loading) {
//         return (
//             <>
//                 <Loading />
//                 <div className="loader-hint mt-2 font-bold">{loadhint}</div>
//             </>
//         );
//     }

//     return (
//         <div>
//             <div className="noprint">
//                 <Link to="/">
//                     <button className="print-btn">Edit Data</button>
//                 </Link>
//                 <Link to="/selecttheme">
//                     <button className="print-btn">Change theme</button>
//                 </Link>
//                 <button className="print-btn" onClick={print}>
//                     Download
//                 </button>
//             </div>
//             <div ref={componentRef} className="theme2">
//                 <div className="mb-4">
//                     <div>
//                         <div className="text-3xl" style={{ color: themeclr, fontWeight: 'bold' }}>
//                             {userdata.personal.name} {userdata.personal.lastname}
//                         </div>
//                         <div style={{ color: themeclr, fontSize: '19px' }}>{userdata.personal.title}</div>
//                         <div className="mt-1 text-left">{userdata.personal.quote}</div>
//                     </div>
//                     <div>
//                         <div>{userdata.personal.email}</div>
//                         <IoMdMail style={{ color: themeclr }} />
//                         <div>{userdata.personal.mob}</div>
//                         <BiMobileAlt style={{ color: themeclr }} />
//                         <div>
//                             {userdata.personal.city}, {userdata.personal.country}
//                         </div>
//                         <MdLocationOn style={{ color: themeclr }} />
//                         <div>{userdata.link.linkedin}</div>
//                         <GrLinkedinOption style={{ color: themeclr }} />
//                         <div>{userdata.link.github}</div>
//                         <AiFillGithub style={{ color: themeclr }} />
//                     </div>
//                 </div>

//                 <div className="theme2-section">
//                     <div className="section-head" style={{ color: themeclr }}>
//                         SKILLS
//                     </div>
//                     <div className="section-content">
//                         <div className="theme2-interest">
//                             {userdata.personal.technicalskill.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     style={{
//                                         backgroundColor: themeclr,
//                                         borderRadius: '5px',
//                                         padding: '3px',
//                                         fontSize: '12px',
//                                     }}
//                                 >
//                                     {item.skill}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {userdata.experience[0].company && (
//                     <div className="theme2-section">
//                         <div className="section-head" style={{ color: themeclr }}>
//                             WORK EXPERIENCE
//                         </div>
//                         <div className="section-content">
//                             {userdata.experience.map((item, index) => (
//                                 <div key={index}>
//                                     <div className="font-bold" style={{ fontSize: '14px' }}>
//                                         {item.worktitle}
//                                     </div>
//                                     <div style={{ fontSize: '14px' }}>{item.company}</div>
//                                     <div className="text-xs italic" style={{ color: themeclr }}>
//                                         {item.yearfrom} - {item.present ? 'Present' : item.yearto}
//                                     </div>
//                                     <div>- {item.description}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {userdata.project[0].name && (
//                     <div className="theme2-section">
//                         <div className="section-head" style={{ color: themeclr }}>
//                             PROJECTS
//                         </div>
//                         <div className="section-content">
//                             {userdata.project.map((item, index) => (
//                                 <div key={index} className="theme2-proj">
//                                     <BiSquare style={{ color: themeclr }} />
//                                     <div>
//                                         <div className="resume-title" style={{ fontWeight: 'bold' }}>
//                                             {item.name}
//                                         </div>
//                                         <div className="text-xs" style={{ color: themeclr }}>
//                                             {item.tech}
//                                         </div>
//                                         {item.des && <div className="mt-1">{item.des}</div>}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="theme2-section">
//                     <div className="section-head" style={{ color: themeclr }}>
//                         EDUCATION
//                     </div>
//                     <div className="section-content">
//                         {userdata.education.map((item, index) => (
//                             <div key={index} className="theme2-edu">
//                                 <div className="font-bold resume-title" style={{ color: themeclr }}>
//                                     {item.degree}
//                                 </div>
//                                 <div className="resume-title">{item.university}</div>
//                                 <div className="text-xs italic" style={{ color: themeclr }}>
//                                     <div>
//                                         {item.yearfrom} - {item.yearto}
//                                     </div>
//                                     <div>{item.grade}{item.gradetype === 'grade' ? '/10' : '%'}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {userdata.course[0].name && (
//                     <div className="theme2-section">
//                         <div className="section-head" style={{ color: themeclr }}>
//                             COURSES
//                         </div>
//                         <div className="section-content">
//                             {userdata.course.map((item, index) => (
//                                 <div key={index}>
//                                     <div className="resume-title" style={{ fontWeight: 'bold' }}>
//                                         {item.name}
//                                     </div>
//                                     <div className="text-xs" style={{ color: themeclr }}>
//                                         {item.provider}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="theme2-section">
//                     <div className="section-head" style={{ color: themeclr }}>
//                         INTERESTS/HOBBY
//                     </div>
//                     <div className="section-content">
//                         <ul
//                             style={{
//                                 display: 'grid',
//                                 justifyItems: 'center',
//                                 gridTemplateColumns: 'repeat(auto-fit, minmax(25%,1fr)',
//                                 paddingBottom: '20px',
//                             }}
//                         >
//                             {userdata.personal.interest.map((item, index) => (
//                                 <li key={index} style={{ listStyle: 'outside disc' }}>
//                                     {item.hobbie}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Classic;


import React, { useState, useEffect, useRef } from 'react';
import './Classic.css'; // Add your styles here for the classic resume template
import { IoMdMail } from 'react-icons/io';
import { BiMobileAlt, BiSquare } from 'react-icons/bi';
import { GrLinkedinOption } from 'react-icons/gr';
import { AiFillGithub } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading'; // Assuming you have a Loading component

function Classic() {
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState(null); // Local state to store user data
  const [loadhint, setloadhint] = useState('');
  const themeclr = "#643baa"; // Default theme color

  const location = useLocation(); // Accessing the passed state from Input.js
  const componentRef = useRef();

  useEffect(() => {
    if (location.state) {
      setUserdata(location.state); // Set userdata from the state passed via React Router
      setLoading(false);
      loadFunc();
    }
  }, [location.state]);

  const loadFunc = () => {
    const hints = [
      'Please wait your resume is in process...',
      'Hint: Entering the complete details will make your resume look awesome',
    ];
    hints.forEach((item, index) => {
      setTimeout(() => {
        setloadhint(item);
      }, 3000 * index);
    });
  };

  const print = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume',
    onAfterPrint: () => alert('Printed Successfully'),
  });

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
      <div ref={componentRef} className="theme2">
        <div className="mb-4">
          <div>
            <div className="text-3xl" style={{ color: themeclr, fontWeight: 'bold' }}>
              {userdata.personal.name} {userdata.personal.lastname}
            </div>
            <div style={{ color: themeclr, fontSize: '19px' }}>{userdata.personal.title}</div>
            <div className="mt-1 text-left">{userdata.personal.quote}</div>
          </div>
          <div>
            <div>{userdata.personal.email}</div>
            <IoMdMail style={{ color: themeclr }} />
            <div>{userdata.personal.mob}</div>
            <BiMobileAlt style={{ color: themeclr }} />
            <div>
              {userdata.personal.city}, {userdata.personal.country}
            </div>
            <MdLocationOn style={{ color: themeclr }} />
            <div>{userdata.link.linkedin}</div>
            <GrLinkedinOption style={{ color: themeclr }} />
            <div>{userdata.link.github}</div>
            <AiFillGithub style={{ color: themeclr }} />
          </div>
        </div>

        <div className="theme2-section">
          <div className="section-head" style={{ color: themeclr }}>
            SKILLS
          </div>
          <div className="section-content">
            <div className="theme2-interest">
              {userdata.personal.technicalskill.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: themeclr,
                    borderRadius: '5px',
                    padding: '3px',
                    fontSize: '12px',
                  }}
                >
                  {item.skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {userdata.experience.length > 0 && (
          <div className="theme2-section">
            <div className="section-head" style={{ color: themeclr }}>
              WORK EXPERIENCE
            </div>
            <div className="section-content">
              {userdata.experience.map((item, index) => (
                <div key={index}>
                  <div className="font-bold" style={{ fontSize: '14px' }}>
                    {item.worktitle}
                  </div>
                  <div style={{ fontSize: '14px' }}>{item.company}</div>
                  <div className="text-xs italic" style={{ color: themeclr }}>
                    {item.yearfrom} - {item.present ? 'Present' : item.yearto}
                  </div>
                  <div>- {item.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userdata.project.length > 0 && (
          <div className="theme2-section">
            <div className="section-head" style={{ color: themeclr }}>
              PROJECTS
            </div>
            <div className="section-content">
              {userdata.project.map((item, index) => (
                <div key={index} className="theme2-proj">
                  <BiSquare style={{ color: themeclr }} />
                  <div>
                    <div className="resume-title" style={{ fontWeight: 'bold' }}>
                      {item.name}
                    </div>
                    <div className="text-xs" style={{ color: themeclr }}>
                      {item.tech}
                    </div>
                    {item.des && <div className="mt-1">{item.des}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="theme2-section">
          <div className="section-head" style={{ color: themeclr }}>
            EDUCATION
          </div>
          <div className="section-content">
            {userdata.education.map((item, index) => (
              <div key={index} className="theme2-edu">
                <div className="font-bold resume-title" style={{ color: themeclr }}>
                  {item.degree}
                </div>
                <div className="resume-title">{item.university}</div>
                <div className="text-xs italic" style={{ color: themeclr }}>
                  <div>
                    {item.yearfrom} - {item.yearto}
                  </div>
                  <div>
                    {item.grade} {item.gradetype === 'grade' ? '/10' : '%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {userdata.course.length > 0 && (
          <div className="theme2-section">
            <div className="section-head" style={{ color: themeclr }}>
              COURSES
            </div>
            <div className="section-content">
              {userdata.course.map((item, index) => (
                <div key={index}>
                  <div className="resume-title" style={{ fontWeight: 'bold' }}>
                    {item.name}
                  </div>
                  <div className="text-xs" style={{ color: themeclr }}>
                    {item.provider}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="theme2-section">
          <div className="section-head" style={{ color: themeclr }}>
            INTERESTS/HOBBY
          </div>
          <div className="section-content">
            <ul
              style={{
                display: 'grid',
                justifyItems: 'center',
                gridTemplateColumns: 'repeat(auto-fit, minmax(25%,1fr))',
                paddingBottom: '20px',
              }}
            >
              {userdata.personal.interest.map((item, index) => (
                <li key={index} style={{ listStyle: 'outside disc' }}>
                  {item.hobbie}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classic;
