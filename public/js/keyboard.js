class Keyboard {
    
	static init(App) {
        
        Keyboard.App = App;
		App.Keyboard = Keyboard;

        Keyboard.actions = [];
        Keyboard.events = {};
        document.addEventListener("keydown", Keyboard.callback.bind(this));
    }

    static callback(event) {
        
        //if (Keyboard.App.debug) Keyboard.App.log(event);

        //Keyboard.events.event.code: event };

        Keyboard.actions.forEach(action => {
            if (action.type == event.type && action.code == event.code)
                Keyboard.App.call(key.callback);
        });

        
    }

    static update() {
        
    }
}

export default Keyboard;