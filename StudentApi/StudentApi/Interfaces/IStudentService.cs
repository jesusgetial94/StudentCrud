using StudentApi.Common;
using StudentApi.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentApi.Interfaces
{
    public interface IStudentService
    {
        /// <summary>
        /// Retrieve all existing students
        /// </summary>
        /// <returns></returns>
        Task<List<Student>> GetStudents();

        /// <summary>
        /// Create a new student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        Task<int> CreateStudent(Student student);

        /// <summary>
        /// Delete an existing student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        Task<ResponseModel> DeleteStudent(Student student);

        /// <summary>
        /// Edit an existing student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        Task<ResponseModel> EditStudent(Student student);
    }
}
