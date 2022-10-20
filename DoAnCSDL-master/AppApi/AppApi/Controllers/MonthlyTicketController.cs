using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class MonthlyTicketController : ApiController
    {
        MonthlyTicketDL mon = new MonthlyTicketDL();

        [HttpPost]
        [Route("monthly-ticket")]
        public List<MonthlyTicket> GetMonthlyTickets(MonthlyTicket input)
        {
            try
            {
                return mon.GetMonthlyTicketsDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("monthly-ticket/update")]
        public bool UpdateMonthlyTicket(MonthlyTicket input)
        {
            try
            {
                return mon.UpdateMonthlyTicketDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("monthly-ticket/add")]
        public bool AddMonthlyTicket(MonthlyTicket input)
        {
            try
            {
                return mon.AddMonthlyTicketDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("monthly-ticket/delete")]
        public bool DeleteMonthlyTicket(MonthlyTicket input)
        {
            try
            {
                return mon.DeleteMonthlyTicketDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
