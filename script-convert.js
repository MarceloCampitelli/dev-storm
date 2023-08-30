function formatText() {
  var textInsert = document.getElementById('text-insert').value;

  var textReplaced = (textInsert.replace(/[.,\/\\;:()]/g, ' ')).replace("into",' ');

  var textConvert = textReplaced.replace(/\t/g, ' ');

  var lines = textConvert.split('\n');

  var optionSelected = document.getElementById('select-option').selectedIndex;

  if (optionSelected != 0) {
    var wordsFormatted = [];
    var wordsDisplayed = {};
    for (var i = 0; i < lines.length; i++) {
      var words = lines[i].split(' ');
      for (var j = 0; j < words.length; j++) {
        if ((words[j].endsWith('_w') || words[j].endsWith('_p')) && !wordsDisplayed[words[j]]) {
          if (optionSelected ==='2') {
            var wordFormat = "|| '" + words[j] + ": ' || " + words[j] + " || ' |'";
          } else {
            var wordFormat = "|| chr(13) || '" + words[j] + ": ' || " + words[j];
          }
          wordsFormatted.push(wordFormat);
          wordsDisplayed[words[j]] = true;
        }
      }
    }

    var textFormatted = "";
    if (wordsFormatted.length > 0) {
      
      if (optionSelected === 1) {
        textFormatted = "raise_application_error(-20000, 'Atributos: '" + '\n' + wordsFormatted.join('\n') + ");";
      } else if (optionSelected === 2) {
        textFormatted = "wheb_mensagem_pck.exibir_mensagem_abort(191072, 'ERRO='" + '\n' + wordsFormatted.join('\n') + ");";
      } else if (optionSelected === 3) {
        textFormatted = "insert into nm_tabela (nm_campo) values (" + '\n' + wordsFormatted.join('\n') + ");";
      }
    } else {
      textFormatted = "No words found to display";
    }

    document.getElementById('text-format').innerHTML = textFormatted;
  } else {
    document.getElementById('text-format').innerHTML = "Select the output of the conversion";
  }
}

function clearPanel() {
  document.getElementById('text-insert').value = '';
  document.getElementById('text-format').innerHTML = "";
}

function copyText() {
  var textPanelSup = document.getElementById('text-format').textContent;

  if (textPanelSup.trim() !== '') {
    var tempInput = document.createElement('textarea');
    tempInput.value = textPanelSup;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);

    document.getElementById('text-format').innerHTML = "Text successfully copied!";  
  } else {
    document.getElementById('text-format').innerHTML = "Format a text first and then copy the result";  
  }
}

