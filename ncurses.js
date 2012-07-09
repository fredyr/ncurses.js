

var LINES 	= 25,
	COLS 	= 80,

	TRUE 	= 1, 
	FALSE 	= 0,

	ERR 	= -1,
	OK 		= 0;


var POS_X = 0, POS_Y = 0;

/*
	initscr
	cbreak
	keypad(stdscr, TRUE)
	stdscr as a window
	getch

	getmaxyx(win, row, col)

	attron(A_BOLD)	
	attroff(A_BOLD)

		A_NORMAL        Normal display (no highlight)
	    A_STANDOUT      Best highlighting mode of the terminal.
	    A_UNDERLINE     Underlining
	    A_REVERSE       Reverse video
	    A_BLINK         Blinking
	    A_DIM           Half bright
	    A_BOLD          Extra bright or bold
	    A_PROTECT       Protected mode
	    A_INVIS         Invisible or blank mode
	    A_ALTCHARSET    Alternate character set
	    A_CHARTEXT      Bit-mask to extract a character
	    COLOR_PAIR(n)   Color-pair number n 

 	COLOR_BLACK   0
    COLOR_RED     1
    COLOR_GREEN   2
    COLOR_YELLOW  3
    COLOR_BLUE    4
    COLOR_MAGENTA 5
    COLOR_CYAN    6
    COLOR_WHITE   7

	curs_set - cursor visibility on/off
	noecho

	wclear(win)
	mvwaddch(win, y, x, ch)
	mvprintw(y, x, "String %d", variable)
	wrefresh(win)

	endwin

*/
var stdscr = [];

function get_terminal_size() {
	var text_width = $("#font-size").width();
	var text_height = $("#font-size").height();

	console.log('text_width ' + text_width);
	console.log('text_height ' + text_height);

	var w = $("#content").width();
	var h = $("#content").height();

	LINES = Math.floor(h / text_height);
	COLS = Math.floor(w / text_width);
}

function wfill(win, ch) {
	for(var y = 0; y < LINES; y++) {
		for(var x = 0; x < COLS; x++) {
			win[y*COLS+x] = ch;
		}
	}
}

function wclear(win) {
	wfill(win, '&nbsp;');
}

function move(y, x) {
	POS_Y = y;
	POS_X = x;
}

function waddch(win, ch) {
	win[POS_Y*COLS+POS_X] = ch;	
}

function addch(ch) {
	waddch(stdscr, ch);
}

function mvwaddch(win, y, x, ch) {
	move(y, x);
	waddch(win, ch);
}

function wrefresh(win) {
	var str = "";
	for(var y = 0; y < LINES; y++) {
		for(var x = 0; x < COLS; x++) {
			str += win[y*COLS+x];
		}
		str += '<br>';
	}	
	$('#content').html(str);
}

function refresh() {
	wrefresh(stdscr);
}

function initscr() {
	get_terminal_size();
	console.log("COLS: " + COLS + " LINES: " + LINES);
	wclear(stdscr);
	refresh();
}

function cbreak() {}
function endwin() {}

function KEY_F(num) {
	return ERR;
}

var TIMEOUT;
function timeout(timeout_length) {
	TIMEOUT = timeout_length;
}
function keypad(win, status) {}

function getch() {
	// Always timeout for now!
	return ERR;
}


