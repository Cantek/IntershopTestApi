import "./styles.css";
const axios = require("axios");

window.func = function getCategory(catName) {
  var resultElement = document.getElementById("app");
  resultElement.innerHTML = "";
  let that = this;
  //var categoryName =
  const catUrl =
    "https://intershoppwa.azurewebsites.net/INTERSHOP/rest/WFS/inSPIRED-inTRONICS-Site/-;loc=en_US;cur=USD/categories/" +
    catName;

  /*
  const catUrl =
    "https://www.penti.com/INTERSHOP/rest/WFS/Penti-PentiChannel-Site/-;loc=tr_TR;cur=TRY/categories/" +
    catName;
*/
  axios
    .get(catUrl)
    .then(
      function(response) {
        console.log(response.data);
        //resultElement.innerHTML += "<div style = 'float:left;width:100%;'>";
        if (response.data.elements instanceof Array) {
          response.data.elements.map((category, i) => {
            console.log(category.name);
            resultElement.innerHTML +=
              "<table style='float:left;text-align:center;'><tr><td><a href='#' onClick='window.func(\"" +
              category.id +
              "\")'><img width='100px;' height='100px;' src='https://intershoppwa.azurewebsites.net" +
              +"/></a></td></tr><tr><td>" +
              category.name +
              "</td></tr></table>";
          });
        } else if (
          //!response.data.hasOnlineProducts &&
          response.data.hasOnlineSubCategories
        ) {
          response.data.subCategories.map((category, i) => {
            debugger;
            resultElement.innerHTML +=
              "<table style='float:left;text-align:center;'><tr><td><a href='#' onClick='window.func(\"" +
              catName +
              "/" +
              category.id +
              "\")'><img src='https://intershoppwa.azurewebsites.net" +
              category.images[0].effectiveUrl +
              "'/></a></td></tr><tr><td>" +
              category.name +
              "</td></tr></table>";
          });
        } else if (
          response.data.hasOnlineProducts &&
          !response.data.hasOnlineSubCategories
        ) {
          resultElement.innerHTML = "";
          var catProdUrl =
            "https://intershoppwa.azurewebsites.net/INTERSHOP/rest/WFS/inSPIRED-inTRONICS-Site/-;loc=en_US;cur=USD/categories/" +
            catName +
            "/products?attrs=sku,salePrice,listPrice,availability,manufacturer,image&amount=9&offset=0&returnSortKeys=true";
          console.log(catProdUrl);
          window.getProducts(catProdUrl);
        }
        //resultElement.innerHTML += "</div>";
      }.bind(this)
    )
    .catch(function(error) {
      resultElement.innerHTML = error;
    });
};

window.getProducts = function getProducts(catName) {
  var resultElement = document.getElementById("app");
  resultElement.innerHTML = "";
  //var categoryName = ;
  const catUrl = catName;

  axios
    .get(catUrl, { headers: { "Access-Control-Allow-Origin": true } })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      resultElement.innerHTML = error;
    });
};

window.func(""); //Category name to retreive products or Sub Categories.
