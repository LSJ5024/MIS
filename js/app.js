document.addEventListener('DOMContentLoaded', () => {
    /* ==============================================================
       1. 모바일 헤더 햄버거 메뉴 토글 로직
    ============================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // 링크 클릭 시 자동으로 열려있는 모바일 메뉴 닫기
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    /* ==============================================================
       2. 헤더 스크롤 상태 업데이트 로직
    ============================================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            header.querySelector('.container').style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            header.querySelector('.container').style.height = '80px';
        }
    });

    /* ==============================================================
       3. 상담 신청 폼 유효성 검사 및 성공 모달 프로세스
    ============================================================== */
    const consultForm = document.getElementById('consultForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (consultForm && successModal && closeModalBtn) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 페이지 새로고침 방지

            // 브라우저 자체의 1차 검사(required)에 더하여 JS 추가 검증
            const userPhoneInput = document.getElementById('userPhone');
            const phoneVal = userPhoneInput.value.replace(/[^0-9]/g, ""); // 숫자만 추출

            // 전화번호가 너무 짧은 경우 예외 처리
            if(phoneVal.length < 9) {
                alert("정확한 신청자 연락처를 입력해주세요.");
                userPhoneInput.focus();
                return;
            }

            // 모든 검증 통과 시 성공 안내 모달 노출 (백엔드 통신 없이 UI만 보여줌)
            successModal.classList.add('active');
            
            // 폼 필드 초기화
            consultForm.reset();
        });

        // 모달 닫기 버튼 이벤트
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // 모달 밖 배경 클릭 시 모달 닫힘
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    /* ==============================================================
       4. 스크롤 애니메이션 (Fade-in / Up)
    ============================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
