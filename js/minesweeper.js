// 난이도 선택
const selDiff = document.querySelectorAll('.selectDifficulty');
// 지뢰찾기 게임 들어갈 위치
const mineIn = document.querySelector('#mineIn');
// 남아있는 폭탄 수 표시 위치
const mineRemain = document.querySelector('#mineRemain');

// 지뢰매설, 지뢰찾기에 DFS로 사용될 xMove, yMove
// DFS, Depth First Search 깊이 우선 탐색
// 시작점부터 다음 branch로 넘어가기 전 해당 branch를 완벽히 탐색하고 넘어가는 방법
// 재귀함수나 스택으로 구현
let difficulty = 0; // 난이도는 쉬움 ~ 어려움
const xMove = [0, 0, 1, -1, 1, -1, -1, 1];
const yMove = [1, -1, 0, 0, 1, -1, 1, -1];

// 2차원 배열을 통해 지뢰찾기의 값들이 저장될 mineMap
let mineMap;
// 실제 전체 지뢰 개수
let wholeMine;
// 매핑 가능 지뢰 개수
let mappingMine;

// 초기 설정을 잡아주기 위한 init 함수
function init() {
    // 난이도 선택(click)시 clickColor 함수 진행
    for (let i=0; i<selDiff.length; i++) {
        selDiff[i].addEventListener('click', clickColor);
    }

}

// 난이도 선택 색상 변경 이벤트
function clickColor(event) {
    if (difficulty != this.getAttribute("diff")) {
        for (let i = 0; i < selDiff.length; i++) {
            let remover = selDiff[i].getAttribute('diff');
            selDiff[i].classList.remove(remover);
        }
        difficulty = this.getAttribute('diff');
        event.target.classList.add(difficulty);
        make(difficulty);
    }
}

// 전체 폭탄찾기 관련 내용을 만드는 함수
function make(choice) {
    let xFrame;
    let yFrame;

    switch (choice) {
        case 'easy':
            xFrame = 10;
            yFrame = 10;
            wholeMine = 41;
            break;
        case 'normal':
            xFrame = 15;
            yFrame = 15;
            wholeMine = 90;
            break;
        case 'hard':
            xFrame = 22;
            yFrame = 22;
            wholeMine = 195;
            break;
    }
    mappingMine = wholeMine;
    // mineMaker를 통해 이차원 배열 mineMap에 지뢰 매설 및 안전지대 땅 설정
    // javascript는 프로토타입 함수이기 때문에 Array객체에 새로운 메서드를 추가할 수 있음 
    mineMap = Array.minemaker(xFrame, yFrame, wholeMine);
    // 껍데기 만들기 함수
    frameMaker(xFrame, yFrame);
}

function frameMaker(xFrame, yFrame) {
    let mineFrame = document.createElement('table');
    mineFrame.className = 'mineFrame';

    for (let i = 0; i < xFrame; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < yFrame; j++) {
            let td = document.createElement('td');
            td.setAttribute('xLoc', i);
            td.setAttribute('yLoc', j);
            td.id = Number(i * xFrame) + Number(j);
            td.setAttribute('mineVal', mineMap[i][j]);
            td.className = 'mineCheck';
            td.classList.add('mineCover');
            tr.append(td);
        }
        mineFrame.append(tr);
    }
    mineIn.append(mineFrame);
    mineRemain.innerText = mappingMine;
}
// mineMap = Array.minemaker(xFrame, yFrame, wholeMine);
// 이차원 배열 만들기 - 폭탄 만들기
Array.mineMaker = function (m, n, bomb) {
    let a, mineMap = [];
    for (let i = 0; i < m; i++) {
        a = [];
        for (let j = 0; j < n; j++) {
            a[j] = 0;
        }
        mineMap[i] = a;
    }

    // 이차원 배열을 생성해주기
    while (bomb > 0) { // 모든 지뢰가 매설될 때 까지
        let x = Math.floor(Math.random() * m);
        let y = Math.floor(Math.random() * n);

        // 해당 위치가 지뢰가 아닐 때만
        if (mineMap[x][y] !== -1) {
            bomb--; // 지뢰 매설
            mineMap[x][y] = -1;

        }

    }
}

init();