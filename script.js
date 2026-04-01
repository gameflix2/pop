/* --- SCROLL INTELIGENTE DO TOP 10 --- */
const top10 = document.getElementById('top10');

function scrollLeft(){
  if(!top10) return;
  const card = top10.querySelector(".card-container");
  if(!card) return;
  top10.scrollBy({ left: -(card.offsetWidth + 45) * 2, behavior: "smooth" });
}

function scrollRight(){
  if(!top10) return;
  const card = top10.querySelector(".card-container");
  if(!card) return;
  top10.scrollBy({ left: (card.offsetWidth + 45) * 2, behavior: "smooth" });
}

/* --- EFEITO DO HEADER NO SCROLL --- */
window.addEventListener('scroll', ()=>{
  const header = document.getElementById('header');
  if(window.scrollY > 50) {
    header.style.background = 'rgba(20,20,20,0.95)';
  } else {
    header.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent)';
  }
});

/* --- CONTROLE DO VÍDEO DO BANNER (LOOP INTELIGENTE) --- */
window.addEventListener("DOMContentLoaded", ()=>{
  const bannerSection = document.getElementById("main-banner");
  const bannerVideo = document.getElementById("banner-video");
  if(!bannerVideo || !bannerSection) return;

  // 1. Removemos o loop padrão do HTML para o JavaScript assumir o controle
  bannerVideo.removeAttribute("loop");

  // 2. Quando o vídeo terminar, ele muta o som e começa de novo!
  bannerVideo.addEventListener("ended", () => {
    bannerVideo.muted = true; // Fica mudo
    bannerVideo.play().catch(()=>{}); // Recomeça o vídeo
  });

  // 3. Clique no banner para ligar/desligar o som manualmente, se o usuário quiser
  bannerSection.addEventListener("click", ()=>{
    if(bannerVideo.muted){
      bannerVideo.muted = false;
      bannerVideo.volume = 0.3; // Volume agradável
    } else {
      bannerVideo.muted = true;
    }
  });
});

function openModal(title, desc, videoSrc) {
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(desc);
    
    // Trata o vídeo para pegar só o ID do YouTube
    let youtubeId = videoSrc;
    if (videoSrc.includes("v=")) {
        youtubeId = videoSrc.split("v=")[1].split("&")[0];
    } else if (videoSrc.includes("youtu.be")) {
        youtubeId = videoSrc.split("youtu.be/")[1].split("?")[0];
    }

    // ABRE EM NOVA ABA
    window.open(`jogo.html?title=${encodedTitle}&desc=${encodedDesc}&video=${youtubeId}`, '_blank');
}

// Certifique-se de que não existe outro código no seu script.js chamando "modal.style.display = 'flex'"

