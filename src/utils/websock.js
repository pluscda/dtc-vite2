export default (wsurl, command) => {
  return new Promise((resolve, reject) => {
    const CONNECTION = new WebSocket(wsurl);
    if (!CONNECTION) {
      CONNECTION.close();
      reject({
        ErrorMessage: "An error occured",
      });
    }

    CONNECTION.onerror = function (e) {
      reject({
        ErrorMessage: "An error occured",
      });
    };

    // When the connection is open
    CONNECTION.onopen = function () {
      // console.log("State: " + CONNECTION.readyState);
      // console.log({ command });
      CONNECTION.send(command);
    };

    CONNECTION.onclose = function () {
      console.log("WEBSOCKET_CLOSE");
    };

    CONNECTION.onmessage = function (e) {
      //debugger
      if (e.data.indexOf("Error") >= 0) {
        reject({
          ErrorMessage: e.data,
        });
      } else {
        resolve({
          message: e.data,
        });
      }
      CONNECTION.close();
    };
  });
};