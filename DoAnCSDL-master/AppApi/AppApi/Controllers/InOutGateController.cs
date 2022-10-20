using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class InOutGateController : ApiController
    {
        InOutGateDL iog = new InOutGateDL();

        [HttpPost]
        [Route("in-out-gate")]
        public List<InOutGate> GetInOutGates(GetInOutGateInputDto input)
        {
            try
            {
                return iog.GetInOutGates(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("get-vhc-card")]
        public List<VehicleCard> GetVhcCardEmpty()
        {
            try
            {
                return iog.GetCardEmpty();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-in-gate")]
        public int UpdateInGate(AddInDateInputDto input)
        {
            try
            {
                return iog.AddInGate(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-out-gate")]
        public int UpdateOutGate(OutGateInputDto input)
        {
            try
            {
                return iog.OutGate(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("getCardIdFromRegisterNo")]
        public int GetCardIdFromRegisterNo(string input)
        {
            try
            {
                return iog.GetCardIdFromRegisterNo(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("updateInOutGate")]
        public int UpdateInOutGate(UpdateInOutGateInputDto input)
        {
            try
            {
                return iog.UpdateInOutGate(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("check-have-monthly-ticket")]
        public bool CheckHaveMonthlyTicket(GetInOutGateInputDto input)
        {
            try
            {
                return iog.CheckHaveMonthlyTicket(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
