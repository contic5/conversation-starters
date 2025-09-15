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
export function select_starter()
{
  for(let attempts=0;attempts<100;attempts++)
  {
    let roll=Math.floor(Math.random()*starters.length);
    document.getElementById("starter").innerHTML=starters[roll]["Question"];
    document.getElementById("category").innerHTML=starters[roll]["Category"];

    if(starters[roll]["Category"]==target_category||target_category=="Any")
    {
      break;
    }
  }
}
function setup_categories(starters)
{
  let categories=["Any"];
  for(let item of starters)
  {
    if(!categories.includes(item["Category"]))
    {
      categories.push(item["Category"]);
    }
  }

  let target_category_select=document.getElementById("target_category");
  for(let category of categories)
  {
    let option=document.createElement("option");
    target_category_select.appendChild(option);
    option.innerHTML=category;
    option.value=category;
  }
}
export function update_target_category()
{
  target_category=document.getElementById("target_category").value;
  select_starter();
}
async function main()
{
  const data=await fetchData();
  starters=sheet_to_dictionaries(data);
  setup_categories(starters);
  console.log(starters);

  select_starter();
}

let target_category="Any";
let starters=[];
main();