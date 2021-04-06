const { Command } = require("@oclif/command");
const { cli } = require("cli-ux");
const got = require("got");
const Configstore = require("configstore");

// Create a Configstore instance
const config = new Configstore("pingbeep");

class LoginCommand extends Command {
  async run() {
    if (typeof config.get("email") == "undefined") {
      config.clear();
      //no user is logged in
      const email = await cli.prompt("What is your login email?");
      const password = await cli.prompt("What is your password?", {
        type: "hide"
      });
      // start the spinner
      cli.action.start("logging in");

      const { token, error } = await got
        .post("https://ping-and-beep.netlify.app/.netlify/functions/next_api_login", {
          json: {
            email: email,
            password: password
          }
        })
        .json();

      cli.action.stop();
      if (token) {
        config.set("email", email);
        config.set("token", token);
        this.log(`Successfully logged in!`);
      } else {
        this.log(`There was an error: ${error}`);
      }
    } else {
      //user is already logged in
      cli.prompt("Already logged in, please use `pingbeep logout`");
    }
  }
}

LoginCommand.description = `Used to login into a ping & beep account.
...
Not much to it. It'll walk you threw the process.
`;

LoginCommand.flags = {};

module.exports = LoginCommand;
