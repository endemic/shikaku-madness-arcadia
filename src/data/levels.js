// Format: clues: [x, y, number], squares: [x,y,width,height]
// to draw square, (x,y) is lower left
// x/y origin is upper left corner of grid
var LEVELS = [
    {"size":5,"clues":[[1,1,6],[3,1,9],[1,4,4],[4,3,6]],"squares":[[0,2,2,3],[2,2,3,3],[0,4,2,2],[2,4,3,2]]},
    {"size":5,"clues":[[1,1,9],[3,3,10],[4,1,6]],"squares":[[0,2,3,3],[0,4,5,2],[3,2,2,3]]},
    {"size":5,"clues":[[2,0,8],[0,2,5],[2,2,6],[3,3,6]],"squares":[[1,1,4,2],[0,4,1,5],[1,4,2,3],[3,4,2,3]]},
    {"size":5,"clues":[[1,2,12],[3,1,10],[2,4,3]],"squares":[[0,3,3,4],[3,4,2,5],[0,4,3,1]]},
    {"size":5,"clues":[[1,1,6],[3,3,6],[1,3,6],[2,1,3],[4,0,4]],"squares":[[0,2,2,3],[3,4,2,3],[0,4,3,2],[2,2,1,3],[3,1,2,2]]},
    {"size":5,"clues":[[1,1,9],[3,1,5],[1,3,4],[2,4,2],[4,1,3],[4,3,2]],"squares":[[0,2,3,3],[3,4,1,5],[0,4,2,2],[2,4,1,2],[4,2,1,3],[4,4,1,2]]},
    {"size":5,"clues":[[0,0,5],[4,4,4],[3,4,4],[0,1,3],[1,1,2],[1,3,4],[3,3,3]],"squares":[[0,0,5,1],[4,4,1,4],[0,4,4,1],[0,3,1,3],[1,1,2,1],[1,3,2,2],[3,3,1,3]]},
    {"size":5,"clues":[[0,2,10],[2,2,6],[3,0,3],[4,1,3],[3,4,3]],"squares":[[0,4,2,5],[2,3,2,3],[2,0,3,1],[4,3,1,3],[2,4,3,1]]},
    {"size":7,"clues":[[1,1,9],[5,4,9],[1,4,9],[3,2,6],[1,3,3],[6,1,9],[5,0,4]],"squares":[[0,2,3,3],[4,6,3,3],[0,6,3,3],[3,6,1,6],[0,3,3,1],[4,3,3,3],[3,0,4,1]]},
    {"size":7,"clues":[[2,2,9],[1,4,9],[5,4,9],[4,0,9],[0,2,7],[4,6,4],[2,6,2]],"squares":[[1,2,3,3],[1,5,3,3],[4,5,3,3],[4,2,3,3],[0,6,1,7],[3,6,4,1],[1,6,2,1]]},
    {"size":7,"clues":[[2,1,9],[0,1,8],[1,5,6],[3,4,8],[4,4,12],[5,1,6]],"squares":[[2,2,3,3],[0,3,2,4],[0,6,2,3],[2,6,2,4],[4,6,3,4],[5,2,2,3]]},
    {"size":7,"clues":[[1,2,15],[4,3,6],[1,5,8],[5,5,4],[4,1,4],[6,0,4],[6,1,4],[5,2,2],[0,5,2]],"squares":[[0,4,3,5],[3,4,3,2],[1,6,4,2],[5,6,2,2],[3,2,2,2],[3,0,4,1],[6,4,1,4],[5,2,1,2],[0,6,1,2]]},
    {"size":7,"clues":[[2,1,6],[3,2,6],[5,5,6],[4,6,3],[6,2,8],[6,4,2],[4,1,2],[0,2,4],[1,5,6],[2,6,4],[1,3,2]],"squares":[[1,1,3,2],[2,3,3,2],[3,5,3,2],[4,6,3,1],[5,3,2,4],[6,5,1,2],[4,1,1,2],[0,3,1,4],[0,5,3,2],[0,6,4,1],[1,3,1,2]]},
    {"size":7,"clues":[[1,1,9],[6,4,9],[2,4,9],[4,2,9],[4,3,3],[3,0,3],[0,5,4],[2,6,3]],"squares":[[0,2,3,3],[4,6,3,3],[1,5,3,3],[4,2,3,3],[4,3,3,1],[3,2,1,3],[0,6,1,4],[1,6,3,1]]},
    {"size":9,"clues":[[2,0,9],[6,6,16],[3,5,6],[3,7,10],[1,5,8],[0,1,3],[3,3,8],[6,1,9],[7,3,6],[4,2,6]],"squares":[[1,2,3,3],[5,8,4,4],[2,6,3,2],[0,8,5,2],[0,6,2,4],[0,2,1,3],[2,4,4,2],[6,2,3,3],[6,4,3,2],[4,2,2,3]]},
    {"size":9,"clues":[[2,2,10],[4,7,8],[5,2,9],[6,1,10],[7,2,6],[7,6,9],[7,5,3],[1,1,4],[1,4,10],[1,7,4],[2,6,4],[3,6,4]],"squares":[[2,4,2,5],[4,8,2,4],[4,4,3,3],[4,1,5,2],[7,4,2,3],[6,8,3,3],[6,5,3,1],[0,1,2,2],[0,6,2,5],[0,8,2,2],[2,8,1,4],[3,8,1,4]]},
    {"size":9,"clues":[[3,0,14],[4,3,16],[1,4,9],[1,2,3],[2,6,9],[5,6,6],[7,6,6],[8,3,6],[7,3,6],[8,1,3],[0,6,3]],"squares":[[0,1,7,2],[3,5,4,4],[0,5,3,3],[0,2,3,1],[1,8,3,3],[4,8,2,3],[6,8,2,3],[8,8,1,6],[7,5,1,6],[8,2,1,3],[0,8,1,3]]},
    {"size":10,"squares":[[7,9,3,3],[9,6,1,7],[7,6,2,5],[5,1,4,2],[5,4,2,3],[3,8,4,4],[0,9,7,1],[0,8,2,6],[2,8,1,6],[2,2,3,3],[0,2,2,3],[3,4,2,2]],"difficulty":"beginner","clues":[[2,7,6],[5,3,6],[1,1,6],[0,9,7],[0,8,12],[7,6,10],[9,9,9],[6,6,16],[9,3,7],[7,1,8],[4,3,4],[3,1,9]]},
    {"size":10,"squares":[[0,9,3,4],[1,5,3,4],[5,5,5,1],[5,4,5,2],[4,8,1,7],[5,8,3,3],[0,1,7,2],[7,2,3,3],[5,2,2,1],[0,5,1,4],[3,9,7,1],[8,8,2,3],[3,8,1,3]],"difficulty":"beginner","clues":[[9,0,9],[9,5,5],[3,9,7],[2,9,12],[3,8,3],[4,8,7],[8,8,6],[7,8,9],[5,3,10],[5,2,2],[5,1,14],[0,5,4],[1,5,12]]},
    {"size":10,"squares":[[1,6,3,3],[1,3,4,2],[4,6,2,3],[4,8,2,2],[2,9,7,1],[9,9,1,8],[6,8,1,7],[7,8,2,4],[0,9,2,2],[2,8,2,2],[0,7,2,1],[0,6,1,7],[5,3,1,4],[6,1,4,2],[7,4,2,3],[3,1,2,2],[1,1,2,2]],"difficulty":"beginner","clues":[[0,8,4],[1,7,2],[0,5,7],[3,7,4],[5,7,4],[8,7,8],[7,3,6],[6,2,7],[3,3,8],[2,1,4],[3,1,4],[8,9,7],[9,9,8],[9,1,8],[5,2,4],[3,4,9],[4,4,6]]},
    {"size":10,"squares":[[3,9,2,4],[6,9,3,3],[5,9,1,4],[6,6,3,1],[9,9,1,6],[5,5,4,2],[7,3,3,3],[0,0,10,1],[0,9,2,6],[2,9,1,9],[0,3,2,3],[3,5,2,3],[5,3,2,3],[3,2,2,2]],"difficulty":"beginner","clues":[[3,7,8],[5,7,4],[7,4,8],[6,2,6],[4,2,4],[3,4,6],[0,2,6],[7,0,10],[8,2,9],[9,4,6],[8,6,3],[7,8,9],[2,9,9],[1,8,12]]},
    {"size":10,"squares":[[0,9,3,3],[1,5,3,2],[0,6,7,1],[4,9,4,3],[3,9,1,3],[8,9,2,3],[7,6,3,1],[8,5,2,3],[4,5,4,3],[0,5,1,6],[1,3,3,1],[1,2,3,3],[6,2,3,3],[9,2,1,3],[4,2,2,3]],"difficulty":"beginner","clues":[[3,7,3],[8,6,3],[9,8,6],[9,3,6],[2,3,3],[2,0,9],[7,1,9],[0,1,6],[4,1,6],[7,3,12],[9,2,3],[5,6,7],[0,9,9],[5,9,12],[2,4,6]]},
    {"size":10,"squares":[[0,9,2,5],[0,4,1,5],[1,0,7,1],[1,1,4,1],[1,2,5,1],[3,9,1,5],[5,9,1,5],[8,9,1,5],[2,9,1,7],[4,9,1,6],[3,4,1,2],[1,4,1,2],[4,3,2,1],[5,4,5,1],[6,3,4,2],[5,1,3,1],[8,1,2,2],[6,9,2,5],[9,9,1,3],[9,6,1,2]],"difficulty":"beginner","clues":[[0,6,10],[0,3,5],[1,4,2],[2,2,5],[3,1,4],[3,0,7],[3,4,2],[2,4,7],[3,6,5],[4,6,6],[5,3,2],[6,1,3],[9,1,4],[8,2,8],[8,4,5],[8,6,5],[9,5,2],[9,7,3],[6,7,10],[5,6,5]]},
    {"size":10,"squares":[[0,9,3,3],[8,9,2,2],[3,8,2,5],[3,9,5,1],[0,3,3,4],[0,6,3,3],[3,2,2,3],[3,3,4,1],[5,7,3,2],[5,5,5,2],[6,2,4,3],[5,2,1,3],[7,3,3,1],[8,7,2,2],[5,8,3,1]],"difficulty":"beginner","clues":[[3,6,10],[3,2,6],[5,1,3],[7,1,12],[8,3,3],[7,4,10],[7,7,6],[8,6,4],[7,8,3],[6,9,5],[0,9,9],[0,4,9],[0,3,12],[3,3,4],[9,9,4]]},
    {"size":10,"squares":[[0,4,5,5],[5,4,5,5],[2,7,4,3],[6,7,4,3],[6,9,4,2],[0,9,6,2],[0,7,2,3]],"difficulty":"beginner","clues":[[8,6,12],[0,6,6],[4,0,25],[5,0,25],[5,9,12],[4,6,12],[6,8,8]]},
    {"size":10,"squares":[[1,8,3,3],[2,5,4,2],[4,9,3,4],[6,5,3,4],[0,3,5,2],[0,5,2,2],[0,9,1,4],[1,9,3,1],[5,3,1,4],[2,1,3,2],[0,1,2,2],[6,1,4,2],[9,9,1,8],[7,9,2,4]],"difficulty":"beginner","clues":[[0,8,4],[4,7,12],[8,7,8],[9,7,8],[4,4,8],[1,3,10],[6,1,8],[6,5,12],[1,8,9],[1,9,3],[1,4,4],[1,1,4],[2,1,6],[5,3,4]]},
    {"size":10,"squares":[[2,6,2,2],[4,8,1,3],[5,7,2,2],[4,5,1,4],[5,4,2,2],[3,4,1,2],[2,4,1,5],[3,2,1,3],[4,1,4,2],[7,4,3,1],[8,3,2,3],[7,3,1,2],[5,2,2,1],[7,8,3,3],[1,8,1,5],[1,3,1,4],[0,9,5,1],[2,8,2,2],[5,9,5,1],[5,8,2,1],[5,5,5,1],[8,0,2,1],[0,8,1,4],[0,4,1,5]],"difficulty":"beginner","clues":[[2,9,5],[8,9,5],[8,7,9],[5,8,2],[5,7,4],[4,7,3],[3,8,4],[1,7,5],[0,6,4],[0,3,5],[1,2,4],[2,3,5],[3,6,4],[3,4,2],[3,1,3],[4,3,4],[5,3,4],[6,5,5],[8,4,3],[7,3,2],[6,2,2],[6,0,8],[9,2,6],[9,0,2]]},
    {"size":10,"squares":[[8,6,1,7],[9,6,1,7],[5,5,3,3],[5,2,2,3],[7,2,1,3],[0,2,3,3],[0,9,3,3],[0,6,4,2],[0,4,4,2],[3,2,1,3],[3,8,2,2],[4,6,1,7],[7,9,3,3],[5,6,3,1],[3,9,4,1],[5,8,2,2]],"difficulty":"beginner","clues":[[7,0,3],[6,0,6],[8,6,7],[9,6,7],[7,5,9],[4,6,7],[0,9,9],[0,2,9],[3,2,3],[0,3,8],[3,6,8],[9,9,9],[7,6,3],[4,9,4],[4,8,4],[5,8,4]]},
    {"size":10,"squares":[[0,9,1,10],[1,0,9,1],[7,3,3,3],[1,5,3,5],[1,8,3,3],[1,9,9,1],[4,8,4,4],[8,8,2,5],[4,4,4,1],[4,3,3,3]],"difficulty":"beginner","clues":[[0,4,10],[9,1,9],[1,9,9],[1,8,9],[1,0,9],[1,1,15],[4,4,4],[4,3,9],[8,7,10],[7,7,16]]},
    {"size":10,"squares":[[3,6,3,2],[3,4,5,2],[6,8,2,4],[0,9,4,3],[4,9,6,1],[4,8,2,2],[8,8,2,3],[8,5,1,6],[9,5,1,3],[9,2,1,3],[5,2,3,3],[4,2,1,3],[2,2,2,3],[0,4,2,5],[0,6,3,2],[2,4,1,2]],"difficulty":"beginner","clues":[[7,7,8],[9,7,6],[9,5,3],[8,4,6],[9,1,3],[2,1,6],[2,4,2],[4,6,6],[1,6,6],[0,7,12],[5,8,4],[5,9,6],[5,2,9],[4,2,3],[5,3,10],[1,4,10]]},
    {"size":10,"squares":[[0,9,2,3],[0,6,3,3],[0,3,1,4],[7,2,3,3],[4,5,6,3],[7,9,3,4],[5,7,2,2],[5,9,2,2],[4,9,1,4],[6,2,1,3],[4,2,2,1],[4,1,2,2],[3,9,1,10],[1,3,2,2],[1,1,2,2],[2,9,1,3]],"difficulty":"beginner","clues":[[1,9,6],[2,8,3],[4,8,4],[6,7,4],[8,8,12],[2,2,4],[1,0,4],[5,0,4],[5,2,2],[9,0,9],[6,0,3],[0,0,4],[3,4,10],[0,6,9],[6,8,4],[4,4,18]]},
    {"size":10,"squares":[[0,9,1,5],[1,9,1,7],[2,9,1,4],[0,2,4,3],[0,4,1,2],[2,5,2,3],[4,3,3,2],[4,1,3,1],[4,0,6,1],[7,5,1,5],[8,7,2,7],[7,9,3,2],[3,9,4,2],[3,7,5,2],[4,5,3,2]],"difficulty":"beginner","clues":[[0,7,5],[2,8,4],[4,9,8],[4,7,10],[0,3,2],[1,1,12],[5,1,3],[8,8,6],[1,9,7],[9,7,14],[7,5,5],[8,0,6],[4,4,6],[2,3,6],[4,3,6]]},
    {"size":10,"squares":[[0,9,1,10],[7,9,3,3],[7,2,3,3],[4,9,3,5],[1,9,2,5],[1,4,2,5],[3,9,1,8],[3,1,3,2],[6,4,1,5],[4,4,2,3],[7,6,3,4]],"difficulty":"beginner","clues":[[0,6,10],[4,1,6],[5,2,6],[6,4,5],[8,5,12],[1,2,10],[1,8,10],[3,7,8],[5,9,15],[9,0,9],[9,9,9]]},
    {"size":10,"squares":[[0,9,3,3],[0,6,4,3],[0,3,3,4],[3,3,3,2],[4,7,2,4],[3,9,1,3],[4,9,2,2],[7,9,3,3],[3,1,3,2],[6,9,1,8],[7,2,3,3],[6,1,1,2],[7,6,2,4],[9,6,1,4]],"difficulty":"beginner","clues":[[9,9,9],[0,0,12],[2,5,12],[1,8,9],[7,0,9],[7,5,8],[9,4,4],[5,9,4],[4,6,8],[3,9,3],[4,2,6],[4,1,6],[6,2,8],[6,1,2]]},
    {"size":10,"squares":[[0,9,3,3],[0,1,2,2],[0,6,4,3],[2,3,2,4],[0,3,2,2],[3,9,3,3],[6,9,2,3],[4,6,2,2],[4,4,3,3],[8,9,2,4],[6,6,2,2],[8,5,2,4],[5,1,5,2],[4,1,1,2],[7,4,1,3]],"difficulty":"beginner","clues":[[6,5,4],[5,3,9],[7,3,3],[4,0,2],[0,9,9],[5,9,9],[6,9,6],[5,6,4],[8,6,8],[9,5,8],[8,1,10],[1,1,4],[0,2,4],[3,3,8],[2,4,12]]},
    {"size":10,"squares":[[0,9,3,3],[0,6,2,2],[0,4,2,2],[2,6,2,4],[0,2,4,3],[3,9,4,3],[4,6,2,7],[7,9,3,3],[8,6,2,3],[6,6,2,5],[8,1,2,2],[8,3,2,2],[6,1,2,2]],"difficulty":"beginner","clues":[[0,6,4],[8,8,9],[7,5,10],[8,2,4],[9,0,4],[7,0,4],[2,1,12],[0,4,4],[0,9,9],[8,6,6],[6,8,12],[2,6,8],[4,4,14]]},
    {"size":10,"squares":[[0,9,1,4],[1,9,6,1],[1,8,1,6],[0,1,3,2],[0,5,1,4],[1,2,7,1],[3,1,7,1],[8,7,2,6],[7,9,3,2],[2,8,5,2],[7,7,1,5],[3,0,7,1],[4,5,3,3],[2,6,5,1],[2,5,2,3]],"difficulty":"beginner","clues":[[0,8,4],[1,7,6],[3,8,10],[3,6,5],[0,4,4],[1,1,6],[3,4,6],[5,4,9],[5,1,7],[5,0,7],[7,3,5],[8,9,6],[5,2,7],[8,2,12],[1,9,6]]},
    {"size":10,"squares":[[1,9,3,5],[2,4,3,3],[4,7,3,3],[7,9,3,2],[5,9,2,2],[4,9,1,2],[7,7,2,4],[9,7,1,5],[5,4,2,4],[7,3,2,3],[9,2,1,3],[3,0,6,1],[0,1,5,1],[0,0,3,1],[0,9,1,8],[1,4,1,3]],"difficulty":"beginner","clues":[[6,8,4],[4,9,2],[3,3,9],[1,2,3],[3,1,5],[0,7,8],[1,7,15],[1,0,3],[3,0,6],[6,5,9],[6,4,8],[7,5,8],[9,8,6],[9,3,5],[7,3,6],[9,2,3]]},
    {"size":10,"squares":[[7,2,3,3],[3,0,4,1],[6,3,1,3],[3,3,3,3],[0,4,3,5],[0,7,6,3],[3,4,7,1],[7,3,3,1],[6,8,4,4],[0,9,10,1],[0,8,6,1]],"difficulty":"beginner","clues":[[9,0,9],[6,0,4],[6,1,3],[2,2,15],[4,2,9],[7,3,3],[9,4,7],[9,5,16],[0,9,10],[0,8,6],[0,7,18]]},
    {"size":10,"squares":[[3,8,2,4],[0,4,10,1],[1,3,2,4],[0,3,1,4],[3,3,7,1],[3,2,1,3],[4,2,2,3],[6,2,4,3],[5,7,2,3],[0,9,10,1],[7,8,3,4],[5,8,2,1],[0,7,3,2],[0,8,3,1],[0,5,3,1]],"difficulty":"beginner","clues":[[1,8,3],[1,6,6],[1,5,3],[4,6,8],[5,8,2],[5,6,6],[8,7,12],[7,4,10],[7,3,7],[7,1,12],[4,1,6],[3,1,3],[2,2,8],[0,2,4],[1,9,10]]},
    {"size":10,"squares":[[1,6,3,3],[2,9,2,3],[0,9,1,8],[1,9,1,3],[1,3,5,4],[0,1,1,2],[4,9,3,6],[7,9,3,2],[7,7,3,4],[6,2,2,2],[6,3,4,1],[8,2,2,3],[6,0,2,1]],"difficulty":"beginner","clues":[[0,0,2],[8,8,6],[7,3,4],[6,0,2],[9,1,6],[1,9,3],[2,4,9],[1,0,20],[9,4,12],[7,1,4],[0,9,8],[3,7,6],[4,7,18]]},
    {"size":10,"squares":[[0,3,4,4],[0,6,7,3],[0,9,3,3],[3,9,7,1],[3,8,7,2],[7,6,3,3],[4,3,2,3],[4,0,6,1],[7,3,3,2],[6,1,4,1],[6,3,1,2]],"difficulty":"beginner","clues":[[4,9,7],[4,8,14],[2,5,21],[8,5,9],[8,2,6],[6,1,4],[6,0,6],[3,0,16],[6,2,2],[4,1,6],[0,9,9]]},
    {"size":10,"squares":[[2,7,2,3],[0,9,2,3],[2,9,4,2],[0,6,2,4],[4,7,2,2],[4,5,2,2],[2,4,2,2],[0,2,3,3],[3,2,3,3],[4,3,5,1],[6,2,1,3],[7,2,3,3],[6,6,2,3],[7,9,3,3],[6,9,1,3],[9,6,1,4],[8,6,1,3]],"difficulty":"beginner","clues":[[1,8,6],[4,9,8],[3,6,6],[5,7,4],[4,4,4],[3,3,4],[2,1,9],[5,0,9],[6,1,3],[8,4,3],[9,4,4],[7,6,6],[8,8,9],[6,8,3],[9,0,9],[5,3,5],[1,3,8]]},
    {"size":10,"squares":[[0,8,3,3],[1,5,3,3],[4,3,3,2],[2,1,3,2],[5,1,4,2],[7,4,3,3],[4,6,3,3],[8,7,2,3],[7,9,1,5],[8,9,2,2],[4,9,3,3],[3,9,1,4],[0,9,3,1],[0,5,1,6],[1,1,1,2],[1,2,3,1],[9,1,1,2]],"difficulty":"beginner","clues":[[8,8,4],[8,7,6],[7,9,5],[2,9,3],[3,9,4],[4,9,9],[0,8,9],[1,1,2],[1,2,3],[1,3,9],[0,2,6],[4,2,6],[4,4,9],[5,1,8],[9,1,2],[8,3,9],[3,0,6]]},
    {"size":10,"squares":[[0,9,3,4],[3,8,2,6],[3,9,7,1],[5,8,2,3],[7,8,3,4],[7,4,3,2],[7,2,3,3],[5,5,2,6],[3,2,2,3],[0,3,3,3],[0,0,3,1],[0,5,3,2]],"difficulty":"beginner","clues":[[5,9,7],[5,7,6],[8,3,6],[2,0,3],[5,4,12],[9,0,9],[9,6,12],[0,9,12],[3,7,12],[3,2,6],[1,5,6],[1,2,9]]},
    {"size":10,"squares":[[2,6,3,3],[5,9,3,3],[7,6,3,2],[5,6,2,5],[0,3,5,2],[0,1,3,2],[0,9,3,3],[0,6,2,3],[3,8,2,2],[9,9,1,3],[8,9,1,3],[3,1,7,2],[7,4,3,3],[3,9,2,1]],"difficulty":"beginner","clues":[[3,7,4],[4,9,2],[8,7,3],[9,9,3],[8,6,6],[2,0,6],[3,0,14],[3,2,10],[7,4,9],[6,4,10],[3,4,9],[0,6,6],[0,7,9],[5,9,9]]},
    {"size":10,"squares":[[0,9,2,3],[2,9,3,3],[2,6,1,7],[0,6,2,7],[3,6,7,1],[6,5,2,6],[3,5,3,6],[8,2,2,3],[8,5,2,3],[5,9,5,3]],"difficulty":"beginner","clues":[[2,9,9],[1,3,14],[2,3,7],[3,3,18],[1,9,6],[9,6,7],[9,5,6],[9,7,15],[7,2,12],[8,2,6]]},
    {"size":10,"squares":[[3,9,2,4],[2,5,5,2],[7,5,2,3],[7,2,3,3],[4,3,3,4],[9,9,1,7],[7,8,2,3],[5,9,4,1],[5,8,2,3],[0,7,3,2],[0,9,3,2],[0,5,2,3],[0,2,3,3],[2,3,2,1],[3,2,1,3]],"difficulty":"easy","clues":[[1,8,6],[3,8,8],[6,9,4],[7,7,6],[9,8,7],[8,4,6],[5,4,10],[1,7,6],[1,4,6],[3,3,2],[3,2,3],[5,2,12],[6,7,6],[9,0,9],[0,0,9]]},
    {"size":10,"squares":[[0,9,5,1],[0,8,4,1],[1,7,2,2],[0,7,1,5],[1,5,3,4],[3,7,3,2],[4,8,4,1],[5,9,5,1],[8,8,2,5],[6,7,2,3],[4,5,2,4],[0,2,1,3],[1,1,6,2],[7,2,3,3],[6,4,1,3],[7,4,1,2],[8,3,2,1]],"difficulty":"easy","clues":[[2,8,4],[4,7,6],[2,7,4],[0,5,5],[2,0,12],[4,3,8],[0,1,3],[7,6,6],[1,9,5],[5,8,4],[8,9,5],[8,7,10],[7,4,2],[6,3,3],[9,3,2],[9,0,9],[2,5,12]]},
    {"size":10,"squares":[[4,7,1,7],[5,7,4,1],[5,6,2,2],[5,4,1,3],[6,3,1,2],[6,4,3,1],[7,6,3,2],[9,9,1,3],[5,9,4,2],[4,9,1,2],[0,9,4,1],[3,8,1,6],[0,8,3,1],[0,7,3,5],[1,2,2,3],[0,2,1,3],[3,2,1,3],[4,0,6,1],[5,1,5,1],[7,2,3,1],[9,4,1,2],[7,3,2,1]],"difficulty":"easy","clues":[[9,0,6],[8,1,5],[8,2,3],[8,3,2],[8,4,3],[9,4,2],[9,6,6],[9,8,3],[7,7,4],[7,8,8],[5,6,4],[6,2,2],[5,3,3],[3,1,3],[0,1,3],[1,4,15],[3,4,6],[4,5,7],[4,8,2],[2,8,3],[3,9,4],[1,2,6]]},
    {"size":10,"squares":[[0,9,1,6],[0,3,5,3],[0,0,10,1],[7,2,3,2],[3,9,7,1],[1,9,2,3],[1,6,5,1],[3,8,4,2],[7,8,3,3],[8,5,2,3],[6,6,1,5],[7,5,1,3],[1,5,5,2],[5,1,2,1],[5,3,1,2]],"difficulty":"easy","clues":[[0,7,6],[2,8,6],[6,7,8],[4,6,5],[4,4,10],[5,3,2],[8,1,6],[3,1,15],[9,0,10],[6,1,2],[9,3,6],[7,3,3],[9,8,9],[9,9,7],[6,6,5]]},
    {"size":10,"squares":[[0,9,4,4],[0,5,4,2],[0,3,4,4],[4,9,5,3],[4,6,4,3],[9,9,1,7],[8,6,1,4],[7,2,3,3],[4,3,4,1],[4,2,3,3]],"difficulty":"easy","clues":[[2,7,16],[5,7,15],[5,4,12],[3,5,8],[3,2,16],[5,3,4],[5,1,9],[9,1,9],[8,4,4],[9,6,7]]},
    {"size":10,"squares":[[0,9,4,4],[4,5,4,4],[8,1,2,2],[0,2,3,3],[7,9,3,3],[1,5,3,3],[3,2,1,3],[4,1,4,2],[8,6,2,3],[8,3,2,2],[4,6,4,1],[4,9,3,3],[0,5,1,3]],"difficulty":"easy","clues":[[0,0,9],[7,1,8],[8,2,4],[8,1,4],[7,2,16],[7,6,4],[7,7,9],[6,7,9],[8,6,6],[0,3,3],[3,2,3],[3,6,16],[3,5,9]]},
    {"size":10,"squares":[[1,8,3,4],[0,9,7,1],[4,8,3,3],[7,9,3,4],[0,8,1,9],[1,3,3,4],[1,4,6,1],[4,5,6,1],[4,3,3,3],[4,0,6,1],[7,4,3,4]],"difficulty":"easy","clues":[[5,7,9],[5,9,7],[8,8,12],[0,5,9],[5,5,6],[2,1,12],[8,0,6],[2,4,6],[1,7,12],[4,2,9],[7,1,12]]},
    {"size":10,"squares":[[7,2,3,3],[4,3,6,1],[1,3,3,3],[5,2,2,2],[2,0,5,1],[4,2,1,2],[0,0,2,1],[0,5,1,5],[1,5,5,2],[7,5,3,2],[8,9,2,4],[7,9,1,4],[6,8,1,5],[0,9,7,1],[4,8,2,3],[0,8,3,3],[3,8,1,3]],"difficulty":"easy","clues":[[9,0,9],[4,2,2],[5,2,4],[6,3,6],[6,6,5],[1,7,9],[3,4,10],[0,3,5],[2,0,5],[1,0,2],[1,3,9],[9,5,6],[9,6,8],[7,9,4],[6,9,7],[4,8,6],[3,8,3]]},
    {"size":10,"squares":[[1,8,2,2],[0,6,4,3],[0,9,1,3],[1,9,9,1],[3,8,5,2],[8,8,2,4],[4,6,4,3],[2,3,4,3],[0,3,2,4],[2,0,8,1],[8,4,2,4],[6,3,2,3]],"difficulty":"easy","clues":[[0,8,3],[1,7,4],[6,5,12],[4,2,12],[9,9,9],[9,7,8],[9,4,8],[6,7,10],[1,5,12],[4,0,8],[6,1,6],[1,0,8]]},
    {"size":10,"squares":[[0,9,1,10],[1,0,9,1],[1,9,3,3],[1,6,3,2],[1,4,3,2],[1,2,5,2],[4,6,2,4],[4,9,3,2],[4,7,6,1],[7,9,3,2],[8,6,2,3],[6,3,3,3],[6,6,2,3],[9,3,1,3]],"difficulty":"easy","clues":[[0,6,10],[3,5,6],[5,4,8],[8,5,6],[1,9,9],[6,7,6],[7,4,6],[9,0,9],[8,1,9],[5,8,6],[8,8,6],[9,3,3],[3,1,10],[1,3,6]]},
    {"size":10,"squares":[[0,9,2,5],[2,8,2,5],[0,1,3,2],[0,4,2,1],[0,3,4,2],[3,1,3,2],[4,4,3,3],[6,1,2,2],[8,6,2,7],[7,8,1,7],[2,9,8,1],[8,8,2,1],[8,7,2,1],[4,5,3,1],[4,7,3,2],[4,8,3,1]],"difficulty":"easy","clues":[[1,0,6],[4,0,6],[5,3,9],[5,5,3],[6,6,6],[6,8,3],[7,9,8],[7,8,7],[9,8,2],[9,5,14],[7,0,4],[8,7,2],[0,9,10],[0,4,2],[2,3,8],[2,4,10]]},
    {"size":10,"squares":[[7,2,3,3],[0,2,7,3],[0,5,4,3],[7,4,3,2],[7,9,3,5],[4,7,3,5],[0,9,7,2],[0,7,4,2]],"difficulty":"easy","clues":[[4,8,14],[9,8,15],[8,4,6],[4,2,21],[2,7,8],[5,3,15],[2,3,12],[9,0,9]]},
    {"size":10,"squares":[[2,8,2,3],[4,8,1,6],[4,2,1,3],[5,6,1,5],[7,8,1,5],[8,8,1,5],[7,1,1,2],[8,3,1,4],[7,3,1,2],[6,2,1,3],[5,1,1,2],[9,7,1,5],[9,2,1,3],[9,9,1,2],[4,9,5,1],[5,8,2,1],[5,7,2,1],[6,6,1,4],[0,9,4,1],[0,7,1,5],[0,8,2,1],[2,5,2,3],[1,7,1,6],[0,2,1,3],[1,1,3,2],[2,2,2,1]],"difficulty":"easy","clues":[[2,9,4],[1,8,2],[0,6,5],[1,4,6],[3,7,6],[0,1,3],[3,0,6],[3,2,2],[4,4,6],[4,1,3],[5,4,5],[6,8,2],[7,9,5],[6,7,2],[9,8,2],[9,5,5],[8,2,4],[8,4,5],[7,2,2],[6,1,3],[5,1,2],[6,3,4],[7,1,2],[9,1,3],[7,7,5],[2,5,6]]},
    {"size":10,"squares":[[0,9,3,4],[0,5,10,1],[0,1,10,1],[2,4,4,3],[7,4,3,3],[6,4,1,3],[0,4,2,2],[0,2,2,1],[0,0,4,1],[4,0,6,1],[3,7,2,2],[5,7,5,2],[7,9,3,2],[3,9,4,2]],"difficulty":"easy","clues":[[1,7,12],[4,8,8],[7,7,10],[9,9,6],[6,5,10],[6,3,3],[8,3,9],[3,3,12],[1,3,4],[0,2,2],[2,1,10],[2,0,4],[5,0,6],[4,6,4]]},
    {"size":10,"squares":[[0,3,5,4],[2,6,3,3],[0,9,3,3],[0,6,2,3],[7,9,3,3],[7,5,3,3],[8,2,2,3],[5,2,3,3],[5,6,2,4],[3,9,4,3],[7,6,3,1]],"difficulty":"easy","clues":[[1,8,9],[8,4,9],[8,6,3],[9,9,9],[1,6,6],[6,6,8],[5,7,12],[0,0,20],[2,6,9],[8,0,6],[7,0,9]]},
    {"size":10,"squares":[[0,9,4,4],[0,4,4,2],[0,5,6,1],[4,9,3,4],[4,3,2,2],[4,4,4,1],[0,2,4,3],[4,1,6,2],[6,3,4,2],[6,5,4,1],[8,4,2,1],[7,9,3,3],[7,6,3,1]],"difficulty":"easy","clues":[[3,8,16],[6,7,12],[8,8,9],[7,6,3],[7,5,4],[4,5,6],[5,4,4],[8,4,2],[7,3,8],[5,2,4],[3,4,8],[2,1,12],[5,0,12]]},
    {"size":10,"squares":[[0,9,1,6],[1,9,3,6],[0,2,3,3],[0,3,10,1],[3,2,7,3],[4,6,4,3],[4,9,4,3],[8,9,2,6]],"difficulty":"easy","clues":[[0,7,6],[2,6,18],[0,0,9],[4,1,21],[1,3,10],[7,7,12],[7,6,12],[9,7,12]]},
    {"size":10,"squares":[[0,9,2,4],[1,5,2,4],[2,1,4,2],[3,5,4,4],[5,9,3,4],[8,9,2,4],[7,5,3,4],[6,1,4,2],[2,9,3,4],[0,5,1,6],[1,1,1,2]],"difficulty":"easy","clues":[[1,3,8],[0,2,6],[1,1,2],[4,0,8],[3,2,16],[9,9,8],[7,8,12],[4,9,12],[1,7,8],[8,1,8],[8,2,12]]},
    {"size":10,"squares":[[0,9,3,3],[1,6,3,3],[2,3,3,3],[5,3,3,3],[6,6,3,3],[7,9,3,3],[3,9,4,3],[4,6,2,3],[0,3,2,4],[8,3,2,4],[2,0,6,1],[9,6,1,3],[0,6,1,3]],"difficulty":"easy","clues":[[9,9,9],[8,3,8],[7,3,9],[8,4,9],[4,8,12],[2,0,6],[5,6,6],[9,4,3],[0,7,9],[0,6,3],[1,6,9],[1,0,8],[2,1,9]]},
    {"size":10,"squares":[[0,9,1,7],[0,1,4,2],[0,2,6,1],[1,4,5,2],[1,8,3,4],[1,9,9,1],[4,8,3,4],[4,1,3,2],[7,8,3,4],[6,4,1,3],[7,2,3,3],[7,4,3,2]],"difficulty":"easy","clues":[[9,1,9],[5,1,6],[7,3,6],[4,2,6],[4,4,10],[1,0,8],[0,6,7],[4,9,9],[9,6,12],[6,3,3],[3,8,12],[5,7,12]]},
    {"size":10,"squares":[[1,8,2,3],[3,7,4,3],[0,9,1,7],[0,2,3,3],[1,4,4,2],[1,5,2,1],[3,2,4,1],[3,1,2,2],[5,4,5,2],[7,9,2,5],[9,9,1,5],[4,9,3,2],[3,9,1,2],[1,9,2,1],[7,2,3,3],[5,0,2,1],[5,1,2,1]],"difficulty":"easy","clues":[[5,6,12],[3,9,2],[2,9,2],[1,7,6],[2,5,2],[9,7,5],[6,0,2],[3,0,4],[2,3,8],[2,2,9],[5,1,2],[4,2,4],[7,2,9],[7,3,10],[0,9,7],[6,9,6],[7,9,10]]},
    {"size":10,"squares":[[0,6,3,2],[0,8,3,2],[0,9,5,1],[3,8,1,5],[2,3,1,2],[0,4,3,1],[0,1,5,2],[0,3,2,2],[3,3,3,2],[9,9,1,5],[5,9,4,1],[4,8,2,2],[6,8,3,2],[4,6,4,2],[8,6,1,7],[9,4,1,5],[4,4,4,1],[5,1,1,2],[6,3,2,4]],"difficulty":"easy","clues":[[2,9,5],[2,7,6],[2,5,6],[3,4,5],[2,4,3],[5,7,4],[7,9,4],[2,3,2],[0,2,4],[2,0,10],[5,0,2],[3,3,6],[7,3,8],[7,4,4],[7,5,8],[8,4,7],[9,5,5],[9,4,5],[8,7,6]]},
    {"size":10,"squares":[[0,9,3,4],[0,5,6,3],[3,9,2,4],[5,9,3,4],[8,9,2,4],[6,5,4,3],[0,2,5,3],[5,2,5,3]],"difficulty":"easy","clues":[[4,7,8],[6,8,12],[9,7,8],[3,1,15],[3,3,18],[6,1,15],[6,3,12],[0,6,12]]},
    {"size":10,"squares":[[3,9,1,6],[4,7,3,2],[4,9,3,1],[4,8,3,1],[7,9,3,2],[7,7,1,7],[8,6,2,2],[8,7,2,1],[9,4,1,4],[8,4,1,4],[4,5,2,3],[6,5,1,5],[2,2,4,2],[0,3,4,1],[0,2,2,3],[2,0,8,1],[0,9,3,1],[0,8,3,2],[0,6,3,3]],"difficulty":"easy","clues":[[2,9,3],[2,7,6],[2,3,4],[1,1,6],[3,1,8],[5,4,6],[6,5,5],[6,7,6],[6,9,3],[9,5,4],[9,2,4],[5,8,3],[8,4,4],[7,2,7],[8,7,2],[8,8,6],[3,6,6],[2,6,9],[3,0,8]]},
    {"size":10,"squares":[[2,5,3,3],[5,9,5,4],[5,5,5,6],[0,2,5,3],[0,9,2,7],[2,9,3,4]],"difficulty":"easy","clues":[[3,7,12],[3,4,9],[6,4,30],[4,1,15],[8,8,20],[0,5,14]]},
    {"size":10,"squares":[[1,9,3,5],[0,2,4,3],[7,9,3,3],[4,7,3,3],[4,4,3,3],[4,1,6,2],[7,3,3,2],[7,6,3,3],[4,9,3,2],[0,9,1,7],[1,3,3,1],[1,4,3,1]],"difficulty":"easy","clues":[[2,4,3],[8,8,9],[5,3,9],[8,2,6],[6,1,12],[0,9,7],[2,9,15],[4,9,6],[3,3,3],[6,5,9],[8,6,9],[2,1,12]]},
    {"size":10,"squares":[[0,8,6,5],[1,3,4,4],[6,8,3,4],[5,3,3,4],[6,4,4,1],[8,3,2,4],[0,3,1,4],[0,9,10,1],[9,8,1,4]],"difficulty":"easy","clues":[[8,8,12],[9,8,4],[8,4,4],[8,3,8],[0,3,4],[1,3,16],[5,3,12],[8,9,10],[0,4,30]]},
    {"size":10,"squares":[[0,9,2,5],[0,4,1,5],[1,0,6,1],[1,1,4,1],[5,4,2,4],[1,4,2,3],[3,9,2,8],[2,9,1,5],[5,9,5,1],[5,8,5,2],[5,6,5,1],[5,5,3,1],[8,5,2,6],[7,4,1,5]],"difficulty":"easy","clues":[[1,6,10],[1,4,6],[2,5,5],[0,3,5],[3,1,4],[3,0,6],[6,2,8],[7,2,5],[6,5,3],[7,6,5],[8,9,5],[3,4,16],[9,8,10],[8,3,12]]},
    {"size":10,"squares":[[2,8,1,4],[0,9,6,1],[3,8,3,2],[0,8,2,2],[0,6,1,7],[1,6,1,3],[1,3,2,4],[2,4,5,1],[3,6,3,2],[6,9,2,5],[9,9,1,10],[8,9,1,9],[3,0,6,1],[7,4,1,4],[4,3,3,3],[3,3,1,3]],"difficulty":"easy","clues":[[3,9,6],[1,8,4],[4,4,5],[7,8,10],[7,3,4],[5,1,9],[3,2,3],[4,0,6],[9,1,10],[8,3,9],[3,6,6],[3,7,6],[2,7,4],[0,0,7],[1,4,3],[1,3,8]]},
    {"size":10,"squares":[[0,9,3,3],[1,6,2,2],[0,6,1,4],[0,2,3,3],[1,4,4,2],[3,8,2,4],[3,9,7,1],[5,8,4,3],[3,1,4,2],[3,2,7,1],[7,1,3,2],[5,5,2,3],[7,5,2,3],[9,8,1,6]],"difficulty":"easy","clues":[[3,9,7],[5,7,12],[9,6,6],[8,4,6],[8,2,7],[8,0,6],[0,5,4],[1,1,9],[4,7,8],[1,9,9],[3,1,8],[1,3,8],[1,5,4],[5,5,6]]},
    {"size":10,"squares":[[0,9,3,6],[3,9,3,7],[0,1,7,2],[0,3,3,1],[0,2,8,1],[6,6,4,2],[6,4,3,2],[9,4,1,5],[8,2,1,3],[7,1,1,2],[6,8,3,2],[6,9,4,1],[9,8,1,2]],"difficulty":"medium","clues":[[8,9,4],[7,3,6],[9,3,5],[8,0,3],[5,2,8],[7,1,2],[3,1,14],[0,3,3],[1,8,18],[3,6,21],[6,8,6],[9,8,2],[7,6,8]]},
    {"size":10,"squares":[[0,9,2,3],[2,9,4,2],[7,9,3,2],[6,9,1,5],[8,7,2,2],[7,7,1,5],[8,4,2,2],[8,5,2,1],[6,2,4,2],[5,0,5,1],[2,3,4,3],[4,7,2,3],[6,4,1,2],[0,4,6,1],[2,7,2,3],[0,6,2,2],[0,3,2,4],[2,0,3,1]],"difficulty":"medium","clues":[[0,6,4],[3,6,6],[5,5,6],[6,7,5],[8,9,6],[7,6,5],[9,6,4],[9,5,2],[9,3,4],[6,3,2],[4,2,12],[4,4,6],[3,0,3],[9,0,5],[9,1,8],[0,9,6],[2,9,8],[1,2,8]]},
    {"size":10,"squares":[[0,2,3,3],[3,5,3,3],[6,8,3,3],[6,5,3,3],[3,2,3,3],[6,2,3,3],[0,5,3,3],[0,8,3,3],[3,8,3,3],[9,9,1,10],[0,9,9,1]],"difficulty":"medium","clues":[[1,7,9],[4,4,9],[1,1,9],[2,9,9],[5,6,9],[7,8,9],[9,2,10],[8,5,9],[7,0,9],[3,1,9],[0,4,9]]},
    {"size":10,"squares":[[0,9,2,3],[2,9,2,4],[0,6,1,4],[1,6,1,2],[2,5,5,1],[1,4,4,1],[0,2,2,3],[1,3,6,1],[2,2,2,3],[4,2,1,3],[5,2,5,2],[5,0,5,1],[7,6,3,4],[5,4,2,1],[8,8,2,2],[7,9,3,1],[5,8,3,2],[4,9,3,1],[4,8,1,3],[5,6,2,1]],"difficulty":"medium","clues":[[1,8,6],[2,8,8],[1,6,2],[0,5,4],[3,4,4],[4,5,5],[4,6,3],[5,9,3],[6,8,6],[8,9,3],[8,8,4],[6,6,2],[6,4,2],[5,3,6],[4,1,3],[2,1,6],[1,1,6],[6,0,5],[7,2,10],[8,4,12]]},
    {"size":10,"squares":[[0,8,4,5],[0,3,6,4],[4,8,4,5],[0,9,10,1],[6,3,4,4],[8,8,2,5]],"difficulty":"medium","clues":[[4,9,10],[7,2,16],[1,5,20],[6,7,20],[9,6,10],[3,2,24]]},
    {"size":10,"squares":[[8,3,2,4],[4,3,4,4],[1,6,3,6],[0,0,4,1],[0,6,1,6],[0,9,3,3],[3,9,5,3],[8,9,2,6],[4,6,4,3]],"difficulty":"medium","clues":[[2,4,18],[4,8,15],[6,5,12],[9,6,12],[8,2,8],[5,1,16],[2,0,4],[1,8,9],[0,2,6]]},
    {"size":10,"squares":[[0,9,2,2],[0,7,3,3],[2,9,4,2],[0,4,4,3],[0,1,5,2],[4,7,3,5],[3,7,1,3],[6,9,3,2],[9,9,1,6],[7,7,2,4],[7,3,3,3],[5,0,5,1],[4,2,3,1],[5,1,2,1]],"difficulty":"medium","clues":[[9,0,5],[9,4,6],[4,9,8],[0,8,4],[2,0,10],[6,1,2],[5,2,3],[5,5,15],[1,6,9],[1,4,12],[3,6,3],[8,2,9],[8,4,8],[7,8,6]]},
    {"size":10,"squares":[[3,6,4,3],[7,7,1,6],[3,9,3,3],[6,9,1,3],[7,9,3,2],[8,7,2,3],[8,4,2,3],[4,1,6,2],[0,0,3,1],[0,5,2,5],[0,9,2,4],[2,9,1,9],[3,3,1,4],[4,3,3,2]],"difficulty":"medium","clues":[[1,4,10],[4,5,12],[5,8,9],[6,8,3],[7,6,6],[9,6,6],[9,3,6],[5,2,6],[2,0,3],[1,8,8],[2,9,9],[3,3,4],[9,1,12],[9,8,6]]},
    {"size":10,"squares":[[3,6,4,4],[1,9,6,3],[7,9,3,8],[3,1,7,2],[0,9,1,10],[1,6,2,4],[1,2,6,1],[1,1,2,2]],"difficulty":"medium","clues":[[0,6,10],[4,4,16],[3,2,6],[1,0,4],[8,6,24],[1,5,8],[4,8,18],[7,1,14]]},
    {"size":10,"squares":[[0,9,4,7],[0,1,10,2],[0,2,4,1],[4,9,6,8]],"difficulty":"medium","clues":[[1,2,4],[2,7,28],[5,6,48],[7,1,20]]},
    {"size":10,"squares":[[1,8,3,3],[6,8,3,3],[1,3,3,3],[6,3,3,3],[4,5,2,2],[0,0,4,1],[4,0,6,1],[9,6,1,6],[9,9,1,3],[5,9,4,1],[0,9,5,1],[0,8,1,3],[0,5,1,5],[1,5,2,2],[3,5,1,2],[4,8,1,3],[5,8,1,3],[4,1,2,1],[4,3,2,2],[6,5,3,1],[6,4,3,1]],"difficulty":"medium","clues":[[3,9,5],[7,9,4],[9,8,3],[7,6,9],[5,7,3],[4,7,3],[1,7,9],[0,7,3],[0,4,5],[1,5,4],[3,5,2],[5,5,4],[6,5,3],[7,4,3],[4,2,4],[2,2,9],[5,1,2],[7,2,9],[8,0,6],[2,0,4],[9,4,6]]},
    {"size":10,"squares":[[1,8,2,3],[3,8,3,4],[4,4,1,3],[2,4,2,3],[0,5,3,1],[0,9,6,1],[0,8,1,3],[6,9,3,3],[9,9,1,7],[8,2,2,3],[7,6,2,4],[6,6,1,4],[5,4,1,4],[6,2,2,3],[0,0,6,1],[0,1,5,1],[0,4,2,3]],"difficulty":"medium","clues":[[1,9,6],[0,7,3],[1,7,6],[1,5,3],[0,3,6],[3,3,6],[3,1,5],[3,0,6],[5,2,4],[4,3,3],[7,1,6],[6,4,4],[8,5,8],[9,5,7],[7,8,9],[4,7,12],[9,2,6]]},
    {"size":10,"squares":[[0,9,1,7],[0,2,3,1],[0,1,5,2],[3,5,2,4],[5,7,1,4],[6,7,2,2],[2,9,2,2],[1,7,3,2],[1,5,2,3],[4,9,1,4],[1,9,1,2],[5,9,5,1],[5,8,3,1],[8,8,2,4],[6,4,1,5],[5,3,1,4],[6,5,2,1],[7,4,3,2],[7,2,3,3]],"difficulty":"medium","clues":[[0,9,7],[1,9,2],[2,1,10],[3,4,8],[2,7,6],[1,4,6],[3,8,4],[4,8,4],[6,9,5],[6,8,3],[5,6,4],[7,7,4],[9,7,8],[7,5,2],[8,3,6],[6,3,5],[5,1,4],[1,2,3],[9,0,9]]},
    {"size":10,"squares":[[2,9,5,2],[7,9,2,4],[9,9,1,6],[8,3,2,4],[0,9,1,4],[1,9,1,7],[0,5,1,6],[1,2,2,3],[2,7,2,5],[6,2,2,3],[6,5,3,2],[4,7,3,2],[4,3,4,1],[4,5,2,2],[3,2,3,3]],"difficulty":"medium","clues":[[0,7,4],[0,4,6],[1,1,6],[3,5,10],[4,9,10],[5,6,6],[8,8,8],[9,7,6],[8,4,6],[5,4,4],[6,3,4],[7,1,6],[9,2,8],[1,9,7],[3,2,9]]},
    {"size":10,"squares":[[1,7,3,3],[0,9,1,5],[1,9,5,2],[0,4,5,2],[4,7,4,2],[6,9,4,2],[8,7,2,5],[4,5,4,1],[5,4,3,2],[2,2,4,2],[0,2,2,3],[6,2,4,3],[2,0,4,1]],"difficulty":"medium","clues":[[0,7,5],[2,8,10],[2,6,9],[1,3,10],[1,2,6],[4,1,8],[4,0,4],[7,1,12],[7,4,6],[8,4,10],[6,5,4],[6,6,8],[7,9,8]]},
    {"size":10,"squares":[[4,5,2,2],[3,5,1,3],[3,6,3,1],[6,6,1,3],[4,3,3,1],[4,2,2,3],[7,5,3,2],[4,9,2,3],[0,5,3,2],[1,3,2,2],[7,3,2,2],[6,8,2,2],[0,6,3,1],[7,6,3,1],[6,2,1,3],[3,2,1,3],[6,9,4,1],[2,8,2,2],[0,9,4,1],[9,3,1,4],[0,3,1,4],[8,8,2,2],[0,8,2,2],[1,1,2,2],[7,1,2,2]],"difficulty":"medium","clues":[[2,9,4],[1,8,4],[3,8,4],[5,8,6],[7,9,4],[8,6,3],[6,5,3],[5,6,3],[1,6,3],[1,4,6],[3,4,3],[5,4,4],[5,3,3],[8,4,6],[7,3,4],[9,2,4],[8,0,4],[4,1,6],[3,1,3],[1,1,4],[0,2,4],[6,0,3],[9,8,4],[2,2,4],[7,7,4]]},
    {"size":10,"squares":[[3,7,3,3],[3,9,3,2],[6,9,2,3],[8,9,2,2],[8,7,2,2],[6,6,2,3],[0,3,3,3],[0,5,3,2],[3,4,1,5],[5,4,1,5],[4,2,1,3],[4,4,1,2],[8,5,2,3],[0,0,3,1],[6,0,4,1],[8,2,2,2],[6,3,2,3],[2,9,1,4],[0,7,2,2],[0,9,2,2]],"difficulty":"medium","clues":[[0,9,4],[1,6,4],[4,8,6],[9,9,4],[9,7,4],[8,4,6],[7,2,6],[9,1,4],[5,1,5],[4,1,3],[3,3,5],[2,0,3],[1,2,9],[1,4,6],[7,9,6],[2,9,4],[4,3,2],[9,0,4],[4,6,9],[6,6,6]]},
    {"size":10,"squares":[[0,9,1,6],[3,9,1,8],[1,9,2,6],[0,3,3,2],[4,7,3,2],[4,5,3,4],[7,8,3,6],[1,1,6,2],[7,2,2,3],[9,2,1,3],[0,1,1,2],[4,9,6,1],[4,8,3,1]],"difficulty":"medium","clues":[[5,7,6],[5,4,12],[1,2,6],[0,1,2],[9,1,3],[7,6,18],[8,9,6],[4,8,3],[3,5,8],[0,5,6],[1,7,12],[3,1,12],[7,0,6]]},
    {"size":10,"squares":[[0,9,3,6],[0,3,6,4],[3,6,3,3],[7,9,3,9],[7,0,3,1],[6,9,1,10],[3,9,3,3]],"difficulty":"medium","clues":[[3,5,9],[4,7,9],[3,1,24],[8,0,3],[1,8,18],[8,4,27],[6,9,10]]},
    {"size":10,"squares":[[1,4,6,3],[7,3,3,3],[5,0,5,1],[0,1,7,1],[0,0,5,1],[0,6,1,5],[1,7,3,3],[0,9,1,3],[1,9,5,2],[7,9,3,3],[6,9,1,2],[7,6,2,3],[9,6,1,3],[5,7,2,3],[4,7,1,3]],"difficulty":"medium","clues":[[0,8,3],[2,6,9],[3,9,10],[5,6,6],[6,8,2],[8,9,9],[9,5,3],[8,2,9],[5,1,7],[3,0,5],[8,0,5],[6,3,18],[8,6,6],[4,5,3],[0,3,5]]},
    {"size":10,"squares":[[0,9,1,10],[9,9,1,10],[1,2,3,3],[6,9,3,3],[1,9,5,3],[4,2,5,3],[1,6,4,4],[5,6,4,4]],"difficulty":"medium","clues":[[2,8,15],[6,5,16],[9,5,10],[0,4,10],[3,4,16],[7,1,15],[2,1,9],[7,8,9]]},
    {"size":10,"squares":[[3,8,2,6],[6,8,3,3],[5,5,3,3],[5,8,1,3],[7,9,3,1],[2,9,5,1],[0,9,1,5],[1,9,1,7],[2,8,1,5],[2,3,1,4],[0,2,2,3],[0,4,1,2],[3,2,2,2],[3,0,4,1],[7,2,3,3],[8,5,2,3],[5,2,2,2],[9,8,1,3]],"difficulty":"medium","clues":[[8,9,3],[6,9,5],[5,7,3],[7,7,9],[9,7,3],[9,4,6],[5,1,4],[1,1,6],[0,3,2],[0,6,5],[8,2,9],[6,4,9],[4,5,12],[2,6,5],[1,9,7],[2,3,4],[4,2,4],[3,0,4]]},
    {"size":10,"squares":[[2,8,5,5],[2,3,7,4],[7,9,3,6],[0,9,2,8],[2,9,5,1],[9,3,1,4],[0,1,2,2]],"difficulty":"medium","clues":[[0,7,16],[4,9,5],[4,6,25],[8,6,18],[5,1,28],[0,0,4],[9,2,4]]},
    {"size":10,"squares":[[0,9,1,10],[1,8,1,9],[2,2,3,3],[2,5,3,3],[2,8,3,3],[1,9,9,1],[7,8,3,3],[5,5,3,3],[6,2,3,3],[8,5,2,3],[9,2,1,3],[5,2,1,3],[5,8,2,3]],"difficulty":"medium","clues":[[0,6,10],[3,7,9],[5,7,6],[3,4,9],[3,1,9],[5,1,3],[9,2,3],[9,4,6],[8,7,9],[6,4,9],[7,1,9],[1,1,9],[7,9,9]]},
    {"size":10,"squares":[[2,7,4,4],[6,3,4,4],[6,7,2,4],[2,3,4,2],[2,1,4,2],[8,7,2,4],[6,9,4,2],[2,9,4,2],[0,3,2,4],[0,7,2,4],[0,9,2,2]],"difficulty":"medium","clues":[[1,8,4],[4,8,8],[0,6,8],[7,8,8],[9,6,8],[4,2,8],[0,2,8],[8,1,16],[6,5,8],[3,6,16],[2,0,8]]},
    {"size":10,"squares":[[2,7,2,3],[4,6,1,2],[1,4,5,2],[0,9,6,1],[1,8,5,1],[0,8,1,5],[1,7,1,3],[0,3,1,4],[1,2,3,3],[4,1,3,2],[4,2,6,1],[7,1,3,1],[7,0,3,1],[9,9,1,7],[4,7,5,1],[6,9,3,2],[5,6,2,2],[7,6,2,4],[6,4,1,2]],"difficulty":"medium","clues":[[3,9,6],[3,8,5],[1,6,3],[0,5,5],[0,2,4],[3,5,6],[4,6,2],[5,7,5],[6,5,4],[7,9,6],[9,7,7],[8,5,8],[8,1,3],[6,0,6],[6,4,2],[2,0,9],[5,2,6],[2,4,10],[9,0,3]]},
    {"size":10,"squares":[[1,9,1,6],[0,3,3,4],[0,9,1,6],[2,7,7,4],[2,9,8,2],[9,7,1,8],[3,3,4,4],[7,3,2,4]],"difficulty":"medium","clues":[[3,6,28],[1,2,12],[4,1,16],[7,1,8],[9,5,8],[0,8,6],[1,7,6],[6,8,16]]},
    {"size":10,"squares":[[1,7,8,2],[0,4,10,1],[1,3,8,2],[0,5,7,1],[7,5,3,1],[9,9,1,4],[5,9,4,2],[0,9,5,2],[0,7,1,2],[0,3,1,4],[1,1,4,2],[5,1,5,2],[9,3,1,2]],"difficulty":"medium","clues":[[4,9,10],[3,6,16],[6,8,8],[9,7,4],[0,7,2],[1,5,7],[2,4,10],[8,5,3],[9,2,2],[5,3,16],[2,1,8],[0,2,4],[7,1,10]]},
    {"size":10,"squares":[[0,6,6,3],[2,3,6,4],[6,7,4,4],[4,9,2,3],[0,3,2,4],[8,3,2,4],[6,9,4,2],[0,9,4,3]],"difficulty":"medium","clues":[[2,8,12],[7,8,8],[7,6,16],[5,2,24],[9,2,8],[1,1,8],[3,5,18],[4,9,6]]},
    {"size":10,"squares":[[0,9,1,4],[1,9,5,1],[1,8,3,3],[0,4,2,3],[0,1,6,2],[2,4,4,3],[0,5,10,1],[4,7,4,2],[6,9,4,1],[8,8,2,3],[4,8,4,1],[6,4,2,5],[8,4,2,2],[8,2,2,3]],"difficulty":"medium","clues":[[0,8,4],[5,7,8],[6,8,4],[8,9,4],[9,6,6],[9,3,4],[6,3,10],[3,3,12],[1,3,6],[3,0,12],[8,1,6],[4,5,10],[2,9,5],[2,6,9]]},
    {"size":10,"squares":[[0,9,2,4],[2,9,2,4],[4,9,1,9],[0,0,5,1],[0,1,4,1],[0,5,4,4],[5,9,3,4],[8,9,2,7],[5,2,5,3],[5,5,3,3]],"difficulty":"hard","clues":[[0,6,8],[3,6,8],[1,5,16],[4,7,9],[3,1,4],[3,0,5],[6,1,15],[6,5,9],[6,8,12],[8,4,14]]},
    {"size":10,"squares":[[0,9,9,1],[9,9,1,9],[1,0,9,1],[0,8,1,9],[1,3,3,3],[6,3,3,3],[6,8,3,3],[1,8,3,3],[1,5,8,2],[4,8,2,3],[4,3,2,3]],"difficulty":"hard","clues":[[3,9,9],[2,7,9],[5,6,6],[7,7,9],[9,6,9],[6,4,16],[5,2,6],[3,2,9],[7,2,9],[5,0,9],[0,2,9]]},
    {"size":10,"squares":[[0,9,4,10],[4,9,6,4],[5,5,5,6],[4,5,1,6]],"difficulty":"hard","clues":[[1,6,40],[6,8,24],[4,1,6],[7,3,30]]},
    {"size":10,"squares":[[0,9,3,3],[0,6,4,4],[3,9,7,3],[0,2,10,3],[4,6,6,4]],"difficulty":"hard","clues":[[2,7,9],[0,4,16],[3,1,30],[8,8,21],[5,5,24]]},
    {"size":10,"squares":[[0,9,3,4],[3,9,3,10],[0,5,3,6],[6,9,4,3],[6,6,4,3],[6,3,4,4]],"difficulty":"hard","clues":[[1,4,18],[7,8,12],[6,3,16],[4,2,30],[8,6,12],[2,7,12]]},
    {"size":10,"squares":[[7,8,2,2],[5,9,5,1],[9,8,1,4],[7,6,2,3],[9,4,1,4],[6,3,3,3],[6,6,1,3],[5,7,1,5],[6,8,1,2],[3,8,3,1],[4,5,1,3],[3,4,1,2],[3,2,3,1],[6,0,4,1],[2,1,4,2],[0,2,2,3],[2,5,1,4],[4,7,1,2],[3,6,1,2],[0,7,4,1],[0,6,3,1],[0,4,2,2],[0,5,2,1],[0,8,3,1],[0,9,5,1]],"difficulty":"hard","clues":[[1,6,3],[2,4,4],[4,6,2],[3,5,2],[0,5,2],[2,7,4],[3,8,3],[0,8,3],[4,9,5],[1,3,4],[1,0,6],[2,1,8],[3,2,3],[3,3,2],[4,3,3],[5,4,5],[6,5,3],[6,7,2],[7,9,5],[8,4,6],[7,3,9],[8,0,4],[9,1,4],[7,7,4],[9,7,4]]},
    {"size":10,"squares":[[1,8,3,3],[0,9,1,4],[1,9,3,1],[4,8,2,2],[4,6,2,2],[1,5,3,4],[4,4,5,2],[6,8,2,4],[4,9,6,1],[8,8,2,4],[9,4,1,5],[6,2,3,3],[1,1,5,2],[4,2,2,1],[0,5,1,6]],"difficulty":"hard","clues":[[0,7,4],[3,7,9],[8,6,8],[5,5,4],[4,2,2],[2,3,12],[2,9,3],[5,9,6],[5,7,4],[7,3,10],[2,0,10],[0,4,6],[7,8,8],[9,4,5],[7,1,9]]},
    {"size":10,"squares":[[1,6,5,2],[6,8,3,5],[3,3,4,3],[0,9,4,2],[0,7,3,1],[3,7,3,1],[0,6,1,5],[2,4,4,1],[1,4,1,3],[0,1,2,2],[2,3,1,4],[3,0,7,1],[7,3,2,3],[9,9,1,9],[6,9,3,1],[4,9,2,2]],"difficulty":"hard","clues":[[6,9,3],[9,9,9],[4,7,3],[5,8,4],[2,8,8],[1,7,3],[0,5,5],[1,3,3],[8,1,6],[6,3,12],[4,5,10],[8,7,15],[2,4,4],[2,1,4],[1,0,4],[5,0,7]]},
    {"size":10,"squares":[[3,7,2,3],[5,7,3,3],[0,9,4,2],[0,7,3,2],[0,5,3,4],[0,1,6,2],[3,4,4,2],[3,2,6,1],[6,1,4,2],[9,5,1,4],[7,4,2,2],[8,7,1,3],[4,9,3,2],[9,9,1,4],[7,9,2,2]],"difficulty":"hard","clues":[[2,8,8],[9,8,4],[8,6,3],[6,6,9],[5,3,8],[8,4,4],[9,3,4],[7,2,6],[8,0,8],[4,0,12],[1,2,12],[1,6,6],[3,5,6],[7,9,4],[4,9,6]]},
    {"size":10,"squares":[[0,9,9,1],[1,2,3,3],[0,8,1,9],[1,8,3,3],[9,9,1,6],[8,3,2,4],[6,7,3,2],[4,8,5,1],[4,7,2,2],[1,5,8,1],[1,4,5,2],[6,4,3,1],[6,3,2,4],[4,2,2,3]],"difficulty":"hard","clues":[[0,0,9],[0,9,9],[2,7,9],[6,8,5],[7,6,6],[3,5,8],[5,0,6],[1,3,10],[3,2,9],[9,7,6],[8,4,3],[8,1,8],[6,3,8],[4,6,4]]},
    {"size":10,"squares":[[5,7,2,3],[4,7,1,5],[5,4,1,4],[6,4,1,3],[7,7,2,4],[4,9,5,2],[1,9,3,3],[0,9,1,6],[1,6,2,2],[3,6,1,5],[1,4,2,2],[0,3,1,4],[1,2,2,3],[4,2,1,3],[3,1,1,2],[5,0,5,1],[9,9,1,3],[9,6,1,6],[7,3,2,2],[6,1,3,1]],"difficulty":"hard","clues":[[0,8,6],[9,8,3],[6,6,6],[2,6,4],[0,2,4],[2,3,4],[1,1,6],[5,3,4],[4,1,3],[3,0,2],[7,1,3],[8,3,4],[8,5,8],[9,4,6],[2,8,9],[6,8,10],[4,5,5],[3,4,5],[8,0,5],[6,4,3]]},
    {"size":10,"squares":[[2,8,4,5],[7,9,3,3],[6,9,1,10],[2,3,3,2],[0,9,2,7],[0,2,2,3],[2,1,3,2],[5,3,1,4],[2,9,4,1],[7,6,3,5],[7,1,3,2]],"difficulty":"hard","clues":[[3,9,4],[3,0,6],[5,2,4],[6,6,10],[7,0,6],[3,3,6],[0,2,6],[0,7,14],[2,5,20],[7,8,9],[8,3,15]]},
    {"size":10,"squares":[[1,8,4,3],[0,9,6,1],[5,8,4,4],[2,5,3,3],[5,4,4,4],[0,2,5,3],[0,5,2,3],[0,8,1,3],[9,8,1,9],[5,0,4,1],[6,9,4,1]],"difficulty":"hard","clues":[[0,4,6],[0,7,3],[4,4,9],[3,1,15],[7,2,16],[7,0,4],[7,9,4],[9,5,9],[6,7,16],[2,6,12],[3,9,6]]},
    {"size":10,"squares":[[2,6,2,2],[4,8,1,3],[5,7,2,2],[4,5,1,4],[5,4,2,2],[3,4,1,2],[2,4,1,5],[3,2,1,3],[4,1,4,2],[7,4,3,1],[8,3,2,3],[7,3,1,2],[5,2,2,1],[7,8,3,3],[1,8,1,5],[1,3,1,4],[0,9,5,1],[2,8,2,2],[5,9,5,1],[5,8,2,1],[5,5,5,1],[8,0,2,1],[0,8,1,4],[0,4,1,5]],"difficulty":"hard","clues":[[2,9,5],[8,9,5],[8,7,9],[5,8,2],[5,7,4],[4,7,3],[3,8,4],[1,7,5],[0,6,4],[0,3,5],[1,2,4],[2,3,5],[3,6,4],[3,4,2],[3,1,3],[4,3,4],[5,3,4],[6,5,5],[8,4,3],[7,3,2],[6,2,2],[6,0,8],[9,2,6],[9,0,2]]},
    {"size":10,"squares":[[1,8,3,3],[2,4,3,2],[0,5,8,1],[8,9,1,8],[5,8,2,3],[0,9,8,1],[0,8,1,3],[4,8,1,3],[7,8,1,3],[0,4,2,5],[2,2,3,2],[2,0,8,1],[9,7,1,7],[5,1,4,1],[5,4,3,3],[9,9,1,2]],"difficulty":"hard","clues":[[3,9,8],[4,7,3],[7,7,3],[3,3,6],[7,1,4],[5,0,8],[6,3,9],[5,5,8],[9,8,2],[9,3,7],[8,5,8],[0,2,10],[1,7,9],[0,6,3],[6,8,6],[2,1,6]]},
    {"size":10,"squares":[[3,8,2,2],[5,6,1,3],[5,7,4,1],[3,5,1,5],[4,3,3,3],[4,6,1,3],[0,6,4,1],[0,8,3,2],[0,9,6,1],[6,9,4,1],[5,8,5,1],[9,7,1,4],[6,6,3,2],[6,4,3,1],[7,3,3,2],[7,1,3,2],[0,0,7,1],[0,4,3,2],[0,5,3,1],[0,2,3,2]],"difficulty":"hard","clues":[[3,9,6],[1,7,6],[4,7,4],[6,8,5],[8,9,4],[8,7,4],[9,6,4],[8,5,6],[7,4,3],[5,5,3],[4,5,3],[2,5,3],[3,6,4],[1,4,6],[3,3,5],[1,1,6],[5,2,9],[9,2,6],[8,1,6],[5,0,7]]},
    {"size":10,"squares":[[0,9,2,4],[0,5,5,2],[2,7,3,2],[5,7,4,2],[5,5,4,4],[6,9,4,2],[2,9,4,2],[3,3,2,4],[0,3,3,2],[0,1,3,2],[9,7,1,8],[5,1,4,2]],"difficulty":"hard","clues":[[0,8,8],[4,8,8],[3,6,6],[5,6,8],[7,8,8],[9,6,8],[8,3,16],[3,5,10],[1,3,6],[2,0,6],[4,2,8],[7,0,8]]},
    {"size":10,"squares":[[4,7,2,5],[1,6,3,2],[1,4,3,2],[1,2,7,2],[6,7,2,5],[1,9,7,2],[0,9,1,5],[1,7,3,1],[0,4,1,5],[1,0,9,1],[8,3,2,3],[9,9,1,6],[8,9,1,2],[8,7,1,4]],"difficulty":"hard","clues":[[8,8,2],[9,8,6],[2,4,6],[2,6,6],[0,3,5],[9,0,9],[8,3,6],[4,1,14],[5,5,10],[0,5,5],[2,9,14],[1,7,3],[8,6,4],[7,4,10]]},
    {"size":10,"squares":[[3,6,4,4],[7,6,3,2],[8,9,2,3],[7,9,1,3],[7,4,3,1],[3,9,4,1],[3,8,4,2],[5,2,2,3],[3,2,2,3],[9,3,1,4],[7,3,2,4],[0,9,3,2],[0,7,1,5],[1,7,2,4],[1,3,2,1],[0,2,3,3]],"difficulty":"hard","clues":[[1,8,6],[2,5,8],[0,5,5],[1,3,2],[1,1,9],[4,4,16],[5,7,8],[9,8,6],[8,6,6],[8,2,8],[9,1,4],[5,1,6],[4,9,4],[7,9,3],[7,4,3],[3,2,6]]},
    {"size":10,"squares":[[8,9,2,2],[7,9,1,4],[0,9,7,1],[0,8,1,9],[1,0,9,1],[8,7,2,5],[6,2,4,2],[6,5,2,3],[3,8,4,3],[1,8,2,4],[3,5,3,3],[1,2,5,2],[1,4,2,2]],"difficulty":"hard","clues":[[2,7,8],[5,7,12],[7,8,4],[9,9,4],[9,5,10],[7,4,6],[4,3,9],[1,3,4],[7,1,8],[6,0,9],[3,9,7],[2,1,10],[0,6,9]]},
    {"size":10,"squares":[[0,9,2,7],[2,9,5,3],[3,6,2,3],[2,6,1,4],[3,3,3,3],[5,6,3,3],[7,9,3,3],[8,6,2,7],[6,3,2,4],[0,0,6,1],[0,2,3,2]],"difficulty":"hard","clues":[[1,7,14],[2,5,4],[4,5,6],[6,5,9],[4,2,9],[6,1,8],[4,0,6],[1,2,6],[9,5,14],[4,9,15],[7,7,9]]},
    {"size":10,"squares":[[1,9,3,4],[4,8,5,2],[4,6,4,3],[1,4,3,2],[4,3,4,3],[0,5,4,1],[0,9,1,4],[0,4,1,5],[1,0,9,1],[1,2,3,2],[8,4,2,4],[8,6,2,2],[9,9,1,3],[4,9,5,1]],"difficulty":"hard","clues":[[0,7,4],[2,8,12],[6,7,10],[6,5,12],[9,3,8],[2,4,6],[0,3,5],[5,3,12],[8,0,9],[9,6,4],[9,8,3],[7,9,5],[1,5,4],[3,1,6]]},
    {"size":10,"squares":[[0,8,3,3],[0,5,3,3],[3,6,2,4],[5,7,4,4],[6,9,4,2],[0,9,3,1],[3,9,3,2],[3,7,2,1],[0,2,5,1],[0,1,4,2],[4,1,3,2],[7,1,3,2],[5,3,5,2],[9,7,1,4]],"difficulty":"hard","clues":[[1,7,9],[1,9,3],[4,9,6],[4,7,2],[7,8,8],[7,6,16],[9,6,4],[4,5,8],[1,3,9],[2,2,5],[2,0,8],[8,0,6],[6,3,10],[4,1,6]]},
    {"size":10,"squares":[[3,8,3,3],[6,8,2,3],[3,4,4,1],[1,5,7,1],[7,4,2,3],[8,8,2,4],[2,9,8,1],[0,9,2,3],[2,8,1,2],[0,6,3,1],[0,5,1,4],[1,4,2,3],[0,1,4,2],[3,3,4,2],[4,0,4,1],[8,1,2,2],[4,1,4,1],[9,4,1,3]],"difficulty":"hard","clues":[[1,8,6],[7,7,6],[1,6,3],[2,5,7],[1,3,6],[4,4,4],[8,3,6],[9,3,3],[7,0,4],[2,0,8],[5,1,4],[6,3,8],[9,1,4],[4,7,9],[2,7,2],[5,9,8],[9,8,8],[0,2,4]]},
    {"size":10,"squares":[[0,9,7,4],[3,5,7,6],[8,9,2,4],[7,9,1,4],[0,5,3,6]],"difficulty":"hard","clues":[[7,8,4],[1,2,18],[1,7,28],[5,3,42],[9,6,8]]},
    {"size":10,"squares":[[0,9,7,4],[0,5,6,6],[7,9,3,10],[6,5,1,6]],"difficulty":"hard","clues":[[8,2,30],[5,8,28],[6,4,6],[2,2,36]]},
    {"size":10,"squares":[[0,9,3,4],[2,5,4,4],[3,9,6,4],[9,9,1,6],[0,1,10,2],[6,3,4,2],[6,5,3,2],[0,5,2,4]],"difficulty":"hard","clues":[[1,7,12],[3,4,16],[0,3,8],[7,5,6],[9,6,6],[8,2,8],[5,1,20],[4,8,24]]},
    {"size":10,"squares":[[1,8,5,4],[1,9,9,1],[6,8,4,4],[1,4,5,2],[6,4,4,5],[1,2,5,3],[0,9,1,4],[0,5,1,6]],"difficulty":"hard","clues":[[3,3,10],[7,6,16],[0,8,4],[0,4,6],[8,2,20],[4,0,15],[4,7,20],[2,9,9]]},
    {"size":10,"squares":[[0,9,9,4],[9,9,1,6],[0,5,9,2],[0,3,4,4],[4,3,6,4]],"difficulty":"hard","clues":[[9,7,6],[6,4,18],[1,1,16],[1,7,36],[5,1,24]]},
    {"size":10,"squares":[[1,9,4,3],[2,6,2,5],[5,6,2,4],[6,9,4,2],[5,7,5,1],[5,9,1,2],[4,6,1,6],[7,6,3,7],[5,2,2,3],[0,0,5,1],[0,1,4,1],[0,9,1,8],[1,6,1,5]],"difficulty":"hard","clues":[[3,8,12],[5,8,2],[7,9,8],[7,7,5],[5,5,8],[8,4,21],[6,1,6],[4,3,6],[3,4,10],[0,4,8],[2,1,4],[1,5,5],[4,0,5]]}
];
