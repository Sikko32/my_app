// 전역 변수
let currentUser = {
    id: 1,
    name: '김학생',
    avatar: 'K'
};

let currentSection = 'home';
let clubs = [];
let posts = [];
let questions = [];
let events = [];
let messages = [];
let currentChat = null;

// 샘플 데이터
const sampleClubs = [
    {
        id: 1,
        name: '독서 토론 동아리',
        category: '독서',
        description: '다양한 장르의 책을 읽고 토론하는 동아리입니다. 매주 모여서 책에 대한 생각을 나누고 있어요.',
        members: 24,
        image: '📚',
        tags: ['독서', '토론', '문학'],
        posts: 15,
        likes: 89
    },
    {
        id: 2,
        name: '농구 동아리',
        category: '스포츠',
        description: '농구를 사랑하는 사람들이 모인 동아리입니다. 초보자도 환영해요!',
        members: 18,
        image: '🏀',
        tags: ['농구', '스포츠', '팀워크'],
        posts: 22,
        likes: 156
    },
    {
        id: 3,
        name: '미술 창작 동아리',
        category: '미술',
        description: '그림 그리기를 좋아하는 학생들의 창작 활동 동아리입니다.',
        members: 12,
        image: '🎨',
        tags: ['미술', '창작', '그림'],
        posts: 8,
        likes: 67
    },
    {
        id: 4,
        name: '코딩 동아리',
        category: '기술',
        description: '프로그래밍을 배우고 프로젝트를 만드는 동아리입니다.',
        members: 31,
        image: '💻',
        tags: ['코딩', '프로그래밍', '기술'],
        posts: 45,
        likes: 203
    }
];

const samplePosts = [
    {
        id: 1,
        clubId: 1,
        title: '이번 주 독서 모임 후기',
        content: '오늘 읽은 소설에 대해 정말 좋은 토론을 했어요. 다음 주에는 더 많은 분들이 참여해주셨으면 좋겠습니다.',
        author: '박독서',
        authorAvatar: '박',
        time: '2시간 전',
        likes: 12,
        comments: 8,
        image: null,
        tags: ['독서', '모임']
    },
    {
        id: 2,
        clubId: 2,
        title: '농구 연습 사진 공유',
        content: '어제 연습에서 찍은 사진들을 공유합니다! 모두 수고하셨어요.',
        author: '이농구',
        authorAvatar: '이',
        time: '5시간 전',
        likes: 18,
        comments: 12,
        image: 'https://via.placeholder.com/400x200',
        tags: ['농구', '연습', '사진']
    }
];

const sampleQuestions = [
    {
        id: 1,
        title: '동아리 가입 절차가 어떻게 되나요?',
        content: '처음 동아리에 가입하려고 하는데, 절차가 복잡한가요? 준비해야 할 것들이 있다면 알려주세요.',
        author: '신입생A',
        authorAvatar: '신',
        time: '1시간 전',
        answers: 3,
        likes: 5,
        status: 'answered',
        clubId: null,
        tags: ['가입', '절차'],
        bestAnswer: null
    },
    {
        id: 2,
        title: '농구 동아리에서 초보자도 받나요?',
        content: '농구를 배워본 적이 없는데 동아리에 가입할 수 있을까요?',
        author: '김초보',
        authorAvatar: '김',
        time: '3시간 전',
        answers: 5,
        likes: 8,
        status: 'adopted',
        clubId: 2,
        tags: ['농구', '초보자'],
        bestAnswer: 2
    }
];

const sampleEvents = [
    {
        id: 1,
        title: '독서 토론 대회',
        description: '학기말 독서 토론 대회를 개최합니다.',
        clubId: 1,
        clubName: '독서 토론 동아리',
        date: '2025-09-15',
        time: '14:00',
        location: '도서관 세미나실'
    },
    {
        id: 2,
        title: '농구 경기',
        description: '타 학교와의 친선 경기입니다.',
        clubId: 2,
        clubName: '농구 동아리',
        date: '2025-09-20',
        time: '16:00',
        location: '체육관'
    }
];

