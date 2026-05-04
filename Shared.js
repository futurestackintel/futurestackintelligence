// ===== FUTURESTACK INTELLIGENCE — SHARED JS =====

// Hamburger menu
function initNav() {
  const ham = document.getElementById('ham');
  const menu = document.getElementById('mobileMenu');
  if (!ham || !menu) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
      ham.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Order modal
function initModal() {
  const overlay = document.getElementById('orderModal');
  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function openModal(name, desc) {
  const overlay = document.getElementById('orderModal');
  if (!overlay) return;
  document.getElementById('mTitle').textContent = name;
  document.getElementById('mDesc').textContent = desc;
  document.getElementById('mService').value = name;
  document.getElementById('mForm').style.display = 'block';
  document.getElementById('mSuccess').style.display = 'none';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('orderModal');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

async function submitModal(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-submit');
  const svc = document.getElementById('mService').value;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const r = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (r.ok) {
      document.getElementById('mForm').style.display = 'none';
      document.getElementById('mSuccessService').textContent = svc;
      document.getElementById('mSuccess').style.display = 'block';
      setTimeout(closeModal, 4000);
    } else {
      btn.textContent = 'Failed — Try Again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Failed — Try Again';
    btn.disabled = false;
  }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initModal();
});

