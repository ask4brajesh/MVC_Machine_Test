using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace MVC_Machine_Test.Models
{

    public class Category
    {        
        public int CategoryId { get; set; }       
        public string CategoryName { get; set; }       
       
    }
}