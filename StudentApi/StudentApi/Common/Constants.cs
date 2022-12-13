namespace StudentApi.Common
{
    public class Constants
    {
        #region SuccessMessages
        public const string SuccessStudentFound = "Student found!";
        #endregion

        #region ErrorMessages
        public const string ErrorGettingStudents = "Error in main Get Students Method!";       
        public const string ErrorStudentNotFound = "Student Not found!";
        public const string ErrorStudentAlreadyExists = "Student Already Exists!";
        public const string ErrorCreatingStudent = "Error creating student!";
        public const string ErrorDeletingStudent = "Error Deleting Student!";
        public const string ErrorEditingStudent = "Error Editing Student!";
        #endregion
    }
}
