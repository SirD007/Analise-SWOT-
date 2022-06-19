// DECLARE CONSTANTS
const modal = document.getElementById("modal");
const items = document.querySelectorAll('.item');
const addItemsBtns = document.querySelectorAll(".container_add_item")
const modalColorPicker = document.getElementById("tag_color_picker")
const modalSaveBtn = document.getElementById("modal_save_btn")
const NewSwotBtn = document.getElementById("new_swot")

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

// @class Represents an item HTMLDivElement with all properties setted
class Item {
  /**
   * @param {number} id 
   * @param {string} title 
   * @param {string} description 
   * @param {string} tagColor
   */
  constructor(id, title="Novo item", description="Descrição do item", tagColor="#d3d3d3") {
    this._id = id;
    this._title = title;
    this._description = description;
    this._tagColor = tagColor;
    this._type = "";

    this.element = document.createElement("div");
    this.element.classList.add("item");
    this.element.id = this._id;
    this.element.draggable = true;
    this.element.setAttribute("description", this._description);
    this.element.style.setProperty("--tag_color", this._tagColor);

    this.titleElement = document.createElement("p");
    this.element.append(this.titleElement);
    this.titleElement.innerText = this._title;

    this.deleteButtonElement = document.createElement("span");
    this.element.append(this.deleteButtonElement);
    this.deleteButtonElement.classList.add("material-symbols-outlined", "btn_delete");
    this.deleteButtonElement.innerText = "delete";
  }

  static getFromId(id) {
    let newItem = new Item(id);
    newItem.element = document.getElementById(newItem._id);
    newItem.titleElement = newItem.element.querySelector("p");
    newItem.deleteButtonElement = newItem.element.querySelector(".btn_delete");
    newItem.title = newItem.title;
    newItem.description = newItem.description;
    newItem.tagColor = newItem.tagColor;
    return newItem
  }

  get id() { return this.element.id }
  set id(value) {
    this._id = value;
    this.element.id = this._id;
  }

  get title() { return this.titleElement.innerText }
  set title(value) {
    this._title = value;
    this.titleElement.innerText = this._title;
  }

  get description() { return this.element.getAttribute("description") }
  set description(value) {
    this._description = value;
    this.element.setAttribute("description", this._description);
  }

  get tagColor() { return this.element.style.getPropertyValue("--tag_color") }
  set tagColor(value) {
    this._tagColor = value;
    this.element.style.setProperty("--tag_color", this._tagColor);
  }

  get type() { return this.element.parentElement.parentElement.id.replace("_container", "") }
}

// GENEREATE NEW ITEM
function createNewItem(title, description, tagColor) {
  itemsGlobalCount++;
  let item = new Item(itemsGlobalCount, title, description, tagColor);

  item.deleteButtonElement.addEventListener("click", function (ev) { deleteItem(ev, item.element) });
  item.element.addEventListener("click", function (ev) { itemClicked(ev, item.element) });
  // item.element.addEventListener('dragstart', dragstart);
  // item.element.addEventListener('drag', drag);
  // item.element.addEventListener('dragend', dragend);
  return item.element
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
    let newItem = createNewItem(modalTitle.value, modalDescription.value, modalColorPicker.value);
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

// NEW SWOT

NewSwotBtn.addEventListener('click', () => {
  let items = document.getElementsByClassName("item");
  Array.from(items).forEach(item =>{
    item.remove();
  })
})


// EXPORT
function generateCSV() {
  let items = document.getElementsByClassName("item");
  let rows = ["ID,Título,Descrição,Cor da Tag,Tipo"];
  Array.from(items).forEach(itemEl =>{
    let item = Item.getFromId(itemEl.id);
    let row = [item.id, item.title, item.description, item.tagColor, item.type].join(",");
    rows.push(row);
  });
  let rowsStr = rows.join("\n");
  return rowsStr
}

function downloadContent(content, fileName, mimeType) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob(["\ufeff", content], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob(["\ufeff", content], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  }
}

function exportItems() {
  var csvContent = generateCSV();
  downloadContent(csvContent, "swot_analysis.csv", "text/csv;encoding:utf-8");
}


// DRAG AND DROP
const swotContainers = document.querySelectorAll('.container_itens');
swotContainers.forEach(container =>{
  new Sortable(container, {
    group: "shared",
    animation: 100,
    easing: "cubic-bezier(1, 0, 0, 1)",
    ghostClass: "ghost_item"
  });
});



// const swot_itens = document.querySelectorAll('.item');

// swot_itens.forEach(swot_item => {
//   swot_item.addEventListener('dragstart', dragstart)
//   swot_item.addEventListener('drag', drag)
//   swot_item.addEventListener('dragend', dragend)
// })

// function dragstart () {
//   swot_containers.forEach(swot_container => swot_container.classList.add('highlight'))

//   this.classList.add("is_dragging")
// }

// function drag () {
//   this.classList.add("is_dragging")
// }

// function dragend () {
//   swot_containers.forEach(swot_container => swot_container.classList.remove('highlight'))

//   this.classList.remove("is_dragging")
// }

// swot_containers.forEach(swot_container => {
//   swot_container.addEventListener('dragenter', dragenter)
//   swot_container.addEventListener('dragover', dragover)
//   swot_container.addEventListener('dragleave', dragleave)
//   swot_container.addEventListener('drop', drop)
// })

// function dragenter() {
// }

// function dragover() {
//   this.classList.add("hover_highlight")

//   const ItemBeingDragged = document.querySelector ('.is_dragging')

//   this.appendChild(ItemBeingDragged)
// }

// function dragleave() {
//   this.classList.remove("hover_highlight")
// }

// function drop() {
//   this.classList.remove("hover_highlight")
// }
