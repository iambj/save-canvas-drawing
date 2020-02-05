class Editor {
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
}

class History extends Editor {
    maxStates = 20; // The number of history states allowed. Larger values obviously will increase memory use.
    states = []; //Empty array for a list of history states
    // redoStates = [];

    listStates() {
        return this.states;
    }

    push(state) {
        // Add a state to the list
        // TODO: cycle undos if there are too many.
        if (this.states.length >= this.maxStates) this.states.shift();
        this.states.push(state);
    }

    pop() {
        let state = this.states.pop();
        // this.redoStates.push(state);
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
