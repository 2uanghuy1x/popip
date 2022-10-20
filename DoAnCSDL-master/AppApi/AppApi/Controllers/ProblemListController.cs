using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class ProblemListController : ApiController
    {
        ProblemListDL problemList = new ProblemListDL();
        [HttpPost]
        [Route("problem-list")]
        public List<ProblemList> GetProblemListDL(ProblemList input)
        {
            try
            {
                return problemList.GetProblemListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("problem-list/add")]
        public bool AddProblemListDL(ProblemList input)
        {
            try
            {
                return problemList.AddProblemListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("problem-list/update")]
        public bool UpdateProblemListDL(ProblemList input)
        {
            try
            {
                return problemList.UpdateProblemListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("problem-list/delete")]
        public bool DeleteProblemListDL(ProblemList input)
        {
            try
            {
                return problemList.DeleteProblemListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}