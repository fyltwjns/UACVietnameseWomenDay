/* ========================================================
   UAC 20/10 - BÉ Ê A XU & NHỮNG ĐÓA HOA NGHỆ THUẬT
   Application Logic, Audio, Auth, Mascot Storyteller & Story Exporter
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heroVideoSection = document.getElementById('heroVideoSection');
  const singingSection = document.getElementById('singingSection');
  const greetingSection = document.getElementById('greetingSection');
  const scrollDownHint = document.getElementById('scrollDownHint');
  const sanctuarySection = document.getElementById('sanctuarySection');
  const gatewayModal = document.getElementById('gatewayModal');
  const btnOpenSurprise = document.getElementById('btnOpenSurprise');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const authForm = document.getElementById('authForm');
  const authUsername = document.getElementById('authUsername');
  const authPassword = document.getElementById('authPassword');
  const authError = document.getElementById('authError');
  const btnLogout = document.getElementById('btnLogout');
  const demoChips = document.querySelectorAll('.demo-chip');
  
  // Hero Video & Audio
  const heroVideo = document.getElementById('heroVideo');
  const btnToggleVideo = document.getElementById('btnToggleVideo');
  const btnToggleAudio = document.getElementById('btnToggleAudio');

  // Singing Gift Video Elements
  const singingVideo = document.getElementById('singingVideo');
  const singingPlayOverlay = document.getElementById('singingPlayOverlay');
  const btnPlaySinging = document.getElementById('btnPlaySinging');
  
  // Mascot Companion
  const mascotBubbleText = document.getElementById('mascotBubbleText');
  const mascotCompanion = document.getElementById('mascotCompanion');
  const companionMascotImg = document.getElementById('companionMascotImg');
  
  // Interactive Mascot Sprites
  const mascotSprites = [
    { src: 'assets/mascot/be_mam_wave.png', text: "Bwip! Em là Bé ê a xu pixel nè chị ơi! ( ˘ ³˘)♥" },
    { src: 'assets/mascot/be_mam_rose.png', text: "Em ôm đóa hoa hồng đỏ thắm tặng riêng cho chị đó nha! 🌹✨" },
    { src: 'assets/mascot/be_mam_heart.png', text: "Bắn triệu tim yêu thương từ đại gia đình UAC nè chị ơi! 💖" },
    { src: 'assets/mascot/be_mam_slam.png', text: "Ối SLAM! Em vồ hụt cánh hoa rồi đập bẹp dính vào kính mất tiêu rồi nè chị ơi! 🤣" },
    { src: 'assets/mascot/be_mam_key.png', text: "Chiếc chìa khóa thần kỳ mở ra muôn vàn bất ngờ ở UAC nè! 🗝️✨" },
    { src: 'assets/mascot/be_mam_idle.png', text: "Chúc các nàng thơ của UAC một ngày 20/10 ngập tràn hạnh phúc và tỏa sắc rực rỡ! 🌸" }
  ];
  let currentSpriteIdx = 0;
  
  // Sanctuary Actions
  const btnHeart = document.getElementById('btnHeart');
  const heartCountEl = document.getElementById('heartCount');
  const btnExportStory = document.getElementById('btnExportStory');
  
  // Card Display Elements
  const userPhoto = document.getElementById('userPhoto');
  const userTag = document.getElementById('userTag');
  const recipientBadge = document.getElementById('recipientBadge');
  const recipientName = document.getElementById('recipientName');
  const recipientDept = document.getElementById('recipientDept');
  const quoteText = document.getElementById('quoteText');
  const wishText = document.getElementById('wishText');
  
  // State
  let currentMember = null;
  let heartCount = 999;
  let isAudioPlaying = false;
  let audioContext = null;
  let bgMusicOscillators = [];
  let currentStep = 'hero'; // 'hero', 'modal', 'sanctuary'

  // Mascot Storyteller Lines by Context
  const mascotDialogues = {
    hero: [
      "Các chị ơi! Xem video xong chị vuốt xuống dưới để nhận món quà 20/10 bí mật nha! ✨👇",
      "Bé ê a xu chào các nàng thơ của UAC! Chị vuốt xuống dưới để khám phá bất ngờ nhé! 🌸",
      "Bé ê a xu đang đợi các chị ở phía dưới nè, vuốt xuống thôi nào! 👇💖"
    ],
    greeting: [
      "Tadaaa! Chị bấm vào nút 'Bấm để nhận quà nè...' để mở hộp quà bí mật nhé! 🎁✨",
      "Món quà tri ân 20/10 đặc biệt nhất của UAC đang chờ chị mở ra nè! 💌",
      "Chị có chìa khóa bí mật chưa nè? Bấm nút để nhập nha! 🗝️"
    ],
    modal: [
      "Chị nhập nickname và pass do các chàng trai UAC gửi để em mở cửa nha! 🗝️",
      "Chìa khóa mở ra cánh cửa hoa hồng nằm ở đây nè chị ơi! ✨",
      "Nếu chị muốn thử nhanh, có thể bấm vào các gợi ý bên dưới nhé! 💖"
    ],
    sanctuary: [
      "Tadaaa! Món quà độc bản dành riêng cho đóa hoa tuyệt đẹp của UAC nè! 💌",
      "Chị đọc xong bức thư nhớ bấm nút 'Tải thiệp' để khoe ngay lên Story nha! 📸",
      "Bấm 'Thả tim' để nhận cơn mưa yêu thương từ các anh em UAC nè chị ơi! 💖"
    ]
  };

  // Kho Lời Chúc 20/10 Siêu Đáng Yêu Dành Riêng Cho UAC (Tự động đổi 5s/lần)
  const specialWishes2010 = [
    "Chúc chị 20/10 luôn rạng rỡ như ánh dương, ngọt ngào như lời ca và thướt tha như vũ khúc UAC! 🌸✨",
    "Hôm nay chị là bông hoa xinh xắn và rạng ngời nhất dưới mái nhà CLB Nghệ thuật UAC - UEd đó nha! 💐💖",
    "Bé ê a xu chúc chị nhận được cả bầu trời hoa, một đại dương quà và triệu nụ cười hạnh phúc! 🎁🌷",
    "Chúc nàng thơ của UAC mãi giữ trọn ngọn lửa đam mê, luôn tự tin tỏa sáng trên mọi sân khấu cuộc đời! 🌟🎶",
    "20/10 chúc chị bớt lo âu, thêm niềm vui, son luôn đỏ và má lúc nào cũng hây hây xinh xắn! 💄🥰",
    "Cảm ơn chị vì đã là mảnh ghép nghệ thuật lung linh nhất, làm nên thanh xuân rực rỡ của UAC! 🎨✨",
    "Bé ê a xu gửi ngàn cái ôm ấm áp và muôn lời chúc ngọt ngào nhất đến chị yêu nè! ʕっ•ᴥ•ʔっ💖",
    "Chúc chị mỗi ngày thức dậy đều có hoa, bước chân ra phố có nắng và trong tim ngập tràn yêu thương! ☀️🌻",
    "Nghệ thuật cất lời vì có chị, sân khấu thắp sáng bởi nụ cười của chị! Chúc chị 20/10 siêu hạnh phúc! 💃🎤",
    "Chúc chị nhận thật nhiều hoa, ăn bánh không béo, deadline tự tan biến và tình yêu đong đầy! 🍰✨",
    "Bé ê a xu chúc chị 365 ngày đều xinh đẹp rạng ngời, luôn là đóa hoa kiêu hãnh và ngọt ngào nhất! 🌹👑",
    "Tình cảm của các chàng trai UAC gửi đến chị đong đầy như đại dương, chúc chị ngày 20/10 ngập tràn niềm vui! 💌💖",
    "Chúc chị luôn giữ mãi nét tươi trẻ, giọng cười trong veo và một trái tim đầy ắp chất thơ! 🌸🎶",
    "Hôm nay chị cứ việc xinh đẹp và nhận quà thôi, mọi muộn phiền để Bé ê a xu lo nha! ( ˘ ³˘)♥",
    "Mong mọi ước nguyện của nàng thơ UAC trong ngày 20/10 hôm nay đều biến thành sự thật lấp lánh! 🌟💕",
    "Gửi ngàn lời chúc bình an và rực rỡ nhất đến người phụ nữ tuyệt vời của đại gia đình UAC! 🌷✨"
  ];

  // 5-second automatic wish rotation timer for Bé ê a xu
  let wishRotationTimer = null;
  let wishIndex = 0;

  function cycleMascotWish() {
    if (currentStep === 'modal') return; // Don't interrupt while entering passcode
    const nextWish = specialWishes2010[wishIndex % specialWishes2010.length];
    wishIndex++;
    setMascotDialogue(nextWish);

    // Cute subtle bounce
    if (mascotCompanion) {
      mascotCompanion.style.transform = 'scale(1.08) translateY(-4px)';
      setTimeout(() => {
        mascotCompanion.style.transform = '';
      }, 250);
    }
  }

  function startWishRotation() {
    if (wishRotationTimer) clearInterval(wishRotationTimer);
    wishRotationTimer = setInterval(cycleMascotWish, 5000);
  }

  function resetWishRotation() {
    startWishRotation();
  }

  // Update Mascot speech bubble
  function setMascotDialogue(text) {
    if (!mascotBubbleText) return;
    mascotBubbleText.style.opacity = 0;
    mascotBubbleText.style.transform = 'translateY(4px)';
    setTimeout(() => {
      mascotBubbleText.textContent = text;
      mascotBubbleText.style.opacity = 1;
      mascotBubbleText.style.transform = 'translateY(0)';
    }, 220);
  }

  // Pick random line from category
  function pickMascotLine(category) {
    const lines = mascotDialogues[category];
    if (!lines) return;
    const randomIdx = Math.floor(Math.random() * lines.length);
    setMascotDialogue(lines[randomIdx]);
  }

  // Click on Mascot for interactive fun & sprite change
  if (mascotCompanion) {
    mascotCompanion.addEventListener('click', () => {
      // Play cute sound
      playCuteBeep();
      // Animate mascot
      mascotCompanion.style.transform = 'scale(1.25) rotate(10deg)';
      setTimeout(() => {
        mascotCompanion.style.transform = '';
      }, 300);
      // Burst miniature hearts
      createHeartBurst(mascotCompanion.getBoundingClientRect().left + 40, mascotCompanion.getBoundingClientRect().top);
      
      // Cycle Sprite
      currentSpriteIdx = (currentSpriteIdx + 1) % mascotSprites.length;
      if (companionMascotImg) {
        companionMascotImg.src = mascotSprites[currentSpriteIdx].src;
      }
      
      // Immediately rotate to a new special wish on click
      const nextWish = specialWishes2010[wishIndex % specialWishes2010.length];
      wishIndex++;
      setMascotDialogue(nextWish);
      resetWishRotation();
    });
  }

  // Click on the attention callout triggers Bé ê a xu interaction
  const mascotAttentionHint = document.getElementById('mascotAttentionHint');
  if (mascotAttentionHint && mascotCompanion) {
    mascotAttentionHint.addEventListener('click', (e) => {
      e.stopPropagation();
      mascotCompanion.click();
    });
  }

  // ==========================================
  // Web Audio API: Cute Sound & Cozy Background Melody
  // ==========================================
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playCuteBeep() {
    try {
      initAudio();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.25);
    } catch(e) {}
  }

  function playChimeSuccess() {
    try {
      initAudio();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.2, audioContext.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(audioContext.currentTime + idx * 0.08);
        osc.stop(audioContext.currentTime + idx * 0.08 + 0.5);
      });
    } catch(e) {}
  }

  // Gentle acoustic ambient loop (Marimba & Soft Rhodes chime)
  let isSingingVideoPlaying = false;
  let musicTimer = null;
  let activeNoteTimeouts = [];

  function startGentleMusic() {
    // Tuyệt đối không bật nhạc nền nếu video hát đang phát
    if (isSingingVideoPlaying) return;
    if (isAudioPlaying) return;
    initAudio();
    isAudioPlaying = true;
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // Cmaj - C5, E5, G5, C6
      [220.00, 261.63, 329.63, 440.00], // Am - A4, C5, E5, A5
      [174.61, 220.00, 261.63, 349.23], // Fmaj - F4, A4, C5, F5
      [196.00, 246.94, 293.66, 392.00]  // G - G4, B4, D5, G5
    ];
    let chordIdx = 0;

    function playArp() {
      if (!isAudioPlaying || isSingingVideoPlaying) return;
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const currentNotes = chords[chordIdx];
      currentNotes.forEach((f, i) => {
        const tid = setTimeout(() => {
          if (!isAudioPlaying || isSingingVideoPlaying || !audioContext) return;
          try {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f * 1.5, audioContext.currentTime);
            gain.gain.setValueAtTime(0.09, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.3);
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start();
            osc.stop(audioContext.currentTime + 1.3);
          } catch(e) {}
        }, i * 360);
        activeNoteTimeouts.push(tid);
      });
      chordIdx = (chordIdx + 1) % chords.length;
      musicTimer = setTimeout(playArp, 1800);
    }
    playArp();
  }

  function stopGentleMusic() {
    isAudioPlaying = false;
    clearTimeout(musicTimer);
    activeNoteTimeouts.forEach(tid => clearTimeout(tid));
    activeNoteTimeouts = [];
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend().catch(() => {});
    }
  }

  // ==========================================
  // Video Loop Lifecycle & Smart Audio Transitions
  // Lần 1: Video phát âm thanh gốc.
  // Hết video: Dừng ở khung hình cuối 5 giây.
  // Từ lần 2 trở đi: Tắt tiếng video, phát nhạc nền cute xuyên suốt trang web.
  // ==========================================
  let videoLoopCount = 0;
  let isVideoPausedAtEnd = false;

  function handleVideoEnd() {
    if (isVideoPausedAtEnd) return;
    isVideoPausedAtEnd = true;
    videoLoopCount++;

    // Từ lần loop thứ 2 trở đi (ngay khi lần 1 kết thúc): tắt tiếng video, bật nhạc nền cute (nếu video hát không chạy)
    if (videoLoopCount >= 1) {
      if (heroVideo) {
        heroVideo.muted = true;
      }
      if (!isAudioPlaying && !isSingingVideoPlaying) {
        startGentleMusic();
      }
    }

    // Dừng ở khung hình cuối trong 5 giây (5000ms), sau đó tiếp tục phát
    setTimeout(() => {
      if (!heroVideo) return;
      heroVideo.currentTime = 0;
      // Đảm bảo video bị tắt tiếng từ lần 2 trở đi
      if (videoLoopCount >= 1) {
        heroVideo.muted = true;
      }
      const p = heroVideo.play();
      if (p !== undefined) {
        p.then(() => {
          isVideoPausedAtEnd = false;
        }).catch(() => {
          isVideoPausedAtEnd = false;
        });
      } else {
        isVideoPausedAtEnd = false;
      }
    }, 5000);
  }

  if (heroVideo) {
    heroVideo.addEventListener('ended', handleVideoEnd);
  }

  function activateAudioSystem() {
    if (isSingingVideoPlaying) return;
    initAudio();
    if (videoLoopCount === 0) {
      // Lần đầu tiên (Loop 1): bật tiếng video gốc, chưa bật nhạc nền để không bị chồng tiếng
      if (heroVideo) {
        heroVideo.muted = false;
        heroVideo.volume = 1.0;
        if (heroVideo.paused && !isVideoPausedAtEnd && !isSingingVideoPlaying) {
          heroVideo.play().catch(() => {});
        }
      }
    } else {
      // Từ lần thứ 2 trở đi: tắt tiếng video, bật bản nhạc nền cute
      if (heroVideo) {
        heroVideo.muted = true;
      }
      if (!isAudioPlaying && !isSingingVideoPlaying) {
        startGentleMusic();
      }
    }
  }

  // Thử phát video kèm tiếng ngay từ đầu, nếu trình duyệt chặn unmuted autoplay thì phát muted trước
  if (heroVideo) {
    heroVideo.muted = false;
    heroVideo.volume = 1.0;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      });
    }
  }

  // Lắng nghe tương tác đầu tiên của người dùng để kích hoạt âm thanh
  const audioTriggers = ['click', 'touchstart', 'scroll', 'pointerdown', 'keydown', 'wheel'];
  audioTriggers.forEach(evt => {
    window.addEventListener(evt, () => {
      activateAudioSystem();
    }, { capture: true, passive: true });
  });

  // ==========================================
  // Flow Transitions: Hero -> Modal -> Sanctuary
  // ==========================================
  // Scroll down indicator handler
  if (scrollDownHint) {
    scrollDownHint.addEventListener('click', () => {
      const target = singingSection || greetingSection;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      playCuteBeep();
    });
  }

  // Singing Video Player & Smart Audio Coordination
  if (singingVideo) {
    const onSingingPlay = () => {
      isSingingVideoPlaying = true;
      // 1. Dừng ngay lập tức nhạc nền ambient và hủy toàn bộ nốt đang chờ
      stopGentleMusic();
      
      // 2. Tắt tiếng hero video và tạm pause hero video để ưu tiên trọn vẹn âm thanh video hát
      if (heroVideo) {
        heroVideo.muted = true;
        if (!heroVideo.paused) {
          heroVideo.pause();
        }
      }
      if (singingPlayOverlay) {
        singingPlayOverlay.classList.add('hidden');
      }
      setMascotDialogue("Lắng nghe các chàng trai UAC cất giọng tặng chị em nè! Hay quá đi thôi~ 🎶🌸");
    };

    const onSingingPauseOrEnd = () => {
      isSingingVideoPlaying = false;
      if (singingVideo.ended) {
        if (singingPlayOverlay) {
          singingPlayOverlay.classList.remove('hidden');
        }
        setMascotDialogue("Khúc ca ngọt ngào quá! Giờ chị hãy bấm nút mở hộp quà bí mật của riêng mình nhé! 🎁✨");
      }
      
      // Tiếp tục phát hero video ở chế độ tắt tiếng nếu chưa vào sanctuary
      if (heroVideo && heroVideo.paused && currentStep !== 'sanctuary') {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      }

      // Khôi phục nhạc nền nhẹ nhàng sau khi video hát dừng hoặc kết thúc
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          startGentleMusic();
        }).catch(() => {
          startGentleMusic();
        });
      } else {
        startGentleMusic();
      }
    };

    singingVideo.addEventListener('play', onSingingPlay);
    singingVideo.addEventListener('playing', onSingingPlay);
    singingVideo.addEventListener('pause', onSingingPauseOrEnd);
    singingVideo.addEventListener('ended', onSingingPauseOrEnd);

    if (btnPlaySinging) {
      btnPlaySinging.addEventListener('click', (e) => {
        e.stopPropagation();
        if (singingVideo.paused) {
          singingVideo.play().catch(err => console.log('Video play error:', err));
        }
      });
    }

    if (singingPlayOverlay) {
      singingPlayOverlay.addEventListener('click', () => {
        if (singingVideo.paused) {
          singingVideo.play().catch(err => console.log('Video play error:', err));
        }
      });
    }
  }

  // Scroll listener: update Bé ê a xu guidance based on viewport position
  window.addEventListener('scroll', () => {
    if (currentStep !== 'sanctuary' && currentStep !== 'modal') {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > window.innerHeight * 0.35) {
        if (currentStep !== 'greeting') {
          currentStep = 'greeting';
          setMascotDialogue("Tadaaa! Chị bấm vào nút 'Bấm để nhận quà nè...' để mở hộp quà bí mật nhé! 🎁✨");
          resetWishRotation();
        }
      } else {
        if (currentStep !== 'hero') {
          currentStep = 'hero';
          setMascotDialogue("Các chị ơi! Xem video xong chị vuốt xuống dưới để nhận món quà 20/10 bí mật nha! ✨👇");
          resetWishRotation();
        }
      }
    }
  }, { passive: true });

  if (btnOpenSurprise) {
    btnOpenSurprise.addEventListener('click', () => {
      playCuteBeep();
      gatewayModal.classList.add('active');
      document.body.classList.add('modal-open');
      currentStep = 'modal';
      pickMascotLine('modal');
      authUsername.focus();
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      gatewayModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      const scrollY = window.scrollY || window.pageYOffset;
      currentStep = scrollY > window.innerHeight * 0.35 ? 'greeting' : 'hero';
      pickMascotLine(currentStep);
      resetWishRotation();
    });
  }

  // Đóng gateway modal khi click ra nền ngoài
  if (gatewayModal) {
    gatewayModal.addEventListener('click', (e) => {
      if (e.target === gatewayModal) {
        gatewayModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        const scrollY = window.scrollY || window.pageYOffset;
        currentStep = scrollY > window.innerHeight * 0.35 ? 'greeting' : 'hero';
        pickMascotLine(currentStep);
        resetWishRotation();
      }
    });
  }

  // Start 5-second automatic wish rotation
  startWishRotation();

  // ==========================================
  // Tra cứu Nickname & Pass (Cho các nàng tự mò)
  // ==========================================
  const btnOpenLookup = document.getElementById('btnOpenLookup');
  const lookupModal = document.getElementById('lookupModal');
  const btnCloseLookup = document.getElementById('btnCloseLookup');
  const lookupSearchInput = document.getElementById('lookupSearchInput');
  const btnClearLookupSearch = document.getElementById('btnClearLookupSearch');
  const lookupTableBody = document.getElementById('lookupTableBody');
  const lookupEmpty = document.getElementById('lookupEmpty');

  function renderLookupList(query = '') {
    if (!lookupTableBody) return;
    const members = getActiveMembers();
    const qNorm = normalizeText(query);

    const filtered = members.filter(m => {
      if (!qNorm) return true;
      const nameNorm = normalizeText(m.fullName || '');
      const deptNorm = normalizeText(m.department || '');
      const userNorm = normalizeText(m.username || '');
      return nameNorm.includes(qNorm) || deptNorm.includes(qNorm) || userNorm.includes(qNorm);
    });

    if (filtered.length === 0) {
      lookupTableBody.innerHTML = '';
      if (lookupEmpty) lookupEmpty.style.display = 'block';
      return;
    }

    if (lookupEmpty) lookupEmpty.style.display = 'none';
    lookupTableBody.innerHTML = filtered.map(m => `
      <tr>
        <td>
          <div class="lookup-user-cell">
            <span class="lookup-user-name">${m.fullName}</span>
            ${m.badge ? `<span class="lookup-user-badge">${m.badge}</span>` : ''}
          </div>
        </td>
        <td><span class="lookup-dept-text">${m.department}</span></td>
        <td><code class="lookup-code-chip">${m.username}</code></td>
        <td><code class="lookup-code-chip lookup-pass-chip">${m.password}</code></td>
        <td>
          <button type="button" class="btn-lookup-pick" data-user="${m.username}" data-pass="${m.password}" title="Chọn mở thiệp của ${m.fullName}">
            Chọn nè ✨
          </button>
        </td>
      </tr>
    `).join('');

    // Bắt sự kiện chọn tài khoản
    lookupTableBody.querySelectorAll('.btn-lookup-pick').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const u = btn.getAttribute('data-user');
        const p = btn.getAttribute('data-pass');
        authUsername.value = u;
        authPassword.value = p;
        authError.classList.remove('active');
        playCuteBeep();
        
        // Đóng modal tra cứu
        if (lookupModal) lookupModal.classList.remove('active');
        
        // Tự động mở hộp quà sau 300ms
        setTimeout(() => {
          authForm.dispatchEvent(new Event('submit'));
        }, 300);
      });
    });
  }

  if (btnOpenLookup) {
    btnOpenLookup.addEventListener('click', () => {
      playCuteBeep();
      if (lookupModal) {
        lookupModal.classList.add('active');
        document.body.classList.add('modal-open');
        renderLookupList(lookupSearchInput ? lookupSearchInput.value : '');
        setTimeout(() => {
          if (lookupSearchInput) lookupSearchInput.focus();
        }, 250);
      }
    });
  }

  if (btnCloseLookup) {
    btnCloseLookup.addEventListener('click', () => {
      if (lookupModal) lookupModal.classList.remove('active');
      if (!gatewayModal || !gatewayModal.classList.contains('active')) {
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Đóng modal tra cứu khi click ra nền ngoài
  if (lookupModal) {
    lookupModal.addEventListener('click', (e) => {
      if (e.target === lookupModal) {
        lookupModal.classList.remove('active');
        if (!gatewayModal || !gatewayModal.classList.contains('active')) {
          document.body.classList.remove('modal-open');
        }
      }
    });
  }

  // Lọc tìm kiếm thời gian thực
  if (lookupSearchInput) {
    lookupSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (btnClearLookupSearch) {
        btnClearLookupSearch.style.display = val ? 'block' : 'none';
      }
      renderLookupList(val);
    });
  }

  if (btnClearLookupSearch) {
    btnClearLookupSearch.addEventListener('click', () => {
      if (lookupSearchInput) {
        lookupSearchInput.value = '';
        lookupSearchInput.focus();
      }
      btnClearLookupSearch.style.display = 'none';
      renderLookupList('');
    });
  }

  function normalizeText(s) {
    if (!s) return '';
    return s.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  function getActiveMembers() {
    let list = window.UAC_MEMBERS || [];
    try {
      const stored = localStorage.getItem('UAC_CUSTOM_MEMBERS');
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (window.UAC_MEMBERS && window.UAC_MEMBERS.length > 0) {
            let changed = false;
            // 1. Đồng bộ ảnh và lời chúc mới nhất từ data.js
            parsed.forEach(p => {
              const fresh = window.UAC_MEMBERS.find(m => m.id === p.id || m.username === p.username);
              if (fresh) {
                if (fresh.photo && (!p.photo || p.photo.includes('unsplash.com'))) {
                  p.photo = fresh.photo;
                  changed = true;
                }
                if (fresh.personalWish && (!p.personalWish || p.personalWish.length < 15)) {
                  p.personalWish = fresh.personalWish;
                  p.quotes = fresh.quotes;
                  changed = true;
                }
                if (fresh.id > 36) {
                  p.personalWish = fresh.personalWish;
                  p.quotes = fresh.quotes;
                  p.badge = fresh.badge;
                  p.photo = fresh.photo;
                  p.department = fresh.department;
                  p.fullName = fresh.fullName;
                  p.password = fresh.password;
                  changed = true;
                }
              }
            });

            // 2. Tự động merge các thành viên mới thêm vào parsed
            window.UAC_MEMBERS.forEach(wm => {
              const exists = parsed.some(pm => pm.id === wm.id || pm.username === wm.username);
              if (!exists) {
                parsed.push(wm);
                changed = true;
              }
            });

            if (changed) {
              localStorage.setItem('UAC_CUSTOM_MEMBERS', JSON.stringify(parsed));
            }
          }
          return parsed;
        }
      }
    } catch(e) {}
    return list;
  }

  // Handle Form Submit & Authentication
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = authUsername.value.trim().toLowerCase();
    const p = authPassword.value.trim();
    const uNorm = normalizeText(u);

    const members = getActiveMembers();
    const matched = members.find(m => {
      const matchUser = m.username.toLowerCase() === u ||
                        normalizeText(m.username) === uNorm ||
                        normalizeText(m.fullName) === uNorm ||
                        (m.aliases && m.aliases.some(a => normalizeText(a) === uNorm));
      const matchPass = m.password === p || p === '2010*uac' || p === '2010*admin';
      return matchUser && matchPass;
    });

    if (matched) {
      authError.classList.remove('active');
      playChimeSuccess();
      currentMember = matched;
      renderSanctuary(matched);
      
      // Close modal
      gatewayModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      
      // Switch screen: hide video and greeting, show sanctuary
      if (heroVideoSection) heroVideoSection.style.display = 'none';
      if (singingSection) {
        singingSection.style.display = 'none';
        if (singingVideo && !singingVideo.paused) singingVideo.pause();
      }
      if (greetingSection) greetingSection.style.display = 'none';
      sanctuarySection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      currentStep = 'sanctuary';
      pickMascotLine('sanctuary');

      // Trigger celebrate effects
      firePetalShower();
      if (!isAudioPlaying) {
        startGentleMusic();
      }
    } else {
      authError.classList.add('active');
      authError.textContent = "Nickname hoặc pass chưa đúng rồi nè chị ơi! Thử lại nha 🌸";
      setMascotDialogue("Chị kiểm tra lại nickname hoặc pass xem có gõ nhầm không nhé! 💕");
    }
  });

  // Auto-login from URL parameters (e.g., from Admin Dashboard preview)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramUser = urlParams.get('user') || urlParams.get('member');
    const paramPass = urlParams.get('pass') || '2010*uac';
    if (paramUser) {
      setTimeout(() => {
        authUsername.value = paramUser;
        authPassword.value = paramPass;
        authForm.dispatchEvent(new Event('submit'));
      }, 350);
    }
  } catch(e) {}

  // Render Sanctuary Card with member data
  function renderSanctuary(member) {
    userPhoto.src = member.photo;
    userPhoto.alt = member.fullName;
    userTag.textContent = member.department.split('—')[1]?.trim() || member.department;
    recipientBadge.textContent = member.badge;
    recipientName.textContent = member.fullName;
    recipientDept.textContent = member.department;
    quoteText.textContent = `"${member.quotes}"`;
    wishText.textContent = member.personalWish;
  }

  // Return Home / Switch User
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      playCuteBeep();
      sanctuarySection.classList.remove('active');
      if (heroVideoSection) heroVideoSection.style.display = 'flex';
      if (singingSection) singingSection.style.display = 'flex';
      if (greetingSection) greetingSection.style.display = 'flex';
      authUsername.value = '';
      authPassword.value = '';
      currentStep = 'hero';
      pickMascotLine('hero');
      resetWishRotation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // Interactive Hearts & Petals
  // ==========================================
  if (btnHeart) {
    btnHeart.addEventListener('click', (e) => {
      heartCount += 1;
      heartCountEl.textContent = `${heartCount}+`;
      playCuteBeep();
      
      // Multiple floating hearts
      const rect = btnHeart.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          createHeartBurst(rect.left + rect.width / 2 + (Math.random() * 60 - 30), rect.top);
        }, i * 60);
      }
      
      // Cheerful mascot reaction
      setMascotDialogue("Woa! Ngàn tim yêu thương từ UAC bay ngập tràn luôn nè chị ơi! ( ˘ ³˘)♥");
    });
  }

  function createHeartBurst(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const emojis = ['💖', '💕', '🌸', '✨', '🌷', '💝'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 2200);
  }

  // Rose Petal & Confetti Celebration
  function firePetalShower() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#E07A8B', '#F4A6B6', '#88D49E', '#FFFDF9', '#E5B25D'],
        shapes: ['circle']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#E07A8B', '#FCEBED', '#FFD1DC']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#E07A8B', '#FCEBED', '#FFD1DC']
        });
      }, 350);
    }
  }

  // ==========================================
  // Story Image Exporter (1080 x 1920 9:16 Canvas)
  // ==========================================
  if (btnExportStory) {
    btnExportStory.addEventListener('click', async () => {
      if (!currentMember) return;
      btnExportStory.textContent = "⏳ Đang tạo thiệp Story...";
      btnExportStory.disabled = true;

      try {
        await generateStoryImage(currentMember);
        setMascotDialogue("Thiệp Story đã sẵn sàng rồi nè chị ơi! Chúc chị khoe Story rực rỡ nhất Facebook/Insta nha! 📸✨");
      } catch (err) {
        console.error("Export error:", err);
        alert("Có lỗi khi tạo ảnh story, vui lòng thử lại!");
      } finally {
        btnExportStory.innerHTML = '<span>📸</span> Tải Thiệp Kỷ Niệm (Story)';
        btnExportStory.disabled = false;
      }
    });
  }

  async function generateStoryImage(member) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    // 1. Draw Cream Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGrad.addColorStop(0, '#FFFDF9');
    bgGrad.addColorStop(0.5, '#FAF6F0');
    bgGrad.addColorStop(1, '#F7EDE9');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Soft Circles
    ctx.fillStyle = 'rgba(244, 166, 182, 0.15)';
    ctx.beginPath();
    ctx.arc(100, 150, 300, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(136, 212, 158, 0.15)';
    ctx.beginPath();
    ctx.arc(980, 1750, 350, 0, Math.PI * 2);
    ctx.fill();

    // 2. Header: UAC Art Club Logo & Tag
    ctx.textAlign = 'center';
    ctx.fillStyle = '#C85A70';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ UAC • UED\'S ART CLUB ✦', 540, 130);

    ctx.fillStyle = '#827574';
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Nơi Nghệ Thuật Cất Lời — Chúc Mừng 20.10', 540, 175);

    // 3. Member Portrait Frame (Rounded Box)
    const cardX = 140;
    const cardY = 240;
    const cardW = 800;
    const cardH = 820;

    // Draw Card Back Shadow & Box
    ctx.save();
    ctx.shadowColor = 'rgba(224, 122, 139, 0.25)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, cardX, cardY, cardW, cardH, 40);
    ctx.fill();
    ctx.restore();

    // Draw Portrait Image
    try {
      const img = await loadImage(member.photo);
      ctx.save();
      roundRect(ctx, cardX + 24, cardY + 24, cardW - 48, cardH - 48, 30);
      ctx.clip();
      
      // Aspect cover draw
      const scale = Math.max((cardW - 48) / img.width, (cardH - 48) / img.height);
      const nw = img.width * scale;
      const nh = img.height * scale;
      const nx = (cardX + 24) + ((cardW - 48) - nw) / 2;
      const ny = (cardY + 24) + ((cardH - 48) - nh) / 2;
      ctx.drawImage(img, nx, ny, nw, nh);
      ctx.restore();
    } catch(e) {
      console.warn("Could not load portrait image on canvas:", e);
    }

    // 4. Badge & Member Name
    ctx.textAlign = 'center';
    
    // Badge pill
    ctx.fillStyle = '#FCEBED';
    roundRect(ctx, 340, 1100, 400, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#C85A70';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(member.badge, 540, 1142);

    // Member Name
    ctx.fillStyle = '#C85A70';
    ctx.font = '800 60px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(member.fullName, 540, 1225);

    // Department
    ctx.fillStyle = '#827574';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(member.department, 540, 1280);

    // 5. Letter Box
    const wishBoxY = 1330;
    const wishBoxH = 430;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#F2D5D9';
    ctx.lineWidth = 3;
    roundRect(ctx, 100, wishBoxY, 880, wishBoxH, 32);
    ctx.fill();
    ctx.stroke();

    // Wish text multiline wrap
    ctx.textAlign = 'left';
    ctx.fillStyle = '#4A3E3D';
    ctx.font = '500 30px "Plus Jakarta Sans", sans-serif';
    wrapText(ctx, member.personalWish, 140, wishBoxY + 70, 800, 48);

    // Footer signature inside card
    ctx.textAlign = 'right';
    ctx.fillStyle = '#C85A70';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Yêu thương từ Gia Đình UAC 💖', 930, wishBoxY + wishBoxH - 40);

    // 6. Draw Bé ê a xu Full-Body Pixel Sticker in bottom-right corner
    try {
      const mascotImg = await loadImage('assets/mascot/be_mam_rose.png');
      ctx.imageSmoothingEnabled = false; // keep pixel art crisp on canvas
      ctx.drawImage(mascotImg, 780, 1630, 260, 260);
    } catch(e) {
      console.warn("Could not draw mascot on canvas:", e);
    }

    // Download Image
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `UAC_2010_${member.username}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Canvas Helpers
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currY);
        line = words[n] + ' ';
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currY);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
});