/* --- LÓGICA DE TROCA DO BANNER (TUDO VOLTA AO NORMAL) --- */
document.querySelectorAll('.free-game-trigger').forEach(card => {
  card.addEventListener('click', function() {
    // 1. Captura os dados (Isso garante que o trailer e logo voltem)
    const novaLogo = this.getAttribute('data-logo');
    const novaDesc = this.getAttribute('data-desc');
    const novoVideo = this.getAttribute('data-video');
    const linkDrive = this.getAttribute('data-drive'); 

    // 2. Atualiza o banner normalmente (Logo e Descrição)
    document.getElementById('banner-logo').src = novaLogo;
    document.getElementById('banner-desc').textContent = novaDesc;
    
    // 3. Reinicia o Vídeo do Trailer
    const videoElement = document.getElementById('banner-video');
    if (videoElement) {
      videoElement.src = novoVideo;
      videoElement.load(); 
      videoElement.play().catch(()=>{});
    }

    // 4. CONFIGURAÇÃO DO BOTÃO (O segredo está aqui)
    const downloadAnchor = document.getElementById('banner-link');
    const actionBtn = document.getElementById('btn-main-action'); // Captura o botão visual
    
    if (linkDrive) {
      // Caso FarCry: Libera o link do Drive
      downloadAnchor.href = linkDrive;
      downloadAnchor.target = "_blank";
      downloadAnchor.onclick = null; 
    } else {
      // Outros jogos: Bloqueia o link e mostra o seu alerta
      downloadAnchor.href = "javascript:void(0)";
      downloadAnchor.target = "_self";
      downloadAnchor.onclick = function(e) {
        e.preventDefault(); // Garante que a página não recarregue
        alert("Este jogo libera em breve para download, enquanto isso vc pode baixar o FARCRY PRIMAL que ja esta disponivel para download");
      };
    }

    // 5. Garante que o texto do botão mude para Download (como no seu original)
    if (actionBtn) {
      actionBtn.innerHTML = "▶ DOWNLOAD GRATIS";
    }

    // Sobe para o topo para mostrar a troca do banner
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
/* --- LÓGICA DE LOGIN --- */
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('user-email').value;
    const passwordInput = document.getElementById('user-password').value;

    const emailCorreto = "t@gameflix.com";
    const senhaCorreta = "a";

    if (emailInput === emailCorreto && passwordInput === senhaCorreta) {
      document.getElementById('login-screen').classList.add('hidden');

      const bannerVideo = document.getElementById("banner-video");
      if(bannerVideo) bannerVideo.play().catch(()=>{});

      alert("Bem-vindo!");
    } else {
      alert("Email ou senha incorretos.");
    }
  });
}
/* --- AJUSTE EXCLUSIVO PARA O POPUP WHATSAPP --- */
function openWppModal() {
  const modalWpp = document.getElementById("wppModal");
  if(modalWpp) {
      modalWpp.style.display = "flex";
      document.body.style.overflow = "hidden";
      document.body.classList.add('modal-open'); // Aplica o desfoque do CSS
  }
}

function closeWppModal() {
  const modalWpp = document.getElementById("wppModal");
  if(modalWpp) {
      modalWpp.style.display = "none";
      document.body.style.overflow = "auto";
      document.body.classList.remove('modal-open'); // Remove o desfoque
  }
}
/* FECHAR MODAIS CLICANDO FORA */
window.addEventListener('click', function(event) {
    const modalWpp = document.getElementById("wppModal");
    const modalNetflix = document.getElementById("netflixModal");
    if (event.target === modalWpp) closeWppModal();
    if (event.target === modalNetflix) closeModal();
});

/* --- SISTEMA DE CLIQUE UNIFICADO (RESOLVENDO CONFLITO) --- */

function openGamePage(title, videoSrc) {
    const modal = document.getElementById('gamePageModal');
    const iframe = document.getElementById('gameVideo');

    if(!modal || !iframe) return;

    document.getElementById('modalTitle').innerText = title;

    iframe.src = `https://www.youtube.com/embed/${videoSrc}?autoplay=1&mute=0`;

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeGamePage() {
    const modal = document.getElementById('gamePageModal');
    const iframe = document.getElementById('gameVideo');

    if(modal && iframe) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        iframe.src = "";
    }
}
document.addEventListener('click', function(e) {

    // 🚨 BLOQUEIA TUDO ENQUANTO ESTIVER NO LOGIN
    if (!document.getElementById('login-screen').classList.contains('hidden')) {
        return;
    }

    const card = e.target.closest('.game-card, .card-container');

    // ✅ ESSENCIAL: verifica se existe card
    if (!card) return;

    if (card.classList.contains('free-game-trigger')) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    let title = "Jogo Gameflix";

    if (card.classList.contains('game-card')) {
        title = card.getAttribute('alt') || "Jogo Gameflix";
    } else {
        title = card.querySelector('img')?.getAttribute('alt') || "Jogo Gameflix";
    }
    
    const videoId = "dQw4w9WgXcQ"; 
    
    openGamePage(title, videoId);

}, true);