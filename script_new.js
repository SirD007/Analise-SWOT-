// Command System

/** Abstract Class Command.
* @class Command
*/
class Command {
    constructor() {if (this.constructor == Command) {throw new Error("Abstract class can't be instantiated")}}
    do() {throw new Error("Method 'do()' must be implemented.")}
    undo() {throw new Error("Method 'do()' must be implemented.")}
}

/** CreateNewItem
 * @class CreateNewItem
 * @extends {Command}
 */
class CreateNewItem {
    constructor(title, description)
}

// CUSTOM OBJECTS
class Item{

}