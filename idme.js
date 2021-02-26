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
            first = payload.attributes[1].value
            group = payload.status[0].group
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
