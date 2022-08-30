const fs = require("fs");
const hre = require("hardhat");
const fileContents = fs.readFileSync("./README.md", "utf8");

function calculateProgress(updatedContent) {
  var lines = updatedContent.split("\n");
  var numLines = lines.length;
  var i;
  var totalSolved = 0;
  for (i = 0; i < numLines; i++) {
    var line = lines[i];
    if (line.indexOf("x") == 3 && line.indexOf("-") == 0) {
      
      totalSolved += 1;
    } else {
      continue;
    }
  }
  return totalSolved;
}

exports.updateTotalSolved = function (challengeName) {
  challengeName = challengeName.split(".")[0];
  var lines = fileContents.split("\n");
  var updatedContent = "";
  var numLines = lines.length;
  var i;
  for (i = 0; i < numLines; i++) {
    var line = lines[i];
    if (line.includes(challengeName)) {
      if (line.includes("[ ]")) {
        var newLine = line.replace("[ ]", "[x]");
        updatedContent = fileContents.replace(line, newLine);
      }
    }
  }
  if (updatedContent != "") {
    var progress = calculateProgress(updatedContent).toString() + "/25";
    for (i = 0; i < numLines; i++) {
      var line = lines[i];
      if (line.includes("Progress")) {
        updatedContent = updatedContent.replace(line, " Progress: " + progress);
      }
    }
    fs.writeFileSync("./README.md", updatedContent);
  }
};

//updateTotalPoints("ChooseANickname.js")
