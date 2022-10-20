using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class PriceListController : ApiController
    {
        PriceListDL priceList = new PriceListDL();
        [HttpPost]
        [Route("price-list")]
        public List<PriceList> GetPriceListDL(PriceList input)
        {
            try
            {
                return priceList.GetPriceListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("price-list/add")]
        public bool AddPriceListDL(PriceList input)
        {
            try
            {
                return priceList.AddPriceListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("price-list/update")]
        public bool UpdatePriceListDL(PriceList input)
        {
            try
            {
                return priceList.UpdatePriceListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("price-list/delete")]
        public bool DeletePriceListDL(PriceList input)
        {
            try
            {
                return priceList.DeletePriceListDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}