using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using MVC_Machine_Test.Models;

namespace MVC_Machine_Test.Controllers
{
    public class CategoryController : Controller
    {
        MyDbContext dbo = new MyDbContext();
        // GET: Category
        public ActionResult Index()
        {
            
            List<Category> categories = new List<Category>();
            categories = dbo.categories.ToList();
            return View(categories);
        }

        [HttpPost]
        public JsonResult SaveCategory(Category category) {
            string msg = string.Empty;
            try
            {
                var data = dbo.categories.Where(x => x.CategoryName == category.CategoryName).FirstOrDefault();
                if (data != null)
                {
                    msg = "catagory name already available";
                }
                else {
                    dbo.categories.Add(category);
                    dbo.SaveChanges();
                    msg = "success";
                }
            }
            catch(Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { category, msg }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateCategory(Category category)
        {
            string msg = string.Empty;
            try
            {
                var data = dbo.categories.Where(x => x.CategoryId == category.CategoryId).FirstOrDefault();
                if (data != null)
                {
                    data.CategoryName = category.CategoryName;
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
            return Json(new {  msg }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteCategory(int CategoryId)
        {
            string msg = string.Empty;
            try
            {
                var data = dbo.categories.Where(x => x.CategoryId == CategoryId).FirstOrDefault();
                if (data != null)
                {
                    dbo.categories.Remove(data);
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