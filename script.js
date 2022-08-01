// fetch("https://ghibliapi.herokuapp.com/films")
//   .then((res) => res.json())
//   .then((data) => drawFilm(data));
// function drawFilm(films) {
//   films.forEach((data) => {
//     const titleF = document.createElement("h1");
//     titleF.innerHTML = data.title;
//     document.body.appendChild(titleF);
//     const img = document.createElement("img");
//     img.src = data.image;
//     document.body.appendChild(img);
//   });
// }
const leftDiv = document.getElementById("leftDiv");
const rightDiv = document.getElementById("rightDiv");
fetch("https://sports.api.decathlon.com/sports")
  .then((res) => res.json())
  .then((object) => drawSport(object));

function drawSport(obj) {
  const ul = document.createElement("ul");

  const arr = obj.data.slice(0, 55);
  console.log(arr);
  arr.forEach((obj) => {
    const nameSport = obj.attributes.name;
    const li = document.createElement("li");
    li.innerHTML = nameSport;
    ul.appendChild(li);
    li.addEventListener("click", function () {
      headerOnclickFunc(obj);
    });

    leftDiv.appendChild(ul);
  });
}
function headerOnclickFunc(obj) {
  rightDiv.innerText = "";
  const img = obj.relationships.images.data[0]["url"];
  const descreption = obj.attributes.description;
  const sportImg = document.createElement("img");
  sportImg.src = img;
  const rightDivImg = document.createElement("div");
  const rightDivTxt = document.createElement("div");

  rightDivImg.append(sportImg);
  rightDivTxt.innerHTML = descreption;
  rightDivTxt.classList.add("rightDivTxt");
  rightDiv.append(rightDivImg);
  rightDiv.append(rightDivTxt);
  rightDiv.style.display = "block";
}
// fetch("https://sports.api.decathlon.com/sports/66") //id
//   .then((res) => res.text())
//   .then((object) => console.log(object));
