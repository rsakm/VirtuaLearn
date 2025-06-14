import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';


const CourseDetails = () => {

  const {id} = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const {allCourses, calculateRating, calculateCHapterTime, calculateCourseDuration, calculateNoOfLectures} = useContext(AppContext);

  const fetchCourseData = async ()=>{
    const findCourse = allCourses.find((course) => course._id === id)
    setCourseData(findCourse);
  } 

  useEffect(()=>{
    fetchCourseData();
  },[]);

  const toggleSection = (index)=>{
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [index]: !prevOpenSections[index],
    }));
  }

  return courseData? (
  <>
    <div className='flex flex-col-reverse md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>

      {/* Gradient color */}
      <div className='absolute top-0 left-0 w-full h-section-height -z-[-1] bg-gradient-to-b from-cyan-100/70'>

      </div>

  
        {/* Left column */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p className='pt-4 text-sm md:text-base' dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>


          {/* review and rating */}
          <div className='flex pt-3 pb-1 text-sm items-center space-x-2 '>
            <p>{calculateRating(courseData)}</p>
            <div className='flex '>
              {[...Array(5)].map((_, index) => (
                // <span key={index}>&#9733;</span>

                <img key={index} src={index < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star" className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings':'rating'}) </p>

            {/* Total number of enrolled students */}
            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ?'students' : 'student'} </p>
          </div>

          <p className='text-sm' >Course by <span className='text-blue-600 underline'>Rajshree</span></p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index)=>(
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform duration-300 ${openSections[index] ? 'rotate-180' : 'rotate-0'}`} src={assets.down_arrow_icon} alt="arrow icon" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateCHapterTime(chapter)}</p>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300  ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture,index)=>(
                        <li key={index} className='flex items-start gap-2 py-1'>
                          <img src={assets.play_icon} alt="play icon" className='w-4 h-4 mt-1' />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && <p className='text-blue-500 cursor-pointer'>preview
                                </p>}
                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units:['h', 'm']})}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            </div>

          </div>

{/* Course description */}
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800 '>Course Description</h3>
            <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
          </div>

        </div>

        {/* Right column */}
        <div>
          

        </div>
      
    </div>
    </>
  ):<Loading/>
}

export default CourseDetails