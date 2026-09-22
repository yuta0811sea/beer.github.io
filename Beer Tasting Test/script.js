// =========================
// カブトビール利き診断
// =========================

// 質問データ
const questions = [
    {
        text: "ビールを飲むとき、<br>どんな味わいが好き？",
        options: [
            {
                text: "甘みのある<br>やさしい味",
                value: "meiji"
            },
            {
                text: "すっきりとした<br>バランスのよい味",
                value: "taisho"
            },
            {
                text: "しっかりとした<br>苦味のある味",
                value: "showa"
            }
        ]
    },

    {
        text: "ビールを飲むなら、<br>どんな場面が多い？",
        options: [
            {
                text: "ゆっくり味わいながら<br>楽しみたい",
                value: "meiji"
            },
            {
                text: "友達と楽しく<br>飲みたい",
                value: "taisho"
            },
            {
                text: "食事と一緒に<br>しっかり楽しみたい",
                value: "showa"
            }
        ]
    },

    {
        text: "ビールに求めるものは？",
        options: [
            {
                text: "まろやかさや<br>飲みやすさ",
                value: "meiji"
            },
            {
                text: "クセの少ない<br>飲みやすさ",
                value: "taisho"
            },
            {
                text: "ビールらしい<br>しっかりした味",
                value: "showa"
            }
        ]
    }
];


// 現在の質問番号
let currentQuestion = 0;

// 診断結果の点数
let scores = {
    meiji: 0,
    taisho: 0,
    showa: 0
};


// question.htmlが開かれている場合だけ実行
const questionPage = document.querySelector(".question-page");

if (questionPage) {

    const questionNumber =
        document.getElementById("question-number");

    const questionText =
        document.getElementById("question-text");

    const optionButtons =
        document.querySelectorAll(".question-option");


    // 質問を表示する
    function showQuestion() {

        const question = questions[currentQuestion];

        // 問題番号
        questionNumber.textContent = currentQuestion + 1;

        // 質問文
        questionText.innerHTML = question.text;

        // 選択肢
        optionButtons.forEach((button, index) => {

            button.innerHTML =
                question.options[index].text;

            button.dataset.value =
                question.options[index].value;
        });
    }


    // 選択肢をクリック
    optionButtons.forEach(button => {

        button.addEventListener("click", function () {

            const value = this.dataset.value;

            // 点数を追加
            scores[value]++;

            // 次の質問へ
            currentQuestion++;

            // 3問終了したら結果へ
            if (currentQuestion >= questions.length) {

                // 結果を保存
                localStorage.setItem(
                    "beerScores",
                    JSON.stringify(scores)
                );

                // 結果ページへ
                window.location.href = "result.html";

            } else {

                // 次の質問を表示
                showQuestion();
            }

        });

    });


    // 最初の質問を表示
    showQuestion();
}

// =========================
// 診断結果の表示
// =========================

const resultPage = document.querySelector(".result-page");

if (resultPage) {

    // 保存した点数を取得
    const savedScores =
        localStorage.getItem("beerScores");

    // 結果が存在しない場合
    if (!savedScores) {

        window.location.href = "loading.html";

    } else {

        const scores =
            JSON.parse(savedScores);


        // 一番点数が高いビールを調べる
        let result = "meiji";

        if (scores.taisho > scores[result]) {
            result = "taisho";
        }

        if (scores.showa > scores[result]) {
            result = "showa";
        }


        // 結果データ
        const resultData = {

            meiji: {
                name: "明治カブトビール",
                description:
                    "やさしい味わいを好むあなたには、明治カブトビールがおすすめです。",
                link: "meiji.html"
            },

            taisho: {
                name: "大正カブトビール",
                description:
                    "バランスのよい味わいを好むあなたには、大正カブトビールがおすすめです。",
                link: "taisho.html"
            },

            showa: {
                name: "昭和カブトビール",
                description:
                    "しっかりとした味わいを好むあなたには、昭和カブトビールがおすすめです。",
                link: "showa.html"
            }

        };


        // 選ばれた結果
        const data = resultData[result];


        // HTMLを書き換える
        document.getElementById("result-name")
            .textContent = data.name;

        document.getElementById("result-description")
            .textContent = data.description;

        document.getElementById("result-link")
            .href = data.link;

    }
}