const sampleMessages = [
    {
        id: 1,
        participants: [currentUser.id, 2],
        participantNames: ['김학생', '박독서'],
        lastMessage: '동아리 활동에 대해 문의드리고 싶어서 연락했습니다.',
        lastTime: '10분 전',
        messages: [
            { id: 1, senderId: currentUser.id, content: '안녕하세요! 독서 동아리에 관심이 있어서 연락드렸습니다.', time: '15분 전' },
            { id: 2, senderId: 2, content: '안녕하세요! 반갑습니다. 궁금한 것이 있으시면 언제든 물어보세요.', time: '12분 전' },
            { id: 3, senderId: currentUser.id, content: '동아리 활동에 대해 문의드리고 싶어서 연락했습니다.', time: '10분 전' }
        ]
    }
];

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 데이터 초기화
    clubs = [...sampleClubs];
    posts = [...samplePosts];
    questions = [...sampleQuestions];
    events = [...sampleEvents];
    messages = [...sampleMessages];

    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 초기 데이터 렌더링
    renderPopularClubs();
    renderRecentPosts();
    renderClubsList();
    renderQuestionsList();
    renderCalendar();
    renderUpcomingEvents();
    renderChatList();
    
    // 알림 패널 초기화
    initNotifications();
});

// 이벤트 리스너 설정
function setupEventListeners() {
    // 네비게이션
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            switchSection(section);
        });
    });

    // 검색
    document.getElementById('globalSearch').addEventListener('input', handleGlobalSearch);

    // 태그 필터
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterByCategory(this.dataset.category);
        });
    });

    // 알림
    document.querySelector('.notification-icon').addEventListener('click', toggleNotifications);
    document.querySelector('.close-notifications').addEventListener('click', closeNotifications);

    // 모달 이벤트
    setupModalEvents();
    
    // 동아리 관련 이벤트
    setupClubEvents();
    
    // Q&A 관련 이벤트
    setupQnAEvents();
    
    // 이벤트 관련 이벤트
    setupEventEvents();
    
    // 메시지 관련 이벤트
    setupMessageEvents();
}

// 섹션 전환
function switchSection(sectionName) {
    // 네비게이션 활성화 상태 변경
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // 섹션 표시/숨김
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    currentSection = sectionName;

    // 섹션별 추가 초기화
    if (sectionName === 'messages') {
        renderChatList();
    }
}

// 전역 검색
function handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (currentSection === 'home') {
        filterHomeContent(query);
    } else if (currentSection === 'clubs') {
        filterClubs(query);
    } else if (currentSection === 'qna') {
        filterQuestions(query);
    }
}

// 홈 컨텐츠 필터링
function filterHomeContent(query) {
    const filteredClubs = clubs.filter(club => 
        club.name.toLowerCase().includes(query) || 
        club.description.toLowerCase().includes(query) ||
        club.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
    );

    renderClubs(filteredClubs, 'popularClubs');
    renderPosts(filteredPosts, 'recentPosts');
}

// 카테고리별 필터링
function filterByCategory(category) {
    if (category === 'all') {
        renderPopularClubs();
        renderRecentPosts();
        return;
    }

    const filteredClubs = clubs.filter(club => club.category === category);
    const filteredPosts = posts.filter(post => {
        const club = clubs.find(c => c.id === post.clubId);
        return club && club.category === category;
    });

    renderClubs(filteredClubs, 'popularClubs');
    renderPosts(filteredPosts, 'recentPosts');
}

// 인기 동아리 렌더링
function renderPopularClubs() {
    const sortedClubs = [...clubs].sort((a, b) => b.likes - a.likes);
    renderClubs(sortedClubs.slice(0, 4), 'popularClubs');
}

