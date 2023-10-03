var messageNumber = 1;

//help creating the different level functions
var level = 1;
var levelNumber = 0;
var levels = new Array();

//first card player clicks on
var firstCard;
var firstCardX;
var firstCardY;

//second card player clicks on
var secondCard;
var secondCardX;
var secondCardY;

//when the cards both match turn white call to remove it
var REMOVED_CARD = -1;

var currentLevel;

var messageNumber;

// each data is associated with a color
// draws the color for the specific number from the array
function DrawLevelBead (x, y, data)
{
	if (data == 1)
	{
		PS.BeadColor (x, y, PS.COLOR_GRAY);
	}
	else if (data == 2)
	{
		PS.BeadColor (x, y, PS.COLOR_RED);
	}
	else if (data == 3)
	{
		PS.BeadColor (x, y, PS.COLOR_GREEN);
	}
	else if (data == 4)
	{
		PS.BeadColor (x, y, PS.COLOR_YELLOW);
	}
	else if (data == 5)
	{
		PS.BeadColor (x, y, PS.COLOR_ORANGE);
	}
	else if (data == 6)
	{
		PS.BeadColor (x, y, PS.COLOR_VIOLET);
	}
	else if (data == 7)
	{
		PS.BeadColor (x, y, PS.COLOR_MAGENTA);
	}
	else if (data == 8)
	{
		PS.BeadColor (x, y, PS.COLOR_BLACK);
	}
	else if (data == 9)
	{
		PS.BeadColor (x, y, PS.COLOR_CYAN);
	}
	else if (data == 10)
	{
		PS.BeadColor (x, y, 0x330033);
	}
	else if (data == 11)
	{
		PS.BeadColor (x, y, 0x990099);
	}
	else if (data == 12)
	{
		PS.BeadColor (x, y, 0x9966CC);
	}
	else if (data == 13)
	{
		PS.BeadColor (x, y, 0x33FFFF);
	}
	else if (data == 14)
	{
		PS.BeadColor (x, y, 0x336600);
	}
	else if (data == 15)
	{
		PS.BeadColor (x, y, 0x996600);
	}
	else if (data == 16)
	{
		PS.BeadColor (x, y, 0xB05F3C);
	}
	else if (data == 17)
	{
		PS.BeadColor (x, y, 0x1F88A7);	
	}
	else if (data == 18)
	{
		PS.BeadColor (x, y, 0x4A9586);
	}
	else 
	{
		PS.BeadColor (x, y, PS.COLOR_BLUE);
	}
};


PS.Init = function (options)
{
	"use strict";

	// for each level
	// set grid size
	// set bead/card to blue
	// set border width
	// set border color
	// level arrays
    if (level == 1) 
 	{
		PS.GridSize ( 2, 2 );	
		PS.BeadColor ( PS.ALL, PS.ALL, PS.COLOR_BLUE);
		PS.BeadBorderWidth( PS.ALL, PS.ALL, 5);
		PS.BeadBorderColor (PS.ALL, PS.ALL, PS.COLOR_WHITE);
		
		levels = [[1,1],
				  [2,2]
				 ];

 	}
    if (level == 2) 
 	{
		PS.GridSize ( 4, 3 );	
		PS.BeadColor ( PS.ALL, PS.ALL, PS.COLOR_BLUE);
		PS.BeadBorderWidth( PS.ALL, PS.ALL, 5);
		PS.BeadBorderColor (PS.ALL, PS.ALL, PS.COLOR_WHITE);
		
		levels = [[1,3,5,6],
				  [2,6,2,4],
				  [5,4,1,3]
				 ];

 	}
    if (level == 3) 
 	{
		PS.GridSize ( 4, 4 );	
		PS.BeadColor ( PS.ALL, PS.ALL, PS.COLOR_BLUE);
		PS.BeadBorderWidth( PS.ALL, PS.ALL, 5);
		PS.BeadBorderColor (PS.ALL, PS.ALL, PS.COLOR_WHITE);
		
		levels = [[8,1,1,8],
				  [2,6,5,3],
				  [3,4,5,6],
				  [7,4,7,2]
				 ];
 	}
 	if (level == 4)
 	{
 		PS.GridSize ( 6, 6);
 		PS.BeadColor ( PS.ALL, PS.ALL, PS.COLOR_BLUE);
		PS.BeadBorderWidth( PS.ALL, PS.ALL, 5);
		PS.BeadBorderColor (PS.ALL, PS.ALL, PS.COLOR_WHITE);
		
		levels = [[6,2,11,4,14,15],
				  [4,7,13,8,10,11],
				  [18,17,2,8,9,12],
				  [12,9,15,7,6,14],
				  [1,10,3,16,5,17],
				  [1,16,13,18,5,3]
				 ];
	
 	}
	// variables reset for new game	
 	firstCard = false;
 	secondCard = false;
 	messageNumber = 1;
 	PS.StatusText ( "How good is your memory?" );
 	PS.Clock(120);

};


