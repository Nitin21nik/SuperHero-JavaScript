//fetching the elements using dom
var searchInput=document.getElementById('search-input');
var searchList=document.getElementById('list');

searchInput.addEventListener('keyup', loadSuperHero);// adding keyup event 


async function loadSuperHero() //function to load search results as per searched input
{
    let key=searchInput.value;
    console.log(key);
    let url=`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2880756505548401/search/`+key;
    let response=await fetch(url);
    let responseJson=await response.json();
    console.log(responseJson);
    let arr=responseJson.results;
    console.log(arr);

    //Emptying the old searchList elements one by one iff not empty
    
    if(searchList.childElementCount!=0)
    {
        const count=searchList.childElementCount;
        for(let i=0;i<count;i++)
        {
            searchList.children[0].remove();
        }
    }


    for(let i=0;i<arr.length;i++)
    {
        let list=document.createElement('li');
        list.style.cssText="list-style:none; height:3rem; width:100%;"

        let div=document.createElement('div');
        div.style.cssText="width:100%; height:100%; margin:0.2rem 0;";
        
        let hid=`${arr[i].id}`;
        console.log(hid);
        
        let link=document.createElement('button');
        link.innerText=arr[i].name;
        link.style.cssText="height:100%; width:100%; margin:auto; border:none; font-weight:bold; font-size:1rem";

        link.setAttribute('id',hid);
        link.setAttribute('onclick','findSuperHero(this.id)');
        div.appendChild(link);

        list.appendChild(div);

        searchList.appendChild(list);
    }
}  


function findSuperHero(hid) //function to redirect to heroBio page as per heroId
{
     window.location.href=`heroBio.html#${hid}`;
}











