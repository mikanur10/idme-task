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
          userObj = payload
          console.log(userObj)
          if (payload.status[0].verified) {
            $("#idme-wallet-button").hide();
            $("#idme-wallet-button").before(
              "<span>Thank you " +
              userObj.attributes[1].value +
              " for verifying your " +
              userObj.status[0].group +
              " status with ID.me.</span>"
            );
          }
        });
      }
    }
  };

  IDme.request();
});
