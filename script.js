const leftDiv = document.getElementById("leftDiv");
const rightDiv = document.getElementById("rightDiv");
const pagination = document.getElementById("pagination");

async function aboutSport() {
  const response = await fetch("https://sports.api.decathlon.com/sports");
  const object = await response.json();
  drawSportlist(object);
}

function drawSportlist(obj) {
  const ul = document.createElement("ul");
  const arr = obj["data"];

  let page = Math.floor(arr.length / 20);
  if (page >= 4) {
    page = 4;
  }

  for (let i = 1; i <= page; i++) {
    const divPage = document.createElement("div");
    divPage.classList.add("divPage");

    divPage.innerHTML = i;
    divPage.addEventListener("click", () => drawPage(i));
    pagination.append(divPage);
  }

  function drawPage(num) {
    if (!ul) {
      const ul = document.createElement("ul");
    }
    ul.innerHTML = "";

    const start = (num - 1) * 20 + 1;
    const end = num * 20;

    const arrShow = arr.slice(start, end);

    arrShow.forEach((obj) => {
      const nameSport = obj.attributes.name;

      const li = document.createElement("li");

      li.innerHTML = nameSport;
      ul.appendChild(li);
      li.addEventListener("click", () => headerOnclick(obj));
      leftDiv.appendChild(ul);
    });
  }
}
function headerOnclick(obj) {
  rightDiv.innerText = "";
  const sportId = obj.id;
  const pName = obj.attributes.name;
  let img;
  if (obj.relationships.images.data.length) {
    img = obj.relationships.images.data[0]["url"];
  } else {
    img = "sports.jpg";
  }
  const p = document.createElement("p");
  p.innerHTML = pName;

  const sportImg = document.createElement("img");
  sportImg.addEventListener("click", () => idFunc());

  sportImg.src = img;

  const rightDivImg = document.createElement("div");
  rightDivImg.classList.add("rightDivImg");

  const rightDivTxt = document.createElement("div");
  rightDivTxt.classList.add("rightDivTxt");
  rightDivImg.append(p);
  rightDivImg.append(sportImg);

  rightDivTxt.classList.add("rightDivTxt");
  rightDiv.append(rightDivImg);

  rightDiv.style.display = "block";

  async function idFunc() {
    const res = await fetch(
      `https://sports.api.decathlon.com/sports/${sportId}`
    );
    const idObj = await res.json();

    const descreption = idObj.data.attributes.description;
    if (descreption) {
      rightDivTxt.innerHTML = descreption;
    } else {
      rightDivTxt.innerHTML = "Sorry no more information yet";
    }
    rightDiv.append(rightDivTxt);
  }
}

aboutSport();
