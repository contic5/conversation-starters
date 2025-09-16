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
export function select_random_starter()
{
  let roll=0;
  for(let attempts=0;attempts<100;attempts++)
  {
    roll=Math.floor(Math.random()*starters.length);
    if(starters[roll]["Category"]==target_category||target_category=="Any")
    {
      break;
    }
  }

  document.getElementById("starter").innerHTML=starters[roll]["Question"];
  document.getElementById("category").innerHTML=starters[roll]["Category"];
  document.getElementById("selected_conversation_starter").value=starters[roll]["Question"];
}
export function select_target_starter()
{
  let starter_question=document.getElementById("selected_conversation_starter").value;

  for(let i=0;i<starters.length;i++)
  {
    if(starter_question==starters[i]["Question"])
    {
      document.getElementById("starter").innerHTML=starters[i]["Question"];
      document.getElementById("category").innerHTML=starters[i]["Category"];
    }
  }
}
export function update_target_category()
{
  target_category=document.getElementById("target_category").value;
  select_random_starter();
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
function setup_starters_datalist(starters)
{
  let starters_datalist=document.getElementById("conversation-starters");
  for(let i=0;i<starters.length;i++)
  {
    const starter=starters[i];
    let option=document.createElement("option");
    starters_datalist.appendChild(option);
    option.innerHTML=starter["Category"];
    option.value=starter["Question"];
  }
}
async function main()
{
  const data=await fetchData();
  starters=sheet_to_dictionaries(data);
  setup_categories(starters);
  setup_starters_datalist(starters);
  console.log(starters);

  select_random_starter();
}

let target_category="Any";
let starters=[];
main();