// ====== 랜덤 문구 기능
const quotes = [
    {    quote: "🚗 실패는 성공으로 나아가는 여정이에요"
    },
    {    quote: "💪 작은 성공을 반복하면 마음의 힘이 커져요"
    },
    {    quote: "🌟 점점 원하는 모습으로 나아가고 있어요"
    },
    {    quote: "🌳 작은 습관 하나가 우리의 삶을 바꿉니다"
    },
    {    quote: "👩‍🦰 왜 이 목표를 이루고 싶은지 기억해요"
    },
    {    quote: "🎊 좋은 습관은 또 다른 좋은 습관을 가져와요"
    },
    {    quote: "🤸‍♂️ 완벽하게보단, 차라리 대충! 꾸준히 해봅시다"
    },
    {    quote: "👏 오늘도 화이팅!"
    }
]
const quote = document.querySelector("#encourage-box span:first-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = todaysQuote.quote;
