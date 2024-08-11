const form = document.getElementById('ngl-form');
const messageInput = document.getElementById('ngl-message');
const submitButton = document.getElementById('ngl-submit');
const responseDiv = document.getElementById('ngl-response');
const currentTimeElement = document.getElementById('current-time');
let cooldown = false;
let cooldownTimeout = null;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cooldown) {
        responseDiv.innerHTML = `<p class="error">You need to wait 2 hours before sending another message.</p>`;
        return;
    }
    const message = messageInput.value.trim();
    if (message) {
        send_message(message);
        messageInput.value = '';
        cooldown = true;
        cooldownTimeout = setTimeout(() => {
            cooldown = false;
        }, 2 * 60 * 60 * 1000); // 2 hours
    }
});

function send_message(message) {
    const telegramBotToken = '7333672440:AAGbd2QBadr7rnPv134QjlBfyi63sDOyIDo';
    const chatId = '6737958161';
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
                responseDiv.innerHTML = `<p class="success">Message sent successfully!</p>`;
            } else {
                responseDiv.innerHTML = `<p class="error">Error sending message.</p>`;
            }
        })
        .catch((error) => {
            responseDiv.innerHTML = `<p class="error">Error sending message.</p>`;
        });
}

// Real-time clock
function updateClock() {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            currentTimeElement.textContent = formattedTime;
        }
        // Update the clock every second
        setInterval(updateClock, 1000);
        // Initial clock update
        updateClock();