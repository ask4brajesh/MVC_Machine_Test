using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVC_Machine_Test.Models
{
    public class Product
    {       
        public int ProductId { get; set; }       
        public string ProductName { get; set; }
        public int CategoryId { get; set; }


    }
}