class Editor {
    constructor() {
        // Grab the buttons after the load and give them events.
        // This shorthand using the ID's of the elements isn't advised on large projects.

        redoBtn.addEventListener("click", this.redo);
    }

    data = "";
    createState() {
        return new EditorState(this.data);
    }

    setContent(content) {
        this.data = content;
    }

    restore(state) {
        if (state) this.data = state.getContent();
    }

    getContent() {
        return this.data;
    }

    // get() {
    //     return "This is a class getter.";
    // }
    // undo() {
    //     console.log("undo");
    // }
    // redo() {
    //     console.log("redo");
    // }
}

class History extends Editor {
    // constructor() {
    //     super();
    // }
    maxStates = 20; // The number of history states allowed. Larger values obviously will increase memory use.
    states = []; //Empty array for a list of history states

    listStates() {
        return this.states;
    }

    push(state) {
        // Add a state to the list
        if (this.states.length < this.maxStates) {
            this.states.push(state);
        }
    }

    pop() {
        // Remove and return the latest state.
        // if (this.states.length <= 1) {
        //     this.states = [""];
        //     console.log("base state");
        //     return;
        // }
        let state = this.states.pop();
        return state;
    }
}

const _editorStateData = new WeakMap();
class EditorState {
    data = ""; // Will hold the DataURL string info.
    constructor(data) {
        _editorStateData.set(this, data);
        this.data = data;
    }
    getContent() {
        return this.data;
    }
}
