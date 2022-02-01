var display=document.getElementById('display-container'); //fetching the display container


function pageload() //this function gets fired when the page loads
{
    let heroId=window.location.hash.substring(1); //fetching the passed heroId to this page
    fetchSuperHero(heroId);
}


async function fetchSuperHero(hid)
{
    console.log(hid);
    let url=`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/2880756505548401/${hid}`;//using the hid to fetch the hero
    let response=await fetch(url);
    let responseJson=await response.json();

    let data=responseJson;
    console.log(data);

    let card=document.createElement('div');//creating a card for hero features display
    card.style.cssText="margin:0.1rem; height:100%; width:40%; display:inline-block;";
    display.appendChild(card);


    let imgContainer=document.createElement('div');  //creating image container
    imgContainer.style.cssText='height:60%; width:100%;';
    card.appendChild(imgContainer);

    let himage=document.createElement('img');
    himage.style.cssText="height:100%; width:100%";
    imgContainer.appendChild(himage);

    let imgUrl=data.image.url;
    console.log(imgUrl);

    himage.src=imgUrl; //setting the source of img tag


    let powerStats=data.powerstats;
    console.log(powerStats);

    var powerContainer=document.createElement('div');
    powerContainer.innerText="Power Stats";
    powerContainer.style.cssText="margin-top:1rem; text-align:center; width:100%; height:auto; background-color:black; color:yellow; font-weight:bold; ";

    card.appendChild(powerContainer);

    for(let property in powerStats)//iterating over each and every specs of powerStats of hero
    {
        let prop=document.createElement('div');
        prop.style.cssText="margin:0.2rem 0; width:100%; height:1.6rem;font-weight:normal; background-color:black; color:white; text-transform:capitalize; box-shadow:-1px -1px 5px white inset,1px 1px 5px white inset";
        prop.innerHTML=`${property}&nbsp:&nbsp${powerStats[property]}`;
        powerContainer.appendChild(prop);
    }


    //Biography-container of hero

    let bio=document.createElement('div');
    bio.style.cssText="box-shadow:3px 3px 5px white inset,-3px -3px 5px white inset; display:inline-block; width:60%; height:100%; margin-left:1.2rem; background-color:rgba(0,0,0,.5);color:white";
    display.appendChild(bio);
    
    
    let titleName=document.createElement('h1');
    titleName.style.cssText="margin-left:1rem; margin-top:1rem; color:yellow"
    titleName.innerHTML=data.name;
    bio.appendChild(titleName);

    let hRule=document.createElement('hr');
    hRule.style.cssText="height:3px; color:white; opacity:1";
    bio.appendChild(hRule);

    let specsDiv=document.createElement('div');
    specsDiv.style.cssText="width:90%; height:auto;margin:auto;";
    bio.appendChild(specsDiv);

    let hName=document.createElement('p');
    hName.innerText="Full-Name : "+ data.biography["full-name"];
    specsDiv.appendChild(hName);

    let hGender=document.createElement('p');
    hGender.innerText="Gender : "+ data.appearance.gender;
    specsDiv.appendChild(hGender);

    let hHeight=document.createElement('p');
    hHeight.innerText="Height : "+ data.appearance.height[1];
    specsDiv.appendChild(hHeight);

    let birthPlace=document.createElement('p');
    birthPlace.innerText="Place-Of-Birth : "+ data.biography["place-of-birth"];
    specsDiv.appendChild(birthPlace);

    let altNames=document.createElement('p');
    altNames.innerText="Aliases : "+ data.biography.aliases;
    specsDiv.appendChild(altNames);

    let firstAppear=document.createElement('p');
    firstAppear.innerText="First Appearance : "+ data.biography["first-appearance"];
    specsDiv.appendChild(firstAppear);

    let alterEgos=document.createElement('p');
    alterEgos.innerText="Alter-Egos : "+ data.biography["alter-egos"];
    specsDiv.appendChild(alterEgos);

    let pub=document.createElement('p');
    pub.innerText="Publisher : "+ data.biography.publisher;
    specsDiv.appendChild(pub);

    let favBtn=document.createElement('button'); //adding the fav button to each hero
    favBtn.innerHTML="+ Add To Favourites";
    favBtn.style.cssText="display:inline-block; margin:auto; height:3rem; margin-top:1rem; width:100%; font-weight:bolder; color:white; background-color:blue; font-size:1.2rem";

    bio.appendChild(favBtn);   


    favBtn.addEventListener('click',function() //click event on fav button
    {
        if(localStorage.getItem(`${hid}`)==null) //add only if the  hero is not present in favourites
        {
            localStorage.setItem(`${hid}`,`${hid}`);//for making the data persistent, we make use of local Storage
            console.log(localStorage);
        }
        else
        {
            alert("SuperHero is Already added to Your Favourites List");
        }    
    });
}

