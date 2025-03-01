// import React, { useEffect, useState } from 'react'
// import "./Professional.css"
// import { AiOutlineLink, AiFillGithub } from "react-icons/ai"
// import { IoMdMail } from "react-icons/io"
// import { BiMobileAlt, BiSquare } from "react-icons/bi"
// import { MdLocationOn } from "react-icons/md"
// import { GrLinkedinOption } from "react-icons/gr"
// import BounceLoader from "react-spinners/BounceLoader"
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'

// function Theme1() {
//     const navigate = useNavigate()
//     const state = useSelector(state => state.user.state)
//     const themeclr = useSelector(state => state.theme?.theme?.color) || "#643baa"
//     const [loading, setLoading] = useState(true);
//     const [loadhint, setloadhint] = useState("")

//     const loadFunc = () => {
//         const hints = ["Please wait your resume is in process...", "Hint: Entering the complete details will make your resume looks awesome"]
//         setLoading(true)
//         hints.map((item, index) => {
//             return (
//                 setTimeout(() => {
//                     setloadhint(item)
//                 }, 3000 * index)
//             )
//         })
//         setTimeout(() => {
//             setLoading(false)
//         }, 6000)
//     }

//     useEffect(() => {
//         if (!state.personal) { navigate("/") }
//         window.scrollTo({
//             top: 0, left: 0, behavior: "smooth"
//         })
//         loadFunc()
//         // eslint-disable-next-line 
//     }, [])

//     const print = () => {
//         window.print()
//     }

//     return (
//         <>
//             {loading ?
//                 <>
//                     <BounceLoader className='loader' color="#643baa" size={150} />
//                     <div className='loader-hint mt-2 font-bold'>{loadhint}</div>
//                 </> :
//                 <>
//                     <div className='noprint'>
//                         <Link to={"/resumebuild"}><button className='print-btn'>Edit Data</button></Link>
//                         <Link to={"/selecttheme"}><button className='print-btn'>Change theme</button></Link>
//                         <button className='print-btn' onClick={print}>Download</button>
//                     </div>
//                     <div className='resume-main'>
//                         <div className='resume'>
//                             <div className='sec1'>
//                                 <div>
//                                     <img className='resume-img' src={state.personal.image} alt=''></img>
//                                 </div>
//                                 <div>
//                                     <IoMdMail style={{ color: themeclr }} />
//                                     <div>{state.personal.email}</div>
//                                     <BiMobileAlt style={{ color: themeclr }} />
//                                     <div>{state.personal.mob}</div>
//                                     <MdLocationOn style={{ color: themeclr }} />
//                                     <div>{state.personal.city}, {state.personal.country}</div>
//                                     {state.link.portfolio ? <>
//                                         <AiOutlineLink style={{ color: themeclr }} />
//                                         <div>{state.link.portfolio}</div>
//                                     </> : null}
//                                     <GrLinkedinOption style={{ color: themeclr }} />
//                                     <div>{state.link.linkedin}</div>
//                                     <AiFillGithub style={{ color: themeclr }} />
//                                     <div>{state.link.github}</div>
//                                 </div>

//                                 <div>
//                                     <div className='resume-head' style={{ color: themeclr }}>TECHNICAL SKILLS</div>
//                                     {state.personal.technicalskill.map((item, index) => {
//                                         return (
//                                             <React.Fragment key={index}>
//                                                 <div className='resume-list'>{item.skill}</div>
//                                                 <div className='ratebar' style={{ color: themeclr }}>
//                                                     <div style={{ width: `${(item.rate / 10) * 100}%`, backgroundColor: themeclr, color: themeclr }}></div>
//                                                 </div>
//                                             </React.Fragment>
//                                         )
//                                     })}

//                                 </div>

//                                 <div>
//                                     <div className='resume-head' style={{ color: themeclr }}>INTERESTS</div>
//                                     <ul className={"mt-1"}>
//                                         {state.personal.interest.map((item, index) => {
//                                             return (
//                                                 <li key={index} className='' style={{ "listStyle": "inside disc" }}>{item.hobbie}</li>
//                                             )
//                                         })}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className='sec2'>
//                                 <div className='sec2-first text-white' style={{ backgroundColor: themeclr }}>
//                                     <div className='text-3xl' style={{ "fontWeight": "bold" }}>{state.personal.name} {state.personal.lastname}</div>
//                                     <div className='py-1 text-base'>{state.personal.title}</div>
//                                     <div>
//                                         {state.personal.quote}
//                                     </div>
//                                 </div>
//                                 {state.experience[0].company ? <div className='r-padding'>
//                                     <div className='resume-head resume-content-head' style={{ color: themeclr }}>WORK EXPERIENCE</div>
//                                     <div>
//                                         {state.experience.map((item, index) => {
//                                             return (
//                                                 <div key={index}>
//                                                     <div className='font-bold resume-title' style={{ color: themeclr }}>{item.worktitle}</div>
//                                                     <div className="resume-subhead">{item.company}</div>
//                                                     <div className='text-xs italic mt-1' style={{ color: themeclr }}>{item.yearfrom} - {item.present === true ? "Present" : item.yearto}</div>
//                                                     <div className='resume-des'>
//                                                         <BiSquare style={{ color: themeclr }} />
//                                                         <div>
//                                                             {item.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}

