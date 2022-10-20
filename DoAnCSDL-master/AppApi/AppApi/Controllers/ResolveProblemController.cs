using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class ResolveProblemController : ApiController
    {
        ResolveProblemDL resolveRecord = new ResolveProblemDL();
        // GET: ResolveProblem
        [HttpPost]
        [Route("resolve-problem-detail")]
        public List<GetResolveProblemDetailDto> PostResolveRecordDetail(GetResolveProblemDetailInputDto input)
        {
            try
            {
                return resolveRecord.getResolveProblemDetails(input.RecordId);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("resolve-problem")]
        public List<GetAllResolveProblemDto> GetAllResolveRecord(GetResolveProblemInputDto input)
        {
            try
            {
                return resolveRecord.GetResolveRecords(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("problem-for-resolve")]
        public List<ProblemList> GetProblemListForResolve(ProblemInputDto input)
        {
            try
            {
                return resolveRecord.GetProblemListForResolve(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("used-vehicle-card")]
        public List<VehicleCard> GetUsedVehicleCard()
        {
            try
            {
                return resolveRecord.GetUsedVehicleCard();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [Route("registerno-for-problem")]
        public GetRegisterNoForProblemDto GetRegisterNoForProblem(GetResolveProblemDetailInputDto input)
        {
            try
            {
                return resolveRecord.GetRegisterNoForProblem(input.CardId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [Route("create-resolve-problem")]
        public int CreateResolveProblem(CreateOrEditResolveProblemInputDto input)
        {
            try
            {
                return resolveRecord.CreateResolveProblem(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [Route("remove-resolve-problem")]
        public int RemoveResolveProblem(GetResolveProblemDetailInputDto input)
        {
            try
            {
                return resolveRecord.RemoveResolveProblem(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [Route("remove-resolve-problem-detail")]
        public bool RemoveResolveProblemDetail(GetResolveProblemDetailInputDto input)
        {
            try
            {
                return resolveRecord.RemoveResolveProblemDetail(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [Route("update-resolve-problem")]
        public bool UpdateResolveProblem(CreateOrEditResolveProblemInputDto input)
        {
            try
            {
                return resolveRecord.UpdateResolveProblem(input);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}