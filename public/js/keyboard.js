class Keyboard {
    
	static init(App) {
        
        Keyboard.App = App;
		App.Keyboard = Keyboard;

        Keyboard.keys = [];
        document.addEventListener("keydown", Keyboard.onkeydown.bind(this));
    }

    static onkeydown(event) {
        
        if (Keyboard.App.debug) Keyboard.App.log(event.code);
        
        Keyboard.keys.forEach(key => {
            if (key.code == event.code) 
                Keyboard.App.call(key.callback);
        });
    }
}

export default Keyboard;