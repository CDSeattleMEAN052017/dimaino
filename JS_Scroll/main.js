var words = ["fun", "exciting", "about not giving up", "being helpful", "being open", "what I learned at CodingDojo!"],

el = document.getElementById('magic'),
word_counter = 0,
character_counter = 0;
function updateText()
{
  // Go through entire string of words.
  var wordSpace = words[word_counter][character_counter++];
  // Find spaces and assign a non-breaking space value to it
  if(wordSpace === " ")
  {
    wordSpace = "&nbsp;"
  }
  // Print out each letter in the list
  // Changed from words[word_counter][character_counter++] because it reset after spaces
  el.innerHTML = el.innerHTML+wordSpace;

  // If the end of the word reset everything
  // Adding the + 1 allows the last character of the word to print out
  if(character_counter == words[word_counter].length + 1)
  {
    word_counter++; 	//choose a different word
    character_counter = 0;	//start over with the first character of the word
    el.innerHTML = '';  //set the html to be blank
    //if we're displaying the last word, go back to the first word
    if(word_counter == words.length)
      word_counter = 0;
  }
}
setInterval(updateText,200);
