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