//                                     </div>
//                                 </div> : null}

//                                 {state.project[0].name ? <div>
//                                     <div className='resume-head resume-content-head' style={{ color: themeclr }}>PERSONAL PROJECTS</div>
//                                     {state.project.map((item, index) => {
//                                         return (
//                                             <div key={index} className='resume-des resume-proj'>
//                                                 <BiSquare style={{ color: themeclr }} />
//                                                 <div className='resume-courses project'>
//                                                     <div className='resume-title' style={{ "fontWeight": "bold" }}>{item.name}</div>
//                                                     <div className={"text-xs"} style={{ color: themeclr }}>{item.tech}</div>
//                                                     {item.des ? <div className={'mt-1'}>{item.des}</div> : null}
//                                                 </div>
//                                             </div>
//                                         )
//                                     })}
//                                 </div> : null}

//                                 {state.course[0].name ? <div>
//                                     <div className='resume-head resume-content-head' style={{ color: themeclr }}>{`COURSES & TRAINING`}</div>
//                                     {state.course.map((item, index) => {
//                                         return (
//                                             <div key={index} className='resume-courses'>
//                                                 <div className='resume-title' style={{ "fontWeight": "bold" }}>{item.name}</div>
//                                                 <div className={"text-xs"} style={{ color: themeclr }}>{item.provider}</div>
//                                             </div>
//                                         )
//                                     })}

//                                 </div> : null}

//                                 <div className='sec2-last'>
//                                     <div className='resume-head resume-content-head' style={{ color: themeclr }}>EDUCATION</div>
//                                     {state.education.map((item, index) => {
//                                         return (
//                                             <div key={index} className='sec2-last-main'>
//                                                 <div className='font-bold resume-title' style={{ color: themeclr }}>{item.degree}</div>
//                                                 <div className='resume-title'>{item.university}</div>
//                                                 <div className='text-xs italic' style={{ color: themeclr }}>
//                                                     <div>{item.yearfrom} - {item.yearto}</div>
//                                                     <div>{item.grade}{item.gradetype === "grade" ? "/10" : "%"}</div>
//                                                 </div>
//                                             </div>
//                                         )
//                                     })}

//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </>}
//         </>
//     )
// }

// export default Theme1


import React, { useEffect, useState,useRef } from 'react';
import "./Professional.css";
import { MdLocationOn } from "react-icons/md";
import { GrLinkedinOption } from "react-icons/gr";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useReactToPrint } from 'react-to-print';
import { AiOutlineLink, AiFillGithub } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { BiMobileAlt, BiSquare } from "react-icons/bi";

