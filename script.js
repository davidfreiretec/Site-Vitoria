// Inicialize o Firebase
const firebaseConfig = {
    // Substitua pelas suas credenciais do Firebase
    apiKey: "sua-api-key",
    authDomain: "seu-projeto-firebase.firebaseapp.com",
    databaseURL: "https://site-vitoria-default-rtdb.firebaseio.com/",
    projectId: "seu-projeto-firebase",
    storageBucket: "seu-projeto-firebase.appspot.com",
    messagingSenderId: "seu-id-de-envio-de-mensagens",
    appId: "seu-app-id"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Suavizar a rolagem para os links de navegação
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Abrir um modal com informações adicionais do portfólio
  const portfolioItems = document.querySelectorAll('.gallery img');
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
  
      // Adicione o conteúdo do modal aqui, como informações adicionais da imagem
  
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
  
      modalContainer.style.display = 'flex';
  
      modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
          modalContainer.style.display = 'none';
          modalContainer.innerHTML = '';
        }
      });
    });
  });
  
  // Conexão com o banco de dados para cadastros
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
  
    // Envie os dados para o Firebase
    database.ref('contacts').push({
      name: name,
      email: email,
      message: message,
    })
    .then(() => {
      console.log('Dados enviados com sucesso!');
      form.reset();
    })
    .catch((error) => {
      console.error('Erro ao enviar os dados:', error);
    });
  });