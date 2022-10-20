using AppApi.DL;
using AppApi.Entities;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class VehicleCardController : ApiController
    {
        VehicleCardDL vchCard = new VehicleCardDL();

        [HttpPost]
        [Route("vehicle-card")]
        public List<VehicleCard> GetVehicleCardDL(VehicleCard input)
        {
            try
            {
                return vchCard.GetVehicleCardDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("vehicle-card/add")]
        public int AddVehicleCardDL(VehicleCard input)
        {
            try
            {
                return vchCard.AddVehicleCardDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("vehicle-card/update")]
        public bool UpdateVehicleCardDL(VehicleCard input)
        {
            try
            {
                return vchCard.UpdateVehicleCardDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        [Route("vehicle-card/delete")]
        public bool DeleteVehicleCardDL(VehicleCard input)
        {
            try
            {
                return vchCard.DeleteVehicleCardDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}