// 동아리 렌더링
function renderClubs(clubsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = clubsToRender.map(club => `
        <div class="club-card" onclick="openClubDetail(${club.id})">
            <div class="club-image">${club.image}</div>
            <div class="club-content">
                <h3 class="club-title">${club.name}</h3>
                <span class="club-category">${club.category}</span>
                <p class="club-description">${club.description}</p>
                <div class="club-stats">
                    <span class="club-members">멤버 ${club.members}명</span>
                    <div class="club-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); likeClub(${club.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); joinClub(${club.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 최신 게시글 렌더링
function renderRecentPosts() {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.time) - new Date(a.time));
    renderPosts(sortedPosts, 'recentPosts');
}

// 게시글 렌더링
function renderPosts(postsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = postsToRender.map(post => `
        <div class="post-card" onclick="openPostDetail(${post.id})">
            <div class="post-header">
                <div class="post-author-avatar">${post.authorAvatar}</div>
                <div class="post-author-info">
                    <h4>${post.author}</h4>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="게시글 이미지" class="post-image">` : ''}
            <div class="post-actions">
                <button class="post-action ${post.liked ? 'liked' : ''}" onclick="event.stopPropagation(); likePost(${post.id})">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="post-action" onclick="event.stopPropagation(); commentPost(${post.id})">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="post-action" onclick="event.stopPropagation(); sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// 동아리 목록 렌더링
function renderClubsList() {
    renderClubs(clubs, 'clubsList');
}

// 동아리 관련 이벤트 설정
function setupClubEvents() {
    // 동아리 생성 버튼
    document.getElementById('createClubBtn').addEventListener('click', openCreateClubModal);
    
    // 동아리 정렬
    document.getElementById('clubSort').addEventListener('change', function() {
        sortClubs(this.value);
    });
    
    // 카테고리 필터
    document.getElementById('categoryFilter').addEventListener('change', function() {
        filterClubsByCategory(this.value);
    });
}

// 동아리 정렬
function sortClubs(sortBy) {
    let sortedClubs = [...clubs];
    
    switch(sortBy) {
        case 'popular':
            sortedClubs.sort((a, b) => b.likes - a.likes);
            break;
        case 'newest':
            sortedClubs.sort((a, b) => b.id - a.id);
            break;
        case 'members':
            sortedClubs.sort((a, b) => b.members - a.members);
            break;
        case 'activity':
            sortedClubs.sort((a, b) => b.posts - a.posts);
            break;
    }
    
    renderClubs(sortedClubs, 'clubsList');
}

// 동아리 카테고리 필터링
function filterClubsByCategory(category) {
    const filteredClubs = category === 'all' ? clubs : clubs.filter(club => club.category === category);
    renderClubs(filteredClubs, 'clubsList');
}

// Q&A 관련 이벤트 설정
function setupQnAEvents() {
    // 질문하기 버튼
    document.getElementById('askQuestionBtn').addEventListener('click', openAskQuestionModal);
    
    // Q&A 필터 탭
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterQuestionsByStatus(this.dataset.filter);
        });
    });
    
    // Q&A 정렬
    document.getElementById('qnaSort').addEventListener('change', function() {
        sortQuestions(this.value);
    });
}

// 질문 목록 렌더링
function renderQuestionsList() {
    renderQuestions(questions, 'questionsList');
}

// 질문 렌더링
function renderQuestions(questionsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = questionsToRender.map(question => `
        <div class="question-card" onclick="openQuestionDetail(${question.id})">
            <div class="question-status status-${question.status}">
                ${getStatusText(question.status)}
            </div>
            <h3 class="question-title">${question.title}</h3>
            <p class="question-content">${question.content}</p>
            <div class="question-meta">
                <div class="question-stats">
                    <span><i class="fas fa-reply"></i> 답변 ${question.answers}</span>
                    <span><i class="fas fa-heart"></i> 좋아요 ${question.likes}</span>
                </div>
                <span>${question.author} • ${question.time}</span>
            </div>
        </div>
    `).join('');
}

// 상태 텍스트 가져오기
function getStatusText(status) {
    switch(status) {
        case 'unanswered': return '미답변';
        case 'answered': return '답변완료';
        case 'adopted': return '채택완료';
        default: return '미답변';
    }
}

// 질문 상태별 필터링
function filterQuestionsByStatus(status) {
    const filteredQuestions = status === 'all' ? questions : questions.filter(q => q.status === status);
    renderQuestions(filteredQuestions, 'questionsList');
}

// 질문 정렬
function sortQuestions(sortBy) {
    let sortedQuestions = [...questions];
    
    switch(sortBy) {
        case 'latest':
            sortedQuestions.sort((a, b) => new Date(b.time) - new Date(a.time));
            break;
        case 'mostAnswers':
            sortedQuestions.sort((a, b) => b.answers - a.answers);
            break;
        case 'mostLikes':
            sortedQuestions.sort((a, b) => b.likes - a.likes);
            break;
    }
    
    renderQuestions(sortedQuestions, 'questionsList');
}

// 이벤트 관련 설정
function setupEventEvents() {
    document.getElementById('createEventBtn').addEventListener('click', openCreateEventModal);
    document.getElementById('prevMonth').addEventListener('click', previousMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
}

// 캘린더 렌더링
function renderCalendar() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    renderMonthCalendar(currentYear, currentMonth);
}

// 월별 캘린더 렌더링
function renderMonthCalendar(year, month) {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    document.getElementById('currentMonth').textContent = `${year}년 ${monthNames[month]}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let calendarHTML = '';
    
    // 요일 헤더
    const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];
    dayHeaders.forEach(day => {
        calendarHTML += `<div class="calendar-day" style="font-weight: bold; background: #f8f9fa;">${day}</div>`;
    });
    
    // 이전 달의 빈 칸
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="calendar-day other-month"></div>`;
    }
    
    // 현재 달의 날짜
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const hasEvent = events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
        });
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (hasEvent) dayClass += ' has-event';
        
        calendarHTML += `<div class="${dayClass}" onclick="selectDate(${year}, ${month}, ${day})">${day}</div>`;
    }
    
    document.getElementById('calendar').innerHTML = calendarHTML;
}

// 다가오는 이벤트 렌더링
function renderUpcomingEvents() {
    const upcomingEvents = events.slice(0, 5); // 최대 5개
    const container = document.getElementById('upcomingEvents');
    
    container.innerHTML = upcomingEvents.map(event => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleDateString('ko-KR', { month: 'short' });
        
        return `
            <div class="event-card" onclick="openEventDetail(${event.id})">
                <div class="event-date">
                    <div class="event-day">${day}</div>
                    <div class="event-month">${month}</div>
                </div>
                <div class="event-info">
                    <h4>${event.title}</h4>
                    <div class="event-club">${event.clubName}</div>
                    <div class="event-description">${event.description}</div>
                    <div style="color: #999; font-size: 0.9rem; margin-top: 0.5rem;">
                        ${event.time} • ${event.location}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 메시지 관련 설정
function setupMessageEvents() {
    document.getElementById('newChatBtn').addEventListener('click', startNewChat);
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// 채팅 목록 렌더링
function renderChatList() {
    const container = document.getElementById('chatList');
    
    container.innerHTML = messages.map(chat => `
        <div class="chat-item ${currentChat === chat.id ? 'active' : ''}" onclick="openChat(${chat.id})">
            <div class="chat-avatar">${chat.participantNames[1][0]}</div>
            <div class="chat-info">
                <h4>${chat.participantNames[1]}</h4>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
        </div>
    `).join('');
}

// 채팅 열기
function openChat(chatId) {
    currentChat = chatId;
    const chat = messages.find(m => m.id === chatId);
    
    // 채팅 목록 활성화 상태 업데이트
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.chat-item').classList.add('active');
    
    // 채팅 창 렌더링
    renderChatWindow(chat);
    
    // 입력창 표시
    document.getElementById('chatInputContainer').style.display = 'block';
}

// 채팅 창 렌더링
function renderChatWindow(chat) {
    const container = document.getElementById('chatWindow');
    
    container.innerHTML = chat.messages.map(message => `
        <div class="message-bubble ${message.senderId === currentUser.id ? 'message-sent' : 'message-received'}">
            ${message.content}
        </div>
    `).join('');
    
    // 스크롤을 맨 아래로
    container.scrollTop = container.scrollHeight;
}

// 메시지 전송
function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    
    if (!content || !currentChat) return;
    
    const chat = messages.find(m => m.id === currentChat);
    const newMessage = {
        id: chat.messages.length + 1,
        senderId: currentUser.id,
        content: content,
        time: '방금 전'
    };
    
    chat.messages.push(newMessage);
    chat.lastMessage = content;
    chat.lastTime = '방금 전';
    
    input.value = '';
    renderChatWindow(chat);
    renderChatList();
}

// 모달 이벤트 설정
function setupModalEvents() {
    // 모든 모달 닫기 버튼
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
    
    // 모달 외부 클릭 시 닫기
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
    
    // 폼 제출 이벤트
    setupFormEvents();
}

// 폼 이벤트 설정
function setupFormEvents() {
    // 동아리 생성 폼
    document.getElementById('createClubForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createClub();
    });
    
    // 질문 작성 폼
    document.getElementById('askQuestionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createQuestion();
    });
    
    // 이벤트 생성 폼
    document.getElementById('createEventForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createEvent();
    });
    
    // 취소 버튼들
    document.getElementById('cancelClubCreate').addEventListener('click', function() {
        document.getElementById('createClubModal').classList.remove('show');
    });
    
    document.getElementById('cancelQuestion').addEventListener('click', function() {
        document.getElementById('askQuestionModal').classList.remove('show');
    });
    
    document.getElementById('cancelEvent').addEventListener('click', function() {
        document.getElementById('createEventModal').classList.remove('show');
    });
}

