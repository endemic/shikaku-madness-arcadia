# TODO

[ ] Add "reset data" option to credits view
[ ] Create basic level editor
	[ ] Add 15 or so "beginner" levels
[ ] Extract tutorial config to allow for hints on more puzzles

[x] Copy appcache and webapp manifests to web target
[x] Add a "rules" scene
[x] Create sound effect for placing squares
[x] Finish layout of level select
	[x] Change page label to read "Page 1 of 34" or whatever, and
		move it to above of the thumbnails
	[x] Add a "Completed?" label
	[x] Make completed puzzle thumbnails have a different colored border/background

# Bugs

[x] When instantiating on the first page of level select, user can't go to
    previous pages

# Future

[ ] Create visual effect for removing squares
	- scale up + fade

-------------------

[x] Extract out creating UI elements to own method (LevelSelect)
[x] Vary the gradient background randomly
[x] Finish layout of game
[x] Create tutorial
[x] Update grid.js to allow puzzles smaller than 10x10
[x] Modify localStorage.getObject/setObject to namespace
[x] Handle selecting/starting a puzzle (LevelSelect)
