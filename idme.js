
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
      var first = ""
      var group = ""
      var object = {}
      if (this.access_token) {
        $.get(this.params()).done((payload) => {
          object = payload
          console.log(object)
          if (payload.status[0].verified) {
            $("#test").text("Thank you for verifiying!"
            )
            first = object.attributes[1].value
            group = object.status[0].group
            $("#test").text("Hi " + first + "!")
            $("#idme-button").hide();
            $("#idme-button").before(
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
