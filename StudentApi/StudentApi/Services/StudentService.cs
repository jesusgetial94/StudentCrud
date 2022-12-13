using StudentApi.Interfaces;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using StudentApi.Domain;
using StudentApi.Data;
using StudentApi.Common;
using System.Linq;
using System.Text;

namespace StudentApi.Services
{
    public class StudentService : IStudentService
    {

        private readonly StudentContext _studentContext;        

        public StudentService(StudentContext studentContext)
        {
            _studentContext = studentContext;
        }

        /// <summary>
        /// Retrieve all existing students
        /// </summary>
        /// <returns></returns>
        public async Task<List<Student>> GetStudents()
        {
            try
            {
                var students = await _studentContext.Student.ToListAsync();                
                return students;
            }
            catch (Exception)
            {
                return new List<Student>(); 
            }
        }

        /// <summary>
        /// Create a new student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task<int> CreateStudent(Student student)
        {
            if ( !_studentContext.Student.Any(s => s.UserName == student.UserName) )
            {
                _studentContext.Student.Add(student);
                await _studentContext.SaveChangesAsync();
                return student.Id;
            }            
            return 0;
        }

        /// <summary>
        /// Delete an existing student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task<ResponseModel> DeleteStudent(Student student)
        {            
            var studentToRemove = _studentContext.Student.Where(s => s.UserName == student.UserName).FirstOrDefault();
            _studentContext.Student.Remove(studentToRemove);
            await _studentContext.SaveChangesAsync();
            StringBuilder msg = new StringBuilder("");

            ResponseModel responseModel = new ResponseModel
            {
                Success = true,
                Message = msg.AppendFormat("Student {0} successfully deleted", student.UserName).ToString()
            };
            return responseModel;
        }

        /// <summary>
        /// Edit existing student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        public async Task<ResponseModel> EditStudent(Student student)
        {
            ResponseModel responseModel = new ResponseModel();
            StringBuilder msg = new StringBuilder("");
            var studentToEdit = _studentContext.Student.FirstOrDefault( s => s.UserName == student.UserName);            
            if (studentToEdit != null)
            {
                studentToEdit.FirstName = student.FirstName;
                studentToEdit.LastName = student.LastName;
                studentToEdit.Age = student.Age;
                studentToEdit.Career = student.Career;
                await _studentContext.SaveChangesAsync();

                responseModel = new ResponseModel
                {
                    Success = true,
                    Message = msg.AppendFormat("Student {0} successfully edited ", studentToEdit.UserName).ToString()
                };
            }
            else {
                responseModel = new ResponseModel
                {
                    Success = false,
                    Message = msg.AppendFormat("Student {0} not found", studentToEdit.UserName).ToString()
                };                
            }
  
            return responseModel;
        }

    }
}
