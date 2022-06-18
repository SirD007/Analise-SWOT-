// DECLARE CONSTANTS
const modal = document.getElementById("modal");
const items = document.querySelectorAll ('.item');
const add_items = document.querySelectorAll(".container_add_item")
const modal_color_picker = document.getElementById("tag_color_picker")
const modal_save_btn = document.getElementById("modal_save_btn")

// DECLARE GLOBAL VARIABLES
var items_global_count = 0

// REGISTER ITEMS EVENTS
for(var i=0; i<items.length; i++) {
  let item = items[i]
  item_delete_btn = item.querySelector(".btn_delete");
  item_delete_btn.addEventListener("click", function(ev) {item_delete(ev, item)});
  
  item.addEventListener("click", function(ev) {itemClicked(ev, item)});
}

for(var i=0; i<add_items.length; i++){
  let add_item_btn = add_items[i];
  add_item_btn.addEventListener("click", function(ev) {open_modal_to_create(ev, add_item_btn)});
}

modal_save_btn.addEventListener("click", function(ev) {save_item(ev)})


// GENEREATE NEW ITEM
function new_item(title, description){
  var temp_parent = document.createElement("div");
  items_global_count ++;
  temp_parent.innerHTML = `<div id="${items_global_count}"class="item" draggable="true" description="${description}" tag_color="#FFF"><p>${title}</p><span class="material-symbols-outlined btn_delete">delete</span></div>`;
  return temp_parent.firstChild
}

function add_item_to(ev, add_item_btn) {
  let container_names = {
    "add_strength": "strength_container",
    "add_weakness": "weakness_container",
    "add_oportunity": "oportunity_container",
    "add_threat": "threat_container"
  }
  var container_name = container_names[add_item_btn.id]
  var container = document.getElementById("container_name")
  console.log(container)
}

// OPEN MODAL
function open_modal_and_set(title, description, tag_color, current_item, current_type_name){
  var modal_title = modal.querySelector("#item_title");
  var modal_description = modal.querySelector("textarea");
  modal_title.value = title;
  modal_description.innerText = description;
  modal_color_picker.value = tag_color;
  modal.setAttribute("current_item", current_item);
  modal.setAttribute("current_type", current_type_name);
  modal.style.display = "block";
}

// HANDLE ITEM DELETE BUTTON CLICK
function item_delete(ev, item) {
  item.remove();
  ev.stopPropagation();
}

// HANDLE ITEM NORMAL CLICK -> OPEN MODAL TO EDIT
function itemClicked(ev, item) {
  var item_title = item.querySelector("p").innerText;
  let type_names = {
    "strength_container": "strength",
    "weakness_container": "weakness",
    "oportunity_container": "oportunity",
    "threat_container": "threat"
  }
  open_modal_and_set(
    item_title,
    item.getAttribute("description"),
    item.style.getPropertyValue("--tag_color"),
    item.id,
    type_names[item.parentElement.parentElement.id]
    );
}

// HANDLE OUTSIDE MODAL CLICK -> CLOSE MODAL WITHOUT SAVE CHANGES
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// HANDLE ADD_ITEM_BTN CLICK
function open_modal_to_create(ev, add_item_btn) {
  let type_names_pt = {
    "add_strength": "força",
    "add_weakness": "fraqueza",
    "add_oportunity": "oportunidade",
    "add_threat": "ameaça"
  };
  let type_names = {
    "add_strength": "strength",
    "add_weakness": "weakness",
    "add_oportunity": "oportunity",
    "add_threat": "threat"
  };
  open_modal_and_set(
    `Nova ${type_names_pt[add_item_btn.id]}`,
    "",
    "#FFFFFF",
    "",
    type_names[add_item_btn.id]
    );
}

// HANDLE MODAL SAVE BUTTON









// DRAG

const swot_container = document.querySelectorAll('.container_itens');
const swot_item = document.querySelector('.item');

swot_item.addEventListener('dragstart', hold);
swot_item.addEventListener('dragend', dropped);

function hold(){
  this.className += ' hold';
  setTimeout( () => this.className = 'none', 0 );
}

function dropped(){
  this.className = 'fill';
}

for(const swot_content of swot_container){
  swot_content.addEventListener('dragover', e =>  e.preventDefault() );
  swot_content.addEventListener('dragenter', hovered);
  swot_content.addEventListener('dragleave', left);
  swot_content.addEventListener('drop', dropIt);
}

function hovered(e){
  e.preventDefault();
  this.className += ' hovered';
}

function left(){
  this.className = 'empty';
}

function dropIt(){
  this.append(swot_item);
  this.classList.remove('hovered');
}