function Professional() {
    const componentRef = useRef();
    const navigate = useNavigate();
      const { state } = useLocation();
    const themeclr = "#643baa" // You can change this to any color, or make it dynamic if needed.
    const [loading, setLoading] = useState(true);
    const [loadhint, setloadhint] = useState("")

    const loadFunc = () => {
        const hints = ["Please wait your resume is in process...", "Hint: Entering the complete details will make your resume look awesome"]
        setLoading(true)
        hints.map((item, index) => {
            return (
                setTimeout(() => {
                    setloadhint(item)
                }, 3000 * index)
            )
        })
        setTimeout(() => {
            setLoading(false)
        }, 6000)
    }

    useEffect(() => {
        if (!state?.personal) { navigate("/") }
        window.scrollTo({
            top: 0, left: 0, behavior: "smooth"
        })
        loadFunc()
        // eslint-disable-next-line
    }, [state])

   
      const print = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Resume',
        onAfterPrint: () => alert('Printed Successfully'),
      });
   

    return (
        <>
            {loading ?
                <>
                    <Loading />
                    <div className='loader-hint mt-2 font-bold'>{loadhint}</div>
                </> :
                <>
                    <div className='noprint'>
                        <Link to={"/inputprof"}><button className='print-btn'>Edit Data</button></Link>
                        <button className='print-btn' onClick={print}>Download</button>
                    </div>
                    <div className='resume-main' ref={componentRef}>
                        <div className='resume'>
                            <div className='sec1'>
                                <div>
                                    <img className='resume-img' src={state?.personal?.image} alt=''></img>
                                </div>
                                <div>
                                    <IoMdMail style={{ color: themeclr }} />
                                    <div>{state?.personal?.email}</div>
                                    <BiMobileAlt style={{ color: themeclr }} />
                                    <div>{state?.personal?.mob}</div>
                                    <MdLocationOn style={{ color: themeclr }} />
                                    <div>{state?.personal?.city}, {state?.personal?.country}</div>
                                    {state?.link?.portfolio && <>
                                        <AiOutlineLink style={{ color: themeclr }} />
                                        <div>{state?.link?.portfolio}</div>
                                    </>}
                                    <GrLinkedinOption style={{ color: themeclr }} />
                                    <div>{state?.link?.linkedin}</div>
                                    <AiFillGithub style={{ color: themeclr }} />
                                    <div>{state?.link?.github}</div>
                                </div>

                                <div>
                                    <div className='resume-head' style={{ color: themeclr }}>TECHNICAL SKILLS</div>
                                    {state?.personal?.technicalskill.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className='resume-list'>{item.skill}</div>
                                                <div className='ratebar' style={{ color: themeclr }}>
                                                    <div style={{ width: `${(item.rate / 10) * 100}%`, backgroundColor: themeclr, color: themeclr }}></div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>

                                <div>
                                    <div className='resume-head' style={{ color: themeclr }}>INTERESTS</div>
                                    <ul className={"mt-1"}>
                                        {state?.personal?.interest.map((item, index) => {
                                            return (
                                                <li key={index} className='' style={{ "listStyle": "inside disc" }}>{item.hobbie}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className='sec2'>
                                <div className='sec2-first text-white' style={{ backgroundColor: themeclr }}>
                                    <div className='text-3xl' style={{ "fontWeight": "bold" }}>{state?.personal?.name} {state?.personal?.lastname}</div>
                                    <div className='py-1 text-base'>{state?.personal?.title}</div>
                                    <div>
                                        {state?.personal?.quote}
                                    </div>
                                </div>

                                {state?.experience?.length > 0 && <div className='r-padding'>
                                    <div className='resume-head resume-content-head' style={{ color: themeclr }}>WORK EXPERIENCE</div>
                                    <div>
                                        {state?.experience.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className='font-bold resume-title' style={{ color: themeclr }}>{item.worktitle}</div>
                                                    <div className="resume-subhead">{item.company}</div>
                                                    <div className='text-xs italic mt-1' style={{ color: themeclr }}>{item.yearfrom} - {item.present ? "Present" : item.yearto}</div>
                                                    <div className='resume-des'>
                                                        <BiSquare style={{ color: themeclr }} />
                                                        <div>
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>}

                                {state?.project?.length > 0 && <div>
                                    <div className='resume-head resume-content-head' style={{ color: themeclr }}>PERSONAL PROJECTS</div>
                                    {state?.project.map((item, index) => {
                                        return (
                                            <div key={index} className='resume-des resume-proj'>
                                                <BiSquare style={{ color: themeclr }} />
                                                <div className='resume-courses project'>
                                                    <div className='resume-title' style={{ "fontWeight": "bold" }}>{item.name}</div>
                                                    <div className={"text-xs"} style={{ color: themeclr }}>{item.tech}</div>
                                                    {item.des && <div className={'mt-1'}>{item.des}</div>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}

                                {state?.course?.length > 0 && <div>
                                    <div className='resume-head resume-content-head' style={{ color: themeclr }}>COURSES & TRAINING</div>
                                    {state?.course.map((item, index) => {
                                        return (
                                            <div key={index} className='resume-courses'>
                                                <div className='resume-title' style={{ "fontWeight": "bold" }}>{item.name}</div>
                                                <div className={"text-xs"} style={{ color: themeclr }}>{item.provider}</div>
                                            </div>
                                        )
                                    })}
                                </div>}

                                {state?.education?.length > 0 && <div className='sec2-last'>
                                    <div className='resume-head resume-content-head' style={{ color: themeclr }}>EDUCATION</div>
                                    {state?.education.map((item, index) => {
                                        return (
                                            <div key={index} className='sec2-last-main'>
                                                <div className='font-bold resume-title' style={{ color: themeclr }}>{item.degree}</div>
                                                <div className='resume-title'>{item.university}</div>
                                                <div className='text-xs italic' style={{ color: themeclr }}>
                                                    <div>{item.yearfrom} - {item.yearto}</div>
                                                    <div>{item.grade}{item.gradetype === "grade" ? "/10" : "%"}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Professional
