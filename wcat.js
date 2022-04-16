const fs = require("fs");

let input = process.argv.slice(2);

let filesArr = [];
let optionsArr = [];

// placed files path in filesArr and command(s) in optionArr

for (let i = 0; i < input.length; i++) {
  let firstChar = input[i].charAt(0);

  if (firstChar == "-") {
    optionsArr.push(input[i]);
  } else {
    filesArr.push(input[i]);
  }
}

// check if all the files are present

for (let i = 0; i < filesArr.length; i++) {
  let doesExist = fs.existsSync(filesArr[i]);
  if (!doesExist) {
    console.log("The File(s) does not exist");
    process.exit;
  }
}

// content reading and appending starts

let content = "";
for (let i = 0; i < filesArr.length; i++) {
  let fileContent = fs.readFileSync(filesArr[i]);
  content += fileContent + "\r\n";
}

let contentArr = content.split("\r\n");
console.table(contentArr);

// check if -s is present or not

let isSPresent = optionsArr.includes("-s");
let tempArr = [];
if (isSPresent) {
  for (let i = 1; i < contentArr.length; i++) {
    if (contentArr[i] == "" && contentArr[i - 1] == "") {
      contentArr[i] = null;
    } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
      contentArr[i] = null;
    }
  }
  console.table(contentArr);

  // removing null

  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArr.push(contentArr[i]);
    }
  }
  console.log("Data after removing extra lines\n", tempArr);
}
contentArr = tempArr;

let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");
// if -n or -b is not present , it return -1.

let finalOption = "";

if (indexOfN != -1 && indexOfB != -1) {
  if (indexOfN < indexOfB) {
    finalOption = "-n";
  } else {
    finalOption = "-b";
  }
} else {
  if (indexOfN != -1) {
    finalOption = "-n";
  } else if (indexOfB != -1) {
    finalOption = "-b";
  }
}

// calling functions by evaluating finaloptions

if (finalOption == "-n") {
  modifyContentByN();
} else if (finalOption == "-b") {
  modifyContentByB();
}

function modifyContentByN() {
  for (let i = 0; i < contentArr.length; i++) {
    contentArr[i] = i + 1 + ") " + contentArr[i];
  }
}

function modifyContentByB() {
  let count = 1;
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != "") {
      contentArr[i] = count + ") " + contentArr[i];
      count++;
    }
  }
}

console.log(contentArr);