// 모달 열기/닫기 함수들
function openCreateClubModal() {
    document.getElementById('createClubModal').classList.add('show');
}

function openAskQuestionModal() {
    // 동아리 옵션 채우기
    const clubSelect = document.getElementById('questionClub');
    clubSelect.innerHTML = '<option value="">선택하세요 (선택사항)</option>' +
        clubs.map(club => `<option value="${club.id}">${club.name}</option>`).join('');
    
    document.getElementById('askQuestionModal').classList.add('show');
}

function openCreateEventModal() {
    // 동아리 옵션 채우기
    const clubSelect = document.getElementById('eventClub');
    clubSelect.innerHTML = '<option value="">선택하세요</option>' +
        clubs.map(club => `<option value="${club.id}">${club.name}</option>`).join('');
    
    document.getElementById('createEventModal').classList.add('show');
}

// 생성 함수들
function createClub() {
    const formData = new FormData(document.getElementById('createClubForm'));
    const newClub = {
        id: clubs.length + 1,
        name: document.getElementById('clubName').value,
        category: document.getElementById('clubCategory').value,
        description: document.getElementById('clubDescription').value,
        tags: document.getElementById('clubTags').value.split(',').map(tag => tag.trim()),
        members: 1,
        image: '🆕',
        posts: 0,
        likes: 0
    };
    
    clubs.push(newClub);
    renderClubsList();
    document.getElementById('createClubModal').classList.remove('show');
    document.getElementById('createClubForm').reset();
    
    showNotification('동아리가 성공적으로 생성되었습니다!', 'success');
}

