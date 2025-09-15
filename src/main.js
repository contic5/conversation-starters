/*THIS KEY IS ONLY FOR ACCESSING PUBLIC GOOGLE FILES*/

//I can access read only files and files I can edit. I would need a full backend to securely store the key.
const public_apiKey = 'AIzaSyCAYyVQq7KCgTqcXN9pcpCJ9T3PnvtlT9g';

const sheetId = '1xldTo4pbSDniWOEjZKqmj2IedafdfZlwoBX45claeYs';
const range = 'Data';


async function fetchData()
{
  const response=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${public_apiKey}`);
  console.log(response);
  const json=await response.json();
  console.log(json);
  return await json.values;
}
function sheet_to_dictionaries(data)
{
  let dictionaries=[];
  let keys=[];
  for(let j=0;j<data[0].length;j++)
  {
    keys.push(data[0][j]);
  }

  for(let i=1;i<data.length;i++)
  {
    let dictionary={};
    for(let j=0;j<keys.length;j++)
    {
      dictionary[keys[j]]=data[i][j];
    }
    dictionaries.push(dictionary);
  }

  return dictionaries;
}
function select_starter()
{
  let roll=Math.floor(Math.random()*starters.length);
  document.getElementById("starter").innerHTML=starters[roll]["Question"];
  document.getElementById("category").innerHTML=starters[roll]["Category"];
}
async function main()
{
  const data=await fetchData();
  starters=sheet_to_dictionaries(data);
  console.log(starters);

  select_starter();
}

let target_category="";
let starters=[];
main();