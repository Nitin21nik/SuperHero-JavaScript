var sList=document.getElementById('superhero-list');//fetching the superhero-list container

if(localStorage.length!=0) //loading the favourites page with heros only if it is not empty
{
    sList.innerHTML="";
    for(let i=0; i<localStorage.length;i++) 
    {
        let hid=localStorage.getItem(localStorage.key(i));
        fetchTheHero(hid);
    }
}
 
async function fetchTheHero(hid)
  {
    console.log(hid);
    let url=`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2880756505548401/${hid}`;
    let response=await fetch(url);
    let responseJson=await response.json();
    console.log(responseJson);
    let data=responseJson;

    let card=document.createElement('div');//creating card for each hero
    card.style.cssText="margin:1rem; height:60vh; width:20%; display:inline-block;background-color:black; border:2px groove white";
    sList.appendChild(card);

    let imgContainer=document.createElement('div');  //creating image container
    imgContainer.style.cssText='height:70%; width:100%';
    card.appendChild(imgContainer);

    let himg=document.createElement('img');
    himg.style.cssText="height:100%; width:100%";
    imgContainer.appendChild(himg);
    let imgUrl=data.image.url;
    console.log(imgUrl);

    himg.src=imgUrl; //loading the image

    let hname=document.createElement('h5');
    hname.style.cssText="text-align:center; margin:0.6rem; color:white";
    hname.innerText=data.name;
    card.appendChild(hname);


    let detailBtn=document.createElement('button');//adding the details button
    detailBtn.innerText="Details";
    detailBtn.style.cssText="margin:0.6rem 0.8rem; padding:0.3rem; font-size:14px;";
    card.append(detailBtn);

    let removeBtn=document.createElement('button'); //adding the remove button
    removeBtn.innerText="Remove";
    removeBtn.style.cssText="margin:0.6rem; padding:0.3rem; font-size:14px; ";
    card.append(removeBtn);

    detailBtn.addEventListener('click',function()
    { 
         window.location.href=`heroBio.html#${hid}`;   
    });

    removeBtn.addEventListener('click',function()
    { 
         localStorage.removeItem(`${hid}`);
         location.reload();//reloads the current page
    });

  }