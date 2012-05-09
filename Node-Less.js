(function (fname) {
  var less = require('../less.js/lib/less'),  //path to less lib "../less.js/lib/less"
    path = require('path'),
    join = path.join,
    fs = require('fs');

  var path, lessparser, contents;

  path = join(__dirname, fname);
  if(!fname.match(/\.less$/) || !fs.statSync(path).isFile())
    return;
  lessparser = new less.Parser({
    paths: [__dirname],
    filename: fname
  });

  contents = fs.readFileSync(path).toString();
  console.log(fname + "\n~~~~~~~~~~\n" + contents+"\n" )
  lessparser.parse(contents, function(err, tree){
    if(err){
      console.log(err);
      throw new Error(err);
    }

    var cssfname = fname.replace(/less$/, 'css');
    fs.writeFileSync(join(__dirname,cssfname), tree.toCSS());
    console.log(cssfname +"\n~~~~~~~~~\n" + tree.toCSS())
  });
})(process.argv[2]);
