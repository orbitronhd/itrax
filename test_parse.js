const fs = require('fs');
const text = fs.readFileSync('gallery_items.txt', 'utf8');
const jsonStart = text.indexOf('{');
const jsonEnd = text.lastIndexOf('}') + 1;
const jsonString = text.substring(jsonStart, jsonEnd);
try {
  const data = JSON.parse(jsonString);
  console.log("Success! Rows:", data.table.rows.length);
} catch (e) {
  console.log("Parse error:", e);
}
