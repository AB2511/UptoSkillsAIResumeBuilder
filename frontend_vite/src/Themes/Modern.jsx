import React, { useEffect, useState, useRef } from 'react';
import { IoMdMail } from 'react-icons/io';
import { BiMobileAlt } from 'react-icons/bi';
import { MdLocationOn, MdOutlineWorkOutline } from 'react-icons/md';
import { GrLinkedinOption } from 'react-icons/gr';
import { AiFillGithub, AiOutlineLink } from 'react-icons/ai';
import { HiOutlineAcademicCap, HiOutlinePuzzle } from 'react-icons/hi';
import { IoConstructOutline } from 'react-icons/io5';
import { TbExternalLink } from 'react-icons/tb';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { useReactToPrint } from 'react-to-print';

function Modern() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadhint, setLoadhint] = useState("");
  const [skillstyle, setSkillStyle] = useState("style1");
  const componentRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoadhint("Please wait, your resume is in process...");
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


 
   const print = useReactToPrint({
     contentRef: componentRef,
     documentTitle: 'Resume',
     onAfterPrint: () => alert('Printed Successfully'),
   });

  if (loading) {
    return (
      <div>
        <Loading />
        <div className="loader-hint mt-2 font-bold">{loadhint}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="noprint">
        <Link to="/inputmodern"><button className="print-btn">Edit Data</button></Link>
        <button className="print-btn" onClick={print}>Download</button>
      </div>

      <div className="theme5" ref={componentRef} >
        {/* Personal Information */}
        <div className="theme5-sec">
          <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
          <div>
            <div className="text-3xl" style={{ fontWeight: 'bold', color: 'blue' }}>
              {state?.personal?.name} {state?.personal?.lastname}
            </div>
            <div className="font-semibold" style={{ color: 'blue', fontSize: '15px' }}>
              {state?.personal?.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '10px', margin: '10px 0 20px' }}>
              <div className="theme4-icondiv">
                <IoMdMail style={{ color: 'blue' }} />
                <div>{state?.personal?.email}</div>
              </div>
              <div className="theme4-icondiv">
                <BiMobileAlt style={{ color: 'blue' }} />
                <div>{state?.personal?.mob}</div>
              </div>
              <div className="theme4-icondiv">
                <MdLocationOn style={{ color: 'blue' }} />
                <div>{state?.personal?.city}, {state?.personal?.country}</div>
              </div>
              <div className="theme4-icondiv">
                <GrLinkedinOption style={{ color: 'blue' }} />
                <div>{state?.link?.linkedin}</div>
              </div>
              <div className="theme4-icondiv">
                <AiFillGithub style={{ color: 'blue' }} />
                <div>{state?.link?.github}</div>
              </div>
              {state?.link?.portfolio && (
                <div className="theme4-icondiv">
                  <AiOutlineLink style={{ color: 'blue' }} />
                  <div>{state?.link?.portfolio}</div>
                </div>
              )}
            </div>
            <div>{state?.personal?.quote}</div>
          </div>
        </div>

        {/* Experience Section */}
        {state?.experience?.length > 0 && (
          <div className="theme5-sec">
            <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
            <div className="theme5-head-sec">
              <div style={{ backgroundColor: 'blue' }}>
                <MdOutlineWorkOutline style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <div className="theme5-head" style={{ color: 'blue' }}>EXPERIENCE</div>
            </div>
            {state?.experience.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 10px 0', textAlign: 'end' }}>
                  {item.yearfrom} - {item.present ? 'Present' : item.yearto}
                </div>
                <div className="theme5-content-sec">
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {item.worktitle} - <span style={{ fontSize: '14px', fontWeight: '400' }}>{item.company}</span>
                  </div>
                  <div className="mt-1">{item.description}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {state?.project?.length > 0 && (
          <div className="theme5-sec">
            <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
            <div className="theme5-head-sec">
              <div style={{ backgroundColor: 'blue' }}>
                <IoConstructOutline style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <div className="theme5-head" style={{ color: 'blue' }}>PROJECTS</div>
            </div>
            {state?.project.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 10px 0' }}>
                  {item.link && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} className="italic">
                        Link <TbExternalLink />
                      </a>
                    </div>
                  )}
                </div>
                <div className="theme5-content-sec">
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</div>
                  <div className="mt-1 text-xs" style={{ color: 'blue' }}>{item.tech}</div>
                  {item.des && <div className="mt-1">{item.des}</div>}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Education Section */}
        {state?.education?.length > 0 && (
          <div className="theme5-sec">
            <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
            <div className="theme5-head-sec">
              <div style={{ backgroundColor: 'blue' }}>
                <HiOutlineAcademicCap style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <div className="theme5-head" style={{ color: 'blue' }}>EDUCATION</div>
            </div>
            {state?.education.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 10px 0', textAlign: 'end' }}>
                  {item.yearfrom} - {item.yearto}
                </div>
                <div className="theme5-content-sec">
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.degree}</div>
                  <div className="mt-1" style={{ fontSize: '14px' }}>{item.university}</div>
                  <div className="mt-1 text-xs" style={{ color: 'blue' }}>{item.grade} {item.gradetype === "percentage" ? "%" : "/10"}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Skills Section */}
        <div className="theme5-sec">
          <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
          <div className="theme5-head-sec">
            <div style={{ backgroundColor: 'blue' }}>
              <HiOutlinePuzzle style={{ color: 'white', fontSize: '18px' }} />
            </div>
            <div className="theme5-head" style={{ color: 'blue' }}>
              SKILLS
              <button
                className="btn-noprint"
                style={{ marginLeft: '10px', padding: '1px 3px', fontSize: '13px', backgroundColor: 'blue', color: 'white', borderRadius: '4px' }}
                onClick={() => setSkillStyle((prev) => (prev === 'style1' ? 'style2' : 'style1'))}
              >
                Change Look
              </button>
            </div>
          </div>
          <div className="theme5-content-sec">
            {skillstyle === 'style1' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: '5px', columnGap: '10px' }}>
                {state?.personal?.technicalskill.map((item, index) => (
                  <div key={index}>
                    <div>{item.skill}</div>
                    <div className="ratebar" style={{ color: 'blue', width: '50%' }}>
                      <div style={{ width: `${(item.rate / 10) * 100}%`, backgroundColor: 'blue' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', rowGap: '5px' }}>
                {state?.personal?.technicalskill.map((item, index) => (
                  <div key={index}>
                    <div style={{ color: 'blue', fontSize: '14px' }}>{item.skill}</div>
                    <div className="text-xs">
                      {item.rate >= 10 ? 'Advanced' : item.rate < 5 ? 'Beginner' : 'Intermediate'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interests Section */}
        {state?.personal?.interest?.length > 0 && (
          <div className="theme5-sec">
            <div style={{ backgroundColor: 'blue', color: 'white' }}></div>
            <div className="theme5-head-sec">
              <div style={{ backgroundColor: 'blue' }}>
                {/* <BsListStars style={{ color: 'white', fontSize: '18px' }} /> */}
              </div>
              <div className="theme5-head" style={{ color: 'blue' }}>INTERESTS</div>
            </div>
            <div className="theme5-content-sec">
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', paddingBottom: '20px' }}>
                {state?.personal?.interest.map((item, index) => (
                  <li key={index} style={{ listStyle: 'inside disc' }}>{item.hobbie}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modern;