function createQuestion() {
    const newQuestion = {
        id: questions.length + 1,
        title: document.getElementById('questionTitle').value,
        content: document.getElementById('questionContent').value,
        author: currentUser.name,
        authorAvatar: currentUser.avatar,
        time: '방금 전',
        answers: 0,
        likes: 0,
        status: 'unanswered',
        clubId: document.getElementById('questionClub').value || null,
        tags: document.getElementById('questionTags').value.split(',').map(tag => tag.trim()),
        bestAnswer: null
    };
    
    questions.unshift(newQuestion);
    renderQuestionsList();
    document.getElementById('askQuestionModal').classList.remove('show');
    document.getElementById('askQuestionForm').reset();
    
    showNotification('질문이 성공적으로 등록되었습니다!', 'success');
}

function createEvent() {
    const clubId = document.getElementById('eventClub').value;
    const club = clubs.find(c => c.id == clubId);
    
    const newEvent = {
        id: events.length + 1,
        title: document.getElementById('eventTitle').value,
        description: document.getElementById('eventDescription').value,
        clubId: clubId,
        clubName: club ? club.name : '',
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value
    };
    
    events.push(newEvent);
    renderUpcomingEvents();
    renderCalendar();
    document.getElementById('createEventModal').classList.remove('show');
    document.getElementById('createEventForm').reset();
    
    showNotification('이벤트가 성공적으로 생성되었습니다!', 'success');
}

