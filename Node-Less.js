var less = require('less'),
    path = require('path'),
    join = path.join,
    fs = require('fs');


generate = function(fname) {
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
}
main = function () {
  var arglen = process.argv.length;
  if(arglen == 3 )
    generate(process.argv[2]);
  else
    console.log("required number of arguments 3 provided " + arglen );
}

main();
