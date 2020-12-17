class Keyboard {
    
	static init(App) {
        
        Keyboard.App = App;
		App.Keyboard = Keyboard;

        Keyboard.actions = [];
        Keyboard.pressed = [];
        Keyboard.events = Array(255);

        document.addEventListener("keydown", Keyboard.keydown.bind(this));
        document.addEventListener("keyup", Keyboard.keyup.bind(this));
    }

    static callback(e) {
        Keyboard.actions.forEach(action => {
            if (action.type == e.type && action.code == e.code)
                Keyboard.App.call(action.callback);
        });
    }

    static keydown(e) {
        //console.log(e);
        Keyboard.events[e.keyCode] = e;
        Keyboard.callback(e);
    }

    static keyup(e) {
        Keyboard.events[e.keyCode] = e;
        Keyboard.callback(e);
    }

    static update() {
        Keyboard.pressed = [];
        Keyboard.events.forEach((e) => {
            if (e.type === 'keydown') { 
                Keyboard.pressed.push(e.code);
                Keyboard.callback({ type: 'keypressed', code: e.code });
            }
        });

        //if (Keyboard.pressed.length > 0) console.log(Keyboard.pressed);
    }
}

export default Keyboard;