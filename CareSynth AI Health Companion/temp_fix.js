const handleButtonClick = (buttonId: string, callback?: () => void) => { setClickedButton(buttonId); if (callback) { setTimeout(callback, 100); } setTimeout(() => setClickedButton(null), 600); };
