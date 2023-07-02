/*Вызов формы отправителя */
function submitForm(e) {
    e.preventDefault();
    getData();
}


async function getData() {
    let userData = document.getElementById("input").value.trim();
    /*3 равно это не ошибка */
    if (userData === "") return false;
    /*Отправка смс пользователя */
    document.getElementById("messages").innerHTML = `<div class="mess-user">
        <p>${userData}</p>
    </div>` + document.getElementById("messages").innerHTML
    document.getElementById("input").value = ""

    const API = "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";
    /*Обработка ответа ИИ */
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userData }],
                max_tokens: 200
            })
        })
    /*Сохранение ответа ИИ */
        const data = await response.json()
    /*Отправка ответа ИИ */
        document.getElementById("messages").innerHTML = `<div class="mess-chat">
            <p>${data.choices[0].message.content}</p>
        </div>` + document.getElementById("messages").innerHTML
    } catch (error) {
        console.error('Error: ', error)
    }
}