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
    public class EmployeeController : ApiController
    {
        EmployeeDL emp = new EmployeeDL();

        [HttpPost]
        [Route("auth/register")]
        public bool Register(Employee input)
        {
            try
            {
                return emp.RegisterDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("update-employee")]
        public bool Update(Employee input)
        {
            try
            {
                return emp.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("auth/login")]
        public Employee Login(Employee input)
        {
            try
            {
                return emp.LoginDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("employees")]
        public List<Employee> GetEmployees(EmployeeInputDto input)
        {
            try
            {
                return emp.GetEmployees(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-employee")]
        public bool DeleteEmployee(Employee input)
        {
            try
            {
                return emp.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
