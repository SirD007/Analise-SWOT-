// DECLARE CONSTANTS
const modal = document.getElementById("modal");
const items = document.querySelectorAll('.item');
const addItemsBtns = document.querySelectorAll(".container_add_item")
const modalColorPicker = document.getElementById("tag_color_picker")
const modalSaveBtn = document.getElementById("modal_save_btn")

// DECLARE GLOBAL VARIABLES
var itemsGlobalCount = 0

// REGISTER ITEMS EVENTS
for (var i = 0; i < items.length; i++) {
  let item = items[i]
  itemDeleteBtn = item.querySelector(".btn_delete");
  itemDeleteBtn.addEventListener("click", function (ev) { deleteItem(ev, item) });
  item.addEventListener("click", function (ev) { itemClicked(ev, item) });
}

for (var i = 0; i < addItemsBtns.length; i++) {
  let add_item_btn = addItemsBtns[i];
  add_item_btn.addEventListener("click", function (ev) { openModalToCreate(ev, add_item_btn) });
}

modalSaveBtn.addEventListener("click", function (ev) { saveItem(ev) })


// GENEREATE NEW ITEM
function createNewItem(title, description, id, tagColor) {
  var tempParent = document.createElement("div");
  itemsGlobalCount++;
  tempParent.innerHTML = `<div class="item" draggable="true" ondragstart="dragStart(event)" id="${id}" description="${description}" style="--tag_color:${tagColor}"><p>${title}</p><span class="material-symbols-outlined btn_delete">delete</span></div>`;
  let item = tempParent.firstChild
  itemDeleteBtn = item.querySelector(".btn_delete");
  itemDeleteBtn.addEventListener("click", function (ev) { deleteItem(ev, item) });
  item.addEventListener("click", function (ev) { itemClicked(ev, item) });
  return item
}

function addItemTo(ev, addItemBtn) {
  let container_names = {
    "add_strength": "strength_container",
    "add_weakness": "weakness_container",
    "add_oportunity": "oportunity_container",
    "add_threat": "threat_container"
  }
  var container_name = container_names[addItemBtn.id]
  var container = document.getElementById("container_name")
  console.log(container)
}

// OPEN MODAL
function openModalAndSet(title, description, tagColor, currentItem, currentTypeName) {
  var modal_title = modal.querySelector("#item_title");
  var modal_description = modal.querySelector("textarea");
  modal_title.value = title;
  modal_description.innerText = description;
  modal_description.value = description;
  modalColorPicker.value = tagColor;
  modal.setAttribute("current_item", currentItem);
  modal.setAttribute("current_type", currentTypeName);
  modal.style.display = "block";
}

// HANDLE ITEM DELETE BUTTON CLICK
function deleteItem(ev, item) {
  item.remove();
  ev.stopPropagation();
}

// HANDLE ITEM NORMAL CLICK -> OPEN MODAL TO EDIT
function itemClicked(ev, item) {
  var itemTitle = item.querySelector("p").innerText;
  let typeNames = {
    "strength_container": "strength",
    "weakness_container": "weakness",
    "oportunity_container": "oportunity",
    "threat_container": "threat"
  }
  openModalAndSet(
    itemTitle,
    item.getAttribute("description"),
    item.style.getPropertyValue("--tag_color"),
    item.id,
    typeNames[item.parentElement.parentElement.id]
  );
}

// HANDLE OUTSIDE MODAL CLICK -> CLOSE MODAL WITHOUT SAVE CHANGES
var mouseDownTarget;
document.addEventListener("mousedown", ev => mouseDownTarget = ev.target)
modal.addEventListener("click", () => {
  if (mouseDownTarget == modal) { modal.style.display = "none" }
})

// HANDLE ADD_ITEM_BTN CLICK
function openModalToCreate(ev, addItemBtn) {
  let typeNamesPT = {
    "add_strength": "força",
    "add_weakness": "fraqueza",
    "add_oportunity": "oportunidade",
    "add_threat": "ameaça"
  };
  let typeNames = {
    "add_strength": "strength",
    "add_weakness": "weakness",
    "add_oportunity": "oportunity",
    "add_threat": "threat"
  };
  openModalAndSet(
    `Nova ${typeNamesPT[addItemBtn.id]}`,
    "",
    "#d3d3d3",
    "",
    typeNames[addItemBtn.id]
  );
}

// HANDLE MODAL SAVE BUTTON
function saveItem(ev) {
  var modalTitle = modal.querySelector("#item_title");
  var modalDescription = modal.querySelector("textarea");
  var modalCurrentItem = modal.getAttribute("current_item");
  var modalCurrentType = modal.getAttribute("current_type");
  if (modalCurrentItem == "") {
    let newItem = createNewItem(modalTitle.value, modalDescription.value, itemsGlobalCount, modalColorPicker.value);
    let typeNames = {
      "strength": "strength_container",
      "weakness": "weakness_container",
      "oportunity": "oportunity_container",
      "threat": "threat_container"
    };
    let containerName = typeNames[modalCurrentType];
    let container = document.getElementById(containerName);
    let containerItems = container.querySelector(".container_itens");
    containerItems.append(newItem);
  } else {
    let selectedItem = document.getElementById(modalCurrentItem);
    selectedItem.setAttribute("description", modalDescription.value);
    selectedItem.style.setProperty("--tag_color", modalColorPicker.value)
    selectedItem.querySelector("p").innerText = modalTitle.value;
  }
  modal.style.display = "none";
}








// DRAG
const swot_containers = document.querySelectorAll('.container_itens');
const swot_itens = document.querySelectorAll('.item');

swot_itens.forEach(swot_item => {
  swot_item.addEventListener('dragstart', dragstart)
  swot_item.addEventListener('drag', drag)
  swot_item.addEventListener('dragend', dragend)
})

function dragstart () {
  swot_containers.forEach(swot_container => swot_container.classList.add('highlight'))

  this.classList.add("is_dragging")
}

function drag () {
  this.classList.add("is_dragging")
}

function dragend () {
  swot_containers.forEach(swot_container => swot_container.classList.remove('highlight'))

  this.classList.remove("is_dragging")
}

swot_containers.forEach(swot_container => {
  swot_container.addEventListener('dragenter', dragenter)
  swot_container.addEventListener('dragover', dragover)
  swot_container.addEventListener('dragleave', dragleave)
  swot_container.addEventListener('drop', drop)
})

function dragenter() {
}

function dragover() {
  this.classList.add("hover_highlight")

  const ItemBeingDragged = document.querySelector ('.is_dragging')

  this.appendChild(ItemBeingDragged)
}

function dragleave() {
  this.classList.remove("hover_highlight")
}

function drop() {
  this.classList.remove("hover_highlight")
}
