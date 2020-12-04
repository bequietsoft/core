import { log } from "./tools.js";
import App from "./app.js";
//import Renderer from "./renderer.js";

class Keyboard {
    
	static init(root) {
        
        Keyboard.root = root;
        root.Keyboard = Keyboard;

        Keyboard.keys = [];
        document.addEventListener("keydown", Keyboard.onkeydown.bind(this));
    }

    static onkeydown(event) {
        
        if(App.debug) log(event.code);
        
        Keyboard.keys.forEach(key => {
            if(key.code == event.code) eval(key.event);
        });

        //console.log(App.UI.Panel.element);
    }
}

export default Keyboard;