// 액션 함수들
function likeClub(clubId) {
    const club = clubs.find(c => c.id === clubId);
    if (club) {
        club.likes += 1;
        renderPopularClubs();
        renderClubsList();
        showNotification(`${club.name}에 좋아요를 누르셨습니다!`, 'info');
    }
}

function joinClub(clubId) {
    const club = clubs.find(c => c.id === clubId);
    if (club) {
        club.members += 1;
        renderPopularClubs();
        renderClubsList();
        showNotification(`${club.name}에 가입 신청을 보냈습니다!`, 'success');
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderRecentPosts();
        showNotification(post.liked ? '게시글에 좋아요를 누르셨습니다!' : '좋아요를 취소했습니다!', 'info');
    }
}

function commentPost(postId) {
    showNotification('댓글 기능은 곧 제공될 예정입니다!', 'info');
}

function sharePost(postId) {
    showNotification('게시글이 공유되었습니다!', 'success');
}

// 상세 보기 함수들
function openClubDetail(clubId) {
    const club = clubs.find(c => c.id === clubId);
    if (club) {
        showNotification(`${club.name} 상세 페이지는 개발 중입니다!`, 'info');
    }
}

function openPostDetail(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        showNotification(`게시글 상세 보기는 개발 중입니다!`, 'info');
    }
}

function openQuestionDetail(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        showNotification(`질문 상세 보기는 개발 중입니다!`, 'info');
    }
}

function openEventDetail(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        showNotification(`이벤트 상세 보기는 개발 중입니다!`, 'info');
    }
}

// 알림 시스템
function initNotifications() {
    // 초기 알림 개수 설정
    updateNotificationCount(3);
}

function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

function closeNotifications() {
    document.getElementById('notificationPanel').classList.remove('show');
}

function updateNotificationCount(count) {
    const badge = document.querySelector('.notification-count');
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function showNotification(message, type = 'info') {
    // 간단한 토스트 알림
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 캘린더 네비게이션
let currentCalendarDate = new Date();

function previousMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderMonthCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderMonthCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
}

function selectDate(year, month, day) {
    const selectedDate = new Date(year, month, day);
    const dateEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === selectedDate.toDateString();
    });
    
    if (dateEvents.length > 0) {
        showNotification(`${dateEvents.length}개의 이벤트가 있습니다!`, 'info');
    } else {
        showNotification('선택한 날짜에는 이벤트가 없습니다.', 'info');
    }
}

// 새 채팅 시작
function startNewChat() {
    showNotification('새 채팅 기능은 곧 제공될 예정입니다!', 'info');
}

// 검색 필터링 (동아리, 질문)
function filterClubs(query) {
    const filtered = clubs.filter(club => 
        club.name.toLowerCase().includes(query) || 
        club.description.toLowerCase().includes(query) ||
        club.tags.some(tag => tag.toLowerCase().includes(query))
    );
    renderClubs(filtered, 'clubsList');
}

function filterQuestions(query) {
    const filtered = questions.filter(question => 
        question.title.toLowerCase().includes(query) || 
        question.content.toLowerCase().includes(query)
    );
    renderQuestions(filtered, 'questionsList');
}