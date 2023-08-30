window.addEventListener('load', async function () {
    try {
      const response = await fetch('templates-objects/tmp-fnc.txt');
      if (response.ok) {
        const content = await response.text();
        //panel.textContent = content;
        document.getElementById('text-object').innerHTML = content;
      } else {
          console.error('Erro ao ler o arquivo:', response.status);
      }
  } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
  }
});