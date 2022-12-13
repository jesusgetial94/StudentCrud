namespace StudentApi.Common
{
    public class ResponseModel
    {
        public bool Success { set; get; }
        public string Message { set; get; }
        public string InnerMessage { set; get; }
        
        public ResponseModel() { }

        /// <summary>
        /// Constructor from ResponseModel
        /// </summary>
        /// <param name="Success">bool param</param>
        /// <param name="Message">string param</param>
        /// <param name="InnerMessage">string param</param>
        /// <returns></returns>
        public ResponseModel(bool Success, string Message, string InnerMessage)
        {
            this.Success = Success;
            this.Message = Message;
            this.InnerMessage = InnerMessage;
        }
    }
}
