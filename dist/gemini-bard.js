function bloggerGemini(config) {
    const container = document.querySelector(config.elementContainer);
    if (!container) return;

    container.innerHTML = `
        <div class="gemini-widget">
            <input type="text" class="input-field" placeholder="اكتب سؤالك..." />
            <button class="submit-btn">إرسال</button>
            <div class="response"></div>
        </div>
    `;

    const input = container.querySelector('.input-field');
    const button = container.querySelector('.submit-btn');
    const responseDiv = container.querySelector('.response');

    button.addEventListener('click', async () => {
        const prompt = input.value.trim();
        if (!prompt) return;

        responseDiv.textContent = "جاري توليد الإجابة...";
        
        try {
            // استبدل هذا بالاتصال الفعلي بـ Gemini API
            const answer = await mockGeminiAPI(prompt, config.config.apiKey);
            responseDiv.textContent = answer;
        } catch (error) {
            responseDiv.textContent = "حدث خطأ: " + error.message;
        }
    });
}

// دالة وهمية للاختبار (استبدلها بـ API الحقيقي)
async function mockGeminiAPI(prompt, apiKey) {
    return "هذه إجابة تجريبية لسؤالك: '" + prompt + "'.\n\n(ملاحظة: يجب استبدال هذه الدالة باتصال حقيقي بـ Gemini API)";
}
