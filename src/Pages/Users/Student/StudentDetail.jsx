import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchStudentData } from '../../../Redux/Actions/Action'
import { selectStudent } from '../../../Redux/Slices/StudentDataSlice'
import { Button, Card, Typography } from '@material-tailwind/react'
import { BiSolidBusSchool } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

const StudentDetail = () => {

  const renderValue = (value) => (value ? value : '-');
  const navigate = useNavigate()
  const { studentId } = useParams()
  const dispatch = useDispatch()
  const student = useSelector(selectStudent);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentData(studentId));
    }
  }, [dispatch, studentId]);

  const renderField = (label, value) => (
    <div className='col-span-1'>
      <Typography variant='h5' className='font-semibold'>
        {label}
      </Typography>
      <Typography variant='h6'>
        {value ? value : '-'}
      </Typography>
    </div>
  );



  return (
    <div>
      <div className='mt-5'>
        {student ? (
          <Card className='w-full p-10'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <div className='flex items-center gap-5 col-span-1 md:col-span-3'>
                <img
                  src={student.user.photo || 'https://via.placeholder.com/150'}
                  alt='Student Photo'
                  className='rounded-full h-32 w-32 object-cover'
                />
                <div className='flex-grow'>
                  <Typography variant='h1'>{student.user.name}</Typography>
                </div>
                <div className='flex-shrink-0 flex items-center'>
                  <FaRegEdit size={24} className='text-gray-500 cursor-pointer hover:text-gray-700' />
                </div>
              </div>
              {renderField('Admission Number', student.admission_no)}
              {renderField('Username', student.user.username)}
              {renderField('Gender', student.user.gender)}
              {renderField('Date of Birth', student.user.date_of_birth)}
              {renderField('Phone', student.user.phone)}
              {renderField('Guardian Name', student.guardian_name)}
              {renderField('House Name', student.house_name)}
              {renderField('Post Office', student.post_office)}
              {renderField('Pincode', student.pincode)}
              {renderField('Place', student.place)}
            </div>
          </Card>
        ) : (
          <p>No student data available</p>
        )}
      </div>
      <div className='mt-5'>
        <Card className='w-full p-7 bg-white shadow-lg rounded-lg'>
          <div className='flex items-center mb-5'>
            <BiSolidBusSchool size={40} className='text-blue-500 mr-3' />
            <Typography variant='h2' className='text-gray-800'>
              Bus Details
            </Typography>
          </div>
          {student.route && student.route.bus ? (
            <div className='grid grid-cols-1 gap-4'>
              <Typography variant='h5' className='font-semibold '>
                Route Number: <span className='font-bold'>{student.route.route_no}</span>
              </Typography>
              <Typography variant='h5' className='font-semibold '>
                Route: <span className='font-normal'>{student.route.from_location} - {student.route.to_location}</span>
              </Typography>
              <Typography variant='h5' className='font-semibold '>
                Bus Point: <span className='font-normal'>{student.bus_point.name}</span>
              </Typography>
              <Typography variant='h5' className='font-semibold '>
                Monthly Charge: <span className='font-normal'>{student.bus_point.fee}</span>
              </Typography>
              <div className="flex justify-end">
                <Button className="flex items-center space-x-2" 
                onClick={() => navigate(`/transactions/${student.id}`)} >
                  <Typography variant="h6" className="font-semibold">
                    View Transactions
                  </Typography>
                  <CiLogin className="text-lg" />
                </Button>
              </div>

            </div>
          ) : (
            <div className='flex flex-col justify-center items-center space-y-4'>
              <BiSolidBusSchool size={60} className='text-gray-500' />
              <Typography variant='h6' className='text-gray-600'>
                No Bus Found
              </Typography>
              <Button
                onClick={() => navigate(`/addservice?userId=${student.user.id}`)}
                type='submit'
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                Add Bus Service
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default StudentDetail