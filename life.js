var STARTX = 0;
var STARTY = 0;
var ENDX = 79;
var ENDY = 24;

var CELL_CHAR = '#';
var TIME_OUT  = 300;

// typedef struct _state {
// 	int oldstate;
// 	int newstate;
// }state;

var State = function(oldstate, newstate) {
    this.oldstate = oldstate;
    this.newstate = newstate;
}

// void display(WINDOW *win, state **area, int startx, int starty, int endx, int endy);
// void calc(state **area, int x, int y);
// void update_state(state **area, int startx, int starty, int endx, int endy);

function main_life() {	
	// state **workarea;
	var i, j;
	
	initscr();
	cbreak();
	timeout(TIME_OUT);
	keypad(stdscr, TRUE);

	ENDX = COLS - 1;
	ENDY = LINES - 1;

	var workarea = new Array(COLS);
	for(i = 0; i < workarea.length; i++) {
		workarea[i] = new Array(LINES);
		for(j = 0; j < LINES; j++) {
			workarea[i][j] = new State(FALSE, FALSE);
		}
	}

	// workarea = (state **)calloc(COLS, sizeof(state *));
	// for(i = 0;i < COLS; ++i)
		// workarea[i] = (state *)calloc(LINES, sizeof(state));
	
	/* For inverted U */
	workarea[39][15].newstate = TRUE;
	workarea[40][15].newstate = TRUE;
	workarea[41][15].newstate = TRUE;
	workarea[39][16].newstate = TRUE;
	workarea[39][17].newstate = TRUE;
	workarea[41][16].newstate = TRUE;
	workarea[41][17].newstate = TRUE;
	update_state(workarea, STARTX, STARTY, ENDX, ENDY);
	
	/* For block  */
	// workarea[37][13].newstate = TRUE;
	// workarea[37][14].newstate = TRUE;
	// workarea[38][13].newstate = TRUE;
	// workarea[38][14].newstate = TRUE;
	// update_state(workarea, STARTX, STARTY, ENDX, ENDY);

	display(stdscr, workarea, STARTX, STARTY, ENDX, ENDY);

	// while(getch() != KEY_F(1))
	var timer_id = setInterval( function() {
		for(i = STARTX; i <= ENDX; ++i)
			for(j = STARTY; j <= ENDY; ++j)
				calc(workarea, i, j);
		update_state(workarea, STARTX, STARTY, ENDX, ENDY);
		display(stdscr,  workarea, STARTX, STARTY, ENDX, ENDY);	
	}, TIME_OUT);
	
	console.log('Timer: ' + timer_id);

	endwin();
	// return 0;
}	


function display(win, area, startx, starty, endx, endy) {	
	var i, j;
	wclear(win);
	for(i = startx; i <= endx; ++i)
		for(j = starty;j <= endy; ++j)
			if(area[i][j].newstate == TRUE)
				mvwaddch(win, j, i, CELL_CHAR);
	wrefresh(win);
}

function calc(area, i, j) {
	var neighbours, newstate;
 	
	neighbours	= 
		area[(i - 1 + COLS) % COLS][j].oldstate		+
		area[(i - 1 + COLS) % COLS][(j - 1 + LINES) % LINES].oldstate 	+
		area[(i - 1 + COLS) % COLS][(j + 1) % LINES].oldstate 	+
		area[(i + 1) % COLS][j].oldstate		+
		area[(i + 1) % COLS][(j - 1 + LINES) % LINES].oldstate 	+
		area[(i + 1) % COLS][(j + 1) % LINES].oldstate 	+
		area[i][(j - 1 + LINES) % LINES].oldstate		+
		area[i][(j + 1) % LINES].oldstate;
	
	newstate = FALSE;
	if(area[i][j].oldstate == TRUE && (neighbours == 2 || neighbours == 3))
		 newstate = TRUE;
	else
		if(area[i][j].oldstate == FALSE && neighbours == 3)
			 newstate = TRUE;
	area[i][j].newstate = newstate;
}

function update_state(area, startx, starty, endx, endy) {
	var i, j;
	for(i = startx; i <= endx; ++i)
		for(j = starty; j <= endy; ++j)
			area[i][j].oldstate = area[i][j].newstate;
}	


