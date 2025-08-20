// Seleção de elementos
const menuBtn = document.querySelector('.mobile-menu-icon button');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const loginBtn = document.querySelector('.login-button button');
const cadastroLink = document.getElementById('cadastro-link');
const loginLink = document.getElementById('login-link');
const loginModal = document.getElementById('login-modal');
const cadastroModal = document.getElementById('cadastro-modal');
const closeBtns = document.querySelectorAll('.close-button');
const navLinks = document.querySelectorAll('.nav-link');
const formContato = document.getElementById('form-contato');

// Função para criar efeito de onda ao clicar
function createRippleEffect(element) {
    // Remove qualquer efeito anterior
    const ripples = document.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
    
    // Cria o elemento de efeito
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Posiciona o efeito
    element.appendChild(ripple);
    
    // Anima o efeito
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Função para alternar o menu mobile
function toggleMenu() {
    if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        mobileMenu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

// Função para abrir o modal de login
function openLoginModal() {
    loginModal.style.display = 'flex';
    cadastroModal.style.display = 'none';
}

// Função para abrir o modal de cadastro
function openCadastroModal() {
    cadastroModal.style.display = 'flex';
    loginModal.style.display = 'none';
}

// Função para fechar os modais
function closeModals() {
    loginModal.style.display = 'none';
    cadastroModal.style.display = 'none';
}

// Event listeners
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

if (loginBtn) {
    loginBtn.addEventListener('click', openLoginModal);
}

if (cadastroLink) {
    cadastroLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCadastroModal();
    });
}

if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal();
    });
}

// Fechar modais ao clicar no botão de fechar
closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModals);
});

// Fechar modais ao clicar fora deles
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === cadastroModal) {
        closeModals();
    }
});

// Navegação suave para links com animação
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Verifica se o link é interno (começa com #)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Adiciona classe ativa ao link clicado e remove dos outros
                navLinks.forEach(l => l.classList.remove('active-link'));
                this.classList.add('active-link');
                
                // Cria efeito de onda ao clicar
                createRippleEffect(this);
                
                // Fecha o menu mobile se estiver aberto
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
                
                // Adiciona classe para preparar a animação na seção alvo
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('section-active');
                });
                
                // Pequeno atraso para o scroll começar após o efeito de onda
                setTimeout(() => {
                    // Scroll suave para a seção
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Ajuste para o header fixo
                        behavior: 'smooth'
                    });
                    
                    // Adiciona classe para animar a seção após o scroll
                    setTimeout(() => {
                        targetSection.classList.add('section-active');
                    }, 400);
                }, 300);
            }
        }
    });
});

// Envio do formulário de contato
if (formContato) {
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Configuração para enviar email usando EmailJS
        // Você precisará criar uma conta no EmailJS e configurar um template
        const templateParams = {
            from_name: nome,
            from_email: email,
            to_email: 'henrique.souzatt54@gmail.com',
            subject: assunto,
            message: mensagem
        };
        
        // Simulação de envio (em produção, use EmailJS ou outra API)
        console.log('Enviando email:', templateParams);
        
        // Feedback visual para o usuário
        const submitBtn = document.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simula o tempo de envio
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            formContato.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        /* Para implementação real com EmailJS, descomente o código abaixo
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                formContato.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        */
    });
}

// Validação de formulários
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Aplicar validação aos formulários de login e cadastro
const loginForm = document.getElementById('login-form');
const cadastroForm = document.getElementById('cadastro-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Login realizado com sucesso!');
            closeModals();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            alert('Cadastro realizado com sucesso!');
            closeModals();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

// Animação de elementos ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);