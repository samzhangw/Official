// This file should be created in Google Apps Script
function doGet() {
  // Return region data as JSON
  const regions = [
    {
      name: "桃聯區",
      description: "桃園市、連江縣會考落點分析",
      url: "https://tyctw.github.io/"
    },
    {
      name: "彰化區",
      description: "彰化縣會考落點分析",
      url: "https://cchctw.github.io/"
    },
    {
      name: "中投區",
      description: "臺中市、南投縣會考落點分析",
      url: "https://ctttw.github.io/"
    },
    {
      name: "高雄區",
      description: "高雄市會考落點分析",
      url: "https://khhtw.github.io/"
    }
  ];
  
  // Create response with CORS headers
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    regions: regions
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*');
}

function doPost(e) {
  // Get the form data
  var data = e.parameter;

  // Log the data to the script's execution log (optional)
  Logger.log(JSON.stringify(data));

  // Replace with your Google Sheet ID
  var ss = SpreadsheetApp.openById("13a46z6n5t1jKW8a8GGUuXJzD618bEwQ5bC7n8WbIqH8");
  var sheet = ss.getSheetByName("回應");

  // Append the data to the sheet
  sheet.appendRow([
    data.name,
    data.email,
    data.message,
    new Date() // Timestamp
  ]);

  // Return a success message (optional)
  return ContentService.createTextOutput(JSON.stringify({
    "result": "success",
    "data": data
  })).setMimeType(ContentService.MimeType.JSON);
}

function verifyHCaptcha(token) {
  // Replace with your hCaptcha secret key
  var secret = "0x4f5199f1a87264eC256e0B92907691b3f8D166a0";
  var url = "https://hcaptcha.com/siteverify";

  var payload = {
    secret: secret,
    response: token
  };

  var options = {
    method: "post",
    payload: payload
  };

  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var result = JSON.parse(json);

  return result.success;
}