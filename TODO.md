# TODO

[ ] Add "About" view, similar content to "Credits" but with "more games" and "data reset" buttons
[ ] Add "complete" window/effect w/ buttons
	* Fade out grid
	* Show "complete" box w/ a "next" button
[ ] Create 2 more tutorial levels
[ ] Create basic level editor
[ ] Make more, smaller levels - 10 5x5, 10 6x6, 10 7x7, 10 8x8, 10 9x9, then include the rest of the 10x10, for 170 total
[ ] Group levels by grid size, not "difficulty"
[ ] Run source through JSLint
[ ] Create visual effect for removing squares - scale up + fade
[x] Remove GameScene.ignoreInput
[x] Extract tutorial config to allow for hints on more puzzles
[x] Show red border around locked levels when IAP available
[ ] Transition to IAP scene after finishing intro levels
[ ] Go directly from "start" into "game"
[ ] Create favicon

[x] Copy appcache and webapp manifests to web target
[x] Add a "rules" scene
[x] Create sound effect for placing squares
[x] Finish layout of level select
	[x] Change page label to read "Page 1 of 34" or whatever, and
		move it to above of the thumbnails
	[x] Add a "Completed?" label
	[x] Make completed puzzle thumbnails have a different colored border/background

-------------------

[x] Extract out creating UI elements to own method (LevelSelect)
[x] Vary the gradient background randomly
[x] Finish layout of game
[x] Create tutorial
[x] Update grid.js to allow puzzles smaller than 10x10
[x] Modify localStorage.getObject/setObject to namespace
[x] Handle selecting/starting a puzzle (LevelSelect)
