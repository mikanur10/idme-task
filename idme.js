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
      if (this.access_token) {
        $.get(this.params()).done((payload) => {
          console.log(payload)
          if (payload.status[0].verified) {
            $("#idme-verification").hide();
            $("#idme-verification").before(
              "<span>Thank you " +
              payload.attributes[1].value +
              " for verifying your " +
              payload.status[0].group +
              " status with ID.me.</span>"
            );
          }
        });
      }
    }
  };

  IDme.request();
});
