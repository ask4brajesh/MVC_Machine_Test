using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC_Machine_Test.Models;

namespace MVC_Machine_Test.Controllers
{
    public class ProductController : Controller
    {
        MyDbContext dbo = new MyDbContext();
        // GET: Product
        public ActionResult Index()
        {
            List<Product> products = dbo.products.ToList();
            List<Category> categories = dbo.categories.ToList();
            var tupleModel = new Tuple<List<Product>, List<Category>>(products, categories);
            return View(tupleModel); ;           
            
        }


        [HttpPost]
        public JsonResult SaveProduct(Product product)
        {
            string msg = string.Empty;
            var categoryName = string.Empty;
            try
            {
                
                var data = dbo.products.Where(x => x.ProductName == product.ProductName).FirstOrDefault();
                if (data != null)
                {
                    msg = "product name already available";
                }
                else
                {
                    dbo.products.Add(product);
                    dbo.SaveChanges();
                    var cdata = dbo.categories.Where(x => x.CategoryId == product.CategoryId).FirstOrDefault();
                    categoryName = cdata.CategoryName;
                    msg = "success";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { product, msg , categoryName }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateProduct(Product product)
        {
            string msg = string.Empty;
            try
            {
                var data = dbo.products.Where(x => x.ProductId == product.ProductId).FirstOrDefault();
                if (data != null)
                {
                    data.ProductName = product.ProductName;
                    data.CategoryId = product.CategoryId;
                    dbo.SaveChanges();
                    msg = "success";

                }
                else
                {
                    msg = "failed";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { msg }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteProduct(int ProductId)
        {
            string msg = string.Empty;
            try
            {
                var data = dbo.products.Where(x => x.ProductId == ProductId).FirstOrDefault();
                if (data != null)
                {
                    dbo.products.Remove(data);
                    dbo.SaveChanges();
                    msg = "success";

                }
                else
                {
                    msg = "failed";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { msg }, JsonRequestBehavior.AllowGet);
        }
    }
}