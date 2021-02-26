var first = ""
var group = ""
var userObj = {}

$(function () {
  var IDme = {
    access_token: window.location.hash
      .split("&")[0]
      .match(/[^#access_token=]\w+/)[0],

    params: function () {
      return {
        url:
          "https://api.id.me/api/public/v3/attributes.json?access_token=" +
          this.access_token,
        dataType: "jsonp"
      };
    },

    request: function () {
      // var userObj = {}
      if (this.access_token) {
        $.get(this.params()).done((payload) => {
          var email = ""
          var first = ""
          var last = ""
          var postal = ""
          var group = ""
          userObj = payload
          console.log(userObj)
          if (payload.status[0].verified) {
            $("#test").text("Thank you for verifiying!"
            )
            email = userObj.attributes[0].value
            first = userObj.attributes[1].value
            last = userObj.attributes[2].value
            postal = userObj.attributes[3].value
            group = userObj.status[0].group
            group = userObj.status[0].group
            $("#test").text("Hi " + first + last + "!")
            $("#idme-verification").hide();
            $("#idme-verification").before(
              "<span>Thank you " +
              first +
              " for verifying your " +
              group +
              " status with ID.me.</span>"
            );
          }
        });
      }
    }
  };

  IDme.request();
});
