"use strict";

let allItems = [];
let keyArr = [];
let filterArr=[];
// Constructor
function Items(image_url, title, desc, horns, keyword) {
  this.image_url = image_url;
  this.title = title;
  this.desc = desc;
  this.horns = horns;
  this.keyword = keyword;
  allItems.push(this);
}

// Get data from data folder

$.ajax("./data/page-1.json").then((data) => {
  data.forEach((item) => {
    let newItem = new Items(
      item.image_url,
      item.title,
      item.description,
      item.horns,
      item.keyword
    );
    newItem.render();
    newItem.filterData();
  });
  $("#photo-template").hide();
});

// Render function

Items.prototype.render = function () {
  let imageSection = $("#mustach").html();
  let html=Mustache.render(imageSection,this);
  $('main').append(html)
  // imageSection.removeAttr("id");
  // imageSection.addClass(this.keyword);
  // imageSection.find("img").attr("src", this.image_url);
  // imageSection.find("h2").text(this.title);
  // imageSection.find("p").text(this.desc);
  // $("main").append(imageSection);
};

Items.prototype.filterData = function () {
  if (!keyArr.includes(this.keyword)) {
    $("#filter").append(
      `<option value="${this.keyword}">${this.keyword.toUpperCase()}</option>`
    );
    keyArr.push(this.keyword);
  }
};

// Enent listiner

// Filter the images

$("#filter").change(function () {
  $("section").hide();
  let selectValue = $(this).val();
  allItems.forEach((item)=>{
    if (item.keyword === selectValue){
      filterArr.push(item);
    }
  })
  $(`.${selectValue}`).show();
  if (selectValue === "default") {
    allItems.forEach((item) => {
      $("section").show();
      $("#photo-template").hide();
    });
  }
});

// Sorting the Data by number of by name
$("#sorting").change(function () {
  $("section").remove();
  $("main").append(`<section id="photo-template">
    <h2></h2>
    <img />
    <p></p>
  </section>`);
  let sortedArray = [];
  let value = $(this).val();
  //   Sort By Numbers of horns
  if (value === "horns") {
    sortedArray = [...allItems.sort((a, b) => a.horns - b.horns)];
    sortedArray.forEach((item) => {
      item.render();
    });
    // sort by title
  } else if (value === "title") {
    sortedArray = [
      ...allItems.sort((a, b) => {
        var nameA = a.title.toUpperCase();
        var nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    ];
    sortedArray.forEach((item) => {
      item.render();
    });
    // Default
  }
  $("#photo-template").hide();
});

$("#pageOne").click(function(){
  window.open('index.html','__self')
})
$("#pageTwo").click(function(){
  window.open('page2.html','__self')
})
$('body').click(function(){
    let targets=event.target.localName
    console.log('before if'+targets)
    if(targets === 'img'){
        console.log('after if'+  event.target.parentNode)
        event.target.parentNode.classList.toggle('modal')
        // let perant= event.target.parentNode
        $('.modal').prepend('<span class="close">&times;</span>')
        $('.close').click(function(){
            console.log( event.target)
            event.target.parentNode.classList.toggle('modal')
            $('.close'). remove() 
        })
       
    }
})
$("input:text").on("keyup", function () {
    $("section").remove();
    $("main").append(`<section id="photo-template">
      <h2></h2>
      <img />
      <p></p>
    </section>`);
    let value = $(this).val();
    allItems.forEach((item) => {
      if (item.keyword.indexOf(value) !== -1) {
        item.render();
      }
    });
    $("#photo-template").hide();
  });