// each bead is called to a certain postion and once clicked upon 
// the bead will call which kind it is to turn a match or keep the cards remaining
PS.Click = function (x, y, data, options)
{
	"use strict";
	
//	PS.Debug("clicked!\n");
	//if not a removed card
	if (levels[y][x] != REMOVED_CARD) {
		// flip card or remove card
 		if (firstCard && secondCard) {
//			PS.Debug("cards reset\n");
			//do these match?
			if (levels[firstCardY][firstCardX] == levels[secondCardY][secondCardX]) {
//				PS.Debug("matched!\n");
				PS.BeadColor(firstCardX, firstCardY, PS.COLOR_WHITE);
				PS.BeadColor(secondCardX, secondCardY, PS.COLOR_WHITE);
				//make removed beads not clickable
				levels[firstCardY][firstCardX] = REMOVED_CARD;
				levels[secondCardY][secondCardX] = REMOVED_CARD;
			}
			else 
			{
//				PS.Debug("nope!\n");
				//change colors back to blue
				PS.BeadColor(firstCardX, firstCardY, PS.COLOR_BLUE);
				PS.BeadColor(secondCardX, secondCardY, PS.COLOR_BLUE);
			}			
			firstCard = false;
			secondCard = false;
		}
		//first card clicked
		else if (!firstCard && !secondCard)
		{
			firstCardX = x;
			firstCardY = y;
			
			DrawLevelBead(firstCardX, firstCardY, levels[firstCardY][firstCardX]);
			
			firstCard = true;
		}
		//second card clicked
		else
		{
			if (firstCardX != x || firstCardY != y) {
				secondCardX = x;
				secondCardY = y;
		
// 				PS.Debug("x1: " + firstCardX + ", y1: " + firstCardY + "\n");
// 				PS.Debug(levels[firstCardY][firstCardX] + "\n");
// 				PS.Debug("x2: " + secondCardX + ", y2: " + secondCardY + "\n");
// 				PS.Debug(levels[secondCardY][secondCardX] + "\n");

				DrawLevelBead(secondCardX, secondCardY, levels[secondCardY][secondCardX]);
	
				secondCard = true;
			}
		}
	}
	CheckWin();
};



PS.Release = function (x, y, data, options)
{
	"use strict";

	// Put code here for when the mouse button is released over a bead	
};



PS.Enter = function (x, y, data, options)
{
	"use strict";

	// Put code here for when the mouse enters a bead	
};



PS.Leave = function (x, y, data, options)
{
	"use strict";
	
	// Put code here for when the mouse leaves a bead	
};



PS.KeyDown = function (key, shift, ctrl, options)
{
	"use strict";

	// go to level 2		
	if(key == 49)
	{
		level = 1;
		PS.Init();
	}
		
	// go to level 2		
	if(key == 50)
	{
		level = 2;
		PS.Init();
	}
		
	// go to level 3
	if(key == 51)
	{
		level = 3;
		PS.Init();
	}
	
	// go to level 3
	if(key == 52)
	{
		level = 4;
		PS.Init();
	}
	
};



PS.KeyUp = function (key, shift, ctrl, options)
{
	"use strict";
	
	// Put code here for when a key is released	
};



PS.Wheel = function (dir, options)
{
	"use strict";

	// Put code here for when mouse wheel is moved
};



PS.Tick = function (options)
{
	"use strict";

	if (messageNumber == 2) 
	{
		PS.StatusText ( "Let's have some fun!" );
	}
	if (messageNumber == 3)
	{
		PS.StatusText ( "To change the level press 1,2,3 or 4.");
	}
	if (messageNumber == 4) 
	{
		PS.StatusText ( "Click on the squares to" );
	}
	if (messageNumber == 5) 
	{
		PS.StatusText ( "match colors!" );
	}
	messageNumber++;
};

//check whole board has turned white; player wins level 
function CheckWin()
{
	var win = true;
	for (var  y = 0; y < levels.length; y++)
	{
		for (var x = 0; x < levels[0].length; x++)
		{
			if (levels[y][x] != REMOVED_CARD)
			{
				win = false;
			}
		}
	}
	if (win) {
		PS.StatusText("YOU WON!");
		messageNumber = 5;
	}
};