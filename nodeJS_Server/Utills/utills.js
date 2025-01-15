const fs = require("fs");

const write64File= (fileName, data,type,suffix)=> {
  try {
    let [header, base64File] = data.split(/;base64,/);
    fs.writeFileSync(`./public/${type}/${fileName}.${suffix}`, base64File, {encoding: "base64",});
    return fileName + "." + suffix;
  } catch (err) {
    return null;
  }
}

module.exports = {write64File}