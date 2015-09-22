
var vm = require('vm');
var fs = require('fs');

var data;

try {
  data = fs.readFileSync(process.argv[2], 'UTF-8');
}
catch(e) {
  console.log(e)
  procedd.exit(1)
}

var scope = {
  output: function(val) {
    console.log(val);
  },
  console: {
    log: console.log.bind(console)
  }
}

try {
  vm.runInNewContext(data, scope)
}
catch(e) {
  var msg = '';

  var CLIEngine = require("eslint").CLIEngine;

  var cli = new CLIEngine({
    envs: ["node"],
    useEslintrc: false,
    rules: {
      // semi: 2
    }
  });

  var report = cli.executeOnFiles([process.argv[2]]);
  
  if(report.errorCount) {
    for (var i = 0; i < report.results.length; i++) {
      for (var j = 0; j < report.results[i].messages.length; j++) {
        var obj = report.results[i].messages[j];

        if(msg.length > 0) {
          msg += '\n';
        }

        msg += "error: '" + obj.message + "' at line " + obj.line + ", column " + obj.column 
      }
    };
  }
  else {
    msg = e.toString()    
  }

  console.log(msg);
  process.exit(1);
}
