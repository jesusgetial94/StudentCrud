using Microsoft.AspNetCore.Mvc;
using StudentApi.Common;
using StudentApi.Data;
using StudentApi.Domain;
using StudentApi.Interfaces;
using System.Threading.Tasks;
using System;

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;       

        public StudentController(StudentContext studentContext, IStudentService studentService)
        {            
            _studentService = studentService;
        }

        /// <summary>
        /// Get all students in table
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {                
                return Ok(await _studentService.GetStudents());
            }
            catch(Exception ex)
            {
                ResponseModel responseModel = new ResponseModel
                {
                    Success = false,
                    Message = ex.Message,
                    InnerMessage = Constants.ErrorGettingStudents + " - Trace: " + ex.StackTrace
                };
                return Ok(responseModel);
            }
        }

        /// <summary>
        /// Create a new Student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateStudent")]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            ResponseModel responseModel;
            try
            {                
                var res = await _studentService.CreateStudent(student);
                if(res != 0 ) return Created(string.Empty, new ResponseModel() { Success = true });
                else return Ok( new ResponseModel() { Success = false, InnerMessage = Constants.ErrorStudentAlreadyExists });
            }
            catch(Exception ex)
            {
                responseModel = new ResponseModel
                {
                    Success = false,
                    Message = ex.Message,
                    InnerMessage = Constants.ErrorCreatingStudent + " - Trace: " + ex.StackTrace
                };
                return Ok(responseModel);
            }
        }

        /// <summary>
        /// Delete an existing student
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteStudent")]
        public async Task<IActionResult> DeleteStudent([FromBody] Student student)
        {
            try
            {                
                return Ok(await _studentService.DeleteStudent(student));
            }
            catch (Exception ex)
            {
                ResponseModel responseModel = new ResponseModel
                {
                    Success = false,
                    Message = ex.Message,
                    InnerMessage = Constants.ErrorDeletingStudent + " - Trace: " + ex.StackTrace
                };
                return Ok(responseModel);
            }
        }
        /// <summary>
        /// Edit existing user
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("EditStudent")]
        public async Task<IActionResult> EditStudent([FromBody] Student student)
        {
            try
            {
                return Ok(await _studentService.EditStudent(student));
            }
            catch (Exception ex)
            {
                ResponseModel responseModel = new ResponseModel
                {
                    Success = false,
                    Message = ex.Message,
                    InnerMessage = Constants.ErrorEditingStudent + " - Trace: " + ex.StackTrace
                };
                return Ok(responseModel);
            }
        }
    }
}
