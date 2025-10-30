/* script.js
  - loading screen hide
  - small particle system (canvas) behind hero
  - logo simple animation control
  - gallery modal
*/

document.addEventListener("DOMContentLoaded", function(){
  // hide loader
  const loader = document.getElementById('loader');
  setTimeout(()=> {
    if(loader) loader.style.opacity = 0;
    setTimeout(()=> loader && loader.remove(), 600);
  }, 800);

  // particles init
  initParticles('particle-canvas');

  // gallery modal
  document.querySelectorAll('[data-preview]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const src = el.getAttribute('data-src');
      openImagePreview(src);
    });
  });

  // close preview
  document.getElementById('preview-close')?.addEventListener('click', ()=>{
    document.getElementById('preview').classList.remove('open');
  });
});

/* simple image preview */
function openImagePreview(src){
  const p = document.getElementById('preview');
  p.querySelector('img').src = src;
  p.classList.add('open');
}

/* Particle background - small, efficient */
function initParticles(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.parentElement.clientWidth;
  let h = canvas.height = canvas.parentElement.clientHeight;
  const particles = [];
  const count = Math.round((w*h)/50000); // adaptive
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1+Math.random()*3,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      o: 0.04 + Math.random()*0.18
    });
  }
  function resize(){
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0) p.x = w;
      if(p.x>w) p.x = 0;
      if(p.y<0) p.y = h;
      if(p.y>h) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(178,210,53,${p.o})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* Simple helper: anchor smooth scroll for same-page anchors */
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  e.preventDefault();
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
});